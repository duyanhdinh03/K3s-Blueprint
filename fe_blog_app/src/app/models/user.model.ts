export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  username: string;
  token: string;
}