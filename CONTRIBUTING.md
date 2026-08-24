# 🤝 PANDUAN KONTRIBUSI EDUQUEST RPG (BAHASA INDONESIA)

Terima kasih atas minat Anda untuk berkontribusi pada pengembangan **Eduquest RPG**! Proyek ini terbuka bagi guru, siswa, pengembang, dan pegiat pendidikan di Indonesia.

---

## 📌 Kode Etik Kontribusi
Kami berkomitmen untuk menyediakan lingkungan yang ramah, inklusif, dan saling mendukung. Perlakukan setiap kontributor dengan rasa hormat dan kesopanan.

---

## 🛠️ Cara Berkontribusi

### 1. Menambahkan Bank Soal Baru (Kurikulum SMP)
Guru dan pendidik dapat memperkaya bank soal di berkas `lib/game/question-bank.ts`:
- Pastikan format soal menggunakan bahasa Indonesia yang baik dan benar.
- Sediakan 4 pilihan jawaban yang masuk akal.
- Sertakan penjelasan pedagogis yang mendalam serta petunjuk (*hint*) ringkas.

Struktur objek soal:
```typescript
{
  id: 'mat-008',
  subject: 'matematika',
  grade: 8,
  topic: 'Pola Bilangan',
  difficulty: 'medium',
  question: 'Suku ke-10 dari barisan bilangan 3, 7, 11, 15, ... adalah...',
  options: ['35', '39', '43', '47'],
  correctAnswer: 1, // '39'
  explanation: 'Rumus suku ke-n barisan aritmatika: Un = a + (n - 1)b = 3 + (10 - 1)4 = 3 + 36 = 39.',
  hint: 'Gunakan rumus barisan aritmatika Un = a + (n - 1)b.',
  source: 'local_bank',
}
```

### 2. Menambahkan Item atau Monster Baru
- Item baru dapat ditambahkan pada `lib/game/item-database.ts`.
- Monster dan bos baru dapat ditambahkan pada `lib/game/enemies-database.ts`.

### 3. Alur Git & Pull Request
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
