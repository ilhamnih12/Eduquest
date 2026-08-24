export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash?: string;
  provider: 'credentials' | 'google';
  avatar?: string;
  createdAt: string;
  lastLogin: string;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    username: string;
    avatar?: string;
    provider: 'credentials' | 'google';
  };
  expires: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}
