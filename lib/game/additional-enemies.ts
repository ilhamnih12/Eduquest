import type { Enemy, GradeLevel, Subject } from '@/types/game';

type ExpandedSubject = Extract<Subject, 'jawa' | 'informatika' | 'musik' | 'pjok' | 'pkn'>;

type EnemyTheme = readonly [
  id: string,
  name: string,
  title: string,
  avatar: string,
  description: string,
  escapeRoast: string,
];

const THEMES: Record<ExpandedSubject, Record<GradeLevel, readonly EnemyTheme[]>> = {
  jawa: {
    7: [
      ['krama-kobold', 'Kobold Krama Kesasar', 'Salah Unggah-Ungguh Terus', '🗣️', 'Kobold sing kerep ketuker ngoko lan krama nalika guneman.', 'Lho, durung takon pamit kok wis mlayu? Unggah-ungguhmu ketinggalan!'],
      ['aksara-wisp', 'Wisp Aksara Legena', 'Siluman Sandhangan Wulu', 'ꦲ', 'Roh aksara sing mabur nggawa sandhangan swara.', 'Mlayumu cepet, nanging maca aksara Jawa isih alon, ya!'],
      ['pangkur-bird', 'Manuk Pangkur Palsu', 'Pengacak Guru Gatra', '🐦', 'Manuk nakal sing seneng ngowahi paugeran tembang macapat.', 'Pitung gatraku durung rampung, kok kowe wis ilang dhisik?'],
    ],
    8: [
      ['pasangan-spider', 'Angga-Angga Pasangan', 'Pemutus Aksara Sambung', '🕷️', 'Laba-laba aksara sing njaring pasangan ing saben ukara.', 'Pasanganku akeh, nanging pasangan wani gelutmu ora ana!'],
      ['geguritan-ghost', 'Memedi Geguritan', 'Pencuri Pilihan Tembung', '👻', 'Memedi puisi Jawa sing ndhelik ing ukara kias.', 'Larikku durung medeni, kok kowe wis dadi memedi sing ngilang?'],
      ['wayang-rakshasa', 'Raseksa Kelir Wayang', 'Pengacak Piwulang', '🎭', 'Raseksa saka balik kelir sing seneng mbalik watak paraga.', 'Crita wayang ana lakoné, lakonmu kok mung metu panggung?'],
    ],
    9: [
      ['sesorah-troll', 'Troll Sesorah Dawa', 'Ora Kenal Panutup', '🎙️', 'Troll sing sesorahé muter-muter tanpa panutup.', 'Aku wae durung tekan panutup, kowe kok wis pamit dhewe!'],
      ['murda-knight', 'Satriya Aksara Murda', 'Penjaga Jeneng Agung', '🔱', 'Satriya sing njaga aksara murda, swara, lan rekan.', 'Aksara Murda kanggo pakurmatan, dudu kanggo nulis jeneng pengecut!'],
      ['pranatacara-djinn', 'Jin Pranatacara', 'Pengacak Urutan Adicara', '🧞', 'Jin pemandu acara sing sengaja ngacak susunan adicara.', 'Adicara sabanjure: pahlawan mlayu tanpa salam panutup!'],
    ],
  },
  informatika: {
    7: [
      ['bug-byte', 'Bug Si Pengunyah Byte', 'Perusak Pola Algoritma', '🐛', 'Bug kecil yang membuat langkah solusi berantakan.', 'Baru ketemu satu bug sudah kabur? Program keberanianmu perlu diperbarui!'],
      ['phishing-piranha', 'Piranha Phishing', 'Pemancing Kata Sandi', '🎣', 'Monster pesan palsu yang selalu meminta kata sandi dan OTP.', 'Tenang, aku tidak minta OTP—cukup bukti kalau kamu berani balik lagi!'],
      ['cpu-goblin', 'Goblin CPU Panas', 'Pemroses Kekacauan', '🖥️', 'Goblin yang membuat prosesor bekerja tanpa henti.', 'Prosesormu belum panas, kok sudah masuk mode tidur?'],
    ],
    8: [
      ['loop-serpent', 'Ular Loop Selamanya', 'Pengulang Tanpa Henti', '🐍', 'Ular kode yang terjebak dalam perulangan tak berujung.', 'Kabur, balik, kabur lagi—wah, kamu juga masuk loop!'],
      ['router-golem', 'Golem Router Tersesat', 'Pengacak Jalur Paket', '📡', 'Golem jaringan yang mengirim semua paket ke rute yang salah.', 'Paket datamu punya tujuan; langkahmu kok menuju pintu keluar?'],
      ['spreadsheet-mimic', 'Mimic Spreadsheet', 'Pemakan Rumus Data', '📊', 'Tabel hidup yang menyembunyikan pola di balik sel-selnya.', 'Aku baru buka satu sel, kamu sudah menutup seluruh lembar kerja!'],
    ],
    9: [
      ['stack-ogre', 'Ogre Stack Overflow', 'Penumpuk Tanpa Batas', '🧌', 'Ogre yang menumpuk data sampai menembus batas memori.', 'Keberanianmu di-pop duluan dari stack, ya?'],
      ['cipher-specter', 'Specter Sandi Gelap', 'Penjaga Data Terenkripsi', '🔐', 'Roh keamanan yang menyamarkan setiap pesan rahasia.', 'Kunci keberanianmu lupa disimpan di password manager?'],
      ['prototype-mech', 'Mecha Prototipe Gagal', 'Raja Bug Iteratif', '🤖', 'Robot proyek yang terus diperbaiki setiap selesai diuji.', 'Aku saja mau diuji ulang. Kamu kok gagal sekali langsung uninstall diri?'],
    ],
  },
  musik: {
    7: [
      ['tempo-slime', 'Slime Tempo Loyo', 'Pengulur Ketukan', '🎵', 'Slime yang membuat setiap lagu melambat tanpa aba-aba.', 'Temponya largo, tapi larinya prestissimo! Curang juga kamu.'],
      ['notasi-bat', 'Kelelawar Notasi', 'Pemakan Tanda Istirahat', '🎼', 'Kelelawar yang menghapus not dan tanda istirahat dari partitur.', 'Itu bukan tanda istirahat—kamu benar-benar meninggalkan panggung!'],
      ['angklung-sprite', 'Sprite Angklung Sumbang', 'Penggoyang Nada', '🎋', 'Peri bambu yang menggoyangkan angklung di nada yang salah.', 'Angklungku saja tetap satu ansambel, kamu kok solo kabur?'],
    ],
    8: [
      ['chord-hydra', 'Hydra Akor Fals', 'Tiga Kepala Harmoni', '🐉', 'Hydra tiga nada yang tidak pernah sepakat membentuk akor.', 'Tiga kepalaku kompak. Dua kakimu malah sepakat buat kabur!'],
      ['ensemble-golem', 'Golem Ansambel', 'Penutup Suara Kawan', '🥁', 'Pemain perkusi batu yang selalu terlalu keras.', 'Belum soundcheck sudah check out dari arena?'],
      ['chorus-siren', 'Siren Reff Berulang', 'Ratu Chorus Tanpa Henti', '🧜', 'Siren yang mengulang bagian reff sampai semua lupa baitnya.', 'Reff-ku bakal kembali. Semoga keberanianmu juga!'],
    ],
    9: [
      ['waveform-witch', 'Penyihir Waveform', 'Penyunting Suara Gelap', '🎧', 'Penyihir studio yang memotong dan menyambung gelombang audio.', 'Suara langkah kaburmu terekam jernih—mau kubuat remix?'],
      ['stage-dragon', 'Naga Panggung', 'Pembakar Soundcheck', '🎤', 'Naga pertunjukan yang membuat kabel dan mikrofon kacau.', 'Baru lampu panggung menyala, bintang utamanya sudah pulang!'],
      ['critic-phantom', 'Phantom Kritikus', 'Pemberi Nilai Pedas', '🧐', 'Hantu penonton yang memberi kritik tanpa bukti.', 'Kritikku spesifik: teknik kaburmu rapi, teknik bertarungmu belum terlihat!'],
    ],
  },
  pjok: {
    7: [
      ['ball-beast', 'Monster Bola Liar', 'Penggiring Tanpa Arah', '⚽', 'Bola buas yang memantul ke seluruh penjuru lapangan.', 'Gerak lokomotormu hebat—sayang arahnya menjauh dari pertandingan!'],
      ['sprint-goblin', 'Goblin Start Curang', 'Pelari Sebelum Aba-Aba', '🏃', 'Goblin atletik yang selalu berlari sebelum peluit.', 'Wah, start kaburmu cepat. Sekarang coba finis di arena!'],
      ['mat-troll', 'Troll Matras Terbalik', 'Pengacau Senam Lantai', '🤸', 'Troll yang menggulung matras tepat sebelum latihan.', 'Guling depan belum, gulung tikar duluan sudah!'],
    ],
    8: [
      ['team-ogre', 'Ogre Antioperan', 'Pemain Paling Egois', '🏀', 'Ogre yang tidak pernah mau mengoper bola kepada tim.', 'Aku memang tidak mau mengoper, tapi kamu malah mengoper kemenangan kepadaku!'],
      ['pool-kraken', 'Kraken Kolam Dangkal', 'Pelanggar Aturan Air', '🐙', 'Kraken yang suka berlari di tepi kolam licin.', 'Kamu aman karena menjauh dari air, tapi masa dari soal juga?'],
      ['fitness-golem', 'Golem Beban Berlebih', 'Pelatih Tanpa Pemulihan', '🏋️', 'Golem yang lupa bahwa tubuh juga perlu waktu pulih.', 'Istirahat itu penting, tapi bukan berarti kabur satu musim!'],
    ],
    9: [
      ['tactic-fox', 'Rubah Taktik Licin', 'Pembaca Ruang Lapangan', '🦊', 'Rubah yang selalu menemukan ruang kosong dalam pertahanan.', 'Aku melihat ruang kosong—ternyata bekas tempatmu berdiri!'],
      ['injury-specter', 'Specter Cedera Palsu', 'Musuh Pemanasan', '🩹', 'Roh yang muncul setiap kali seseorang melewatkan pemanasan.', 'Kabur tanpa pemanasan? Besok betismu yang kasih roast!'],
      ['couch-dragon', 'Naga Sofa Rebahan', 'Penguasa Gaya Mager', '🛋️', 'Naga yang mengajak semua orang melupakan hidup aktif.', 'Akhirnya ada teman rebahan—eh, kamu cuma lewat dan kabur!'],
    ],
  },
  pkn: {
    7: [
      ['norma-gremlin', 'Gremlin Pelanggar Norma', 'Pengacak Aturan Bersama', '📜', 'Gremlin yang mengira semua aturan boleh dipilih sesuka hati.', 'Hakmu memang boleh kabur, tapi kewajiban menyelesaikan soal ke mana?'],
      ['bhinneka-chimera', 'Chimera Bhinneka', 'Banyak Rupa Satu Monster', '🦁', 'Makhluk beragam rupa yang lupa cara hidup rukun.', 'Aku saja banyak rupa tetap satu badan. Kamu satu badan kok pecah fokus?'],
      ['border-golem', 'Golem Penjaga NKRI', 'Penjaga Pulau Batu', '🗺️', 'Golem peta yang menjaga persatuan setiap pulau.', 'Dari Sabang sampai Merauke, cuma kamu yang larinya paling jauh!'],
    ],
    8: [
      ['constitution-titan', 'Titan Konstitusi', 'Penyusun Aturan Terbalik', '⚖️', 'Titan yang menaruh aturan rendah di atas aturan tinggi.', 'Aturannya jelas: yang kabur wajib dengar aku tertawa dulu!'],
      ['debate-sphinx', 'Sphinx Musyawarah', 'Pemotong Pendapat', '🗿', 'Sphinx yang bertanya tetapi tidak pernah mau mendengar jawaban.', 'Musyawarah belum mufakat, kakimu sudah mengambil keputusan sepihak!'],
      ['unity-wolf', 'Serigala Persatuan', 'Pemecah Satu Kawanan', '🐺', 'Serigala yang suka memecah kelompok menjadi kubu-kubu kecil.', 'Katanya bersatu kita teguh, kok kamu bubar seorang diri?'],
    ],
    9: [
      ['hoax-specter', 'Specter Hoaks Digital', 'Penyebar Kabar Tanpa Fakta', '📱', 'Roh media sosial yang hidup dari berita palsu dan amarah.', 'Kabar terbaru: seorang pahlawan kabur. Sudah diverifikasi—aku lihat sendiri!'],
      ['rights-hydra', 'Hydra Hak Tanpa Tanggung Jawab', 'Penuntut Seribu Hak', '🐲', 'Hydra yang menuntut hak tetapi melupakan tanggung jawab.', 'Kamu punya hak untuk pergi, aku punya hak untuk bilang: ketahuan takut!'],
      ['gotong-royong-giant', 'Raksasa Anti Gotong Royong', 'Pengangkat Beban Sendirian', '🪨', 'Raksasa keras kepala yang menolak bekerja bersama.', 'Aku sendirian saja tetap di sini. Kamu punya tim kok malah pergi?'],
    ],
  },
};

