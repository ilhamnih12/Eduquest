import { GradeLevel, Subject } from '@/types/game';

/**
 * Topik per bab untuk tiap mapel dan jenjang.
 *
 * Kurikulum Merdeka SMP memakai Fase D (umumnya kelas VII–IX), jadi daftar ini
 * adalah pembagian topik yang ramah untuk permainan, bukan pengganti ATP sekolah.
 * Rujukan CP resmi: https://kurikulum.kemdikbud.go.id/rujukan
 * Rujukan ejaan: https://ejaan.kemdikbud.go.id/eyd/
 * Isinya sengaja cukup beragam supaya generator AI tidak terus membuat soal dari
 * satu konsep yang sama.
 */
export interface CurriculumTopic {
  id: string;
  name: string;
  description: string;
}

const topic = (id: string, name: string, description: string): CurriculumTopic => ({
  id,
  name,
  description,
});

export const SUBJECT_TOPICS: Record<Subject, Record<GradeLevel, CurriculumTopic[]>> = {
  matematika: {
    7: [
      topic('bilangan-operasi', 'Bilangan dan Operasi Hitung', 'Bilangan bulat, pecahan, desimal, dan operasi campuran.'),
      topic('aljabar', 'Aljabar dan Persamaan', 'Variabel, bentuk aljabar, dan persamaan linear sederhana.'),
      topic('himpunan', 'Himpunan', 'Anggota, diagram, irisan, gabungan, dan komplemen himpunan.'),
      topic('perbandingan', 'Perbandingan dan Skala', 'Perbandingan senilai, berbalik nilai, skala, dan masalah sehari-hari.'),
      topic('geometri-7', 'Geometri dan Pengukuran', 'Garis, sudut, bangun datar, keliling, dan luas.'),
    ],
    8: [
      topic('pola-bilangan', 'Pola dan Barisan Bilangan', 'Pola gambar, barisan, dan aturan suku berikutnya.'),
      topic('pythagoras', 'Teorema Pythagoras', 'Sisi segitiga siku-siku dan penerapannya.'),
      topic('spldv', 'SPLDV', 'Sistem persamaan linear dua variabel dalam situasi nyata.'),
      topic('lingkaran', 'Lingkaran', 'Unsur, keliling, luas, dan hubungan sudut pada lingkaran.'),
      topic('statistika-8', 'Statistika', 'Tabel, diagram, rata-rata, median, dan modus.'),
    ],
    9: [
      topic('pangkat-akar', 'Perpangkatan dan Bentuk Akar', 'Sifat pangkat, notasi ilmiah, dan penyederhanaan bentuk akar.'),
      topic('persamaan-kuadrat', 'Persamaan Kuadrat', 'Faktorisasi, akar-akar, dan masalah yang bisa dimodelkan.'),
      topic('transformasi', 'Transformasi Geometri', 'Translasi, refleksi, rotasi, dan dilatasi.'),
      topic('kesebangunan', 'Kesebangunan dan Kekongruenan', 'Perbandingan sisi dan bangun yang sebangun atau kongruen.'),
      topic('peluang-statistika', 'Peluang dan Statistika', 'Peluang sederhana, penyajian data, dan interpretasi hasil.'),
    ],
  },
  ipa: {
    7: [
      topic('klasifikasi', 'Klasifikasi Makhluk Hidup', 'Mengelompokkan makhluk hidup dari ciri yang bisa diamati.'),
      topic('zat-perubahan', 'Zat dan Perubahannya', 'Sifat zat, perubahan fisika, perubahan kimia, dan campuran.'),
      topic('pengukuran', 'Pengukuran', 'Besaran, satuan, alat ukur, dan cara membaca hasil pengukuran.'),
      topic('suhu-kalor', 'Suhu dan Kalor', 'Skala suhu, perpindahan kalor, dan pemuaian.'),
      topic('ekosistem', 'Ekosistem dan Keanekaragaman', 'Interaksi makhluk hidup dengan lingkungan dan rantai makanan.'),
    ],
    8: [
      topic('gerak-newton', 'Gerak dan Hukum Newton', 'Gaya, gerak, massa, percepatan, dan aksi–reaksi.'),
      topic('tekanan', 'Tekanan', 'Tekanan pada zat padat, cair, gas, dan penerapannya.'),
      topic('sistem-organ', 'Sistem Organ Manusia', 'Pencernaan, peredaran darah, dan cara menjaga kesehatan organ.'),
      topic('usaha-mesin', 'Usaha dan Pesawat Sederhana', 'Usaha, energi, keuntungan mekanis, dan alat sehari-hari.'),
      topic('jaringan-tumbuhan', 'Struktur dan Jaringan Tumbuhan', 'Jaringan tumbuhan serta fungsi akar, batang, dan daun.'),
    ],
    9: [
      topic('listrik', 'Listrik Statis dan Dinamis', 'Muatan, arus, tegangan, hambatan, dan rangkaian sederhana.'),
      topic('kemagnetan', 'Kemagnetan dan Elektromagnet', 'Sifat magnet, medan magnet, dan pemanfaatannya.'),
      topic('genetika', 'Pewarisan Sifat', 'Gen, kromosom, persilangan sederhana, dan variasi.'),
      topic('bioteknologi', 'Bioteknologi', 'Bioteknologi konvensional, modern, dan dampaknya bagi lingkungan.'),
      topic('kimia-lingkungan', 'Kimia dan Lingkungan', 'Atom, senyawa, reaksi sederhana, serta solusi pencemaran.'),
    ],
  },
  ips: {
    7: [
      topic('geografi-indonesia', 'Letak Geografis Indonesia', 'Letak, kondisi alam, dan pengaruhnya terhadap kehidupan.'),
      topic('peta-skala', 'Peta dan Skala', 'Simbol peta, koordinat, skala, dan membaca informasi wilayah.'),
      topic('interaksi-sosial', 'Interaksi Sosial', 'Syarat, bentuk, dan contoh interaksi di sekitar kita.'),
      topic('kebutuhan-kelangkaan', 'Kebutuhan dan Kelangkaan', 'Kebutuhan manusia, sumber daya, pilihan, dan kelangkaan.'),
      topic('pranata-lingkungan', 'Pranata Sosial dan Lingkungan', 'Aturan sosial, lembaga, dan hubungan manusia dengan lingkungan.'),
    ],
    8: [
      topic('kerajaan-nusantara', 'Kerajaan Nusantara', 'Jejak Hindu–Buddha dan Islam serta peninggalannya.'),
      topic('kedatangan-barat', 'Kedatangan Bangsa Barat', 'Latar belakang, jalur, dan dampak kedatangan bangsa Barat.'),
      topic('asean', 'ASEAN', 'Sejarah, tujuan, dan kerja sama negara-negara Asia Tenggara.'),
      topic('mobilitas-sosial', 'Mobilitas Sosial', 'Perpindahan status sosial dan faktor yang memengaruhinya.'),
      topic('ekonomi-8', 'Kegiatan Ekonomi', 'Produksi, distribusi, konsumsi, dan peran pelaku ekonomi.'),
    ],
    9: [
      topic('perubahan-sosial', 'Perubahan Sosial Budaya', 'Penyebab, bentuk, dan dampak perubahan sosial.'),
      topic('perdagangan-internasional', 'Perdagangan Internasional', 'Ekspor, impor, devisa, dan pasar bebas.'),
      topic('kemerdekaan', 'Peristiwa Kemerdekaan Indonesia', 'Perjuangan, proklamasi, dan awal mempertahankan kemerdekaan.'),
      topic('kerja-sama-global', 'Kerja Sama Internasional', 'Hubungan antarnegara dan peran Indonesia di dunia.'),
      topic('kependudukan', 'Kependudukan dan Pembangunan', 'Penduduk, kualitas hidup, dan tantangan pembangunan.'),
    ],
  },
  indonesia: {
    7: [
      topic('deskripsi', 'Teks Deskripsi', 'Menggambarkan objek dengan detail yang bisa ditangkap pancaindra.'),
      topic('fantasi', 'Cerita Fantasi', 'Tokoh, alur, latar, dan kejadian imajinatif.'),
      topic('prosedur', 'Teks Prosedur', 'Tujuan, alat dan bahan, serta langkah melakukan sesuatu.'),
      topic('observasi', 'Laporan Hasil Observasi', 'Fakta, klasifikasi, dan cara menyusun laporan pengamatan.'),
      topic('eyd-7', 'Ejaan dan Tanda Baca', 'Huruf kapital, tanda baca, kata baku, dan EYD V.'),
    ],
    8: [
      topic('berita', 'Teks Berita', 'Unsur berita, fakta, judul, dan cara mengecek informasi.'),
      topic('iklan-slogan', 'Iklan, Slogan, dan Poster', 'Pesan singkat, persuasif, dan menarik perhatian.'),
      topic('eksposisi', 'Teks Eksposisi', 'Tesis, argumen, fakta, dan penegasan ulang.'),
      topic('cerpen-puisi', 'Cerpen dan Puisi', 'Unsur intrinsik, makna, majas, dan pilihan kata.'),
      topic('persuasi-8', 'Teks Persuasi', 'Ajakan yang didukung alasan dan bukti.'),
    ],
    9: [
      topic('laporan-percobaan', 'Laporan Percobaan', 'Tujuan, alat, langkah, hasil, dan simpulan percobaan.'),
      topic('pidato', 'Pidato Persuasif', 'Pembukaan, isi, alasan, ajakan, dan penutup.'),
      topic('diskusi', 'Teks Diskusi', 'Argumen pro, kontra, dan simpulan yang seimbang.'),
      topic('resensi', 'Resensi dan Kritik Sastra', 'Identitas karya, ringkasan, penilaian, dan rekomendasi.'),
      topic('kalimat-efektif', 'Kalimat Efektif', 'Kehematan, kepaduan, ketepatan, dan pilihan kata.'),
    ],
  },
  inggris: {
    7: [
      topic('greetings', 'Greetings and Introduction', 'Menyapa, memperkenalkan diri, dan bertanya identitas.'),
      topic('simple-present', 'Simple Present Tense', 'Kebiasaan, fakta, dan penggunaan do, does, serta kata kerja.'),
      topic('pronouns', 'Pronouns and Possessives', 'Kata ganti subjek, objek, dan kepemilikan.'),
      topic('descriptive-7', 'Descriptive Text', 'Mendeskripsikan orang, hewan, benda, atau tempat.'),
      topic('procedure-english', 'Procedure Text', 'Memahami instruksi dan langkah melakukan sesuatu.'),
    ],
    8: [
      topic('simple-past', 'Simple Past Tense', 'Kejadian lampau, regular verbs, dan irregular verbs.'),
      topic('recount', 'Recount Text', 'Menceritakan pengalaman dengan urutan waktu yang jelas.'),
      topic('comparison', 'Degrees of Comparison', 'Membandingkan orang atau benda dengan tepat.'),
      topic('modals', 'Modal Auxiliaries', 'Can, should, must, may, dan ungkapan kemampuan atau saran.'),
      topic('invitation', 'Invitation and Announcement', 'Memahami informasi penting dalam pengumuman atau undangan.'),
    ],
    9: [
      topic('narrative', 'Narrative and Folklore', 'Alur, tokoh, konflik, dan pesan dalam cerita.'),
      topic('passive', 'Passive Voice', 'Mengubah kalimat aktif menjadi pasif dalam beberapa tense.'),
      topic('report-english', 'Report Text', 'Fakta umum tentang hewan, benda, dan fenomena.'),
      topic('conjunctions', 'Conjunctions and Purpose', 'Because, although, so that, dan in order to.'),
      topic('opinion', 'Opinion and Persuasion', 'Menyampaikan pendapat, alasan, dan ajakan.'),
    ],
  },
};

export function getCurriculumTopics(subject: Subject, grade: GradeLevel): CurriculumTopic[] {
  return SUBJECT_TOPICS[subject]?.[grade] ?? [];
}

export function getCurriculumTopic(subject: Subject, grade: GradeLevel, topicId: string): CurriculumTopic | undefined {
  return getCurriculumTopics(subject, grade).find((item) => item.id === topicId);
}

export function getRandomCurriculumTopic(subject: Subject, grade: GradeLevel): CurriculumTopic {
  const topics = getCurriculumTopics(subject, grade);
  return topics[Math.floor(Math.random() * topics.length)] ?? topic('umum', 'Materi SMP', 'Latihan campuran sesuai tingkat kelas.');
}
