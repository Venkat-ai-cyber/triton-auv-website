import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { UserRecord, RegisterDTO, UserResponse } from '../types/index.js';
import { sanitizeCsvField, unescapeCsvField } from '../utils/csvSafe.js';

const DATA_DIR = path.resolve(__dirname, '../../data');
const CSV_FILE = path.join(DATA_DIR, 'users.csv');
const CSV_HEADER = ['id', 'name', 'company_name', 'email', 'password_hash', 'role', 'created_at'];

// Simple async queue lock to ensure safe sequential writes to CSV file
let writeLock: Promise<void> = Promise.resolve();

export class UserService {
  constructor() {
    this.ensureCsvExists();
  }

  private ensureCsvExists(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CSV_FILE)) {
      const headerLine = CSV_HEADER.join(',') + '\n';
      fs.writeFileSync(CSV_FILE, headerLine, 'utf8');
      console.log(`[UserService] Initialized CSV database at ${CSV_FILE}`);
    }
  }

  /**
   * Read all users from the CSV file
   */
  public async getAllUsers(): Promise<UserRecord[]> {
    this.ensureCsvExists();
    const content = fs.readFileSync(CSV_FILE, 'utf8');
    
    if (!content.trim()) {
      return [];
    }

    try {
      const records = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      }) as Array<Record<string, string>>;

      return records.map(r => ({
        id: r.id,
        name: unescapeCsvField(r.name),
        company_name: unescapeCsvField(r.company_name),
        email: r.email.toLowerCase().trim(),
        password_hash: r.password_hash,
        role: (r.role === 'admin' ? 'admin' : 'user') as 'user' | 'admin',
        created_at: r.created_at
      }));
    } catch (err) {
      console.error('[UserService] Error reading CSV:', err);
      return [];
    }
  }

  /**
   * Find user by email (case-insensitive)
   */
  public async findByEmail(email: string): Promise<UserRecord | null> {
    const cleanEmail = email.toLowerCase().trim();
    const users = await this.getAllUsers();
    return users.find(u => u.email.toLowerCase() === cleanEmail) || null;
  }

  /**
   * Find user by ID
   */
  public async findById(id: string): Promise<UserRecord | null> {
    const users = await this.getAllUsers();
    return users.find(u => u.id === id) || null;
  }

  /**
   * Register a new user with bcrypt hashing and safe atomic CSV write
   */
  public async registerUser(data: RegisterDTO): Promise<UserResponse> {
    const { name, companyName, email, password } = data;
    const cleanEmail = email.toLowerCase().trim();

    // Check duplicate
    const existing = await this.findByEmail(cleanEmail);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    // Hash password with 12 salt rounds
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser: UserRecord = {
      id: crypto.randomUUID(),
      name: sanitizeCsvField(name),
      company_name: sanitizeCsvField(companyName),
      email: cleanEmail,
      password_hash: password_hash,
      role: 'user', // Strict public user role - cannot be escalated by payload
      created_at: new Date().toISOString()
    };

    // Safe sequential write with lock and atomic temp file replacement
    await (writeLock = writeLock.then(async () => {
      const currentUsers = await this.getAllUsers();
      // Double check duplicate under lock
      if (currentUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
        throw new Error('An account with this email address already exists.');
      }

      const rows = [...currentUsers, newUser].map(u => ({
        id: u.id,
        name: sanitizeCsvField(u.name),
        company_name: sanitizeCsvField(u.company_name),
        email: u.email,
        password_hash: u.password_hash,
        role: u.role,
        created_at: u.created_at
      }));

      const csvData = stringify(rows, {
        header: true,
        columns: CSV_HEADER
      });

      // Atomic write via temp file
      const tempFile = `${CSV_FILE}.${Date.now()}.tmp`;
      fs.writeFileSync(tempFile, csvData, 'utf8');
      fs.renameSync(tempFile, CSV_FILE);
      console.log(`[UserService] Successfully registered user: ${cleanEmail}`);
    }));

    return {
      id: newUser.id,
      name: unescapeCsvField(newUser.name),
      companyName: unescapeCsvField(newUser.company_name),
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.created_at
    };
  }

  /**
   * Validate password against stored hash
   */
  public async verifyPassword(user: UserRecord, plain: string): Promise<boolean> {
    return bcrypt.compare(plain, user.password_hash);
  }
}

export const userService = new UserService();
