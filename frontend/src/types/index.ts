export interface User {
  id: string;
  name: string;
  companyName: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
}

export type PageRoute = 
  | 'home'
  | 'about'
  | 'engineering'
  | 'technology'
  | 'control'
  | 'sensors'
  | 'vision-ai'
  | 'missions'
  | 'cad-design'
  | 'gallery'
  | 'sponsorship'
  | 'contact'
  | 'login'
  | 'register'
  | 'dashboard';
