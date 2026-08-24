'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Swords,
  Backpack,
  Store,
  UserCheck,
  Volume2,
  VolumeX,
  RefreshCw,
  Coins,
  Heart,
  Sparkles,
  Menu,
  X,
  LogOut,
  LogIn,
} from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from './ThemeToggle';
import { soundManager, formatGold } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const { gameState, isInitialized, syncDataToServer } = useGameStore();
  const { user, isGuest, logout } = useAuthStore();

  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setEnabled(next);
    if (next) soundManager.playClick();
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    await syncDataToServer();
    setIsSyncing(false);
  };

  const navLinks = [
    { href: '/battle', label: 'Pertempuran', icon: Swords },
    { href: '/inventory', label: 'Tas & Zirah', icon: Backpack },
    { href: '/shop', label: 'Toko Perlengkapan', icon: Store },
    { href: '/profile', label: 'Rapor & Prestasi', icon: UserCheck },
  ];

  const character = gameState.character;
  const hpPercent = Math.min(100, Math.round((character.hp / (character.maxHp || 1)) * 100));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight/95 dark:bg-edu-bgDark/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-edu-accentLight to-sky-400 dark:from-edu-accentDark dark:to-indigo-500 text-white shadow-md shadow-edu-accentLight/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-edu-textLight dark:text-edu-textDark">
                  EDUQUEST
                </span>
                <Badge variant="gold" className="text-[10px] px-1.5 py-0">
                  SMP
                </Badge>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                oleh <span className="font-semibold text-edu-accentLight dark:text-edu-accentDark">edinst & Arena AI</span>
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark border border-edu-accentLight/30 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-edu-cardDark'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Player Status & Control Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isInitialized && (
            <div className="hidden lg:flex items-center gap-2.5 bg-slate-100 dark:bg-edu-cardDark px-3 py-1.5 rounded-xl border border-edu-borderLight dark:border-edu-borderDark">
              {/* Level */}
              <div className="flex items-center gap-1 text-xs font-bold text-edu-accentLight dark:text-edu-accentDark">
                <span>Lv.{character.level}</span>
              </div>

              <div className="h-4 w-[1px] bg-slate-300 dark:bg-edu-borderDark" />

              {/* HP indicator */}
              <div className="flex items-center gap-1.5" title={`HP: ${character.hp}/${character.maxHp}`}>
                <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <div className="w-16 h-2 rounded-full bg-slate-200 dark:bg-edu-borderDark overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${hpPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  {character.hp}
                </span>
              </div>

              <div className="h-4 w-[1px] bg-slate-300 dark:bg-edu-borderDark" />

              {/* Gold */}
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500" title="Keping Emas">
                <Coins className="h-3.5 w-3.5 fill-amber-500" />
                <span>{formatGold(character.gold)}</span>
              </div>
            </div>
          )}

          {/* Sync status */}
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            title="Sinkronisasi Progres Offline / Online"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-edu-borderLight dark:border-edu-borderDark bg-white dark:bg-edu-cardDark text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-edu-borderDark transition-colors active:scale-95"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin text-edu-accentLight' : ''}`} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Efek Suara"
            title={soundEnabled ? 'Matikan Suara Audio' : 'Nyalakan Suara Audio'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-edu-borderLight dark:border-edu-borderDark bg-white dark:bg-edu-cardDark text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-edu-borderDark transition-colors active:scale-95"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Auth or Guest indicator */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/profile">
                <div
                  className="flex h-10 items-center gap-2 rounded-xl bg-slate-100 dark:bg-edu-cardDark px-3 border border-edu-borderLight dark:border-edu-borderDark hover:border-edu-accentLight transition-colors"
                  title={`Login sebagai ${user.username}`}
                >
                  <span className="text-sm">🎓</span>
                  <span className="text-xs font-bold truncate max-w-[90px] text-edu-textLight dark:text-edu-textDark">
                    {user.username}
                  </span>
                </div>
              </Link>
              <button
                onClick={logout}
                title="Keluar Akun"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button size="sm" variant="outline" className="text-xs">
                <LogIn className="h-3.5 w-3.5 mr-1" />
                Masuk
              </Button>
            </Link>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-edu-borderLight dark:border-edu-borderDark bg-white dark:bg-edu-cardDark text-edu-textLight dark:text-edu-textDark"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-bgDark px-4 pt-3 pb-5 space-y-3">
          {/* Mobile Character stats summary */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-edu-cardDark border border-edu-borderLight dark:border-edu-borderDark">
            <div className="flex items-center gap-2">
              <span className="text-lg">{character.avatar}</span>
              <div>
                <p className="text-xs font-bold text-edu-textLight dark:text-edu-textDark">
                  {character.name} (Lv.{character.level})
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{character.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-bold text-rose-500">
                <Heart className="h-3 w-3 fill-rose-500" />
                <span>{character.hp}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Coins className="h-3 w-3 fill-amber-500" />
                <span>{formatGold(character.gold)}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-edu-accentLight/20 text-edu-accentLight dark:text-edu-accentDark border border-edu-accentLight/30'
                      : 'bg-slate-100 dark:bg-edu-cardDark text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="h-4 w-4 text-edu-accentLight dark:text-edu-accentDark" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-edu-borderLight dark:border-edu-borderDark">
            <span className="text-[11px] text-slate-500">
              © Eduquest oleh edinst & Arena AI
            </span>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-rose-500 flex items-center gap-1"
              >
                <LogOut className="h-3.5 w-3.5" />
                Keluar
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-edu-accentLight dark:text-edu-accentDark flex items-center gap-1"
              >
                <LogIn className="h-3.5 w-3.5" />
                Masuk Akun
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
