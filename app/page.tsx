'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Swords,
  Sparkles,
  BookOpen,
  Trophy,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Flame,
  Calculator,
  FlaskConical,
  Globe2,
  Languages,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';

export default function HomePage() {
  const { isInitialized, initGame } = useGameStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (!isInitialized) {
      initGame();
    }
  }, [isInitialized, initGame]);

  const features = [
    {
      title: 'Pertarungan Turn-Based Edukatif',
      desc: 'Jawab soal pilihan ganda kurikulum SMP untuk melancarkan serangan damage dan menaklukkan monster ujian.',
      icon: Swords,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'Didukung Google Gemini AI',
      desc: 'Soal dinamis tanpa batas dan tips belajar adaptif dari AI Guru yang memahami kelemahan materi belajarmu.',
      icon: Cpu,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Sistem Level & Alokasi Atribut',
      desc: 'Raih EXP dari setiap pertempuran, naik level, tingkatkan status (STR, VIT, INT, AGI), dan raih gelar kebanggaan.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Tas, Senjata, & Toko Perlengkapan',
      desc: 'Kumpulkan keping emas untuk membeli Ramuan HP, Tongkat Kalkulus, Baju Zirah, dan Gulungan Petunjuk.',
      icon: Trophy,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Bermain Tanpa Kuota (100% Offline)',
      desc: 'Ditenagai Dexie.js (IndexedDB), mainkan game kapan saja di mana saja tanpa khawatir kehilangan koneksi internet.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: '5 Mata Pelajaran Kurikulum Merdeka',
      desc: 'Mencakup Matematika, IPA, IPS, Bahasa Indonesia, dan Bahasa Inggris untuk Kelas 7, 8, dan 9 SMP.',
      icon: BookOpen,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    },
  ];

  const subjects = [
    { name: 'Matematika', icon: Calculator, desc: 'Aljabar, Geometri, Pythagoras & SPLDV', color: 'from-rose-500/20 to-red-600/10' },
    { name: 'IPA (Sains)', icon: FlaskConical, desc: 'Biologi Sel, Hukum Newton, Kalor & Listrik', color: 'from-emerald-500/20 to-teal-600/10' },
    { name: 'IPS (Sosial)', icon: Globe2, desc: 'Geografi, Sejarah Nusantara, ASEAN & Ekonomi', color: 'from-amber-500/20 to-yellow-600/10' },
    { name: 'Bahasa Indonesia', icon: BookOpen, desc: 'Teks Deskripsi, Majas, Cerpen & EYD', color: 'from-blue-500/20 to-indigo-600/10' },
    { name: 'Bahasa Inggris', icon: Languages, desc: 'Grammar, Tenses, Reading & Vocabulary', color: 'from-purple-500/20 to-violet-600/10' },
  ];

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-edu-cardLight to-slate-100 dark:from-edu-cardDark dark:to-edu-bgDark border border-edu-borderLight dark:border-edu-borderDark p-8 sm:p-14 text-center shadow-xl">
        {/* Glow backdrop circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-edu-accentLight/15 dark:bg-edu-accentDark/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-edu-accentLight/15 dark:bg-edu-accentDark/20 border border-edu-accentLight/30 text-edu-accentLight dark:text-edu-accentDark text-xs font-black animate-bounce-subtle">
            <Sparkles className="h-4 w-4" />
            <span>GAME RPG EDUKASI SMP INDONESIA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-edu-textLight dark:text-edu-textDark leading-tight">
            Belajar Jadi Petualangan Epik Penuh Kemenangan!
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Taklukkan monster soal, kumpulkan senjata legendaris, naikkan level karaktermu, dan kuasai materi pelajaran SMP dengan bantuan kecerdasan buatan <strong>Google Gemini AI</strong>.
          </p>

          {/* Call to action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/battle" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-base font-black px-8 shadow-xl">
                <Swords className="h-5 w-5 mr-2" />
                Mulai Bertempur Sekarang
              </Button>
            </Link>

            <Link href="/profile" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base font-bold">
                <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                Buka Rapor & Prestasi
              </Button>
            </Link>
          </div>

          {/* Quick info badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Gratis & Tanpa Iklan
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Sesuai Kurikulum Merdeka
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Offline Capable
            </span>
          </div>
        </div>
      </section>

      {/* 5 Subjects Carousel / Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="gold">KURIKULUM SMP KELAS 7 - 9</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-edu-textLight dark:text-edu-textDark">
            5 Arena Mata Pelajaran Utama
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Setiap mata pelajaran memiliki variasi monster unik dengan karakteristik dan kelemahan masing-masing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-edu-textLight dark:text-edu-textDark">
                    {s.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <Link href="/battle">
                  <span className="text-xs font-bold text-edu-accentLight dark:text-edu-accentDark flex items-center gap-1 hover:underline">
                    Masuk Arena <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="outline">MEKANIK GAME LENGKAP</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-edu-textLight dark:text-edu-textDark">
            Fitur Utama Eduquest RPG
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dirancang khusus dengan prinsip gamifikasi mutakhir untuk memotivasi semangat belajar siswa SMP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm space-y-3"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${feat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-black text-edu-textLight dark:text-edu-textDark">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Creator Credits Showcase */}
      <section className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-gradient-to-r from-slate-900 via-edu-cardDark to-slate-900 p-8 sm:p-12 text-white shadow-2xl text-center space-y-4">
        <Badge variant="gold" className="text-xs px-3 py-1">
          PROYEK KARYA ANAK BANGSA
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black">
          Dibuat dengan Sepenuh Hati oleh <span className="text-edu-accentDark">edinst</span> &{' '}
          <span className="text-edu-accentDark">Arena AI</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Platform ini dirancang khusus untuk memajukan kualitas pendidikan di Indonesia melalui penggabungan teknologi AI generasi terbaru dan elemen game RPG yang interaktif dan menyenangkan.
        </p>

        <div className="pt-2 flex justify-center">
          <Link href="/battle">
            <Button size="lg" variant="gold" className="font-black px-8">
              <Swords className="h-5 w-5 mr-2" />
              Mulai Petualangan Sekarang!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
