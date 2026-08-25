# ⚔️ BUKU PANDUAN MEKANIK GAME EDUQUEST RPG

Dokumen ini menjelaskan secara terperinci seluruh aturan permainan, sistem perhitungan numerik, rumus matematika, dan alur pertempuran yang diterapkan dalam **Eduquest RPG**.

---

## 🎯 1. Siklus Inti Permainan (Core Game Loop)

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ▼                                              │
[ PILIH MATA PELAJARAN ]                               │
   - Matematika / IPA / IPS / B. Indonesia / B. Inggris│
   - B. Jawa / Informatika / Musik / PJOK / PKN        │
        │                                              │
        ▼                                              │
[ MASUK ARENA PERTEMPURAN ]                            │
   - Monster muncul sesuai level & kelas               │
   - Soal Gemini / fallback lokal sesuai subbab        │
        │                                              │
        ▼                                              │
[ JAWAB SOAL PILIHAN GANDA (A, B, C, D) ]             │
        │                                              │
        ├─────────────────────────────┐                │
        ▼                             ▼                │
 ( JAWABAN BENAR )             ( JAWABAN SALAH )       │
  - Serang Monster              - Monster Serang Balik │
  - Combo Streak +1             - Combo Streak Reset   │
  - Multiplier Damage Naik      - Evaluasi Pembahasan  │
        │                             │                │
        ▼                             ▼                │
 [ CEK HP MONSTER <= 0 DAN RONDE MINIMAL? ] [ CEK HP KARAKTER <= 0 ? ]
        │                                      │
   ┌────┴──────────────┐                  ┌────┴──────────────┐
   │ Ya                │ Belum            │ Ya                │ Tidak
   ▼                   │                  ▼                   │
( KEMENANGAN / WIN )   │             ( KEKALAHAN / LOSS )      │
 - Raih EXP & Naik Level│              - HP Pulih ke 20%         │
 - Raih Keping Emas     │              - Evaluasi Materi         │
 - Roll Item Loot Drop  │                                        │
                       ▼                                        │
              ( GELOMBANG BERIKUTNYA )                          │
              - Monster baru muncul                             │
              - Lanjutkan soal sampai minimal 5 ronde            │
        │                              │             │
        └──────────────┬───────────────┘             │
                       │                             │
                       ▼                             │
            [ BELANJA & UPGRADE ]                    │
            - Pasang Senjata & Armor                 │
            - Beli Ramuan di Toko                    │
            - Alokasi Poin Atribut (STR, VIT, INT)   │
                       │                             │
                       └─────────────────────────────┘
