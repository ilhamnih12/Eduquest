'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { UserPlus, Sparkles, Gift, CheckCircle2 } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const { initGame } = useGameStore();
  const { setUser } = useAuthStore();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (password.length < 6) {
      setError('Kata sandi minimal harus 6 karakter.');
      return;
    }

    setIsLoading(true);

    try {
      // Call register API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Pendaftaran akun gagal.');
      }

      // Auto login after registration
      const signInRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.error) {
        throw new Error(
          'Pendaftaran berhasil, namun login otomatis gagal. Silakan masuk manual di halaman Masuk.'
        );
      }

      // Simpan data pengguna ke auth store (wajib login, tanpa mode tamu)
      setUser({
        id: data?.user?.id || email,
        email,
        username,
        provider: 'credentials',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });

      // Initialize game state with user details
      await initGame(email, username);
      router.push('/battle');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan sistem.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 sm:p-8 shadow-xl">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark mb-1">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-edu-textLight dark:text-edu-textDark">
            Daftar Petualang Cendekia
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daftarkan akunmu dan dapatkan Paket Perlengkapan Pemula gratis!
          </p>
        </div>

        {/* Starter Kit Preview Banner */}
        <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 dark:text-amber-400">
            <Gift className="h-4 w-4" />
            <span>Bonus Paket Starter Siswa SMP:</span>
          </div>
          <ul className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1 font-semibold pl-1">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 120 Keping Emas & 3 Poin Atribut
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 3x Ramuan Pemulih HP & 2x Gulungan Petunjuk
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Penggaris Kayu Pemula & Rompi Seragam
            </li>
          </ul>
        </div>

        {error && (
          <div className="p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Nama Karakter / Julukan:</Label>
            <Input
              id="username"
              placeholder="Contoh: Kesatria Budi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
            <Label htmlFor="password">Kata Sandi (Min. 6 Karakter):</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi:</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <UserPlus className="h-4 w-4 mr-2" />
            Daftar & Klaim Bonus
          </Button>
        </form>

        <div className="mt-5 pt-4 border-t border-edu-borderLight dark:border-edu-borderDark text-center text-xs text-slate-500">
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="text-edu-accentLight dark:text-edu-accentDark font-bold hover:underline"
          >
            Masuk di Sini
          </Link>
        </div>
      </div>
    </div>
  );
}
