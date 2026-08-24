import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  setGuestUser: (username: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isGuest: false,
  setUser: (user) => {
    set({
      user,
      isAuthenticated: Boolean(user),
      isGuest: user?.provider === 'guest',
      isLoading: false,
    });
  },
  setGuestUser: (username) => {
    const guestId = `guest-${Date.now()}`;
    const guestUser: User = {
      id: guestId,
      email: `${guestId}@eduquest.local`,
      username: username.trim() || 'Petualang Cilik',
      provider: 'guest',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduquest_guest_user', JSON.stringify(guestUser));
    }
    set({
      user: guestUser,
      isAuthenticated: true,
      isGuest: true,
      isLoading: false,
    });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('eduquest_guest_user');
    }
    set({
      user: null,
      isAuthenticated: false,
      isGuest: false,
      isLoading: false,
    });
  },
  setLoading: (isLoading) => set({ isLoading }),
}));
