'use client';

import * as React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useGameStore } from '@/store/gameStore';
import type { User } from '@/types/user';

/**
 * Menjaga status login tetap sinkron dengan sesi NextAuth (cookie JWT).
 * - Saat halaman dimuat ulang, mengisi kembali authStore & game store
 *   dari /api/auth/session sehingga middleware wajib-login dan UI selalu konsisten.
 * - Jika sesi sudah tidak valid (cookie kedaluwarsa/di-clear), state lokal dibersihkan.
 */
export function SessionHydrator() {
  const { user, setUser, logout } = useAuthStore();
  const { initGame } = useGameStore();

  React.useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      try {
        const res = await fetch('/api/auth/session', { cache: 'no-store' });
        if (!res.ok) throw new Error('Sesi tidak dapat diambil');

        const session = await res.json();
        if (cancelled) return;

        const sessionUser = session?.user;

        if (sessionUser && sessionUser.email) {
          const hydratedUser: User = {
            id: sessionUser.id || sessionUser.email,
            email: sessionUser.email,
            username: sessionUser.name || sessionUser.email.split('@')[0],
            avatar: sessionUser.image,
            provider: sessionUser.provider === 'google' ? 'google' : 'credentials',
            createdAt: sessionUser.createdAt || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };

          // Isi store bila berubah (misal setelah refresh halaman)
          setUser(hydratedUser);
          // Pastikan progres milik akun yang sedang login yang termuat.
          // initGame sendiri sudah punya guard & timeout (tidak akan menggantung,
          // dan otomatis dilewati bila sudah ter-init untuk user yang sama).
          await initGame(hydratedUser.email, hydratedUser.username);
        } else {
          // Tidak ada sesi valid — bersihkan state lokal yang tersisa
          if (user) logout();
        }
      } catch {
        // Jaringan gagal — biarkan middleware yang menangani redirect
      }
    };

    hydrate();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
