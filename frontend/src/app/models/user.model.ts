export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
