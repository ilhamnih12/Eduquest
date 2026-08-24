export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash?: string;
  provider: 'credentials' | 'google' | 'guest';
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
    provider: 'credentials' | 'google' | 'guest';
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
