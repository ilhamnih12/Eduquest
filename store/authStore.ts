import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Auth store — Mode Tamu / akun demo sudah DIHAPUS.
 * Seluruh akses game wajib melalui registrasi atau login (NextAuth).
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => {
    set({
      user,
      isAuthenticated: Boolean(user),
      isLoading: false,
    });
    // Sinkronkan key localStorage lawas agar tidak tersisa data tamu usang
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('eduquest_guest_user');
      } catch {
        // abaikan
      }
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('eduquest_guest_user');
      } catch {
        // abaikan
      }
    }
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
  setLoading: (isLoading) => set({ isLoading }),
}));
