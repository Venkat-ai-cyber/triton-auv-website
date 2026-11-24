import { User } from '../types';

const API_BASE = '/api';

export async function checkAuth(): Promise<User | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Accept': 'application/json' },
      credentials: 'include'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.authenticated ? data.user : null;
  } catch (err) {
    console.error('Check auth error:', err);
    return null;
  }
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Login failed.' };
    }
    return { success: true, user: data.user, message: data.message };
  } catch (err: any) {
    return { success: false, message: 'Network or server error during login.' };
  }
}

export async function registerUser(formData: {
  name: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<{ success: boolean; user?: User; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Registration failed.' };
    }
    return { success: true, user: data.user, message: data.message };
  } catch (err: any) {
    return { success: false, message: 'Network or server error during registration.' };
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return res.ok;
  } catch (err) {
    console.error('Logout error:', err);
    return false;
  }
}

export async function submitEnquiry(enquiry: {
  name: string;
  email: string;
  organisation: string;
  category: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/contact/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: 'Could not send enquiry.' };
  }
}
