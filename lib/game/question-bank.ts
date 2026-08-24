import { Question, Subject, GradeLevel } from '@/types/game';

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // MATEMATIKA (SMP KELAS 7, 8, 9)
  // ==========================================
  {
    id: 'mat-001',
    subject: 'matematika',
    grade: 7,
    topic: 'Aljabar & Persamaan Linier',
    difficulty: 'easy',
    question: 'Jika 3x + 7 = 22, berapakah nilai dari x?',
    options: ['3', '5', '6', '7'],
    correctAnswer: 1, // '5'
    explanation: 'Untuk mencari x: 3x = 22 - 7 => 3x = 15 => x = 15 / 3 = 5.',
    hint: 'Kurangkan kedua ruas dengan 7 terlebih dahulu, lalu bagi dengan 3.',
    source: 'local_bank',
  },
  {
    id: 'mat-002',
    subject: 'matematika',
    grade: 7,
    topic: 'Bilangan Bulat & Pecahan',
    difficulty: 'easy',
    question: 'Hasil dari (-12) + 7 × (-3) adalah...',
    options: ['-33', '-15', '33', '-9'],
    correctAnswer: 0, // '-33'
    explanation: 'Sesuai urutan operasi hitung (KABATAKU): Kerjakan perkalian dahulu: 7 × (-3) = -21. Kemudian (-12) + (-21) = -33.',
    hint: 'Ingat aturan prioritas: perkalian dihitung sebelum penjumlahan.',
    source: 'local_bank',
  },
  {
    id: 'mat-003',
    subject: 'matematika',
    grade: 7,
    topic: 'Himpunan',
    difficulty: 'medium',
    question: 'Jika S = {bilangan asli kurang dari 10} dan A = {bilangan prima kurang dari 10}, maka komplemen dari himpunan A (A\') adalah...',
    options: ['{1, 4, 6, 8, 9}', '{2, 3, 5, 7}', '{1, 3, 5, 7, 9}', '{4, 6, 8, 9}'],
    correctAnswer: 0, // '{1, 4, 6, 8, 9}'
    explanation: 'S = {1, 2, 3, 4, 5, 6, 7, 8, 9}. A = {2, 3, 5, 7}. Komplemen A\' adalah anggota S yang bukan anggota A, yaitu {1, 4, 6, 8, 9}. Ingat bahwa 1 bukan bilangan prima.',
    hint: 'Himpunan semesta berisi angka 1 sampai 9. Singkirkan angka 2, 3, 5, dan 7.',
    source: 'local_bank',
  },
  {
    id: 'mat-004',
    subject: 'matematika',
    grade: 8,
    topic: 'Teorema Pythagoras',
    difficulty: 'medium',
    question: 'Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 6 cm dan 8 cm. Panjang sisi miring (hipotenusa) segitiga tersebut adalah...',
    options: ['9 cm', '10 cm', '12 cm', '14 cm'],
    correctAnswer: 1, // '10 cm'
    explanation: 'Berdasarkan Teorema Pythagoras: c² = a² + b² => c² = 6² + 8² = 36 + 64 = 100. Maka c = √100 = 10 cm.',
    hint: 'Gunakan rumus c² = a² + b².',
    source: 'local_bank',
  },
  {
    id: 'mat-005',
    subject: 'matematika',
    grade: 8,
    topic: 'Sistem Persamaan Linier Dua Variabel (SPLDV)',
    difficulty: 'hard',
    question: 'Diketahui x + 2y = 8 dan 2x - y = 6. Nilai dari x + y adalah...',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2, // '6'
    explanation: 'Dari persamaan 2: y = 2x - 6. Substitusikan ke persamaan 1: x + 2(2x - 6) = 8 => x + 4x - 12 = 8 => 5x = 20 => x = 4. Maka y = 2(4) - 6 = 2. Jadi nilai x + y = 4 + 2 = 6.',
    hint: 'Gunakan metode substitusi atau eliminasi untuk mencari nilai x dan y terlebih dahulu.',
    source: 'local_bank',
  },
  {
    id: 'mat-006',
    subject: 'matematika',
    grade: 9,
    topic: 'Pangkat dan Bentuk Akar',
    difficulty: 'medium',
    question: 'Bentuk sederhana dari 3√5 + 2√20 - √45 adalah...',
    options: ['4√5', '5√5', '6√5', '3√5'],
    correctAnswer: 0, // '4√5'
    explanation: '√20 = √(4 × 5) = 2√5, sehingga 2√20 = 4√5. √45 = √(9 × 5) = 3√5. Maka 3√5 + 4√5 - 3√5 = 4√5.',
    hint: 'Sederhanakan √20 menjadi 2√5 dan √45 menjadi 3√5.',
    source: 'local_bank',
  },
  {
    id: 'mat-007',
    subject: 'matematika',
    grade: 9,
    topic: 'Persamaan Kuadrat',
    difficulty: 'hard',
    question: 'Akar-akar dari persamaan kuadrat x² - 5x + 6 = 0 adalah...',
    options: ['x = 1 atau x = 6', 'x = -2 atau x = -3', 'x = 2 atau x = 3', 'x = -1 atau x = -6'],
    correctAnswer: 2, // 'x = 2 atau x = 3'
    explanation: 'Faktorkan persamaan kuadrat: (x - 2)(x - 3) = 0. Sehingga x - 2 = 0 (x = 2) atau x - 3 = 0 (x = 3).',
    hint: 'Cari dua bilangan yang jika dikalikan menghasilkan 6 dan jika dijumlahkan menghasilkan -5.',
    source: 'local_bank',
  },

  // ==========================================
  // IPA (ILMU PENGETAHUAN ALAM)
  // ==========================================
  {
    id: 'ipa-001',
    subject: 'ipa',
    grade: 7,
    topic: 'Organisasi Kehidupan & Sel',
    difficulty: 'easy',
    question: 'Organel sel yang berfungsi sebagai "pabrik energi" atau tempat respirasi seluler adalah...',
    options: ['Ribosom', 'Mitokondria', 'Badan Golgi', 'Kloroplas'],
    correctAnswer: 1, // 'Mitokondria'
    explanation: 'Mitokondria adalah organel tempat terjadinya respirasi seluler untuk menghasilkan energi dalam bentuk ATP.',
    hint: 'Sering dijuluki sebagai powerhouse of the cell.',
    source: 'local_bank',
  },
  {
    id: 'ipa-002',
    subject: 'ipa',
    grade: 7,
    topic: 'Suhu dan Kalor',
    difficulty: 'easy',
    question: 'Suhu 40°C jika dikonversikan ke dalam skala Fahrenheit adalah...',
    options: ['72°F', '96°F', '104°F', '112°F'],
    correctAnswer: 2, // '104°F'
    explanation: 'Rumus konversi Celcius ke Fahrenheit: F = (9/5 × C) + 32 = (9/5 × 40) + 32 = 72 + 32 = 104°F.',
    hint: 'Gunakan rumus F = (9/5 × C) + 32.',
    source: 'local_bank',
  },
  {
    id: 'ipa-003',
    subject: 'ipa',
    grade: 8,
    topic: 'Hukum Newton',
    difficulty: 'medium',
    question: 'Sebuah benda bermassa 5 kg ditarik dengan gaya tetap sebesar 20 N. Berapakah percepatan yang dialami benda tersebut?',
    options: ['2 m/s²', '4 m/s²', '15 m/s²', '100 m/s²'],
    correctAnswer: 1, // '4 m/s²'
    explanation: 'Berdasarkan Hukum II Newton (F = m × a): a = F / m = 20 N / 5 kg = 4 m/s².',
    hint: 'Gunakan rumus a = F / m.',
    source: 'local_bank',
  },
  {
    id: 'ipa-004',
    subject: 'ipa',
    grade: 8,
    topic: 'Sistem Pencernaan Manusia',
    difficulty: 'medium',
    question: 'Enzim yang dihasilkan oleh lambung dan berfungsi mengubah protein menjadi pepton adalah...',
    options: ['Ptialin', 'Pepsin', 'Amilase', 'Lipase'],
    correctAnswer: 1, // 'Pepsin'
    explanation: 'Lambung memproduksi enzim pepsin (yang mencerna protein menjadi pepton) dan renin (menggumpalkan kasein susu), serta asam klorida (HCl).',
    hint: 'Namanya berawalan huruf P dan bekerja dalam kondisi asam lambung.',
    source: 'local_bank',
  },
  {
    id: 'ipa-005',
    subject: 'ipa',
    grade: 9,
    topic: 'Listrik Dinamis & Hukum Ohm',
    difficulty: 'medium',
    question: 'Sebuah lampu dengan hambatan 20 Ohm dihubungkan dengan sumber tegangan 12 Volt. Kuat arus yang mengalir pada lampu adalah...',
    options: ['0,6 A', '1,67 A', '240 A', '0,4 A'],
    correctAnswer: 0, // '0,6 A'
    explanation: 'Sesuai Hukum Ohm (V = I × R): I = V / R = 12 V / 20 Ω = 0,6 Ampere.',
    hint: 'Kuat arus (I) sama dengan Tegangan (V) dibagi Hambatan (R).',
    source: 'local_bank',
  },
  {
    id: 'ipa-006',
    subject: 'ipa',
    grade: 9,
    topic: 'Pewarisan Sifat (Genetika)',
    difficulty: 'hard',
    question: 'Persilangan monohibrid dominan penuh antara tanaman berbunga merah (MM) dengan putih (mm) menghasilkan F1 merah (Mm). Jika F1 disilangkan sesamanya, perbandingan fenotipe pada F2 adalah...',
    options: ['1 Merah : 2 Merah Muda : 1 Putih', '3 Merah : 1 Putih', '1 Merah : 3 Putih', 'Semua Berbunga Merah'],
    correctAnswer: 1, // '3 Merah : 1 Putih'
    explanation: 'Persilangan Mm × Mm menghasilkan genotipe MM (1), Mm (2), mm (1). Karena M dominan penuh terhadap m, maka MM dan Mm berfenotipe merah (1 + 2 = 3) dan mm berfenotipe putih (1). Jadi perbandingan fenotipenya 3 Merah : 1 Putih.',
    hint: 'Dominan penuh berarti heterozigot (Mm) memiliki warna sama dengan homozigot dominan (MM).',
    source: 'local_bank',
  },

  // ==========================================
  // IPS (ILMU PENGETAHUAN SOSIAL)
  // ==========================================
  {
    id: 'ips-001',
    subject: 'ips',
    grade: 7,
    topic: 'Letak Geografis Indonesia',
    difficulty: 'easy',
    question: 'Secara geografis, Indonesia terletak di antara dua benua dan dua samudra, yaitu...',
    options: [
      'Benua Asia - Australia dan Samudra Hindia - Pasifik',
      'Benua Asia - Afrika dan Samudra Atlantik - Pasifik',
      'Benua Eropa - Asia dan Samudra Hindia - Atlantik',
      'Benua Amerika - Asia dan Samudra Arktik - Pasifik',
    ],
    correctAnswer: 0,
    explanation: 'Indonesia terletak di posisi silang strategis dunia antara Benua Asia dan Benua Australia, serta Samudra Hindia dan Samudra Pasifik.',
    hint: 'Benua di utara dan selatan Indonesia, serta samudra di barat dan timur.',
    source: 'local_bank',
  },
  {
    id: 'ips-002',
    subject: 'ips',
    grade: 7,
    topic: 'Interaksi Sosial & Pranata Sosial',
    difficulty: 'easy',
    question: 'Bentuk interaksi sosial asosiatif yang berupa usaha bersama antara orang perorangan atau kelompok untuk mencapai tujuan bersama disebut...',
    options: ['Akomodasi', 'Kerjasama (Kooperasi)', 'Asimilasi', 'Akulturasi'],
    correctAnswer: 1,
    explanation: 'Kerjasama adalah bentuk interaksi sosial asosiatif di mana pihak-pihak yang terlibat saling bahu-membahu untuk mencapai kepentingan bersama.',
    hint: 'Kata kuncinya adalah "usaha bersama untuk mencapai tujuan".',
    source: 'local_bank',
  },
  {
    id: 'ips-003',
    subject: 'ips',
    grade: 8,
    topic: 'Sejarah Kerajaan Hindu-Buddha Nusantara',
    difficulty: 'medium',
    question: 'Prasasti Yupa yang ditemukan di Muara Kaman, Kalimantan Timur, merupakan peninggalan dari kerajaan tertua di Indonesia, yaitu...',
    options: ['Kerajaan Tarumanegara', 'Kerajaan Kutai', 'Kerajaan Sriwijaya', 'Kerajaan Majapahit'],
    correctAnswer: 1,
    explanation: 'Prasasti Yupa beraksara Pallawa dan berbahasa Sanskerta berasal dari Kerajaan Kutai Martapura pada masa Raja Mulawarman (sekitar abad ke-4 Masehi).',
    hint: 'Raja terkenalnya bernama Mulawarman yang menyedekahkan 20.000 ekor sapi.',
    source: 'local_bank',
  },
  {
    id: 'ips-004',
    subject: 'ips',
    grade: 8,
    topic: 'Kerjasama Regional ASEAN',
    difficulty: 'medium',
    question: 'Deklarasi Bangkok yang menandai berdirinya organisasi ASEAN ditandatangani pada tanggal 8 Agustus 1967 oleh 5 negara pendiri. Wakil dari Indonesia saat itu adalah...',
    options: ['Ali Alatas', 'Adam Malik', 'Mohammad Hatta', 'Soedirman'],
    correctAnswer: 1,
    explanation: 'Menteri Luar Negeri Indonesia yang menandatangani Deklarasi Bangkok 1967 adalah H. Adam Malik bersama perwakilan dari Malaysia, Filipina, Singapura, dan Thailand.',
    hint: 'Tokoh diplomat ulung Indonesia yang pernah menjabat Menteri Luar Negeri dan Wakil Presiden.',
    source: 'local_bank',
  },
  {
    id: 'ips-005',
    subject: 'ips',
    grade: 9,
    topic: 'Ekonomi Internasional & Pasar Bebas',
    difficulty: 'hard',
    question: 'Pemberian subsidi, pengenaan tarif bea masuk, dan kuota impor merupakan instrumen dari kebijakan...',
    options: ['Perdagangan Bebas', 'Proteksionisme Perdagangan', 'Dumping', 'Devaluasi Mata Uang'],
    correctAnswer: 1,
    explanation: 'Proteksionisme adalah kebijakan ekonomi pemerintah untuk melindungi industri dan produsen dalam negeri dari persaingan produk impor luar negeri melalui tarif, kuota, dan subsidi.',
    hint: 'Tujuannya adalah memproteksi atau melindungi industri dalam negeri.',
    source: 'local_bank',
  },

  // ==========================================
  // BAHASA INDONESIA
  // ==========================================
  {
    id: 'ind-001',
    subject: 'indonesia',
    grade: 7,
    topic: 'Teks Deskripsi',
    difficulty: 'easy',
    question: 'Teks yang menggambarkan suatu objek secara rinci dan jelas sehingga pembaca seolah-olah dapat melihat, mendengar, atau merasakan sendiri apa yang dideskripsikan disebut...',
    options: ['Teks Narasi', 'Teks Deskripsi', 'Teks Prosedur', 'Teks Eksplanasi'],
    correctAnswer: 1,
    explanation: 'Teks deskripsi bertujuan menggambarkan objek secara jelas dan terperinci dengan melibatkan pancaindra pembaca.',
    hint: 'Berasal dari kata "deskripsi" yang artinya penggambaran.',
    source: 'local_bank',
  },
  {
    id: 'ind-002',
    subject: 'indonesia',
    grade: 7,
    topic: 'Ejaan dan Tanda Baca (EYD)',
    difficulty: 'easy',
    question: 'Penulisan huruf kapital yang tepat sesuai kaidah EYD terdapat pada kalimat...',
    options: [
      'Ibu membeli pisang Ambon di Pasar Baru.',
      'Kami mendaki Gunung Merbabu pada hari Minggu.',
      'Pak Ahmad menjabat sebagai Gubernur sejak Tahun lalu.',
      'Suku Jawa dan suku Sunda hidup rukun di pulau jawa.',
    ],
    correctAnswer: 1,
    explanation: 'Nama geografis (Gunung Merbabu) dan nama hari (Minggu) diawali huruf kapital. Pada pilihan A "pisang ambon" bukan nama jenis geografi (kecil). Pada pilihan C "gubernur" tanpa nama orang ditulis kecil. Pada pilihan D "Pulau Jawa" harus kapital.',
    hint: 'Nama unsur geografis yang diikuti nama diri (Gunung Merbabu) dan hari wajib kapital.',
    source: 'local_bank',
  },
  {
    id: 'ind-003',
    subject: 'indonesia',
    grade: 8,
    topic: 'Gaya Bahasa (Majas)',
    difficulty: 'medium',
    question: '"Angin malam berbisik lembut menyampaikan kerinduanku." Kalimat tersebut mengandung majas...',
    options: ['Hiperbola', 'Personifikasi', 'Metafora', 'Litotes'],
    correctAnswer: 1,
    explanation: 'Majas personifikasi adalah gaya bahasa yang melekatkan sifat-sifat manusia (dapat berbisik lembut) pada benda mati (angin malam).',
    hint: 'Benda tak bernyawa diberi tindakan seolah-olah bernyawa layaknya manusia.',
    source: 'local_bank',
  },
  {
    id: 'ind-004',
    subject: 'indonesia',
    grade: 8,
    topic: 'Unsur Intrinsik Cerita Pendek',
    difficulty: 'medium',
    question: 'Pesan moral atau pelajaran hidup yang ingin disampaikan oleh pengarang kepada pembaca melalui sebuah karya sastra disebut...',
    options: ['Tema', 'Latar', 'Amanat', 'Alur'],
    correctAnswer: 2,
    explanation: 'Amanat adalah nilai moral, nasihat, atau pesan luhur yang hendak disampaikan penulis kepada pembaca dalam cerita.',
    hint: 'Sinonim dengan pesan moral dalam sebuah dongeng atau cerpen.',
    source: 'local_bank',
  },
  {
    id: 'ind-005',
    subject: 'indonesia',
    grade: 9,
    topic: 'Teks Diskusi & Gagasan Utama',
    difficulty: 'hard',
    question: 'Bagian teks pidato persuasif yang berisi penguatan kembali gagasan pokok dan imbauan tindakan kepada pendengar terletak pada bagian...',
    options: ['Pembukaan', 'Isi Pidato', 'Argumen Pendukung', 'Penutup'],
    correctAnswer: 3,
    explanation: 'Bagian penutup pidato persuasif berisi simpulan, penegasan kembali pesan penting, permohonan maaf, serta ajakan/imbauan konkret kepada audiens.',
    hint: 'Tahap akhir sebuah orasi yang merangkum seruan kepada hadirin.',
    source: 'local_bank',
  },

  // ==========================================
  // BAHASA INGGRIS
  // ==========================================
  {
    id: 'eng-001',
    subject: 'inggris',
    grade: 7,
    topic: 'Simple Present Tense',
    difficulty: 'easy',
    question: 'My brother usually ... to school by bicycle every morning.',
    options: ['go', 'goes', 'going', 'went'],
    correctAnswer: 1,
    explanation: 'For singular third-person subject ("My brother" = He) in Simple Present Tense, add -es to verbs ending in -o (go -> goes).',
    hint: 'Subjek tunggal orang ketiga membutuhkan akhiran -s atau -es pada kata kerja.',
    source: 'local_bank',
  },
  {
    id: 'eng-002',
    subject: 'inggris',
    grade: 7,
    topic: 'Pronouns & Possessive Adjectives',
    difficulty: 'easy',
    question: 'Rina and Siti love reading. ... always visit the library during break time.',
    options: ['We', 'They', 'Them', 'Their'],
    correctAnswer: 1,
    explanation: '"Rina and Siti" is a plural third-person subject, which is replaced by the subjective pronoun "They".',
    hint: 'Kata ganti subjek untuk lebih dari satu orang (mereka).',
    source: 'local_bank',
  },
  {
    id: 'eng-003',
    subject: 'inggris',
    grade: 8,
    topic: 'Simple Past Tense',
    difficulty: 'medium',
    question: 'We ... an interesting historical museum in Yogyakarta last holiday.',
    options: ['visit', 'visited', 'have visited', 'visiting'],
    correctAnswer: 1,
    explanation: 'The time adverb "last holiday" indicates Simple Past Tense, so we use the regular past verb form (V2): "visited".',
    hint: 'Perhatikan penanda waktu "last holiday" (masa lampau).',
    source: 'local_bank',
  },
  {
    id: 'eng-004',
    subject: 'inggris',
    grade: 8,
    topic: 'Degrees of Comparison',
    difficulty: 'medium',
    question: 'Mount Everest is ... mountain in the world.',
    options: ['the highest', 'higher', 'highest', 'more high'],
    correctAnswer: 0,
    explanation: 'When comparing one entity against all others globally, use the superlative form: "the highest".',
    hint: 'Bentuk superlatif (paling tinggi) menggunakan "the" + akhiran "-est".',
    source: 'local_bank',
  },
  {
    id: 'eng-005',
    subject: 'inggris',
    grade: 9,
    topic: 'Passive Voice',
    difficulty: 'hard',
    question: 'Transform to passive voice: "Alexander Graham Bell invented the telephone in 1876."',
    options: [
      'The telephone is invented by Alexander Graham Bell in 1876.',
      'The telephone was invented by Alexander Graham Bell in 1876.',
      'The telephone has been invented by Alexander Graham Bell in 1876.',
      'The telephone was being invented by Alexander Graham Bell in 1876.',
    ],
    correctAnswer: 1,
    explanation: 'The active sentence is in Simple Past ("invented"). Passive structure: Object + was/were + Verb 3 (Past Participle) + by Subject -> "The telephone was invented by Alexander Graham Bell in 1876."',
    hint: 'Gunakan to be lampau "was" diikuti oleh kata kerja bentuk ketiga (V3).',
    source: 'local_bank',
  },
  {
    id: 'eng-006',
    subject: 'inggris',
    grade: 9,
    topic: 'Conjunctions (So that / In order to)',
    difficulty: 'hard',
    question: 'We should exercise regularly ... stay healthy and active.',
    options: ['in order to', 'so that', 'because', 'although'],
    correctAnswer: 0,
    explanation: '"In order to" is followed by a base verb phrase (stay healthy), whereas "so that" is followed by a complete clause with subject and modal verb.',
    hint: 'Gunakan "in order to" sebelum kata kerja dasar (infinitive).',
    source: 'local_bank',
  },
];

export function getLocalQuestions(subject: Subject, grade?: GradeLevel): Question[] {
  return QUESTION_BANK.filter((q) => {
    if (q.subject !== subject) return false;
    if (grade && q.grade !== grade) return false;
    return true;
  });
}

export function getRandomLocalQuestion(subject: Subject, grade?: GradeLevel, excludeIds: string[] = []): Question {
  let available = getLocalQuestions(subject, grade).filter((q) => !excludeIds.includes(q.id));
  if (available.length === 0) {
    // If all excluded, reset and pick from subject
    available = QUESTION_BANK.filter((q) => q.subject === subject);
  }
  if (available.length === 0) {
    // Fallback to any question in bank
    available = QUESTION_BANK;
  }
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}
