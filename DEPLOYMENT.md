# 🚀 PANDUAN DEPLOYMENT EDUQUEST RPG (BAHASA INDONESIA)

Panduan lengkap ini menjelaskan langkah demi langkah cara men-deploy **Eduquest RPG** ke lingkungan produksi di platform **Vercel** dengan konfigurasi zero-config, penyimpanan Upstash Redis, dan Google Gemini AI.

---

## 📋 Daftar Isi
1. [Prasyarat Deployment](#1-prasyarat-deployment)
2. [Langkah 1: Mendapatkan Google Gemini API Key Gratis](#langkah-1-mendapatkan-google-gemini-api-key-gratis)
3. [Langkah 2: Menyiapkan NextAuth Secret Key](#langkah-2-menyiapkan-nextauth-secret-key)
4. [Langkah 3: (Opsional) Menyiapkan Upstash Redis](#langkah-3-opsional-menyiapkan-upstash-redis)
5. [Langkah 4: Deploy ke Vercel via Dashboard](#langkah-4-deploy-ke-vercel-via-dashboard)
6. [Langkah 5: Deploy ke Vercel via Vercel CLI](#langkah-5-deploy-ke-vercel-via-vercel-cli)
7. [Langkah 6: Verifikasi & Pengujian Pasca-Deploy](#langkah-6-verifikasi--pengujian-pasca-deploy)
8. [Pemeliharaan & Troubleshooting Produksi](#pemeliharaan--troubleshooting-produksi)

---

## 1. Prasyarat Deployment

Sebelum memulai proses deploy, pastikan Anda telah memiliki:
- Akun GitHub / GitLab / Bitbucket tempat repositori Eduquest di-host.
- Akun gratis di [Vercel](https://vercel.com).
- Akun Google (untuk mendapatkan API Key Gemini gratis di Google AI Studio).

---

## Langkah 1: Mendapatkan Google Gemini API Key Gratis

Eduquest memakai model Flash `gemini-3.7-flash` untuk membuat soal SMP dinamis dan tips belajar. Jika model utama belum tersedia untuk API key-mu, sistem mencoba `gemini-3.6-flash`, `gemini-3.5-flash`, `gemini-3.1-flash-lite`, lalu `gemini-2.5-flash`. Daftar ini mengikuti katalog model Gemini yang sedang didokumentasikan Google; kamu juga bisa mengatur `GEMINI_MODEL` sendiri.

1. Buka situs [Google AI Studio](https://aistudio.google.com/apikey).
2. Masuk menggunakan akun Google Anda.
3. Klik tombol **"Get API key"** / **"Create API key"**.
4. Pilih atau buat proyek Google Cloud baru. Tidak perlu upgrade ke Pro / billing.
5. Salin API key yang dihasilkan. Key baru biasanya diawali `AQ.` (auth key). Key lama `AIza...` masih bisa dipakai jika masih aktif.
6. Simpan kunci ini untuk dimasukkan ke dalam environment variable `GEMINI_API_KEY`.

---

## Langkah 2: Menyiapkan NextAuth Secret Key

NextAuth memerlukan kunci acak 32 karakter untuk mengenkripsi token sesi JWT pengguna secara aman.

Jalankan perintah berikut di terminal komputer Anda:
```bash
openssl rand -base64 32
```
Salin string acak yang dihasilkan, misalnya:
`wF7u6k98X4Jk1vV+0n2b4k5L6m7N8p9Q0r1S2t3U4v8=`

Gunakan nilai ini untuk variabel `NEXTAUTH_SECRET`.

---

## Langkah 3: (Opsional) Menyiapkan Upstash Redis

Eduquest dapat berjalan sepenuhnya secara offline menggunakan **Dexie.js IndexedDB** di browser siswa. Namun, untuk mengaktifkan sinkronisasi cloud antarperangkat:

1. Buka [Vercel Marketplace Storage](https://vercel.com/marketplace?category=storage) atau [Upstash Console](https://console.upstash.com/).
2. Buat database Redis dan pilih region terdekat.
3. Tambahkan variabel berikut ke project Vercel:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Integrasi Upstash di Vercel juga bisa menyediakan nama env lama `KV_REST_API_URL` dan `KV_REST_API_TOKEN`; adapter Eduquest tetap mendukung keduanya.

---

## Langkah 4: Deploy ke Vercel via Dashboard

Metode termudah dan direkomendasikan adalah melalui antarmuka web Vercel:

1. Masuk ke [Dashboard Vercel](https://vercel.com).
2. Klik tombol **"Add New..."** di sudut kanan atas > pilih **"Project"**.
3. Cari dan pilih repositori `Eduquest` dari daftar akun GitHub Anda, lalu klik **"Import"**.
4. Di halaman konfigurasi proyek:
   - **Framework Preset**: Pilih `Next.js` (otomatis terdeteksi).
   - **Root Directory**: `./` (default).
   - **Build Command**: `next build` (default).
   - **Output Directory**: `.next` (default).
   - **Install Command**: `npm install` (default).
5. Buka bagian **"Environment Variables"** dan tambahkan variabel berikut:

| Key | Value |
|---|---|
| `NEXTAUTH_URL` | `https://nama-aplikasi-anda.vercel.app` |
| `NEXTAUTH_SECRET` | *(String acak hasil openssl di Langkah 2)* |
| `GEMINI_API_KEY` | *(API key dari Google AI Studio di Langkah 1)* |

*(Jika memakai sinkronisasi cloud, hubungkan database Upstash Redis yang dibuat di Langkah 3 dan tambahkan env Redis-nya.)*

6. Klik tombol **"Deploy"**.
7. Tunggu proses kompilasi selama kurang lebih 40-60 detik.
8. Selamat! Aplikasi Eduquest RPG Anda kini aktif dan dapat diakses publik dengan protokol HTTPS otomatis.

---

## Langkah 5: Deploy ke Vercel via Vercel CLI

Bagi pengembang yang menyukai terminal:

1. Instal Vercel CLI secara global:
```bash
npm install -g vercel
```

2. Masuk ke akun Vercel Anda:
```bash
vercel login
```

3. Jalankan perintah deploy di dalam folder repositori:
```bash
vercel --prod
```

4. Masukkan konfigurasi environment variable melalui CLI:
```bash
vercel env add NEXTAUTH_SECRET production
vercel env add GEMINI_API_KEY production
```

---

## Langkah 6: Verifikasi & Pengujian Pasca-Deploy

Setelah deployment selesai, lakukan pemeriksaan berikut pada URL produksi:

1. **Akses Beranda**: Pastikan tampilan beranda terbuka dengan baik dan tema gelap/terang dapat beralih mulus.
2. **Mode Tamu**: Buka `/login`, klik *"Coba Langsung (Mode Tamu)"*, masukkan nama pahlawan, lalu mulai bermain.
3. **Pertempuran Soal**: Buka `/battle`, pilih mata pelajaran Matematika Kelas 7, lalu jawab pertanyaan untuk memastikan kalkulasi serangan dan EXP berjalan lancar.
4. **Efek Audio**: Pastikan efek suara Web Audio berbunyi saat memilih jawaban dan memenangkan ronde.
5. **Tas & Toko**: Kunjungi `/shop`, beli *Ramuan Pemulih HP*, lalu periksa di `/inventory` apakah item tersimpan dalam 20 slot tas.
6. **Lighthouse Audit**: Jalankan Google Chrome DevTools > Lighthouse, pastikan skor performa dan aksesibilitas berada di atas 90.

---

## 🔧 Pemeliharaan & Troubleshooting Produksi

### 1. Masalah: Error CORS pada Gemini API
**Penyebab**: Memanggil Gemini API langsung dari sisi browser client.  
**Solusi**: Eduquest telah menangani ini dengan memanggil Gemini melalui Server Route Handler di `/api/ai/generate-question` sehingga API Key aman dan terhindar dari pemblokiran CORS.

### 2. Masalah: Error Redirect pada NextAuth
**Penyebab**: Nilai `NEXTAUTH_URL` di Environment Variables tidak cocok dengan domain produksi.  
**Solusi**: Buka Vercel Dashboard > Project Settings > Environment Variables > perbarui `NEXTAUTH_URL` menjadi URL domain resmi Anda (misal: `https://eduquest.vercel.app`).

---

**Dibuat oleh edinst & Arena AI Assistant untuk Pendidikan Indonesia.**