const COLORS: Record<ExpandedSubject, string> = {
  jawa: '#CA8A04',
  informatika: '#06B6D4',
  musik: '#EC4899',
  pjok: '#10B981',
  pkn: '#F43F5E',
};

function createEnemy(subject: ExpandedSubject, grade: GradeLevel, theme: EnemyTheme, index: number): Enemy {
  const [id, name, title, avatar, description, escapeRoast] = theme;
  const gradeOffset = grade - 7;
  const maxHp = 82 + gradeOffset * 36 + index * 11;

  return {
    id: `${subject}_${grade}_${id}`,
    name,
    title,
    subject,
    grade,
    level: 1 + gradeOffset * 3 + index,
    maxHp,
    hp: maxHp,
    attack: 12 + gradeOffset * 5 + index * 2,
    defense: 4 + gradeOffset * 3 + index,
    avatar,
    elementColor: COLORS[subject],
    description,
    defeatQuote: `Baiklah... ${title.toLowerCase()} akhirnya tumbang!`,
    escapeRoasts: [escapeRoast],
    expReward: 45 + gradeOffset * 35 + index * 12,
    goldReward: 25 + gradeOffset * 20 + index * 8,
    possibleDrops: [
      { itemId: grade === 9 ? 'potion_hp_large' : grade === 8 ? 'potion_hp_medium' : 'potion_hp_small', dropChance: 0.5 },
      { itemId: 'scroll_hint', dropChance: 0.2 + index * 0.05 },
    ],
  };
}

export const ADDITIONAL_ENEMIES: Enemy[] = (
  Object.entries(THEMES) as [ExpandedSubject, Record<GradeLevel, readonly EnemyTheme[]>][]
).flatMap(([subject, byGrade]) =>
  ([7, 8, 9] as GradeLevel[]).flatMap((grade) =>
    byGrade[grade].map((theme, index) => createEnemy(subject, grade, theme, index))
  )
);
