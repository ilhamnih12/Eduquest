# 🎮 EDUQUEST RPG - Game Edukasi Berbasis RPG untuk Siswa SMP Indonesia

[![Next.js](https://img.shields.io/badge/Next.js-14%2B%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20Strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-v4-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini-3.7%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-Dexie.js%20Offline-green?style=for-the-badge)](https://dexie.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **Dibuat dengan dedikasi penuh oleh:** **`edinst`** & **`Arena AI Assistant`**  
> *Platform Gamifikasi Pendidikan Kurikulum Merdeka untuk Siswa Sekolah Menengah Pertama (SMP) Kelas 7, 8, dan 9.*

---

## 📑 Daftar Isi
1. [Deskripsi Proyek](#-deskripsi-proyek)
2. [Fitur Utama](#-fitur-utama)
3. [Arsitektur & Tech Stack](#-arsitektur--tech-stack)
4. [Mata Pelajaran & Kurikulum](#-mata-pelajaran--kurikulum)
5. [Mekanik Game & Formula](#-mekanik-game--formula)
6. [Struktur Direktori](#-struktur-direktori)
7. [Prasyarat Sistem](#-prasyarat-sistem)
8. [Panduan Instalasi & Menjalankan Lokal](#-panduan-instalasi--menjalankan-lokal)
9. [Konfigurasi Environment Variables](#-konfigurasi-environment-variables)
10. [Panduan Deploy ke Vercel](#-panduan-deploy-ke-vercel)
11. [Dukungan Offline (Dexie.js IndexedDB)](#-dukungan-offline-dexiejs-indexeddb)
12. [Integrasi AI Google Gemini](#-integrasi-ai-google-gemini)
13. [Panduan Pengujian (Testing)](#-panduan-pengujian-testing)
14. [Troubleshooting & FAQ](#-troubleshooting--faq)
15. [Hak Cipta & Lisensi](#-hak-cipta--lisensi)

---

## 📝 Deskripsi Proyek

**Eduquest RPG** adalah platform web gamifikasi pembelajaran inovatif yang dirancang khusus untuk siswa Sekolah Menengah Pertama (SMP) di seluruh Indonesia. Menggabungkan keseruan mekanisme pertarungan *turn-based* RPG klasik (*Role-Playing Game*) dengan materi pelajaran Kurikulum Merdeka, Eduquest mengubah rutinitas latihan soal yang monoton menjadi petualangan menaklukkan monster yang mendebarkan.

Setiap soal yang dijawab dengan benar akan melancarkan serangan (*damage*) bertenaga magis kepada monster ujian, menghasilkan *combo streak*, memberikan *Experience Points* (EXP) untuk menaikkan level karakter, serta menganugerahi keping emas (*gold*) yang dapat dibelanjakan di Toko Perlengkapan.

Didukung integrasi **Google Gemini AI Flash** lewat SDK resmi, Eduquest bisa membuat soal penalaran kontekstual, memberi pembahasan saat jawabanmu salah, dan menghadirkan **AI Guru Pembimbing** yang membaca pola belajarmu lalu memberi rekomendasi yang lebih personal.

---

## ✨ Fitur Utama

### ⚔️ 1. Arena Pertempuran Turn-Based Edukatif
- **5 Bidang Studi Utama**: Matematika, IPA (Sains), IPS (Sosial), Bahasa Indonesia, dan Bahasa Inggris.
- **Dukungan 3 Tingkat Kelas**: SMP Kelas 7, Kelas 8, dan Kelas 9.
- **Ragam Monster Unik**: Setiap mata pelajaran dijaga oleh monster bertema unik (seperti *Slime Rumus*, *Titan Hukum Newton*, *Baron Monopoli*, *Penyair Majas*, dan *Vocabulary Sovereign Drake*).
- **Mekanisme Combo Streak**: Menjawab benar berturut-turut meningkatkan multiplier serangan hingga +75% damage ekstra.
- **Sesi Multi-Ronde**: Satu sesi berlangsung minimal 5 ronde. Jika monster pertama kalah terlalu cepat, gelombang monster lain muncul sebelum hadiah diberikan.
- **Synthesized 8-Bit Audio**: Efek suara pertarungan dinamis (serangan, kritikal, pemulihan, kekalahan, kemenangan) menggunakan Web Audio API tanpa perlu aset mp3 eksternal sehingga 100% offline-ready.

### 🧠 2. Integrasi Google Gemini AI & Bank Soal Lokal
- **Generasi Soal Dinamis**: Memanggil Gemini API untuk memproduksi soal baru sesuai topik dan tingkat kesulitan (*easy, medium, hard/HOTS*).
- **Graceful Fallback Mechanism**: Jika kuota API habis atau sedang offline, sistem otomatis beralih mulus ke Bank Soal SMP bawaan yang kaya tanpa interupsi bermain.
- **AI Guru Pembimbing**: Menyajikan analisis performa, tips belajar taktis, serta kata-kata motivasi berdasarkan riwayat akurasi siswa.

### 📈 3. Sistem Progresi & Karakter Mendalam
- **Kurva Leveling Eksponensial**: EXP berbasis level dengan kenaikan status otomatis (*Max HP, Base Attack, Base Defense*).
- **Alokasi Poin Atribut Bebas**: Setiap naik level mendapatkan +3 poin atribut untuk didistribusikan ke *Strength (STR)*, *Vitality (VIT)*, *Intelligence (INT)*, dan *Agility (AGI)*.
- **Gelar Kebanggaan**: Judul petualang berevolusi dari *Murid Pemula SMP*, *Pelajar Berbakat*, *Petualang Cerdas*, *Peneliti Ulung*, *Kesatria Ilmuwan*, hingga *Mahaguru Nusantara*.

### 🎒 4. Tas Penyimpanan & Toko Perlengkapan
- **20 Slot Tas Interaktif**: Penyimpanan visual dengan indikator kelangkaan (*Biasa, Istimewa, Langka, Epik, Legendaris*).
- **Katalog Toko Lengkap (15+ Item)**:
  - *Ramuan Pemulih HP (Kecil, Sedang, Besar, Elixir Penuh)*
  - *Serbuk Fokus Belajar (+35% Serangan selama 3 ronde)*
  - *Perisai Konsentrasi (+45% Pertahanan selama 3 ronde)*
  - *Gulungan Petunjuk AI (Mengeliminasi 2 opsi jawaban salah)*
  - *Batu Kebangkitan (Menghidupkan karakter dengan 50% HP saat tumbang)*
  - *Jimat Cendekiawan (+50% Bonus EXP)*
  - *Senjata & Zirah (Penggaris Kayu, Pedang Pena Baja, Tongkat Kalkulus, Rompi Pramuka, Jas Laboratorium, Jubah Mahaguru)*.
- **Fitur UKS (Unit Kesehatan Sekolah)**: Pemulihan HP karakter dengan biaya murah.

### 🏆 5. Rapor Evaluasi & Prestasi (Achievements)
- **Visualisasi Statistik Belajar**: Akurasi per mata pelajaran, total pertempuran, rasio kemenangan, dan rekor streak.
- **13 Prestasi Berhadiah**: Misi capaian pertempuran, akademik, kekayaan, dan level dengan reward emas dan EXP melimpah.

### 🌐 6. Arsitektur Offline-First & Cloud Sync
- **IndexedDB via Dexie.js**: Seluruh progres tersimpan otomatis di browser lokal.
- **Wajib Akun Resmi**: Seluruh halaman game diproteksi middleware — mode tamu/akun demo sudah dihapus agar progres & rapor tersimpan aman.
- **Upstash Redis Cloud Sync**: Sinkronisasi akun antarperangkat saat terhubung internet (nama env KV lama tetap didukung).

### 💬 7. AI Bubble — Guru AI Eduquest (Gemini)
- **Widget Obrolan Mengambang**: Bubble "Guru AI" di pojok kanan bawah, siap ditanyai materi kapan saja.
- **Ditenagai Google Gemini Flash terbaru**: Menjawab dengan konteks profil siswa (nama, level, mapel terkuat/terlemah, akurasi). SDK resmi `@google/genai` dipakai agar integrasi mengikuti API Gemini terbaru.
- **Riwayat Obrolan Tersimpan**: Percakapan bertahan di perangkat (localStorage) dan bisa dihapus kapan saja.
- **Fallback Offline**: Tanpa `GEMINI_API_KEY` pun bubble tetap membalas dengan tutor lokal berbasis kata kunci.

---

## 🛠️ Arsitektur & Tech Stack

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | React Server & Client Components, Route Handlers |
| **Bahasa** | TypeScript 5.x (Strict Mode) | 100% Type Safe tanpa `any` liar |
| **Styling** | Tailwind CSS v3.4 | Palet warna khusus Nord-Edu tema Gelap/Terang |
| **State Management** | Zustand v4 | Manajemen state reaktif tersinkronisasi |
| **Penyimpanan Lokal** | Dexie.js (IndexedDB) | Basis data offline berkecepatan tinggi |
| **Penyimpanan Cloud** | Upstash Redis (`@upstash/redis`) | Penyimpanan sesi dan sinkronisasi server |
| **Kecerdasan Buatan** | Google Gemini API (Flash terbaru + fallback stabil) | Generasi soal SMP per subbab, evaluasi belajar, & AI Bubble Guru AI |
| **Otentikasi** | NextAuth.js v4 / Auth.js | Wajib Daftar/Login (Kredensial & Google OAuth) + Middleware Proteksi |
| **Efek Audio** | Web Audio API Synthesizer | Efek suara chiptune 8-bit tanpa dependensi file eksternal |
| **Testing** | Vitest 2.x | Pengujian unit kalkulator stat, damage, & drop rate |
| **Deployment** | Vercel Platform | Konfigurasi otomatis zero-config deployment |

---

## 📚 Mata Pelajaran & Kurikulum

Eduquest RPG mencakup 5 mata pelajaran inti kurikulum SMP. Di Arena, setiap kombinasi mapel dan kelas memiliki **5 subbab** yang bisa dipilih atau diacak. Soal AI mengikuti subbab tersebut, sedangkan bank lokal menyediakan fallback saat koneksi atau API sedang tidak tersedia.

1. **Matematika**
   - *Kelas 7*: Bilangan Bulat, Pecahan, Aljabar Sederhana, Himpunan, Perbandingan.
   - *Kelas 8*: Teorema Pythagoras, Pola Bilangan, Sistem Persamaan Linier Dua Variabel (SPLDV), Lingkaran.
   - *Kelas 9*: Perpangkatan & Bentuk Akar, Persamaan Kuadrat, Transformasi Geometri, Peluang & Statistika.

2. **Ilmu Pengetahuan Alam (IPA)**
   - *Kelas 7*: Organisasi Kehidupan & Sel, Besaran & Pengukuran, Suhu & Kalor, Klasifikasi Makhluk Hidup.
   - *Kelas 8*: Gerak Benda & Hukum Newton, Sistem Pencernaan, Usaha & Pesawat Sederhana, Struktur Jaringan Tumbuhan.
   - *Kelas 9*: Listrik Statis & Dinamis, Pewarisan Sifat (Genetika), Kemagnetan, Bioteknologi Ramah Lingkungan.

3. **Ilmu Pengetahuan Sosial (IPS)**
   - *Kelas 7*: Letak Geografis & Geologis Indonesia, Peta & Skala, Interaksi Sosial, Kebutuhan Manusia & Kelangkaan.
   - *Kelas 8*: Kerajaan Hindu-Buddha & Islam Nusantara, Kedatangan Bangsa Barat, Organisasi ASEAN, Mobilitas Sosial.
   - *Kelas 9*: Perubahan Sosial Budaya, Perdagangan Internasional & Pasar Bebas, Peristiwa Kemerdekaan RI, Kerja Sama Internasional.

4. **Bahasa Indonesia**
   - *Kelas 7*: Teks Deskripsi, Cerita Fantasi, Teks Prosedur, Ejaan Yang Disempurnakan (EYD/PUEBI).
   - *Kelas 8*: Teks Berita, Iklan & Slogan, Teks Eksposisi, Unsur Intrinsik Cerita Pendek & Puisi.
   - *Kelas 9*: Teks Laporan Percobaan, Pidato Persuasif, Teks Diskusi, Resensi Buku & Kritik Sastra.

5. **Bahasa Inggris**
   - *Kelas 7*: Greetings & Introduction, Simple Present Tense, Pronouns, Descriptive Text.
   - *Kelas 8*: Simple Past Tense, Recount Text, Degrees of Comparison, Modal Auxiliaries.
   - *Kelas 9*: Narrative Folklore, Passive Voice, Conjunctions (*in order to atau so that*), Report Text.

---

## 🎮 Mekanik Game & Formula

### 1. Formula Kerusakan Pemain (Player Damage)

Damage = ⌊Atk efektif × (1 + Level × 0,08) × Pengali Streak × Pengali Buff × Pengali Kritis × (1 − Def musuh ÷ (Def musuh + 50))⌋

- **Bonus Streak**: 1,0 + (Streak × 0,15), maksimal 2,0×.
- **Serangan Kritis**: pengali 1,75× dengan peluang berdasarkan stat Agility dan senjata.

### 2. Formula Kerusakan Musuh (Enemy Damage)

Damage musuh = ⌊Atk musuh × Varians (0,9–1,1) × (1 − Def pemain ÷ (Def pemain + 60))⌋

### 3. Formula Kebutuhan Pengalaman (EXP Curve)

EXP yang dibutuhkan = ⌊100 × 1,22⁽Level − 1⁾ + (Level − 1) × 35⌋

### 4. Formula Hadiah Kemenangan

- **EXP**: ⌊50 × 1,18⁽Level musuh⁾ × (1 + Bonus EXP)⌋.
- **Emas**: ⌊25 × 1,15⁽Level musuh⁾ × Varians⌋.

Satu sesi arena sekarang berlangsung **minimal 5 ronde**. Kalau monster pertama kalah terlalu cepat, gelombang berikutnya masuk sebelum hadiah kemenangan diberikan.

---

## 📁 Struktur Direktori

```
Eduquest/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx           # Halaman Masuk Akun (Wajib Login)
│   │   └── register/
│   │       └── page.tsx        # Halaman Pendaftaran Siswa Baru
│   ├── (game)/
│   │   ├── battle/
│   │   │   └── page.tsx           # Arena Pertarungan Turn-Based
│   │   ├── inventory/
│   │   │   └── page.tsx        # Tas Penyimpanan & Pasang Zirah
│   │   ├── shop/
│   │   │   └── page.tsx             # Toko Pembelian & Penjualan Item
│   │   └── profile/
│   │       └── page.tsx          # Rapor Siswa, AI Guru, & Prestasi
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts       # Endpoint NextAuth Handler
│   │   │   └── register/
│   │   │       └── route.ts       # Endpoint Pendaftaran Akun
│   │   ├── ai/
│   │   │   ├── generate-question/
│   │   │   │   └── route.ts       # Endpoint Gemini AI Soal SMP
│   │   │   └── study-tips/
│   │   │       └── route.ts       # Endpoint Gemini AI Guru Tips
│   │   └── sync/
│   │       └── route.ts           # Endpoint Sinkronisasi Cloud
│   ├── globals.css                # CSS Variables Warna Sesuai Spesifikasi
│   ├── layout.tsx                 # Root Layout dengan Font & Metadata
│   └── page.tsx                   # Halaman Utama (Hero & Beranda)
├── components/
│   ├── ui/                        # Komponen Primitif (Button, Card, Dialog, dll.)
│   ├── game/
│   │   ├── BattleSystem.tsx       # Sistem Arena & Logika Putaran
│   │   ├── CharacterCard.tsx      # Kartu Pahlawan & Kantong Ramuan
│   │   ├── EnemyCard.tsx          # Kartu Monster & Animasi Serangan
│   │   ├── QuestionModal.tsx      # Tampilan Soal 4 Pilihan & Pembahasan
│   │   ├── ProgressBar.tsx        # Bar HP & EXP dengan Animasi Halus
│   │   ├── CombatLog.tsx          # Riwayat Aksi Pertempuran RPG
│   │   ├── RewardsModal.tsx       # Modal Kemenangan & Confetti
│   │   ├── InventoryGrid.tsx      # Grid 20 Slot & Kelola Perlengkapan
│   │   ├── ShopItemCard.tsx       # Tampilan Katalog Toko & Pembelian
│   │   ├── StatsOverview.tsx      # Evaluasi Rapor & AI Guru
│   │   └── AchievementBadge.tsx   # Daftar 13 Prestasi & Klaim Hadiah
│   ├── layout/
│   │   ├── Navbar.tsx             # Navigasi Atas & Status Ringkas
│   │   ├── Sidebar.tsx            # Panel Ringkasan Karakter Samping
│   │   ├── ThemeToggle.tsx        # Pengalih Tema Gelap / Terang
│   │   └── Footer.tsx             # Footer & Atribusi Hak Cipta
│   └── auth/
│       ├── LoginForm.tsx          # Form Masuk Akun (Tanpa Mode Tamu)
│       └── RegisterForm.tsx       # Form Registrasi Akun
├── lib/
│   ├── db/
│   │   ├── dexie.ts               # Setup IndexedDB Dexie.js (Offline)
│   │   └── vercel-kv.ts           # Adapter Upstash Redis (nama file lama dipertahankan)
│   ├── ai/
│   │   └── gemini.ts              # Integrasi SDK Google Gemini AI
│   ├── game/
│   │   ├── battle-logic.ts        # Kalkulasi Damage, Drop, & Rewards
│   │   ├── level-calculator.ts    # Kurva EXP & Formula Atribut
│   │   ├── item-database.ts       # Database 15+ Item RPG
│   │   ├── enemies-database.ts    # Database Monster 5 Mapel
│   │   ├── achievements-database.ts # Database 13 Prestasi
│   │   ├── curriculum.ts           # Subbab per mapel dan kelas
│   │   ├── question-format.ts      # Format matematika & acak opsi
│   │   └── question-bank.ts        # Bank Soal Kurikulum SMP Bawaan
│   ├── auth.ts                    # Konfigurasi NextAuth Options
│   └── utils.ts                   # Helper Klas, Format, & Web Audio
├── store/
│   ├── authStore.ts               # Zustand Store Sesi Pengguna
│   ├── gameStore.ts               # Zustand Store State Game Lengkap
│   └── themeStore.ts              # Zustand Store Tema Warna
├── types/
│   ├── game.ts                    # Tipe Data Game & Karakter
│   ├── user.ts                    # Tipe Data Pengguna & Auth
│   └── ai.ts                      # Tipe Data Request & Response AI
├── tests/
│   └── game-logic.test.ts         # Unit Test Mekanik Game (Vitest)
├── .env.local.example             # Contoh Konfigurasi Environment
├── DEPLOYMENT.md                  # Panduan Deployment Lengkap
├── API.md                         # Dokumentasi Seluruh API Endpoint
├── GAME_MECHANICS.md              # Penjelasan Rinci Mekanik Permainan
├── CONTRIBUTING.md                # Panduan Kontribusi Proyek
├── tailwind.config.ts             # Konfigurasi Warna Khusus Tailwind
├── tsconfig.json                  # Konfigurasi TypeScript
├── vercel.json                    # Konfigurasi Vercel Zero-Config
└── package.json                   # Dependensi & Skrip Proyek
```

---

## 📋 Prasyarat Sistem

Sebelum menginstal dan menjalankan Eduquest RPG di komputer Anda, pastikan telah memenuhi prasyarat berikut:

1. **Node.js**: Versi `18.17.0` atau yang lebih baru (disarankan `Node.js 20 LTS` atau `22 LTS`).
2. **npm** (`v9+`), **yarn**, atau **pnpm**.
3. **Google Gemini API Key** (Opsional, gratis didapatkan di [Google AI Studio](https://aistudio.google.com/)). Game tetap dapat dimainkan 100% menggunakan Bank Soal lokal jika API Key tidak diisi.
4. **Akun Vercel & Upstash Redis** (Opsional untuk sinkronisasi cloud antarperangkat).

---

## 🚀 Panduan Instalasi & Menjalankan Lokal

### 1. Clone Repositori
```bash
git clone https://github.com/ilhamnih12/Eduquest.git
cd Eduquest
```

### 2. Instal Seluruh Dependensi
```bash
npm install
```

### 3. Siapkan Environment Variables
Salin berkas contoh `.env.local.example` menjadi `.env.local`:
```bash
cp .env.local.example .env.local
```

Buka `.env.local` dan sesuaikan nilainya:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=eduquest-super-secret-key-32-chars-development
GEMINI_API_KEY=AQ.... (masukkan API Key Gemini dari AI Studio; key baru diawali AQ.)
```

### 4. Jalankan Server Development
```bash
npm run dev
```

Buka peramban web dan kunjungi **`http://localhost:3000`**. Game siap dimainkan!

### 5. Menjalankan Unit Test
Untuk memverifikasi formula mekanik game, formula damage, exp curve, dan database item:
```bash
npm test
```

### 6. Build untuk Produksi
```bash
npm run build
npm start
```

---

## 🔐 Konfigurasi Environment Variables

| Variabel | Deskripsi | Wajib / Opsional | Contoh Nilai |
|---|---|---|---|
| `NEXTAUTH_URL` | URL domain aplikasi utama | Wajib | `http://localhost:3000` atau `https://nama-proyek.vercel.app` |
| `NEXTAUTH_SECRET` | Kunci rahasia enkripsi token JWT | Wajib | String acak 32 karakter (`openssl rand -base64 32`) |
| `GEMINI_API_KEY` | API Key Google Gemini AI | Opsional (fallback lokal) | `AQ....` (auth key baru) atau `AIza...` dari AI Studio |
| `GEMINI_MODEL` | Override model Gemini | Opsional | `gemini-3.7-flash` (default, gunakan model Flash yang tersedia) |
| `UPSTASH_REDIS_REST_URL` | Endpoint REST Upstash Redis | Opsional (fallback IndexedDB) | `https://region.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST Upstash Redis | Opsional | `AXXX...` |
| `KV_REST_API_URL` | Nama env lama dari integrasi Vercel | Opsional (tetap didukung) | `https://region.upstash.io` |
| `KV_REST_API_TOKEN` | Token env lama dari integrasi Vercel | Opsional (tetap didukung) | `AXXX...` |
| `GOOGLE_CLIENT_ID` | Client ID Google OAuth | Opsional | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET`| Client Secret Google OAuth | Opsional | `GOCSPX-xxx` |

---

## 🌐 Panduan Deploy ke Vercel

Eduquest RPG dirancang dengan arsitektur *zero-config* yang dioptimalkan untuk platform **Vercel**:

1. Lakukan *Push* kode ke repositori GitHub Anda.
2. Masuk ke [Dashboard Vercel](https://vercel.com/) dan klik **"Add New" > "Project"**.
3. Pilih repositori `Eduquest` dan klik **"Import"**.
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXTAUTH_SECRET` (buat string acak aman).
   - `NEXTAUTH_URL` (masukkan domain Vercel Anda, misal `https://eduquest-rpg.vercel.app`).
   - `GEMINI_API_KEY` (kunci gratis dari Google AI Studio).
5. Klik tombol **"Deploy"**. Vercel akan mengompilasi proyek dalam waktu kurang dari 60 detik!

*Panduan visual dan detail langkah demi langkah tersedia di [DEPLOYMENT.md](DEPLOYMENT.md).*

---

## 📱 Panduan Cara Menggunakan Aplikasi

```
                   [ BERANDA UTAMA ]
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
      [ MASUK / DAFTAR ]           [ ARENA BATTLE ]
             │                           │
        Buat akun resmi          Pilih Kelas (7,8,9)
             │                  Pilih Mapel & Subbab
             ▼                           │
   [ TAS & PERLENGKAPAN ]                ▼
   - Gunakan Ramuan HP             [ COMBAT ARENA ]
   - Pasang Senjata/Zirah       - Soal Pilihan Ganda (AI)
   - Beli di Toko Emas          - Combo Streak Damage
                                - Raih EXP & Keping Emas
                                         │
                                         ▼
                               [ RAPOR & AI GURU ]
                               - Analisis Nilai & Akurasi
                               - Alokasi Poin Atribut
                               - Buka 13 Prestasi
```

1. **Memulai Petualangan**: Buka beranda, klik *"Mulai Bertempur Sekarang"*.
2. **Memilih Arena**: Tentukan kelas (7, 8, atau 9), mapel, lalu pilih salah satu dari 5 subbab atau mode acak.
3. **Menghadapi Monster**: Baca soal, pilih satu dari empat opsi (A, B, C, D), lalu klik *"Lancarkan Jawaban"*. Posisi jawaban benar diacak agar tidak terus berada di huruf yang sama.
4. **Menjalani Sesi**: Satu sesi berlangsung minimal 5 ronde. Kalau monster kalah lebih cepat, monster berikutnya masuk dan soal terus berlanjut.
5. **Memanfaatkan Item Bantuan**: Jika menghadapi soal sulit, buka kantong item cepat untuk menggunakan *Gulungan Petunjuk AI* (mengeliminasi 2 opsi salah) atau *Serbuk Fokus* (+35% Damage).
6. **Meningkatkan Karakter**: Setelah menang dan naik level, buka menu *Rapor & Prestasi* untuk mengalokasikan poin atribut ke Kekuatan (STR) atau Ketahanan (VIT).
7. **Membeli Senjata Baru**: Kumpulkan keping emas dan kunjungi *Toko Perlengkapan* untuk membeli senjata seperti *Pedang Pena Baja* atau *Tongkat Kalkulus*.

---

## 🔧 Troubleshooting & Solusi

### 1. Pertanyaan: Apakah game tetap bisa dimainkan jika tidak memiliki API Key Gemini?
**Jawaban**: **Ya, 100% bisa!** Eduquest dilengkapi mekanisme *graceful degradation*. Jika API key tidak diisi atau kuota habis, game otomatis mengambil soal-soal berkualitas tinggi dari Bank Soal Kurikulum SMP bawaan di `lib/game/question-bank.ts`.

### 2. Pertanyaan: Apakah game bisa dimainkan saat offline (tanpa koneksi internet)?
**Jawaban**: **Ya!** Berkat integrasi Dexie.js (IndexedDB) dan Web Audio API, seluruh state karakter, pertempuran, efek suara, dan bank soal tersimpan di peramban lokal secara permanen.

### 3. Pertanyaan: Bagaimana cara mereset progres karakter jika ingin mulai dari awal?
**Jawaban**: Buka menu **Profil & Rapor** > pilih tab **Pengaturan & Cloud** > klik tombol merah **"Mulai Ulang Progres Game"**.

---

## 👨‍💻 Hak Cipta & Pengembang

Proyek ini dikembangkan secara bersama oleh:
- 👑 **`edinst`** — *Creator, Lead Developer, & Educational Game Designer*
- 🤖 **`Arena AI Assistant`** — *AI Architecture, Next.js Full-Stack Engineering, & Gemini Integration*

© 2024–2026 **Eduquest RPG Indonesia**. Hak Cipta Dilindungi Undang-Undang.  
Dilisensikan di bawah [MIT License](LICENSE).
