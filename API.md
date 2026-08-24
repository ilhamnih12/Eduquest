# 📖 DOKUMENTASI API EDUQUEST RPG (BAHASA INDONESIA)

Dokumentasi ini menjelaskan secara komprehensif seluruh endpoint REST API yang tersedia pada aplikasi **Eduquest RPG**.

---

## 🧭 Ringkasan Endpoint

| Method | Endpoint | Keterangan | Otorisasi |
|---|---|---|---|
| `POST` | `/api/auth/register` | Mendaftarkan akun siswa baru dengan starter kit | Publik |
| `POST` | `/api/auth/[...nextauth]` | Endpoint otentikasi NextAuth (Login & Sesi) | Publik |
| `POST` | `/api/ai/generate-question` | Menghasilkan soal SMP via Gemini AI / Fallback | Publik / Internal |
| `POST` | `/api/ai/study-tips` | Menganalisis statistik belajar & rekomendasi AI | Publik / Internal |
| `POST` | `/api/sync` | Sinkronisasi data game lokal ke Redis/Vercel KV | Publik / User |

---

## 1. Pendaftaran Akun Siswa
Mendaftarkan akun pahlawan baru ke dalam sistem dan memberikan paket perlengkapan pemula.

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

### Request Body
```json
{
  "username": "KesatriaBudi",
  "email": "budi@smp.sch.id",
  "password": "kataSandiRahasia123"
}
```

### Response Berhasil (201 Created)
```json
{
  "message": "Pendaftaran berhasil! Selamat datang di Eduquest RPG.",
  "user": {
    "id": "usr-1718000000-abc12",
    "email": "budi@smp.sch.id",
    "username": "KesatriaBudi"
  }
}
```

### Response Gagal (409 Conflict)
```json
{
  "message": "Alamat email sudah terdaftar. Silakan gunakan email lain atau masuk."
}
```

---

## 2. Generasi Soal Kurikulum SMP (Gemini AI)
Menghasilkan 1 butir soal pilihan ganda baru sesuai mata pelajaran, tingkat kelas, dan tingkat kesulitan yang diminta dengan dukungan Google Gemini AI dan fallback otomatis ke Bank Soal lokal.

- **URL**: `/api/ai/generate-question`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

### Request Body
```json
{
  "subject": "matematika",
  "grade": 8,
  "difficulty": "medium",
  "topic": "Teorema Pythagoras",
  "excludeIds": ["mat-001", "mat-002"]
}
```

| Parameter | Tipe Data | Deskripsi |
|---|---|---|
| `subject` | `string` (Wajib) | `'matematika'`, `'ipa'`, `'ips'`, `'indonesia'`, `'inggris'` |
| `grade` | `number` (Opsional) | `7`, `8`, `9` (Default: `7`) |
| `difficulty` | `string` (Opsional) | `'easy'`, `'medium'`, `'hard'` (Default: `'medium'`) |
| `topic` | `string` (Opsional) | Topik materi spesifik |
| `excludeIds` | `string[]` (Opsional) | Daftar ID soal yang sudah pernah dijawab |

### Response Berhasil (200 OK)
```json
{
  "id": "ai-1718000000-xyz99",
  "subject": "matematika",
  "grade": 8,
  "topic": "Teorema Pythagoras",
  "difficulty": "medium",
  "question": "Sebuah segitiga siku-siku memiliki panjang alas 6 cm dan tinggi 8 cm. Berapakah panjang sisi miring (hipotenusa) segitiga tersebut?",
  "options": [
    "9 cm",
    "10 cm",
    "12 cm",
    "14 cm"
  ],
  "correctAnswer": 1,
  "explanation": "Berdasarkan Teorema Pythagoras: c² = a² + b² => c² = 6² + 8² = 36 + 64 = 100. Maka c = √100 = 10 cm.",
  "hint": "Gunakan rumus kuadrat hipotenusa c² = a² + b².",
  "source": "gemini"
}
```

---

## 3. Konsultasi AI Guru Pembimbing (Study Tips)
Menganalisis performa akademik siswa pada mata pelajaran tertentu dan menghasilkan saran taktis peningkatan pemahaman materi.

- **URL**: `/api/ai/study-tips`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

### Request Body
```json
{
  "subject": "ipa",
  "accuracy": 65,
  "totalQuestions": 20
}
```

### Response Berhasil (200 OK)
```json
{
  "subject": "ipa",
  "title": "Progres Mantap pada Mata Pelajaran IPA! ⚔️",
  "summary": "Akurasi kamu 65% dari 20 soal. Kamu sudah menguasai konsep dasar hukum gerak dan organisasi sel.",
  "tips": [
    "Baca kalimat soal sampai tuntas sebelum terburu-buru memilih opsi.",
    "Perhatikan satuan fisika (kg, meter, detik) pada soal perhitungan gaya.",
    "Gunakan Item Gulungan Petunjuk di Shop jika menghadapi monster tingkat tinggi."
  ],
  "recommendedTopics": [
    "Hukum II Newton & Gaya Gesek",
    "Struktur Jaringan Tumbuhan"
  ],
  "motivationalQuote": "Setiap kesalahan dalam belajar adalah batu loncatan menuju pemahaman yang sejati.",
  "source": "gemini"
}
```

---

## 4. Sinkronisasi Data Game Cloud
Menyimpan dan menyelaraskan state karakter, tas inventori, dan rekor prestasi antara browser lokal (IndexedDB) dan server basis data (Vercel KV / Redis).

- **URL**: `/api/sync`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

### Request Body
```json
{
  "userId": "usr-1718000000-abc12",
  "character": {
    "name": "KesatriaBudi",
    "level": 4,
    "exp": 120,
    "maxExp": 220,
    "hp": 140,
    "maxHp": 140,
    "baseAttack": 25,
    "baseDefense": 15,
    "gold": 350,
    "unassignedPoints": 2,
    "attributes": {
      "strength": 8,
      "vitality": 7,
      "intelligence": 6,
      "agility": 5
    },
    "equippedWeaponId": "weapon_pen_blade",
    "equippedArmorId": "armor_school_vest",
    "activeBuffs": []
  },
  "inventory": [
    { "itemId": "potion_hp_small", "quantity": 4 },
    { "itemId": "weapon_pen_blade", "quantity": 1, "equipped": true }
  ],
  "statistics": {
    "totalBattles": 12,
    "victories": 10,
    "defeats": 2,
    "questionsAnswered": 34,
    "correctAnswers": 28,
    "bestStreak": 6,
    "currentStreak": 0,
    "goldEarnedTotal": 450,
    "subjectPerformance": {
      "matematika": { "correct": 8, "total": 10, "streak": 2, "bestStreak": 4 },
      "ipa": { "correct": 6, "total": 8, "streak": 0, "bestStreak": 3 },
      "ips": { "correct": 5, "total": 6, "streak": 1, "bestStreak": 3 },
      "indonesia": { "correct": 5, "total": 5, "streak": 5, "bestStreak": 5 },
      "inggris": { "correct": 4, "total": 5, "streak": 0, "bestStreak": 2 }
    }
  },
  "achievements": [],
  "lastSaved": "2026-08-24T12:00:00.000Z"
}
```

### Response Berhasil (200 OK)
```json
{
  "message": "Sinkronisasi berhasil.",
  "syncedState": {
    "userId": "usr-1718000000-abc12",
    "lastSaved": "2026-08-24T12:00:01.234Z"
  }
}
```

---

**Dokumentasi Resmi Eduquest RPG oleh edinst & Arena AI.**
