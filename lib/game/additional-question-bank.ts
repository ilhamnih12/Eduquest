import type { GradeLevel, Question, Subject } from '@/types/game';

/**
 * Offline coverage for the five expanded subjects. There is one question for
 * every grade/topic pair in curriculum.ts, so a failed AI request never sends
 * the player to an unrelated chapter.
 */
function q(
  id: string,
  subject: Subject,
  grade: GradeLevel,
  topic: string,
  stem: string,
  options: string[],
  correctAnswer: number,
  explanation: string,
  hint?: string
): Question {
  return {
    id,
    subject,
    grade,
    topic,
    difficulty: grade === 7 ? 'easy' : grade === 8 ? 'medium' : 'hard',
    question: stem,
    options,
    correctAnswer,
    explanation,
    hint,
    source: 'local_bank',
  };
}

export const ADDITIONAL_QUESTION_BANK: Question[] = [
  // -------------------------------------------------------------------------
  // Bahasa Jawa — Kelas 7
  // -------------------------------------------------------------------------
  q(
    'jawa-7-01', 'jawa', 7, 'Unggah-Ungguh Basa',
    'Konteks:\nSari arep matur marang Bu Guru yen sesuk ora bisa mlebu sekolah.\n\nPitakon:\nUkara endi sing paling trep miturut unggah-ungguh basa?',
    ['Aku sesuk ora mlebu, Bu.', 'Kula benjing mboten saged mlebet, Bu.', 'Kowe ngerti aku ora mlebu.', 'Aku mboten bisa mlebu ya.'],
    1,
    'Nalika matur marang guru, ragam krama luwih trep. “Kula benjing mboten saged mlebet” tegese “Saya besok tidak dapat masuk”.',
    'Gatekna sapa sing diajak guneman.'
  ),
  q(
    'jawa-7-02', 'jawa', 7, 'Crita Rakyat Jawa',
    'Wacan cekak:\nTimun Mas tetep wani lan nggunakake bekal saka pertapa nalika dikejar Buto Ijo.\n\nPitakon:\nPiwulang sing paling cocog saka kedadeyan kasebut yaiku ...',
    ['Masalah kudu diindhari terus', 'Wani lan usaha bisa mbantu ngadhepi bebaya', 'Bekal luwih penting tinimbang kepinteran', 'Wong gedhe mesthi menang'],
    1,
    'Tumindake Timun Mas nuduhake keberanian, usaha, lan kapinteran nalika ngadhepi masalah.',
    'Pilih nilai becik sing katon saka tumindake paraga.'
  ),
  q(
    'jawa-7-03', 'jawa', 7, 'Aksara Jawa Legena lan Sandhangan',
    'Pitakon:\nIng aksara Jawa, sandhangan wulu digunakake kanggo menehi swara ...',
    ['/a/', '/i/', '/u/', '/o/'],
    1,
    'Sandhangan wulu ngowahi swara dhasar aksara dadi swara /i/. Contone, aksara “si” nganggo wulu.',
    'Elinga sandhangan swara kanggo vokal i.'
  ),
  q(
    'jawa-7-04', 'jawa', 7, 'Teks Deskripsi Basa Jawa',
    'Ukara:\n“Pasar kuwi rame. Ambune rempah-rempah semerbak lan swara bakul padha saut-sautan.”\n\nPitakon:\nUkara kasebut kuwat dadi deskripsi amarga ...',
    ['mung nyebut jeneng papan', 'nggunakake rincian sing bisa dirasakake indra', 'isiné urutan langkah', 'ngandhut ajakan tuku'],
    1,
    'Teks deskripsi dadi urip amarga nyebut swara lan ambu sing bisa ditangkap pancaindra.',
    'Gatekna rincian ambu lan swara.'
  ),
  q(
    'jawa-7-05', 'jawa', 7, 'Tembang Macapat Pangkur',
    'Data:\nPangkur nduweni paugeran guru gatra 7.\n\nPitakon:\nApa tegese guru gatra 7?',
    ['Saben larik ana 7 wanda', 'Saben bait ana 7 larik', 'Tembang kudu dibaca 7 kaping', 'Swara pungkasané kudu kabeh padha'],
    1,
    'Guru gatra yaiku cacahing larik ing saben bait. Mula, guru gatra 7 tegese ana pitung larik saben bait.',
    'Gatra padha karo larik.'
  ),

  // Bahasa Jawa — Kelas 8
  q(
    'jawa-8-01', 'jawa', 8, 'Pacelathon lan Unggah-Ungguh',
    'Konteks:\nDimas takon marang simbah babagan kesehatané.\n\nPitakon:\nUkara pacelathon sing paling trep yaiku ...',
    ['Mbah, kowe lara apa?', 'Mbah, panjenengan gerah napa?', 'Mbah, awakmu piye?', 'Hei Mbah, sehat ora?'],
    1,
    'Tembung “panjenengan” lan “gerah” kalebu krama sing ngajeni simbah.',
    'Gunakake tembung sing ngajeni wong luwih tuwa.'
  ),
  q(
    'jawa-8-02', 'jawa', 8, 'Aksara Jawa lan Pasangan',
    'Pitakon:\nFungsi utama pasangan ing aksara Jawa yaiku ...',
    ['menehi angka ing ukara', 'mateni swara vokal aksara sadurunge supaya nyambung karo konsonan sabanjure', 'ngganti kabeh aksara dadi aksara Latin', 'menehi tandha pungkasan paragraf'],
    1,
    'Pasangan dipasang supaya vokal aksara sadurunge ora diwaca lan bisa disambung karo konsonan sabanjure.',
    'Pasangan gegayutan karo swara aksara sadurunge.'
  ),
  q(
    'jawa-8-03', 'jawa', 8, 'Geguritan',
    'Pethikan geguritan:\n“Esuk nggawa embun, nyiram pangarep-arep ing njero ati.”\n\nPitakon:\nTembung “nyiram pangarep-arep” digunakake kanggo ...',
    ['menehi teges harfiah yen ati kena banyu', 'nguwatake gambaran rasa lan pangarep-arep', 'nerangake cara nandur tanduran', 'nyebut wektu kanthi angka'],
    1,
    'Ungkapan kasebut minangka pilihan tembung kias sing nggawe rasa lan gambaran geguritan luwih kuwat.',
    'Ora kabeh tembung ing geguritan dimaknani kanthi harfiah.'
  ),
  q(
    'jawa-8-04', 'jawa', 8, 'Pawarta Basa Jawa',
    'Pawarta:\n“Dina Senin, para siswa nandur satus wit ing lapangan desa kanggo mengeti Dina Bumi.”\n\nPitakon:\nInformasi sing njawab unsur kapan yaiku ...',
    ['para siswa', 'satus wit', 'ing lapangan desa', 'dina Senin'],
    3,
    'Unsur kapan nerangake wektu kedadeyan. Ing pawarta kasebut, wektune yaiku dina Senin.',
    'Kapan = wektu.'
  ),
  q(
    'jawa-8-05', 'jawa', 8, 'Crita Wayang lan Piwulang',
    'Konteks:\nYudhistira kerep digambarake minangka paraga sing jujur lan netepi janji.\n\nPitakon:\nTuladha tumindak sing cocog karo watak kasebut yaiku ...',
    ['ngowahi asil lomba supaya menang', 'ngakoni kesalahan sanajan ana akibaté', 'meneng nalika kanca diapusi', 'janji tanpa niat netepi'],
    1,
    'Ngakoni kesalahan nuduhake kejujuran lan tanggung jawab, selaras karo watak Yudhistira.',
    'Pilih tumindak sing nuduhake jujur.'
  ),

  // Bahasa Jawa — Kelas 9
  q(
    'jawa-9-01', 'jawa', 9, 'Sesorah',
    'Konteks:\nRaka arep sesorah babagan kabersihan sekolah.\n\nPitakon:\nUrutan struktur sesorah sing runtut yaiku ...',
    ['isi – panutup – pambuka', 'pambuka – isi – panutup', 'panutup – pambuka – isi', 'salam – panutup – judhul'],
    1,
    'Sesorah umume diwiwiti pambuka lan salam, diterusake isi, banjur dipungkasi panutup.',
    'Miwiti kanthi salam lan mungkasi kanthi ringkesan utawa pangajab.'
  ),
  q(
    'jawa-9-02', 'jawa', 9, 'Aksara Murda, Swara, lan Rekan',
    'Pitakon:\nAksara murda utamane digunakake kanggo ...',
    ['nulis tandha angka', 'pakurmatan, kayata ing wiwitan jeneng wong utawa papan', 'mateni kabeh vokal', 'ngganti fungsi sandhangan'],
    1,
    'Aksara murda digunakake minangka pakurmatan, antarane kanggo jeneng wong, gelar, utawa papan yen aksarane kasedhiya.',
    'Fungsine mirip huruf kapital, nanging paugerane ora persis padha.'
  ),
  q(
    'jawa-9-03', 'jawa', 9, 'Ngripta Tembang Macapat',
    'Data:\nSawijining jinis macapat duwe guru wilangan 8 lan guru lagu a ing larik kapisan.\n\nPitakon:\nLarik kapisan sing digawe kudu ...',
    ['ana 8 wanda lan swara pungkasan a', 'ana 8 tembung lan diwiwiti a', 'ana 8 larik lan kabeh pungkasane a', 'ana 8 aksara Latin tanpa vokal'],
    0,
    'Guru wilangan ngatur cacah wanda, dene guru lagu ngatur swara vokal pungkasan larik.',
    'Wilangan = jumlah wanda; lagu = vokal pungkasan.'
  ),
  q(
    'jawa-9-04', 'jawa', 9, 'Pranatacara',
    'Konteks:\nIng acara pelepasan sekolah, susunané yaiku pambuka, sambutan, pagelaran, lan panutup.\n\nPitakon:\nTugas pranatacara sing paling bener yaiku ...',
    ['ngowahi urutan tanpa rembugan', 'nuntun saben bagean kanthi basa trep lan transisi cetha', 'menehi sambutan paling dawa', 'menilai pagelaran nalika acara'],
    1,
    'Pranatacara njaga acara lumaku runtut lan nyambungake saben bagean nganggo basa sing cocog karo kahanan.',
    'Pranatacara iku pemandu acara.'
  ),
  q(
    'jawa-9-05', 'jawa', 9, 'Teks Budaya Lokal Jawa',
    'Konteks:\nLoro artikel nerangake tradhisi Grebeg, nanging taun lan jumlah peserta sing ditulis beda.\n\nPitakon:\nTumindak paling trep sadurunge nulis ringkesan yaiku ...',
    ['milih angka sing paling gedhe', 'mbandhingake sumber lan mriksa informasi saka rujukan tepercaya', 'nyalin artikel sing luwih cekak', 'mbusak kabeh data'],
    1,
    'Informasi sing beda kudu diverifikasi kanthi mbandhingake sumber lan ngecek rujukan tepercaya.',
    'Aja langsung percaya yen sumber menehi data beda.'
  ),

  // -------------------------------------------------------------------------
  // Informatika — Kelas 7
  // -------------------------------------------------------------------------
  q(
    'informatika-7-01', 'informatika', 7, 'Berpikir Komputasional',
    'Konteks:\nKelasmu ingin membuat bazar. Tugas besar itu dibagi menjadi bagian tempat, makanan, promosi, dan keuangan.\n\nPertanyaan:\nLangkah berpikir komputasional ini disebut ...',
    ['abstraksi', 'dekomposisi', 'enkripsi', 'simulasi'],
    1,
    'Dekomposisi adalah memecah masalah besar menjadi bagian-bagian lebih kecil agar lebih mudah dikerjakan.',
    'Fokus pada tindakan “membagi masalah”.'
  ),
  q(
    'informatika-7-02', 'informatika', 7, 'Perangkat dan Sistem Komputer',
    'Data:\nKeyboard menerima ketikan, prosesor mengolahnya, dan monitor menampilkan hasil.\n\nPertanyaan:\nPerangkat yang bertugas melakukan pemrosesan utama adalah ...',
    ['keyboard', 'prosesor', 'monitor', 'speaker'],
    1,
    'Prosesor atau CPU menjalankan instruksi dan mengolah data. Keyboard adalah perangkat masukan, sedangkan monitor perangkat keluaran.',
    'Cari komponen yang menjalankan instruksi.'
  ),
  q(
    'informatika-7-03', 'informatika', 7, 'Data dan Representasi',
    'Data jumlah buku yang dibaca empat siswa:\nAyu: 2\nBima: 5\nCici: 3\nDoni: 5\n\nPertanyaan:\nRepresentasi visual paling cocok untuk membandingkan jumlah buku tiap siswa adalah ...',
    ['diagram batang', 'peta jalan', 'rekaman suara', 'paragraf panjang'],
    0,
    'Diagram batang memudahkan perbandingan nilai antar-kategori, dalam hal ini nama siswa.',
    'Kita ingin membandingkan tinggi nilai tiap kategori.'
  ),
  q(
    'informatika-7-04', 'informatika', 7, 'Internet Aman dan Etis',
    'Pertanyaan:\nKata sandi mana yang paling kuat?',
    ['budi123', 'password', 'Kopi!Langit7_Ungu', '01012012'],
    2,
    'Kata sandi yang panjang, unik, dan memadukan beberapa jenis karakter lebih sulit ditebak. Jangan memakai contoh ini persis untuk akunmu.',
    'Hindari nama, tanggal lahir, dan kata yang terlalu umum.'
  ),
  q(
    'informatika-7-05', 'informatika', 7, 'Dampak Sosial Informatika',
    'Konteks:\nSebuah foto memalukan tentang teman tersebar di grup tanpa izinnya.\n\nPertanyaan:\nTindakan paling bertanggung jawab adalah ...',
    ['meneruskannya agar ramai', 'menyimpan lalu mengunggah ulang', 'tidak menyebarkan, menghapus, dan melapor kepada orang dewasa tepercaya bila perlu', 'memberi komentar mengejek'],
    2,
    'Menghormati privasi berarti tidak ikut menyebarkan. Minta bantuan orang dewasa tepercaya jika konten merugikan atau perundungan berlanjut.',
    'Utamakan privasi dan keselamatan teman.'
  ),

  // Informatika — Kelas 8
  q(
    'informatika-8-01', 'informatika', 8, 'Algoritma dan Flowchart',
    'Algoritma membuat teh:\n1. Masukkan teh ke cangkir.\n2. Tuang air panas.\n3. Tunggu beberapa menit.\n4. Tambahkan gula sesuai selera.\n\nPertanyaan:\nCiri algoritma yang terlihat adalah ...',
    ['langkahnya berurutan dan jelas', 'hasilnya selalu berupa gambar', 'tidak memiliki awal', 'hanya bisa dijalankan komputer'],
    0,
    'Algoritma adalah urutan langkah yang jelas untuk menyelesaikan tugas. Algoritma juga bisa dijalankan manusia.',
    'Perhatikan nomor 1 sampai 4.'
  ),
  q(
    'informatika-8-02', 'informatika', 8, 'Pemrograman Berbasis Blok',
    'Konteks:\nSebuah sprite harus terus bergerak 10 langkah selama permainan berjalan.\n\nPertanyaan:\nBlok kontrol yang paling cocok membungkus perintah “gerak 10 langkah” adalah ...',
    ['jika ... maka', 'ulangi selamanya', 'tunggu 1 detik sekali saja', 'hentikan semua sebelum mulai'],
    1,
    'Perintah perlu dijalankan berulang tanpa batas selama program aktif, jadi gunakan blok “ulangi selamanya”.',
    'Kata kuncinya adalah “terus”.'
  ),
  q(
    'informatika-8-03', 'informatika', 8, 'Analisis Data',
    'Data waktu tempuh ke sekolah (menit):\n10, 12, 12, 15, 31\n\nPertanyaan:\nMedian data tersebut adalah ...',
    ['10', '12', '15', '16'],
    1,
    'Data sudah terurut. Dari lima nilai, nilai tengah atau nilai ketiga adalah 12.',
    'Median adalah nilai yang berada tepat di tengah setelah data diurutkan.'
  ),
  q(
    'informatika-8-04', 'informatika', 8, 'Jaringan Komputer dan Internet',
    'Pertanyaan:\nPerangkat yang mengarahkan paket data antarjaringan dan biasanya menghubungkan jaringan rumah ke internet adalah ...',
    ['router', 'scanner', 'proyektor', 'keyboard'],
    0,
    'Router memilih jalur dan meneruskan paket data dari satu jaringan ke jaringan lain.',
    'Namanya berkaitan dengan penentuan rute.'
  ),
  q(
    'informatika-8-05', 'informatika', 8, 'Kolaborasi Digital',
    'Konteks:\nKamu membagikan laporan kelompok kepada siswa kelas lain agar mereka hanya bisa membacanya.\n\nPertanyaan:\nHak akses paling tepat adalah ...',
    ['pemilik', 'editor', 'viewer/pembaca', 'administrator'],
    2,
    'Hak viewer mengizinkan orang membaca tanpa dapat mengubah isi dokumen. Ini mengikuti prinsip akses seperlunya.',
    'Mereka tidak perlu mengedit.'
  ),

  // Informatika — Kelas 9
  q(
    'informatika-9-01', 'informatika', 9, 'Struktur Data Sederhana',
    'Konteks:\nSistem antrean kantin melayani siswa sesuai urutan kedatangan: yang datang lebih dulu dilayani lebih dulu.\n\nPertanyaan:\nStruktur data yang sesuai adalah ...',
    ['stack (tumpukan)', 'queue (antrean)', 'tree (pohon)', 'set (himpunan)'],
    1,
    'Queue menerapkan prinsip FIFO: first in, first out. Data yang masuk lebih dulu keluar lebih dulu.',
    'Bayangkan antrean nyata di kasir.'
  ),
  q(
    'informatika-9-02', 'informatika', 9, 'Pemrograman Teks Dasar',
    'Kode semu:\n nilai = 78\n jika nilai >= 75:\n     tampilkan "Lulus"\n selain itu:\n     tampilkan "Belajar lagi"\n\nPertanyaan:\nKeluaran program adalah ...',
    ['75', '78', 'Lulus', 'Belajar lagi'],
    2,
    'Nilai 78 memenuhi kondisi nilai ≥ 75, sehingga cabang pertama dijalankan dan menampilkan “Lulus”.',
    'Uji apakah 78 memenuhi syarat.'
  ),
  q(
    'informatika-9-03', 'informatika', 9, 'Visualisasi dan Interpretasi Data',
    'Konteks:\nKamu ingin menunjukkan perubahan suhu harian selama 30 hari.\n\nPertanyaan:\nGrafik yang paling membantu melihat tren dari waktu ke waktu adalah ...',
    ['grafik garis', 'diagram lingkaran', 'piktogram acak', 'awan kata'],
    0,
    'Grafik garis cocok menunjukkan perubahan nilai secara berurutan sepanjang waktu.',
    'Cari grafik yang menyambungkan titik waktu.'
  ),
  q(
    'informatika-9-04', 'informatika', 9, 'Keamanan Data',
    'Konteks:\nKamu menerima pesan: “Akunmu diblokir! Klik tautan ini sekarang dan kirim kode OTP.”\n\nPertanyaan:\nRespons paling aman adalah ...',
    ['segera mengirim OTP', 'meneruskan pesan ke semua teman', 'tidak mengeklik tautan, lalu memeriksa akun lewat aplikasi/situs resmi', 'membalas dengan kata sandi'],
    2,
    'Pesan mendesak yang meminta OTP adalah tanda phishing. Jangan pernah membagikan OTP dan buka layanan lewat kanal resmi.',
    'OTP bersifat rahasia, bahkan dari orang yang mengaku petugas.'
  ),
  q(
    'informatika-9-05', 'informatika', 9, 'Proyek Lintas Bidang Informatika',
    'Konteks:\nTim membuat prototipe aplikasi pengingat sampah. Pengguna uji coba bingung menemukan tombol tambah jadwal.\n\nPertanyaan:\nLangkah berikutnya yang paling baik adalah ...',
    ['mengabaikan masukan karena aplikasi sudah jadi', 'memperbaiki rancangan tombol lalu menguji ulang', 'menghapus seluruh proyek', 'menyalahkan pengguna'],
    1,
    'Proyek informatika bersifat iteratif: gunakan hasil uji untuk memperbaiki solusi, lalu uji kembali apakah masalah sudah teratasi.',
    'Masukan pengguna adalah data untuk evaluasi.'
  ),

  // -------------------------------------------------------------------------
  // Seni Musik — Kelas 7
  // -------------------------------------------------------------------------
  q(
    'musik-7-01', 'musik', 7, 'Unsur-Unsur Musik',
    'Pertanyaan:\nIstilah yang menunjukkan cepat atau lambatnya sebuah lagu adalah ...',
    ['tempo', 'timbre', 'melodi', 'harmoni'],
    0,
    'Tempo adalah ukuran cepat-lambatnya musik. Timbre berarti warna bunyi, sedangkan melodi adalah rangkaian nada.',
    'Contohnya largo dan allegro.'
  ),
  q(
    'musik-7-02', 'musik', 7, 'Notasi Musik Dasar',
    'Data:\nDalam birama 4/4, satu not seperempat bernilai satu ketuk.\n\nPertanyaan:\nEmpat not seperempat mengisi ...',
    ['setengah birama', 'satu birama penuh', 'dua birama', 'empat birama'],
    1,
    'Birama 4/4 memiliki empat ketuk per birama. Empat not seperempat masing-masing satu ketuk, jadi totalnya empat ketuk.',
    'Jumlahkan 1 + 1 + 1 + 1 ketuk.'
  ),
  q(
    'musik-7-03', 'musik', 7, 'Pola Ritme',
    'Pola ketukan:\nTA — ta-ta — TA — ta-ta\n\nPertanyaan:\nAgar dimainkan kompak oleh kelompok, hal terpenting adalah ...',
    ['setiap orang memilih tempo sendiri', 'menjaga pulsa/ketukan dasar yang sama', 'memainkan nada setinggi mungkin', 'mengubah pola setiap putaran'],
    1,
    'Pulsa yang stabil menjadi acuan bersama agar pola ritme seluruh pemain tetap sinkron.',
    'Bayangkan ketukan metronom yang diikuti semua pemain.'
  ),
  q(
    'musik-7-04', 'musik', 7, 'Teknik Vokal Dasar',
    'Konteks:\nSaat bernyanyi, Naya kehabisan napas di tengah frase panjang.\n\nPertanyaan:\nLatihan dasar yang paling membantu adalah ...',
    ['menahan bahu setinggi mungkin', 'mengatur pernapasan diafragma dan menandai tempat mengambil napas', 'berteriak supaya suara kuat', 'menutup mulut saat artikulasi'],
    1,
    'Pernapasan terkontrol dan perencanaan titik napas membantu menyelesaikan frase tanpa memaksa suara.',
    'Atur napas, jangan memaksa tenggorokan.'
  ),
  q(
    'musik-7-05', 'musik', 7, 'Musik Tradisional Nusantara',
    'Pertanyaan:\nAlat musik angklung menghasilkan bunyi terutama ketika ...',
    ['digesek dengan busur', 'digoyangkan sehingga tabung bambunya bergetar', 'ditiup melalui lubang', 'dipetik senarnya'],
    1,
    'Angklung dimainkan dengan menggoyangkan rangkanya sehingga tabung-tabung bambu bergetar dan berbunyi.',
    'Alat ini terbuat dari rangkaian bambu.'
  ),

  // Seni Musik — Kelas 8
  q(
    'musik-8-01', 'musik', 8, 'Tangga Nada dan Harmoni',
    'Data:\nNada pembentuk akor C mayor adalah C, E, dan G.\n\nPertanyaan:\nJika dimainkan bersamaan, ketiga nada tersebut membentuk ...',
    ['ritme tanpa nada', 'harmoni akor C mayor', 'tanda birama', 'tempo allegro'],
    1,
    'Nada C–E–G yang dibunyikan bersama membentuk akor C mayor dan menghasilkan harmoni.',
    'Akor terbentuk dari beberapa nada yang dibunyikan bersama.'
  ),
  q(
    'musik-8-02', 'musik', 8, 'Bermain Ansambel',
    'Konteks:\nDalam latihan ansambel, suara keyboard terlalu keras hingga menutupi suling.\n\nPertanyaan:\nPerbaikan paling tepat adalah ...',
    ['keyboard bermain makin keras', 'mengatur dinamika dan saling mendengarkan agar seimbang', 'suling berhenti bermain', 'semua pemain memakai tempo berbeda'],
    1,
    'Ansambel memerlukan keseimbangan. Pemain perlu mengatur volume/dinamika sambil mendengarkan bagian lain.',
    'Tujuannya bukan menonjol sendiri, tetapi menyatu.'
  ),
  q(
    'musik-8-03', 'musik', 8, 'Bentuk dan Struktur Lagu',
    'Konteks:\nBagian lagu yang kembali dengan lirik dan melodi utama yang sama setelah setiap bait disebut ...',
    ['intro', 'reff/chorus', 'coda', 'interlude'],
    1,
    'Reff atau chorus adalah bagian yang berulang dan biasanya memuat gagasan utama lagu.',
    'Bagian ini sering paling mudah diingat.'
  ),
  q(
    'musik-8-04', 'musik', 8, 'Aransemen Sederhana',
    'Pertanyaan:\nManakah contoh aransemen sederhana yang tetap menjaga identitas lagu?',
    ['mengganti semua nada secara acak', 'mempertahankan melodi utama sambil mengubah pola iringan', 'menghapus melodi dan ritme', 'memainkan lagu lain bersamaan tanpa rencana'],
    1,
    'Aransemen dapat mengubah iringan, instrumen, tempo, atau dinamika sambil tetap mempertahankan unsur pengenal seperti melodi utama.',
    'Identitas lagu biasanya kuat pada melodinya.'
  ),
  q(
    'musik-8-05', 'musik', 8, 'Apresiasi Pertunjukan Musik',
    'Konteks:\nDua siswa menanggapi konser.\nA: “Jelek.”\nB: “Tempo kelompok sempat tidak stabil pada bagian tengah, tetapi dinamika penutupnya kompak.”\n\nPertanyaan:\nTanggapan yang lebih baik adalah ...',
    ['A, karena lebih singkat', 'B, karena menyebut pengamatan dan alasan yang jelas', 'A, karena tidak perlu bukti', 'keduanya sama karena penilaian tidak perlu sopan'],
    1,
    'Apresiasi yang baik spesifik, beralasan, dan disampaikan dengan sopan. Tanggapan B menunjukkan bagian yang diamati.',
    'Cari tanggapan yang bisa membantu pemain berkembang.'
  ),

  // Seni Musik — Kelas 9
  q(
    'musik-9-01', 'musik', 9, 'Kreasi dan Komposisi Musik',
    'Konteks:\nLina membuat motif empat nada, lalu mengulanginya satu nada lebih tinggi.\n\nPertanyaan:\nCara mengembangkan motif ini disebut ...',
    ['pengulangan dengan sekuens', 'menghapus seluruh motif', 'diam total', 'mengganti tempo secara acak'],
    0,
    'Sekuens mengulang pola melodi pada tingkat nada yang lebih tinggi atau lebih rendah.',
    'Polanya sama, tetapi titik nadanya bergeser.'
  ),
  q(
    'musik-9-02', 'musik', 9, 'Teknologi Musik',
    'Konteks:\nKelompokmu memakai cuplikan rekaman milik musisi lain untuk proyek video.\n\nPertanyaan:\nLangkah yang paling etis adalah ...',
    ['mengaku rekaman itu karya sendiri', 'memakai sumber berizin, mengikuti ketentuannya, dan memberi kredit', 'menghapus nama pencipta', 'mengunggah tanpa mengecek hak penggunaan'],
    1,
    'Karya audio memiliki hak penggunaan. Pilih materi dengan izin yang sesuai, patuhi lisensi, dan cantumkan kredit bila disyaratkan.',
    'Teknologi mudah menyalin, tetapi hak pencipta tetap perlu dihormati.'
  ),
  q(
    'musik-9-03', 'musik', 9, 'Produksi Pertunjukan Musik',
    'Konteks:\nLima menit sebelum pertunjukan, mikrofon vokal tidak mengeluarkan suara.\n\nPertanyaan:\nPencegahan yang seharusnya dilakukan tim produksi adalah ...',
    ['soundcheck dan pemeriksaan peralatan sebelum acara', 'menaikkan volume saat penonton masuk', 'mengganti lagu tanpa memberi tahu pemain', 'melewati latihan panggung'],
    0,
    'Soundcheck membantu mengecek jalur sinyal, level, mikrofon, dan monitor sebelum pertunjukan dimulai.',
    'Peralatan perlu diuji sebelum dipakai di depan penonton.'
  ),
  q(
    'musik-9-04', 'musik', 9, 'Kritik Musik',
    'Urutan kegiatan:\n1. Mendeskripsikan apa yang terdengar.\n2. Menganalisis unsur musik.\n3. Menafsirkan makna.\n4. Memberi penilaian beralasan.\n\nPertanyaan:\nMengapa penilaian diletakkan setelah pengamatan dan analisis?',
    ['agar kritik hanya berisi selera pribadi', 'agar penilaian didukung bukti dari karya', 'agar karya tidak perlu didengarkan', 'agar istilah musik dihindari'],
    1,
    'Kritik yang bertanggung jawab memakai pengamatan dan analisis sebagai dasar, bukan sekadar suka atau tidak suka.',
    'Bukti membuat pendapat lebih kuat.'
  ),
  q(
    'musik-9-05', 'musik', 9, 'Proyek Musik Nusantara',
    'Konteks:\nKelompok mengolah pola kendang lokal menjadi karya baru dengan instrumen sekolah.\n\nPertanyaan:\nAgar proyek tetap menghargai sumber budaya, kelompok sebaiknya ...',
    ['menyebut pola itu ciptaan mereka sendiri', 'mempelajari konteksnya, menyebut sumber inspirasi, dan mengolahnya dengan hormat', 'menggunakan stereotip tanpa riset', 'menghapus semua ciri lokal'],
    1,
    'Kreasi boleh berkembang, tetapi sumber budaya perlu dipahami, diakui, dan diperlakukan dengan hormat.',
    'Kreatif tidak berarti melupakan asal inspirasi.'
  ),

  // -------------------------------------------------------------------------
  // PJOK — Kelas 7
  // -------------------------------------------------------------------------
  q(
    'pjok-7-01', 'pjok', 7, 'Gerak Dasar Permainan Bola',
    'Konteks:\nDalam sepak bola, Rafi berlari mengejar bola lalu menendangnya ke teman.\n\nPertanyaan:\nGerak berlari dan menendang berturut-turut termasuk ...',
    ['nonlokomotor dan keseimbangan', 'lokomotor dan manipulatif', 'manipulatif dan nonlokomotor', 'kelenturan dan relaksasi'],
    1,
    'Berlari memindahkan posisi tubuh sehingga termasuk lokomotor. Menendang mengendalikan objek sehingga termasuk manipulatif.',
    'Bedakan perpindahan tubuh dan penguasaan benda.'
  ),
  q(
    'pjok-7-02', 'pjok', 7, 'Atletik Dasar',
    'Pertanyaan:\nSaat mendarat setelah lompat jauh, sikap yang membantu keselamatan adalah ...',
    ['lutut dikunci lurus dan badan condong ke belakang', 'kedua kaki mendarat bersama, lutut mengeper, badan dibawa ke depan', 'mendarat dengan satu tumit sambil memutar badan', 'menahan napas dan menutup mata'],
    1,
    'Lutut yang mengeper membantu meredam benturan, sedangkan badan ke depan mengurangi risiko jatuh ke belakang.',
    'Tubuh perlu menyerap benturan saat mendarat.'
  ),
  q(
    'pjok-7-03', 'pjok', 7, 'Senam Lantai',
    'Konteks:\nSiswa baru belajar guling depan.\n\nPertanyaan:\nLangkah keselamatan yang paling penting adalah ...',
    ['berlatih sendiri di lantai keras', 'menggunakan matras dan mengikuti pengawasan/instruksi guru', 'mencoba secepat mungkin tanpa pemanasan', 'menumpukan berat badan pada kepala'],
    1,
    'Gerakan senam perlu matras, pemanasan, teknik yang benar, dan pengawasan guru agar risiko cedera berkurang.',
    'Utamakan tempat dan pendamping latihan.'
  ),
  q(
    'pjok-7-04', 'pjok', 7, 'Aktivitas Gerak Berirama',
    'Pertanyaan:\nKemampuan yang paling dibutuhkan agar rangkaian gerak sesuai musik adalah ...',
    ['koordinasi gerak dan kepekaan terhadap irama', 'mendorong teman agar bergerak cepat', 'menahan gerak sepanjang lagu', 'mengabaikan hitungan'],
    0,
    'Gerak berirama menyelaraskan bagian tubuh dengan pulsa, hitungan, dan perubahan musik.',
    'Tubuh dan ketukan perlu bergerak selaras.'
  ),
  q(
    'pjok-7-05', 'pjok', 7, 'Pola Hidup Bersih dan Sehat',
    'Konteks:\nSetelah berolahraga, seragam Dito basah oleh keringat.\n\nPertanyaan:\nKebiasaan paling sehat adalah ...',
    ['tetap memakai pakaian basah seharian', 'membersihkan diri dan mengganti pakaian yang kering', 'berbagi handuk tanpa dicuci', 'tidak perlu minum'],
    1,
    'Membersihkan diri dan mengganti pakaian membantu menjaga kenyamanan dan kebersihan kulit setelah aktivitas fisik.',
    'Jaga tubuh tetap bersih dan kering.'
  ),

  // PJOK — Kelas 8
  q(
    'pjok-8-01', 'pjok', 8, 'Strategi Permainan Beregu',
    'Konteks:\nSaat bermain bola basket, dua pemain selalu mengejar bola sehingga area pertahanan kosong.\n\nPertanyaan:\nPerbaikan strategi yang tepat adalah ...',
    ['semua pemain tetap berkumpul di dekat bola', 'membagi peran dan menjaga ruang sesuai strategi tim', 'berhenti berkomunikasi', 'mengabaikan pemain lawan'],
    1,
    'Pembagian peran dan pemanfaatan ruang membuat serangan maupun pertahanan lebih teratur.',
    'Permainan beregu membutuhkan peran, ruang, dan komunikasi.'
  ),
  q(
    'pjok-8-02', 'pjok', 8, 'Aktivitas Air dan Keselamatan',
    'Pertanyaan:\nTindakan paling aman sebelum masuk kolam yang belum dikenal adalah ...',
    ['langsung melompat ke bagian terdalam', 'memeriksa kedalaman dan mengikuti petunjuk guru atau penjaga kolam', 'berlari di tepi kolam', 'berenang sendirian tanpa memberi tahu siapa pun'],
    1,
    'Kenali kedalaman, aturan, dan kondisi kolam. Aktivitas air perlu pengawasan orang yang kompeten dan tidak dilakukan sendirian.',
    'Jangan menebak kedalaman air.'
  ),
  q(
    'pjok-8-03', 'pjok', 8, 'Kebugaran Jasmani',
    'Data latihan:\nSenin: jalan cepat 20 menit\nRabu: jalan cepat 25 menit\nJumat: jalan cepat 25 menit\n\nPertanyaan:\nKomponen kebugaran yang terutama dilatih adalah ...',
    ['daya tahan jantung-paru', 'kecepatan reaksi tangan saja', 'kelentukan jari', 'kekuatan rahang'],
    0,
    'Aktivitas aerobik berkelanjutan seperti jalan cepat terutama melatih daya tahan jantung dan paru.',
    'Aktivitas dilakukan beberapa menit secara terus-menerus.'
  ),
  q(
    'pjok-8-04', 'pjok', 8, 'Bela Diri',
    'Pertanyaan:\nSikap yang sesuai saat mempelajari bela diri di sekolah adalah ...',
    ['menggunakan teknik untuk menakuti teman', 'disiplin, mengendalikan diri, dan mengikuti aturan keselamatan', 'mencoba teknik berbahaya tanpa pengawasan', 'menyerang lebih dulu saat berbeda pendapat'],
    1,
    'Bela diri mendidik disiplin, tanggung jawab, kontrol diri, dan penghormatan—bukan untuk mengintimidasi.',
    'Kekuatan harus disertai tanggung jawab.'
  ),
  q(
    'pjok-8-05', 'pjok', 8, 'Gizi Seimbang',
    'Konteks:\nSetelah latihan, Tia ingin memilih makan siang.\n\nPertanyaan:\nPilihan yang paling mendekati prinsip gizi seimbang adalah ...',
    ['hanya minuman manis', 'nasi, lauk berprotein, sayur, buah, dan air putih dengan porsi wajar', 'keripik satu bungkus besar', 'hanya saus dan nasi'],
    1,
    'Menu beragam membantu memenuhi kebutuhan karbohidrat, protein, vitamin, mineral, serat, dan cairan.',
    'Pilih makanan yang beragam, bukan satu jenis saja.'
  ),

  // PJOK — Kelas 9
  q(
    'pjok-9-01', 'pjok', 9, 'Taktik Permainan Olahraga',
    'Konteks:\nDalam pertandingan, lawan menjaga area tengah dengan rapat tetapi sisi lapangan terbuka.\n\nPertanyaan:\nPilihan taktik yang masuk akal adalah ...',
    ['terus memaksa lewat tengah', 'memanfaatkan lebar lapangan dan mengalirkan bola ke sisi terbuka', 'berhenti bergerak', 'melanggar lawan agar ruang terbuka'],
    1,
    'Taktik dipilih berdasarkan ruang. Memindahkan serangan ke area yang tidak padat dapat membuka peluang secara sportif.',
    'Cari ruang yang tidak dijaga rapat.'
  ),
  q(
    'pjok-9-02', 'pjok', 9, 'Program Latihan Kebugaran',
    'Data tujuan:\nMeningkatkan daya tahan dengan aman.\n\nRencana mana yang paling baik?',
    ['latihan sangat berat setiap hari tanpa istirahat', 'latihan aerobik teratur, intensitas bertahap, diselingi pemulihan', 'latihan sekali setahun selama lima jam', 'meniru program atlet dewasa tanpa penyesuaian'],
    1,
    'Latihan perlu teratur dan progresif, tetapi tetap memberi waktu pemulihan serta disesuaikan dengan kondisi individu.',
    'Konsisten dan bertahap lebih aman daripada mendadak ekstrem.'
  ),
  q(
    'pjok-9-03', 'pjok', 9, 'Pencegahan Cedera dan P3K',
    'Konteks:\nSaat latihan, temanmu jatuh dan mengeluh nyeri hebat pada pergelangan kaki serta tidak sanggup berdiri.\n\nPertanyaan:\nTindakan awal paling tepat adalah ...',
    ['memaksanya berjalan agar terbiasa', 'hentikan aktivitas, jangan memaksa bagian cedera, dan panggil guru/petugas yang terlatih', 'memijat kuat bagian yang sakit', 'membiarkannya sendirian'],
    1,
    'Nyeri hebat dan tidak mampu berdiri perlu ditangani hati-hati. Hentikan aktivitas dan cari bantuan orang dewasa atau petugas terlatih.',
    'Jangan membuat cedera bertambah parah.'
  ),
  q(
    'pjok-9-04', 'pjok', 9, 'Kesehatan Remaja',
    'Konteks:\nSeorang remaja mendapat informasi kesehatan yang meragukan dari video anonim.\n\nPertanyaan:\nLangkah paling tepat adalah ...',
    ['langsung mencoba semua sarannya', 'memeriksa ke sumber kesehatan resmi dan bertanya kepada orang dewasa/profesional tepercaya', 'menyebarkannya tanpa mengecek', 'menganggap semua informasi daring pasti benar'],
    1,
    'Informasi kesehatan perlu diverifikasi melalui sumber resmi atau profesional tepercaya, bukan hanya popularitas sebuah video.',
    'Cari sumber yang jelas penulis dan keahliannya.'
  ),
  q(
    'pjok-9-05', 'pjok', 9, 'Proyek Gaya Hidup Aktif',
    'Konteks:\nAri jarang bergerak dan ingin mulai lebih aktif.\n\nTarget mana yang paling realistis dan terukur?',
    ['langsung lari maraton besok', 'jalan cepat 20 menit, tiga kali seminggu, lalu mengevaluasi setelah dua minggu', 'berolahraga kalau ingat saja', 'tidak pernah beristirahat'],
    1,
    'Target tersebut spesifik, terukur, realistis untuk awal, memiliki jadwal, dan dapat dievaluasi sebelum ditingkatkan.',
    'Pilih target yang punya kegiatan, durasi, frekuensi, dan waktu evaluasi.'
  ),

  // -------------------------------------------------------------------------
  // Pendidikan Pancasila — Kelas 7
  // -------------------------------------------------------------------------
  q(
    'pkn-7-01', 'pkn', 7, 'Nilai-Nilai Pancasila',
    'Konteks:\nWarga sekolah mengumpulkan bantuan secara sukarela untuk teman yang terkena musibah tanpa membeda-bedakan latar belakang.\n\nPertanyaan:\nTindakan itu paling jelas mencerminkan nilai ...',
    ['kemanusiaan dan kepedulian', 'persaingan tanpa aturan', 'kepentingan pribadi', 'pemaksaan kehendak'],
    0,
    'Membantu sesama dengan adil dan beradab menunjukkan kepedulian terhadap martabat manusia.',
    'Fokus pada sikap menolong siapa pun yang membutuhkan.'
  ),
  q(
    'pkn-7-02', 'pkn', 7, 'Norma dan UUD NRI Tahun 1945',
    'Pertanyaan:\nMengapa aturan kelas perlu disepakati dan dipatuhi?',
    ['agar satu siswa bebas menghukum siapa saja', 'agar kegiatan belajar tertib dan hak setiap siswa terlindungi', 'agar guru tidak perlu mengajar', 'agar pendapat siswa dilarang'],
    1,
    'Aturan yang adil membantu menciptakan ketertiban, kepastian, dan perlindungan hak sekaligus mengingatkan kewajiban.',
    'Aturan yang baik menjaga kepentingan bersama.'
  ),
  q(
    'pkn-7-03', 'pkn', 7, 'Bhinneka Tunggal Ika',
    'Konteks:\nKelompok tugas terdiri atas siswa dengan bahasa daerah dan kebiasaan berbeda.\n\nPertanyaan:\nSikap sesuai Bhinneka Tunggal Ika adalah ...',
    ['hanya menerima ide dari kelompok sendiri', 'saling menghargai perbedaan dan bekerja menuju tujuan bersama', 'mengejek logat teman', 'memisahkan anggota berdasarkan asal'],
    1,
    'Bhinneka Tunggal Ika mengajak kita mengakui keberagaman sambil tetap membangun persatuan.',
    'Berbeda tidak menghalangi kerja sama.'
  ),
  q(
    'pkn-7-04', 'pkn', 7, 'Wilayah dan Keutuhan NKRI',
    'Pertanyaan:\nSebagai pelajar, tindakan sederhana yang membantu menjaga keutuhan NKRI adalah ...',
    ['menyebarkan kabar yang memecah belah', 'menghormati teman dari daerah lain dan memeriksa informasi sebelum membagikannya', 'menganggap budaya sendiri paling tinggi', 'menolak kerja kelompok lintas kelas'],
    1,
    'Menghargai sesama dan tidak menyebarkan informasi pemecah belah membantu merawat persatuan dalam kehidupan sehari-hari.',
    'Persatuan dimulai dari interaksi sehari-hari.'
  ),
  q(
    'pkn-7-05', 'pkn', 7, 'Hak dan Kewajiban',
    'Konteks:\nSetiap siswa berhak memakai perpustakaan.\n\nPertanyaan:\nKewajiban yang seimbang dengan hak tersebut adalah ...',
    ['mencoret buku sesuka hati', 'menjaga buku dan menaati aturan peminjaman', 'menyimpan semua buku di rumah', 'melarang siswa lain membaca'],
    1,
    'Hak menggunakan fasilitas diikuti kewajiban menjaga fasilitas dan menghormati hak pengguna lain.',
    'Hak dan kewajiban berjalan bersama.'
  ),

  // Pendidikan Pancasila — Kelas 8
  q(
    'pkn-8-01', 'pkn', 8, 'Kedudukan Pancasila',
    'Pertanyaan:\nPancasila disebut dasar negara karena ...',
    ['hanya digunakan saat upacara', 'menjadi landasan penyelenggaraan negara dan sumber nilai bagi pembentukan aturan', 'berisi jadwal kegiatan pemerintah', 'hanya berlaku untuk pejabat'],
    1,
    'Sebagai dasar negara, Pancasila menjadi landasan penyelenggaraan kehidupan bernegara dan nilai bagi hukum serta kebijakan.',
    'Dasar berarti landasan utama.'
  ),
  q(
    'pkn-8-02', 'pkn', 8, 'Konstitusi dan Peraturan',
    'Konteks:\nSebuah peraturan sekolah tidak boleh bertentangan dengan peraturan yang kedudukannya lebih tinggi.\n\nPertanyaan:\nPrinsip yang ditunjukkan adalah ...',
    ['aturan yang lebih rendah perlu selaras dengan aturan yang lebih tinggi', 'semua aturan bebas saling bertentangan', 'aturan lisan selalu paling tinggi', 'setiap orang boleh memilih hukum sendiri'],
    0,
    'Tata aturan membutuhkan keselarasan. Ketentuan yang lebih rendah tidak boleh bertentangan dengan ketentuan di atasnya.',
    'Bayangkan susunan bertingkat.'
  ),
  q(
    'pkn-8-03', 'pkn', 8, 'Merawat Keberagaman',
    'Konteks:\nPanitia memilih anggota pentas hanya dari satu suku, padahal siswa lain memiliki kemampuan yang sesuai.\n\nPertanyaan:\nPerbaikan paling adil adalah ...',
    ['mempertahankan pilihan berdasarkan suku', 'memilih berdasarkan kriteria kemampuan yang terbuka dan tidak diskriminatif', 'membatalkan pentas selamanya', 'menyembunyikan kriteria pemilihan'],
    1,
    'Kesempatan seharusnya diberikan berdasarkan kriteria yang relevan dan transparan, bukan identitas suku.',
    'Keberagaman perlu dirawat dengan perlakuan yang adil.'
  ),
  q(
    'pkn-8-04', 'pkn', 8, 'Demokrasi dan Musyawarah',
    'Konteks:\nDalam rapat kelas, ada dua usul tujuan karya wisata.\n\nPertanyaan:\nProses musyawarah yang sehat adalah ...',
    ['ketua memutuskan sebelum mendengar siapa pun', 'setiap pihak menyampaikan alasan, saling mendengar, lalu mencari keputusan yang dapat dipertanggungjawabkan', 'kelompok terbanyak mengejek kelompok lain', 'rapat dihentikan saat ada perbedaan'],
    1,
    'Musyawarah memerlukan kesempatan berpendapat, sikap saling menghargai, dan orientasi pada kepentingan bersama.',
    'Perbedaan pendapat bukan alasan untuk saling merendahkan.'
  ),
  q(
    'pkn-8-05', 'pkn', 8, 'Semangat Persatuan',
    'Pertanyaan:\nMakna penting Sumpah Pemuda bagi persatuan adalah ...',
    ['menghapus seluruh budaya daerah', 'menegaskan satu tanah air, satu bangsa, dan bahasa persatuan di tengah keberagaman', 'membatasi pertemanan antardaerah', 'mengutamakan kepentingan kelompok kecil'],
    1,
    'Sumpah Pemuda meneguhkan identitas bersama Indonesia tanpa berarti menghapus kekayaan budaya daerah.',
    'Bersatu tidak sama dengan menjadi seragam.'
  ),

  // Pendidikan Pancasila — Kelas 9
  q(
    'pkn-9-01', 'pkn', 9, 'Pancasila di Era Digital',
    'Konteks:\nKamu berbeda pendapat dalam kolom komentar.\n\nPertanyaan:\nTindakan yang sesuai nilai Pancasila adalah ...',
    ['menyerang identitas orang lain', 'menyampaikan alasan dengan sopan, memeriksa fakta, dan menghargai martabat lawan bicara', 'menyebarkan data pribadinya', 'mengajak orang lain melakukan perundungan'],
    1,
    'Ruang digital tetap memerlukan sikap beradab, bertanggung jawab, menghargai manusia, dan tidak memecah persatuan.',
    'Etika tetap berlaku walau interaksi terjadi lewat layar.'
  ),
  q(
    'pkn-9-02', 'pkn', 9, 'Partisipasi Warga Negara',
    'Konteks:\nTaman dekat sekolah kotor dan tempat sampahnya rusak.\n\nPertanyaan:\nBentuk partisipasi pelajar yang konstruktif adalah ...',
    ['merusak fasilitas lain sebagai protes', 'mengumpulkan data, mengusulkan solusi lewat jalur yang tepat, dan ikut kerja bakti', 'menyebarkan tuduhan tanpa bukti', 'membiarkan karena bukan milik pribadi'],
    1,
    'Partisipasi yang baik berbasis masalah nyata, dilakukan secara damai, dan menawarkan kontribusi atau solusi.',
    'Kritik akan lebih berguna jika disertai data dan solusi.'
  ),
  q(
    'pkn-9-03', 'pkn', 9, 'Hak Asasi Manusia',
    'Pertanyaan:\nPernyataan yang paling tepat tentang hak asasi manusia adalah ...',
    ['hak hanya dimiliki orang dewasa', 'setiap manusia memiliki martabat dan hak dasar yang perlu dihormati bersama', 'hak dapat digunakan untuk merampas hak orang lain', 'hak bergantung pada popularitas'],
    1,
    'HAM melekat pada manusia. Pelaksanaannya juga menghormati hak orang lain dan tanggung jawab dalam kehidupan bersama.',
    'Kata kuncinya adalah martabat setiap manusia.'
  ),
  q(
    'pkn-9-04', 'pkn', 9, 'Bela Negara dan NKRI',
    'Pertanyaan:\nManakah contoh bela negara yang sesuai peran pelajar?',
    ['belajar sungguh-sungguh, menaati aturan yang adil, dan menjaga persatuan', 'memaksa teman mengikuti semua pendapatnya', 'menyebarkan rahasia dan hoaks', 'menghindari seluruh tanggung jawab sekolah'],
    0,
    'Bela negara tidak selalu berbentuk kegiatan militer. Pelajar dapat berkontribusi melalui belajar, disiplin, kepedulian, dan persatuan.',
    'Pilih tindakan nyata yang sesuai usia dan peran siswa.'
  ),
  q(
    'pkn-9-05', 'pkn', 9, 'Proyek Gotong Royong',
    'Konteks:\nKelas ingin mengurangi sampah sekali pakai.\n\nLangkah proyek:\n1. Mengukur jenis dan jumlah sampah.\n2. Menentukan target bersama.\n3. Membagi peran.\n4. Menjalankan aksi.\n\nPertanyaan:\nLangkah evaluasi yang tepat setelah aksi adalah ...',
    ['menganggap proyek pasti berhasil tanpa data', 'mengukur kembali sampah dan membandingkannya dengan data awal serta target', 'menyalahkan satu orang', 'menghapus catatan proyek'],
    1,
    'Evaluasi memerlukan data sesudah aksi untuk dibandingkan dengan kondisi awal dan target. Hasilnya dipakai memperbaiki langkah berikutnya.',
    'Gunakan ukuran yang sama sebelum dan sesudah aksi.'
  ),
];
