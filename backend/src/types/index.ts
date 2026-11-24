export interface UserRecord {
  id: string;
  name: string;
  company_name: string;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface UserResponse {
  id: string;
  name: string;
  companyName: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface RegisterDTO {
  name: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

declare module 'express-session' {
  interface SessionData {
    user?: UserResponse;
  }
}
