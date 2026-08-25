# 🤝 PANDUAN KONTRIBUSI EDUQUEST RPG (BAHASA INDONESIA)

Terima kasih atas minat Anda untuk berkontribusi pada pengembangan **Eduquest RPG**! Proyek ini terbuka bagi guru, siswa, pengembang, dan pegiat pendidikan di Indonesia.

---

## 📌 Kode Etik Kontribusi
Kami berkomitmen untuk menyediakan lingkungan yang ramah, inklusif, dan saling mendukung. Perlakukan setiap kontributor dengan rasa hormat dan kesopanan.

---

## 🛠️ Cara Berkontribusi

### 1. Menambahkan Bank Soal Baru (Kurikulum SMP)
Guru dan pendidik dapat memperkaya bank gabungan di `lib/game/question-bank.ts`; soal untuk kelompok mapel tambahan saat ini dipisahkan di `lib/game/additional-question-bank.ts` agar mudah dirawat.

- Gunakan salah satu ID mapel resmi: `matematika`, `ipa`, `ips`, `indonesia`, `inggris`, `jawa`, `informatika`, `musik`, `pjok`, atau `pkn`.
- Cocokkan `topic` dengan salah satu subbab untuk mapel/kelas tersebut di `lib/game/curriculum.ts`.
- Gunakan bahasa yang jelas, akrab, dan sesuai tingkat SMP tanpa menjadi terlalu kaku.
- Sediakan tepat 4 pilihan jawaban yang masuk akal.
- Sertakan penjelasan pedagogis serta petunjuk (*hint*) ringkas.
- Untuk soal panjang, pisahkan konteks, data, dan pertanyaan dengan baris baru. Helper `formatStructuredText` akan merapikan label bagian dan paragraf saat dirender.

Struktur objek soal:
```typescript
{
  id: 'mat-008',
  subject: 'matematika',
  grade: 8,
  topic: 'Pola Bilangan',
  difficulty: 'medium',
  question: 'Data:\nBarisan: 3, 7, 11, 15, ...\n\nPertanyaan:\nBerapakah suku ke-10?',
  options: ['35', '39', '43', '47'],
  correctAnswer: 1, // '39'
  explanation: 'Rumus suku ke-n barisan aritmatika: Un = a + (n - 1)b = 3 + (10 - 1)4 = 3 + 36 = 39.',
  hint: 'Gunakan rumus barisan aritmatika Un = a + (n - 1)b.',
  source: 'local_bank',
}
```

### 2. Menambahkan Item atau Monster Baru
- Item baru dapat ditambahkan pada `lib/game/item-database.ts`. Gunakan istilah **armor** pada teks antarmuka dan dokumentasi.
- Katalog gabungan monster diekspor dari `lib/game/enemies-database.ts`; monster mapel tambahan saat ini berada di `lib/game/additional-enemies.ts`.
- Setiap kombinasi mapel/kelas harus tetap memiliki minimal 3 monster. Berikan roast kabur yang ringan dan ramah pelajar melalui `escapeRoasts`; helper akan memakai fallback aman bila data tidak tersedia.

### 3. Menambahkan atau Mengubah Mapel
Metadata 10 mapel berada di `lib/game/subjects.ts`, tipe ID di `types/game.ts`, dan subbab di `lib/game/curriculum.ts`. Perubahan mapel juga harus mencakup soal lokal, monster, statistik, prestasi penguasaan, migrasi save lama, AI prompt, dan pengujian cakupan.

### 4. Alur Git & Pull Request
1. *Fork* repositori Eduquest.
2. Buat branch fitur baru:
   ```bash
   git checkout -b fitur/soal-ipa-kelas-8
   ```
3. Lakukan pengujian unit untuk memastikan tidak ada kode yang rusak:
   ```bash
   npm test
   ```
4. *Commit* perubahan Anda dengan pesan yang jelas:
   ```bash
   git commit -m "feat(ipa): tambah 10 soal genetika kelas 9"
   ```
5. *Push* ke branch Anda:
   ```bash
   git push origin fitur/soal-ipa-kelas-8
   ```
6. Buka *Pull Request* baru di GitHub dan jelaskan rincian perubahannya.

---

## 🧪 Standar Kualitas Kode
- **TypeScript**: Wajib *strict mode*, tidak diperkenankan menggunakan tipe `any` tanpa justifikasi kuat.
- **Komentar**: Jelaskan *mengapa* (alasan logis/pedagogis), bukan sekadar *apa*.
- **Tanpa Placeholder**: Dilarang menyisakan komentar seperti `// TODO: tambahkan logika`. Seluruh fungsi wajib diimplementasikan penuh.

---

**Dikelola bersama oleh edinst & Arena AI untuk Pendidikan Indonesia.**
