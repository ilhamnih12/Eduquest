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
import { LogIn, Sparkles, User, Key, ArrowRight, ShieldCheck } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const { setGuestUser, setUser } = useAuthStore();
  const { initGame } = useGameStore();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [guestName, setGuestName] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGuestMode, setIsGuestMode] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isGuestMode) {
        const username = guestName.trim() || 'Petualang Cilik';
        setGuestUser(username);
        await initGame(`guest-${Date.now()}`, username);
        router.push('/battle');
        return;
      }

      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      // Successful login
      await initGame(email, email.split('@')[0]);
      router.push('/battle');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gagal masuk ke dalam game.');
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
            {isGuestMode ? 'Masuk Mode Tamu (Offline)' : 'Masuk ke Eduquest'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isGuestMode
              ? 'Mulai bermain instan tanpa kata sandi, progres tersimpan di peramban!'
              : 'Lanjutkan petualangan belajarmu dan sinkronkan progres.'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isGuestMode ? (
            <div>
              <Label htmlFor="guestName">Nama Karakter / Julukan:</Label>
              <Input
                id="guestName"
                placeholder="Contoh: Kesatria Budi"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>
          ) : (
            <>
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
            </>
          )}

          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isLoading}
            className="w-full font-black mt-2"
          >
            <LogIn className="h-4 w-4 mr-2" />
            {isGuestMode ? 'Mulai Petualangan Tamu' : 'Masuk Sekarang'}
          </Button>
        </form>

        {/* Switch between Guest & Credential mode */}
        <div className="mt-5 pt-4 border-t border-edu-borderLight dark:border-edu-borderDark space-y-3">
          <Button
            type="button"
            size="md"
            variant="outline"
            onClick={() => {
              setIsGuestMode(!isGuestMode);
              setError(null);
            }}
            className="w-full text-xs font-bold"
          >
            <User className="h-3.5 w-3.5 mr-1.5" />
            {isGuestMode ? 'Gunakan Akun Terdaftar (Email)' : 'Coba Langsung (Mode Tamu Tanpa Password)'}
          </Button>

          <p className="text-center text-xs text-slate-500">
            Belum punya akun?{' '}
            <Link
              href="/register"
              className="text-edu-accentLight dark:text-edu-accentDark font-bold hover:underline"
            >
              Daftar Gratis di Sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
