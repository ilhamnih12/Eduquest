'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { LogIn, Sparkles, Key, ShieldCheck } from 'lucide-react';

/**
 * Form Login — Mode Tamu / akun demo sudah DIHAPUS.
 * Siswa wajib memiliki akun terdaftar (email + kata sandi) untuk bermain.
 */
export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { initGame } = useGameStore();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Batas waktu fetch sesi agar tombol tidak pernah nyangkut di "Memproses..."
    const fetchSessionWithTimeout = async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      try {
        const res = await fetch('/api/auth/session', {
          cache: 'no-store',
          signal: controller.signal,
        });
        return await res.json();
      } catch {
        return null;
      } finally {
        clearTimeout(timer);
      }
    };

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(
          'Email atau kata sandi tidak sesuai, atau akun belum terdaftar. ' +
            'Silakan daftar terlebih dahulu bila belum punya akun.'
        );
        return;
      }

      // Login sukses — ambil data sesi resmi dari NextAuth (fallback aman bila lambat)
      const session = await fetchSessionWithTimeout();
      const sessionUser = session?.user;

      const username =
        sessionUser?.name || (sessionUser?.email ? sessionUser.email.split('@')[0] : email.split('@')[0]);

      setUser({
        id: sessionUser?.id || email,
        email: sessionUser?.email || email,
        username,
        avatar: sessionUser?.image,
        provider: sessionUser?.provider === 'google' ? 'google' : 'credentials',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });

      // Siapkan progres lokal — JANGAN biarkan memblokir navigasi bila storage lambat/terblokir
      try {
        await Promise.race([
          initGame(sessionUser?.email || email, username),
          new Promise((resolve) => setTimeout(resolve, 4000)),
        ]);
      } catch {
        // Lanjut navigasi — halaman tujuan akan menyelesaikan inisialisasi sendiri
      }

      // Kembali ke halaman yang tadinya diminta (dari middleware), default: halaman utama
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get('callbackUrl');
      const safeCallback = callbackUrl && callbackUrl.startsWith('/') ? callbackUrl : '/';
      router.push(safeCallback);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gagal masuk ke dalam game.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Card Container */}
      <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 sm:p-8 shadow-xl">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark mb-1">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-edu-textLight dark:text-edu-textDark">
            Masuk ke Eduquest
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Lanjutkan petualangan belajarmu dan sinkronkan progres.
          </p>
        </div>

        {/* Info wajib punya akun */}
        <div className="p-3 mb-4 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-700 dark:text-sky-300 text-[11px] font-bold flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Sekarang seluruh petualangan wajib menggunakan akun resmi — mode tamu/demo sudah
            dihapus agar progres &amp; rapormu tersimpan dengan aman.
          </span>
        </div>

        {error && (
          <div className="p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Alamat Email:</Label>
            <Input
              id="email"
              type="email"
              placeholder="siswa@smp.sch.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Kata Sandi:</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isLoading}
            className="w-full font-black mt-2"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Masuk Sekarang
          </Button>
        </form>

        <div className="mt-5 pt-4 border-t border-edu-borderLight dark:border-edu-borderDark space-y-3">
          <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <Key className="h-3.5 w-3.5" />
            <span>
              Belum punya akun?{' '}
              <Link
                href="/register"
                className="text-edu-accentLight dark:text-edu-accentDark font-black hover:underline"
              >
                Daftar Gratis di Sini
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
