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
  jawa: {
    7: [
      topic('unggah-ungguh-7', 'Unggah-Ungguh Basa', 'Milih ragam ngoko lan krama sing trep miturut kahanan.'),
      topic('crita-rakyat', 'Crita Rakyat Jawa', 'Paraga, latar, alur, lan piwulang ing crita rakyat.'),
      topic('aksara-legena', 'Aksara Jawa Legena lan Sandhangan', 'Maca lan nulis aksara legena nganggo sandhangan swara.'),
      topic('teks-deskripsi-jawa', 'Teks Deskripsi Basa Jawa', 'Njlentrehake papan, barang, utawa tradhisi kanthi cetha.'),
      topic('macapat-pangkur', 'Tembang Macapat Pangkur', 'Guru gatra, guru wilangan, guru lagu, lan watak tembang.'),
    ],
    8: [
      topic('pacelathon', 'Pacelathon lan Unggah-Ungguh', 'Nyusun pacelathon kanthi tata krama basa sing cocog.'),
      topic('aksara-pasangan', 'Aksara Jawa lan Pasangan', 'Migunakaké pasangan kanggo mateni swara aksara sadurunge.'),
      topic('geguritan', 'Geguritan', 'Tema, rasa, pilihan tembung, lan amanat geguritan.'),
      topic('pawarta', 'Pawarta Basa Jawa', 'Unsur apa, sapa, kapan, ing ngendi, ngapa, lan kepriye.'),
      topic('wayang', 'Crita Wayang lan Piwulang', 'Paraga, watak, konflik, lan nilai becik ing crita wayang.'),
    ],
    9: [
      topic('sesorah', 'Sesorah', 'Pambuka, isi, panutup, lan tata basa sajrone pidato Jawa.'),
      topic('aksara-murda-swara', 'Aksara Murda, Swara, lan Rekan', 'Panganggone aksara khusus kanggo jeneng lan swara tartamtu.'),
      topic('macapat-sinau', 'Ngripta Tembang Macapat', 'Nyusun larik sing manut paugeran tembang macapat.'),
      topic('pranatacara', 'Pranatacara', 'Urutan adicara lan basa sing trep kanggo nuntun acara.'),
      topic('budaya-lokal-jawa', 'Teks Budaya Lokal Jawa', 'Maca, mbandhingake, lan nulis informasi babagan tradhisi lokal.'),
    ],
  },
  informatika: {
    7: [
      topic('berpikir-komputasional-7', 'Berpikir Komputasional', 'Dekomposisi, pola, abstraksi, dan langkah solusi.'),
      topic('sistem-komputer-7', 'Perangkat dan Sistem Komputer', 'Fungsi perangkat keras, perangkat lunak, serta pengguna.'),
      topic('representasi-data-7', 'Data dan Representasi', 'Menyajikan data sederhana dalam tabel, diagram, dan kode.'),
      topic('internet-aman-7', 'Internet Aman dan Etis', 'Privasi, kata sandi, jejak digital, dan komunikasi santun.'),
      topic('dampak-digital-7', 'Dampak Sosial Informatika', 'Manfaat, risiko, dan tanggung jawab memakai teknologi.'),
    ],
    8: [
      topic('algoritma-8', 'Algoritma dan Flowchart', 'Urutan, percabangan, perulangan, dan diagram alir.'),
      topic('pemrograman-blok-8', 'Pemrograman Berbasis Blok', 'Menyusun blok perintah, event, kondisi, dan perulangan.'),
      topic('analisis-data-8', 'Analisis Data', 'Mengolah, membandingkan, dan menarik kesimpulan dari data.'),
      topic('jaringan-8', 'Jaringan Komputer dan Internet', 'Perangkat jaringan, alamat, paket data, dan layanan internet.'),
      topic('kolaborasi-digital-8', 'Kolaborasi Digital', 'Berbagi dokumen, mengatur akses, dan bekerja aman dalam tim.'),
    ],
    9: [
      topic('struktur-data-9', 'Struktur Data Sederhana', 'Daftar, antrean, tumpukan, dan pemilihan struktur yang tepat.'),
      topic('pemrograman-teks-9', 'Pemrograman Teks Dasar', 'Variabel, masukan, keluaran, kondisi, dan perulangan.'),
      topic('visualisasi-data-9', 'Visualisasi dan Interpretasi Data', 'Memilih grafik serta membaca pola tanpa menyesatkan.'),
      topic('keamanan-data-9', 'Keamanan Data', 'Phishing, autentikasi, pencadangan, dan perlindungan akun.'),
      topic('proyek-informatika-9', 'Proyek Lintas Bidang Informatika', 'Merancang solusi digital, menguji, dan mengevaluasi hasilnya.'),
    ],
  },
  musik: {
    7: [
      topic('unsur-musik-7', 'Unsur-Unsur Musik', 'Irama, melodi, harmoni, tempo, dinamika, dan warna bunyi.'),
      topic('notasi-musik-7', 'Notasi Musik Dasar', 'Nilai nada, tanda istirahat, birama, dan notasi angka.'),
      topic('ritme-7', 'Pola Ritme', 'Menirukan dan menyusun pola ketukan secara konsisten.'),
      topic('teknik-vokal-7', 'Teknik Vokal Dasar', 'Pernapasan, artikulasi, intonasi, dan sikap bernyanyi.'),
      topic('musik-nusantara-7', 'Musik Tradisional Nusantara', 'Mengenali alat, fungsi, dan karakter musik berbagai daerah.'),
    ],
    8: [
      topic('tangga-nada-8', 'Tangga Nada dan Harmoni', 'Tangga nada mayor-minor, interval, serta akor dasar.'),
      topic('ansambel-8', 'Bermain Ansambel', 'Pembagian peran, tempo, keseimbangan, dan kekompakan.'),
      topic('bentuk-lagu-8', 'Bentuk dan Struktur Lagu', 'Motif, frase, bagian A–B, bait, dan reff.'),
      topic('aransemen-8', 'Aransemen Sederhana', 'Mengubah iringan, tempo, atau dinamika tanpa kehilangan melodi.'),
      topic('apresiasi-musik-8', 'Apresiasi Pertunjukan Musik', 'Mendengar aktif dan memberi tanggapan yang beralasan.'),
    ],
    9: [
      topic('komposisi-9', 'Kreasi dan Komposisi Musik', 'Mengembangkan ide menjadi karya musik sederhana.'),
      topic('teknologi-musik-9', 'Teknologi Musik', 'Merekam, menyunting, dan menggunakan audio secara etis.'),
      topic('pertunjukan-musik-9', 'Produksi Pertunjukan Musik', 'Perencanaan repertoar, latihan, panggung, dan evaluasi.'),
      topic('kritik-musik-9', 'Kritik Musik', 'Mendeskripsikan, menganalisis, menafsirkan, dan menilai karya.'),
      topic('proyek-musik-nusantara-9', 'Proyek Musik Nusantara', 'Mengolah inspirasi musik lokal menjadi sajian kreatif.'),
    ],
  },
  pjok: {
    7: [
      topic('permainan-bola-7', 'Gerak Dasar Permainan Bola', 'Kombinasi gerak lokomotor, nonlokomotor, dan manipulatif.'),
      topic('atletik-7', 'Atletik Dasar', 'Teknik aman berlari, melompat, dan melempar.'),
      topic('senam-lantai-7', 'Senam Lantai', 'Keseimbangan, guling, tumpuan, dan keselamatan latihan.'),
      topic('gerak-berirama-7', 'Aktivitas Gerak Berirama', 'Koordinasi gerak tubuh mengikuti irama.'),
      topic('pola-hidup-sehat-7', 'Pola Hidup Bersih dan Sehat', 'Kebersihan diri, aktivitas fisik, istirahat, dan kebiasaan sehat.'),
    ],
    8: [
      topic('permainan-beregu-8', 'Strategi Permainan Beregu', 'Kerja sama, ruang, serangan, pertahanan, dan sportivitas.'),
      topic('keselamatan-air-8', 'Aktivitas Air dan Keselamatan', 'Gerak dasar di air dan aturan keselamatan di kolam.'),
      topic('kebugaran-8', 'Kebugaran Jasmani', 'Daya tahan, kekuatan, kelenturan, dan latihan terukur.'),
      topic('bela-diri-8', 'Bela Diri', 'Sikap dasar, pola langkah, disiplin, dan keselamatan.'),
      topic('gizi-seimbang-8', 'Gizi Seimbang', 'Ragam pangan, porsi, hidrasi, dan membaca kebiasaan makan.'),
    ],
    9: [
      topic('taktik-permainan-9', 'Taktik Permainan Olahraga', 'Menganalisis situasi dan memilih strategi secara sportif.'),
      topic('program-latihan-9', 'Program Latihan Kebugaran', 'Prinsip frekuensi, intensitas, waktu, dan jenis latihan.'),
      topic('cedera-p3k-9', 'Pencegahan Cedera dan P3K', 'Pemanasan, mengenali risiko, dan mencari bantuan yang tepat.'),
      topic('kesehatan-remaja-9', 'Kesehatan Remaja', 'Perubahan tubuh, pergaulan sehat, dan sumber informasi tepercaya.'),
      topic('gaya-hidup-aktif-9', 'Proyek Gaya Hidup Aktif', 'Merancang kebiasaan gerak yang aman, realistis, dan konsisten.'),
    ],
  },
  pkn: {
    7: [
      topic('nilai-pancasila-7', 'Nilai-Nilai Pancasila', 'Makna sila dan penerapannya dalam kehidupan sehari-hari.'),
      topic('norma-uud-7', 'Norma dan UUD NRI Tahun 1945', 'Jenis norma, aturan, dan pentingnya konstitusi.'),
      topic('bhinneka-7', 'Bhinneka Tunggal Ika', 'Menghargai perbedaan suku, agama, budaya, dan pendapat.'),
      topic('wilayah-nkri-7', 'Wilayah dan Keutuhan NKRI', 'Karakter wilayah Indonesia serta peran menjaga persatuan.'),
      topic('hak-kewajiban-7', 'Hak dan Kewajiban', 'Menyeimbangkan hak, kewajiban, dan tanggung jawab.'),
    ],
    8: [
      topic('kedudukan-pancasila-8', 'Kedudukan Pancasila', 'Pancasila sebagai dasar negara dan pandangan hidup bangsa.'),
      topic('konstitusi-8', 'Konstitusi dan Peraturan', 'Hierarki, fungsi aturan, dan ketaatan yang bertanggung jawab.'),
      topic('keberagaman-8', 'Merawat Keberagaman', 'Mencegah diskriminasi dan membangun hidup yang rukun.'),
      topic('demokrasi-8', 'Demokrasi dan Musyawarah', 'Berpendapat, mendengar, bermusyawarah, dan menerima keputusan.'),
      topic('persatuan-8', 'Semangat Persatuan', 'Sumpah Pemuda, gotong royong, dan identitas kebangsaan.'),
    ],
    9: [
      topic('pancasila-era-digital-9', 'Pancasila di Era Digital', 'Menerapkan nilai Pancasila saat berinteraksi di ruang digital.'),
      topic('partisipasi-warga-9', 'Partisipasi Warga Negara', 'Berpartisipasi secara sadar, damai, dan bertanggung jawab.'),
      topic('ham-9', 'Hak Asasi Manusia', 'Hak dasar, penghormatan martabat, dan tanggung jawab bersama.'),
      topic('bela-negara-9', 'Bela Negara dan NKRI', 'Wujud bela negara yang sesuai peran pelajar.'),
      topic('proyek-gotong-royong-9', 'Proyek Gotong Royong', 'Memetakan masalah bersama dan menjalankan solusi kolaboratif.'),
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
