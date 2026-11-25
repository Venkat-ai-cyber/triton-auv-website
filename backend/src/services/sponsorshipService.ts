import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { sanitizeCsvField, unescapeCsvField } from '../utils/csvSafe.js';

export interface SponsorshipRecord {
  id: string;
  name: string;
  email: string;
  organisation: string;
  category: string;
  message: string;
  submitted_at: string;
}

export interface CreateSponsorshipDTO {
  name: string;
  email: string;
  organisation?: string;
  category?: string;
  message: string;
}

const DATA_DIR = path.resolve(__dirname, '../../data');
const CSV_FILE = path.join(DATA_DIR, 'sponsorships.csv');
const CSV_HEADER = ['id', 'name', 'email', 'organisation', 'category', 'message', 'submitted_at'];

let writeLock: Promise<void> = Promise.resolve();

export class SponsorshipService {
  constructor() {
    this.ensureCsvExists();
  }

  private ensureCsvExists(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CSV_FILE)) {
      fs.writeFileSync(CSV_FILE, CSV_HEADER.join(',') + '\n', 'utf8');
      console.log(`[SponsorshipService] Initialized CSV database at ${CSV_FILE}`);
    }
  }

  public async getAllSponsorships(): Promise<SponsorshipRecord[]> {
    this.ensureCsvExists();
    const content = fs.readFileSync(CSV_FILE, 'utf8');
    if (!content.trim()) return [];

    try {
      const records = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      }) as Array<Record<string, string>>;

      return records.map((r) => ({
        id: r.id,
        name: unescapeCsvField(r.name || ''),
        email: unescapeCsvField(r.email || ''),
        organisation: unescapeCsvField(r.organisation || ''),
        category: unescapeCsvField(r.category || ''),
        message: unescapeCsvField(r.message || ''),
        submitted_at: r.submitted_at || ''
      }));
    } catch (err) {
      console.error('[SponsorshipService] Error reading CSV:', err);
      return [];
    }
  }

  public async addEnquiry(dto: CreateSponsorshipDTO): Promise<SponsorshipRecord> {
    const runTask = async (): Promise<SponsorshipRecord> => {
      this.ensureCsvExists();

      const record: SponsorshipRecord = {
        id: crypto.randomUUID(),
        name: sanitizeCsvField(dto.name),
        email: sanitizeCsvField(dto.email.toLowerCase()),
        organisation: sanitizeCsvField(dto.organisation || 'N/A'),
        category: sanitizeCsvField(dto.category || 'General Enquiry'),
        message: sanitizeCsvField(dto.message),
        submitted_at: new Date().toISOString()
      };

      const csvRow = stringify(
        [[
          record.id,
          record.name,
          record.email,
          record.organisation,
          record.category,
          record.message,
          record.submitted_at
        ]],
        { quoted: true }
      );

      fs.appendFileSync(CSV_FILE, csvRow, 'utf8');
      return {
        ...record,
        name: unescapeCsvField(record.name),
        email: unescapeCsvField(record.email),
        organisation: unescapeCsvField(record.organisation),
        category: unescapeCsvField(record.category),
        message: unescapeCsvField(record.message)
      };
    };

    const resultPromise = writeLock.then(runTask, runTask);
    writeLock = resultPromise.then(() => {}, () => {});
    return resultPromise;
  }
}

export const sponsorshipService = new SponsorshipService();
