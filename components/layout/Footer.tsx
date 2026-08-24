import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Cpu } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight/80 dark:bg-edu-cardDark/80 backdrop-blur-sm text-edu-textLight dark:text-edu-textDark transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-edu-accentLight dark:bg-edu-accentDark text-white dark:text-edu-bgDark">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-black tracking-tight">EDUQUEST RPG INDONESIA</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Platform Gamifikasi Pembelajaran Kurikulum SMP
              </p>
            </div>
          </div>

          {/* Attribution explicitly for creator & AI */}
          <div className="text-center md:text-right text-xs text-slate-600 dark:text-slate-400">
            <p className="flex items-center justify-center md:justify-end gap-1 font-semibold text-edu-textLight dark:text-edu-textDark">
              Dibuat dengan <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> oleh{' '}
              <span className="text-edu-accentLight dark:text-edu-accentDark font-bold">edinst</span> &{' '}
              <span className="text-edu-accentLight dark:text-edu-accentDark font-bold">Arena AI</span>
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              © {new Date().getFullYear()} Eduquest. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-edu-borderLight dark:border-edu-borderDark flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-edu-accentLight dark:text-edu-accentDark" />
              Didukung Google Gemini AI & Kurikulum Merdeka
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Dapat Dimainkan Offline (IndexedDB)
            </span>
          </div>

          <div className="flex items-center space-x-4 font-medium">
            <Link href="/battle" className="hover:text-edu-accentLight dark:hover:text-edu-accentDark transition-colors">
              Pertempuran
            </Link>
            <Link href="/inventory" className="hover:text-edu-accentLight dark:hover:text-edu-accentDark transition-colors">
              Tas & Item
            </Link>
            <Link href="/shop" className="hover:text-edu-accentLight dark:hover:text-edu-accentDark transition-colors">
              Toko
            </Link>
            <Link href="/profile" className="hover:text-edu-accentLight dark:hover:text-edu-accentDark transition-colors">
              Rapor Siswa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
