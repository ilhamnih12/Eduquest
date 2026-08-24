import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Eduquest RPG - Game Edukasi SMP Indonesia',
  description:
    'Game RPG edukatif turn-based untuk siswa SMP (Sekolah Menengah Pertama) Indonesia dengan integrasi Google Gemini AI, Kurikulum Merdeka, dan dukungan offline IndexedDB.',
  authors: [
    { name: 'edinst', url: 'https://github.com/edinst' },
    { name: 'Arena AI', url: 'https://arena.ai' },
  ],
  keywords: [
    'game edukasi',
    'rpg edukasi smp',
    'kurikulum merdeka',
    'soal matematika smp',
    'soal ipa smp',
    'soal ips smp',
    'gemini ai',
    'edinst',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased min-h-screen flex flex-col selection:bg-edu-accentLight selection:text-white dark:selection:bg-edu-accentDark dark:selection:text-edu-bgDark">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