```

Arena mendukung 10 mapel: Matematika, IPA, IPS, Bahasa Indonesia, Bahasa Inggris, Bahasa Jawa, Informatika, Seni Musik, PJOK, dan Pendidikan Pancasila (PKN). Setiap mapel memiliki 5 subbab untuk masing-masing kelas 7, 8, dan 9. Database musuh menyediakan minimal 3 musuh untuk setiap kombinasi mapel/kelas.

Bank fallback memuat **154 soal lokal**. Pertanyaan, opsi, petunjuk, dan pembahasan mempertahankan paragraf serta baris baru; teks juga dapat memakai label seperti `Konteks:`, `Data:`, dan `Pertanyaan:`. Soal Gemini diarahkan mengikuti struktur yang sama dengan gaya percakapan yang ramah pelajar.

---

## ⚔️ 2. Sistem Pertarungan & Formula Kerusakan

### A. Tindakan Ronde (Turn Actions)
Setiap ronde, pemain disajikan sebuah pertanyaan pilihan ganda 4 opsi. Satu sesi arena berlangsung **minimal 5 ronde**; kalau satu monster kalah sebelum itu, gelombang monster berikutnya langsung muncul. Hadiah baru diberikan setelah sesi selesai.
1. **Menjawab Benar**: Pemain melancarkan serangan (*attack action*). Nilai kerusakan dihitung berdasarkan Atribut Karakter, Senjata, Level, Multiplier Combo Streak, dan Peluang Serangan Kritis (*Critical Hit*).
2. **Menjawab Salah**: Monster melancarkan serangan balasan (*counter-attack*). Nilai kerusakan dikurangi oleh Pertahanan (*Defense*) dan armor pemain.
3. **Kabur dari Arena**: Tombol kabur menampilkan popup berisi roast ringan dari musuh. Pemain kemudian memilih untuk tetap bertarung atau mengonfirmasi keluar tanpa hadiah dari sesi tersebut.
4. **Penggunaan Item Bantuan**: Pemain dapat meminum ramuan atau memakai jimat pendukung sebelum menjawab soal:
   - *Ramuan Pemulih HP*: Memulihkan HP secara instan.
   - *Serbuk Fokus Belajar*: Memberikan buff +35% Serangan selama 3 ronde.
   - *Perisai Konsentrasi*: Memberikan buff +45% Pertahanan selama 3 ronde.
   - *Gulungan Petunjuk AI*: Mengeliminasi 2 opsi jawaban salah sehingga tersisa 2 pilihan.

### B. Rumus Kerusakan Pemain (Player Damage Formula)

- **BaseDamage** = Atk efektif × (1 + Level pemain × 0,08) × Varians (0,9–1,1)
- **StreakMultiplier** = nilai terkecil antara 2,0 dan 1,0 + (Streak × 0,15)
- **CriticalMultiplier** = 1,75× jika hasil acak 0–100 lebih kecil dari peluang kritis; selain itu 1,0×.
- **Pengurangan oleh pertahanan** = 1 − (Pertahanan musuh ÷ (Pertahanan musuh + 50))
- **Damage akhir pemain** = nilai terbesar antara 8 dan pembulatan ke bawah dari BaseDamage × semua pengali × pengurangan pertahanan.

### C. Rumus Kerusakan Musuh (Enemy Damage Formula)

- **Damage mentah musuh** = Atk musuh × Varians (0,9–1,1)
- **Pengurangan oleh pertahanan pemain** = 1 − nilai terkecil antara 0,75 dan (Pertahanan efektif × Buff DEF) ÷ (Pertahanan efektif × Buff DEF + 60)
- **Damage akhir musuh** = nilai terbesar antara 5 dan pembulatan ke bawah dari damage mentah × pengurangan pertahanan pemain.

Satu sesi arena berlangsung **minimal 5 ronde**. Jika satu monster kalah sebelum batas itu, gelombang monster lain muncul dan pertarungan berlanjut. Hadiah kemenangan baru muncul setelah batas minimum terlewati dan monster pada ronde tersebut dikalahkan.

---

## 📈 3. Sistem Leveling & Atribut Karakter

### A. Kurva Kebutuhan EXP
Karakter membutuhkan EXP yang meningkat secara eksponensial setiap levelnya:

EXP yang dibutuhkan = ⌊100 × 1,22⁽Level − 1⁾ + (Level − 1) × 35⌋

| Level | Kebutuhan EXP | Gelar Karakter |
|---|---|---|
| **Level 1** | 100 EXP | Murid Pemula SMP |
| **Level 2** | 157 EXP | Murid Pemula SMP |
| **Level 5** | 362 EXP | Pelajar Berbakat |
| **Level 10** | 935 EXP | Petualang Cerdas |
| **Level 15** | 2,340 EXP | Peneliti Ulung |
| **Level 20** | 5,820 EXP | Kesatria Ilmuwan |
| **Level 25** | 14,450 EXP | Pujangga Cendekiawan |
| **Level 30+**| 35,900+ EXP | Mahaguru Nusantara |

### B. Alokasi Poin Atribut
Setiap naik level, karakter memperoleh **+3 Poin Atribut Bebas** yang dapat dialokasikan ke 4 status utama:

1. **Strength / Kekuatan (STR)**:
   - Setiap +1 STR memberikan +2.5 Serangan dasar.
2. **Vitality / Ketahanan (VIT)**:
   - Setiap +1 VIT memberikan +12 Max HP dan +1.5 Pertahanan dasar.
3. **Intelligence / Kecerdasan (INT)**:
   - Meningkatkan ketajaman logika dan +0.4% Peluang Serangan Kritis.
4. **Agility / Ketangkasan (AGI)**:
   - Meningkatkan kecepatan refleks dan +0.6% Peluang Serangan Kritis.

---

## 🎒 4. Database Item & Ekonomi Toko

| ID Item | Nama Item | Kategori | Kelangkaan | Efek Status | Harga Beli | Harga Jual |
|---|---|---|---|---|---|---|
| `potion_hp_small` | Ramuan Pemulih Kecil | Konsumsi | Biasa | +35 HP | 25 Emas | 12 Emas |
| `potion_hp_medium` | Ramuan Pemulih Sedang | Konsumsi | Istimewa | +80 HP | 60 Emas | 30 Emas |
| `potion_hp_large` | Ramuan Pemulih Besar | Konsumsi | Langka | +160 HP | 120 Emas | 60 Emas |
| `potion_elixir` | Elixir Cendekiawan | Konsumsi | Epik | Pulih 100% Max HP | 250 Emas | 125 Emas |
| `buff_attack` | Serbuk Fokus Belajar | Booster | Istimewa | +35% ATK (3 Ronde) | 45 Emas | 22 Emas |
| `buff_defense` | Perisai Konsentrasi | Booster | Istimewa | +45% DEF (3 Ronde) | 40 Emas | 20 Emas |
| `scroll_hint` | Gulungan Petunjuk AI | Spesial | Langka | Eliminasi 2 Opsi Salah | 50 Emas | 25 Emas |
| `stone_revival` | Batu Kebangkitan | Spesial | Epik | Hidup Kembali 50% HP | 180 Emas | 90 Emas |
| `talisman_exp` | Jimat Cendekiawan | Booster | Langka | +50% Bonus EXP | 75 Emas | 35 Emas |
| `weapon_wooden_ruler` | Penggaris Kayu Pemula | Senjata | Biasa | +12 ATK, +2% Crit | 90 Emas | 45 Emas |
| `weapon_pen_blade` | Pedang Pena Baja | Senjata | Langka | +28 ATK, +6% Crit | 320 Emas | 160 Emas |
| `weapon_calculus_staff`| Tongkat Kalkulus Ajaib | Senjata | Legendaris | +55 ATK, +15% Crit | 750 Emas | 375 Emas |
| `armor_school_vest` | Rompi Seragam Pramuka | Armor | Biasa | +8 DEF, +25 Max HP | 80 Emas | 40 Emas |
| `armor_lab_coat` | Jas Baja Laboratorium | Armor | Langka | +22 DEF, +65 Max HP | 290 Emas | 145 Emas |
| `armor_archmage_robe` | Jubah Mahaguru Nusantara| Armor | Legendaris | +45 DEF, +140 Max HP| 800 Emas | 400 Emas |

---

## 🏆 5. Daftar Prestasi & Capaian (Achievements)

Sistem memantau 18 capaian prestasi secara otomatis. Save lama dinormalisasi ke katalog terbaru tanpa menghapus progres dan status unlock yang sudah ada:
1. **Langkah Pertama**: Menangkan 1 pertempuran (*Reward: 50 Emas, 50 EXP*).
2. **Petarung Gigih**: Menangkan 5 pertempuran (*Reward: 100 Emas, 120 EXP*).
3. **Kesatria Ulung**: Menangkan 20 pertempuran (*Reward: 300 Emas, 400 EXP*).
4. **Kombo Cerdas**: Jawab 5 pertanyaan berturut-turut dengan benar (*Reward: 80 Emas, 100 EXP*).
5. **Pikiran Jenius**: Capai rekor streak 10 jawaban benar (*Reward: 250 Emas, 350 EXP*).
6. **Pelajar Berbakat**: Capai Level 5 (*Reward: 120 Emas, 150 EXP*).
7. **Petualang Cerdas**: Capai Level 10 (*Reward: 350 Emas, 500 EXP*).
8. **Tabungan Juara**: Kumpulkan total 500 Emas (*Reward: 100 Emas, 100 EXP*).
9. **Pakar Matematika**: Jawab 10 soal Matematika benar (*Reward: 150 Emas, 200 EXP*).
10. **Ilmuwan Muda**: Jawab 10 soal IPA benar (*Reward: 150 Emas, 200 EXP*).
11. **Sejarawan Nusantara**: Jawab 10 soal IPS benar (*Reward: 150 Emas, 200 EXP*).
12. **Pujangga Bahasa**: Jawab 10 soal Bahasa Indonesia benar (*Reward: 150 Emas, 200 EXP*).
13. **Bilingual Scholar**: Jawab 10 soal Bahasa Inggris benar (*Reward: 150 Emas, 200 EXP*).
14. **Wiyata Basa Jawa**: Jawab 10 soal Bahasa Jawa benar (*Reward: 150 Emas, 200 EXP*).
15. **Penakluk Bug**: Jawab 10 soal Informatika benar (*Reward: 150 Emas, 200 EXP*).
16. **Maestro Muda**: Jawab 10 soal Seni Musik benar (*Reward: 150 Emas, 200 EXP*).
17. **Juara Hidup Aktif**: Jawab 10 soal PJOK benar (*Reward: 150 Emas, 200 EXP*).
18. **Pelajar Pancasila**: Jawab 10 soal Pendidikan Pancasila benar (*Reward: 150 Emas, 200 EXP*).

---

## 🎵 6. Sistem Audio

Eduquest memakai Web Audio API dan tidak menyimpan file musik eksternal:

- Efek suara chiptune mencakup serangan, kritikal, pemulihan, kekalahan, dan kemenangan.
- BGM memiliki tiga aransemen tenang: **Embun Pagi**, **Langit Senja**, dan **Danau Tenang**.
- Lagu diputar berulang dengan sistem *shuffle bag*: setiap siklus mengacak ketiga variasi dan mencegah variasi yang sama terulang langsung di batas siklus.
- Tombol audio di navbar mengendalikan BGM dan efek suara sekaligus. Preferensinya disimpan di browser.
- Startup mengikuti kebijakan autoplay browser. Jika audio awal diblokir, interaksi pengguna berikutnya mencoba mengaktifkannya kembali.

---

**Panduan Mekanik Game Resmi Eduquest RPG oleh edinst & Arena AI.**
