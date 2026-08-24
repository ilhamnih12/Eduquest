import { GoogleGenAI } from '@google/genai';
import { Subject, GradeLevel, Question } from '@/types/game';
import { StudyTipsResponse, AiChatMessage, AiChatPlayerContext, AiChatResponse } from '@/types/ai';
import { getRandomLocalQuestion } from '@/lib/game/question-bank';

/**
 * Free-tier Flash models on Google AI Studio (no Pro / billing required).
 * Newest first. `gemini-1.5-flash` was shut down and 404s on current keys.
 * Auth keys that start with `AQ.` need the official `@google/genai` SDK
 * (native Gemini endpoint), not the deprecated `@google/generative-ai` package.
 * Docs: https://ai.google.dev/gemini-api/docs/models
 */
export const GEMINI_FREE_FLASH_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.5-flash',
  'gemini-2.5-flash',
] as const;

export const DEFAULT_GEMINI_MODEL = GEMINI_FREE_FLASH_MODELS[0];

type GeminiContent =
  | string
  | Array<{ role: string; parts: Array<{ text: string }> }>;

function resolveGeminiApiKey(): string | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your-gemini-api-key') {
    return null;
  }
  return apiKey.trim();
}

function resolveModelCandidates(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  if (preferred) {
    return [preferred, ...GEMINI_FREE_FLASH_MODELS.filter((model) => model !== preferred)];
  }
  return [...GEMINI_FREE_FLASH_MODELS];
}

function isModelUnavailableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /not found|not supported|NOT_FOUND|404|is not available/i.test(message);
}

function extractGeminiText(response: {
  text?: string;
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
}): string {
  if (response.text && response.text.trim()) {
    return response.text.trim();
  }
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  return parts.map((part) => part.text ?? '').join('').trim();
}

export async function generateGeminiText(
  apiKey: string,
  contents: GeminiContent,
  config: {
    temperature?: number;
    maxOutputTokens?: number;
    responseMimeType?: string;
    systemInstruction?: string;
  } = {}
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const models = resolveModelCandidates();
  let lastError: unknown;

  for (const model of models) {
    const requestConfigs = [
      {
        temperature: config.temperature,
        maxOutputTokens: config.maxOutputTokens,
        responseMimeType: config.responseMimeType,
        systemInstruction: config.systemInstruction,
        // Keep Flash cheap/fast on the free tier; 3.x Flash thinks by default.
        thinkingConfig: { thinkingBudget: 0 },
      },
      {
        temperature: config.temperature,
        maxOutputTokens: config.maxOutputTokens,
        responseMimeType: config.responseMimeType,
        systemInstruction: config.systemInstruction,
      },
    ];

    for (const requestConfig of requestConfigs) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: requestConfig,
        });
        const text = extractGeminiText(response);
        if (!text) {
          throw new Error('Empty Gemini response');
        }
        return text;
      } catch (error) {
        lastError = error;
        if (isModelUnavailableError(error)) {
          console.warn(`Gemini model ${model} unavailable, trying next free Flash model:`, error);
          break;
        }
        if (requestConfig.thinkingConfig && !isAuthOrQuotaError(error)) {
          continue;
        }
        throw error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('All Gemini Flash models failed');
}

/**
 * Generate a multiple-choice question tailored for Indonesian SMP students.
 * Uses the latest free Gemini Flash model with fallback to the local question bank.
 */
export async function generateAiQuestion(
  subject: Subject,
  grade: GradeLevel = 7,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  topic?: string,
  excludeIds: string[] = []
): Promise<Question> {
  const apiKey = resolveGeminiApiKey();

  if (!apiKey) {
    return getRandomLocalQuestion(subject, grade, excludeIds);
  }

  try {
    const subjectNames: Record<Subject, string> = {
      matematika: 'Matematika (Aljabar, Geometri, Aritmatika, Peluang, Statistika)',
      ipa: 'Ilmu Pengetahuan Alam / IPA (Biologi Sel, Fisika Gerak & Energi, Kimia Dasar, Tata Surya)',
      ips: 'Ilmu Pengetahuan Sosial / IPS (Geografi Indonesia, Sejarah Kerajaan & Kemerdekaan, Ekonomi, Sosiologi)',
      indonesia: 'Bahasa Indonesia (Teks Deskripsi, Teks Eksplanasi, Majas, Cerpen, EYD/PUEBI, Gagasan Pokok)',
      inggris: 'Bahasa Inggris (Grammar, Tenses, Reading Comprehension, Vocabulary, Descriptive/Narrative Text)',
    };

    const prompt = `Anda adalah seorang Guru Ahli Kurikulum Merdeka SMP Indonesia.
Buat 1 soal pilihan ganda baru yang berkualitas untuk mata pelajaran ${subjectNames[subject]} tingkat SMP Kelas ${grade} dengan tingkat kesulitan "${difficulty}"${topic ? ` pada topik "${topic}"` : ''}.

Syarat wajib:
1. Bahasa Indonesia yang baik, benar, dan edukatif (untuk Bahasa Inggris, soal & opsi dalam Bahasa Inggris, penjelasan dalam Bahasa Indonesia).
2. Tepat sesuai kurikulum SMP Kelas ${grade}.
3. Tepat 4 pilihan jawaban yang masuk akal.
4. Tentukan indeks jawaban benar (0 untuk opsi pertama, 1 untuk kedua, 2 untuk ketiga, 3 untuk keempat).
5. Berikan penjelasan edukatif yang mendalam mengapa jawaban tersebut benar.
6. Berikan petunjuk singkat (hint) tanpa langsung memberi tahu jawabannya.

Format Output WAJIB berupa JSON murni dengan struktur berikut:
{
  "topic": "nama topik singkat",
  "difficulty": "${difficulty}",
  "question": "teks pertanyaan yang jelas",
  "options": [
    "Pilihan A",
    "Pilihan B",
    "Pilihan C",
    "Pilihan D"
  ],
  "correctAnswer": 0,
  "explanation": "penjelasan lengkap langkah demi langkah",
  "hint": "petunjuk ringkas untuk siswa"
}`;

    const responseText = await generateGeminiText(apiKey, prompt, {
      responseMimeType: 'application/json',
      temperature: 0.7,
    });

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Gemini did not return valid JSON');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (
      !parsed.question ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      typeof parsed.correctAnswer !== 'number'
    ) {
      throw new Error('Invalid JSON structure from Gemini');
    }

    const generatedQuestion: Question = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      subject,
      grade,
      topic: parsed.topic || 'Edukasi SMP',
      difficulty: (parsed.difficulty as 'easy' | 'medium' | 'hard') || difficulty,
      question: parsed.question,
      options: parsed.options,
      correctAnswer: Math.max(0, Math.min(3, Math.floor(parsed.correctAnswer))),
      explanation: parsed.explanation || 'Jawaban telah diverifikasi sesuai kunci kurikulum SMP.',
      hint: parsed.hint || 'Pikirkan konsep dasar materi ini.',
      source: 'gemini',
    };

    return generatedQuestion;
  } catch (error) {
    console.warn('Gemini API question generation failed, gracefully falling back to local question bank:', error);
    return getRandomLocalQuestion(subject, grade, excludeIds);
  }
}

/**
 * Generate personalized study tips and recommendations using Gemini or local template
 */
export async function generateStudyTips(
  subject: Subject,
  accuracyPercent: number,
  totalAnswered: number
): Promise<StudyTipsResponse> {
  const apiKey = resolveGeminiApiKey();

  if (!apiKey) {
    return generateLocalStudyTips(subject, accuracyPercent, totalAnswered);
  }

  try {
    const prompt = `Anda adalah AI Guru Pembimbing RPG Edukasi SMP.
Siswa memiliki statistik performa mata pelajaran "${subject}":
- Total Soal Dikerjakan: ${totalAnswered}
- Akurasi / Tingkat Ketepatan: ${accuracyPercent}%

Buat rekomendasi belajar pribadi dalam format JSON:
{
  "title": "Judul Saran Menarik & Memotivasi",
  "summary": "Analisis singkat perkembangan belajar siswa dalam 2 kalimat",
  "tips": [
    "Tips 1 yang praktis",
    "Tips 2 strategi belajar",
    "Tips 3 trik menjawab soal"
  ],
  "recommendedTopics": ["Topik 1", "Topik 2", "Topik 3"],
  "motivationalQuote": "Kutipan penyemangat khas petualang cendekiawan"
}`;

    const responseText = await generateGeminiText(apiKey, prompt, {
      responseMimeType: 'application/json',
      temperature: 0.7,
    });
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON response');

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      subject,
      title: parsed.title || 'Evaluasi Pembelajaran RPG',
      summary: parsed.summary || `Kamu telah menyelesaikan ${totalAnswered} soal dengan akurasi ${accuracyPercent}%.`,
      tips: parsed.tips || ['Perbanyak latihan soal harian', 'Tinjau kembali rumus dasar'],
      recommendedTopics: parsed.recommendedTopics || ['Konsep Dasar', 'Latihan Soal Cerita'],
      motivationalQuote: parsed.motivationalQuote || 'Pendidikan adalah senjata paling ampuh untuk mengubah dunia.',
      source: 'gemini',
    };
  } catch (error) {
    console.warn('Gemini study tips generation error, falling back to local generator:', error);
    return generateLocalStudyTips(subject, accuracyPercent, totalAnswered);
  }
}

/**
 * Local fallback study tips generator
 */
function generateLocalStudyTips(
  subject: Subject,
  accuracy: number,
  totalAnswered: number
): StudyTipsResponse {
  const subjectNameMap: Record<Subject, string> = {
    matematika: 'Matematika',
    ipa: 'IPA',
    ips: 'IPS',
    indonesia: 'Bahasa Indonesia',
    inggris: 'Bahasa Inggris',
  };

  const name = subjectNameMap[subject];

  if (accuracy >= 80) {
    return {
      subject,
      title: `Luar Biasa! Penguasaan ${name} Sangat Tinggi! 🌟`,
      summary: `Kamu meraih akurasi ${accuracy}% dari ${totalAnswered} pertempuran soal. Pemahaman konsepmu sangat solid!`,
      tips: [
        'Tingkatkan ke soal-soal penalaran tingkat tinggi (HOTS).',
        'Coba bantu teman sekelas atau jelaskan kembali rumus dengan katamu sendiri.',
        'Jaga konsistensi streak belajarmu setiap hari.',
      ],
      recommendedTopics: ['Soal Olimpiade / HOTS', 'Aplikasi Nyata & Proyek'],
      motivationalQuote: 'Kecerdasan bukanlah tujuan akhir, melainkan perjalanan yang terus berkembang!',
      source: 'local_generator',
    };
  } else if (accuracy >= 50) {
    return {
      subject,
      title: `Progres Mantap pada Mata Pelajaran ${name}! ⚔️`,
      summary: `Akurasi kamu ${accuracy}%. Kamu sudah memahami konsep dasar, namun perlu lebih teliti pada rincian soal.`,
      tips: [
        'Baca kalimat soal sampai tuntas sebelum terburu-buru memilih opsi.',
        'Gunakan kertas coretan untuk perhitungan dan analisis kalimat.',
        'Gunakan Item Gulungan Petunjuk di Shop jika menghadapi monster berlevel tinggi.',
      ],
      recommendedTopics: ['Latihan Pemahaman Konsep', 'Strategi Eliminasi Jawaban Salah'],
      motivationalQuote: 'Setiap kesalahan dalam belajar adalah batu loncatan menuju pemahaman yang sejati.',
      source: 'local_generator',
    };
  } else {
    return {
      subject,
      title: `Semangat Terus Menaklukkan ${name}! 🛡️`,
      summary: `Akurasi kamu saat ini ${accuracy}%. Jangan berkecil hati, setiap pahlawan hebat memulai dari nol!`,
      tips: [
        'Baca rangkuman materi dan perhatikan penjelasan jawaban di akhir pertarungan.',
        'Beli Ramuan HP di Toko agar karaktermumu tidak cepat tumbang saat mencoba menjawab.',
        'Fokus pada soal-soal tingkat Kelas 7 terlebih dahulu sebelum menantang bos Kelas 9.',
      ],
      recommendedTopics: ['Rangkuman Dasar', 'Kosakata Kunci & Definisi'],
      motivationalQuote: 'Batu yang keras akan berlubang oleh tetesan air yang konsisten. Teruslah berjuang!',
      source: 'local_generator',
    };
  }
}

/* ==========================================================================
 * AI TUTOR CHAT BUBBLE (Gemini)
 * ========================================================================== */

const SUBJECT_DISPLAY: Record<string, string> = {
  matematika: 'Matematika',
  ipa: 'IPA',
  ips: 'IPS',
  indonesia: 'Bahasa Indonesia',
  inggris: 'Bahasa Inggris',
};

/**
 * Assemble the system persona/prompt for the AI Tutor bubble.
 */
function buildTutorSystemPrompt(context?: AiChatPlayerContext): string {
  let playerLine = '';
  if (context) {
    const parts: string[] = [];
    if (context.username) parts.push(`nama panggilan "${context.username}"`);
    if (context.level) parts.push(`Level ${context.level}${context.title ? ` (${context.title})` : ''}`);
    if (typeof context.accuracy === 'number' && context.accuracy >= 0) {
      parts.push(`akurasi jawaban keseluruhan ${context.accuracy}%`);
    }
    if (context.strongestSubject)
      parts.push(`mapel terkuat ${SUBJECT_DISPLAY[context.strongestSubject] || context.strongestSubject}`);
    if (context.weakestSubject)
      parts.push(`mapel terlemah ${SUBJECT_DISPLAY[context.weakestSubject] || context.weakestSubject}`);
    if (parts.length > 0) playerLine = `\nProfil siswa yang sedang bertanya: ${parts.join(', ')}.`;
  }

  return `Kamu adalah "Guru AI Eduquest" — guru pembimbing virtual yang ramah dan menyenangkan di game RPG edukasi Eduquest untuk siswa SMP Indonesia (Kelas 7-9, Kurikulum Merdeka).${playerLine}

ATURAN MENJAWAB:
1. Jawab selalu dalam Bahasa Indonesia yang santun, hangat, dan mudah dipahami remaja 12-15 tahun (kecuali siswa bertanya dalam Bahasa Inggris, maka jawab dalam Bahasa Inggris).
2. Fokus membantu materi pelajaran: Matematika, IPA, IPS, Bahasa Indonesia, dan Bahasa Inggris, serta strategi belajar dan tips bermain Eduquest.
3. Untuk soal matematika: tunjukkan langkah pengerjaan secara bertahap, bukan hanya hasil akhirnya.
4. Jawaban ringkas dan padat (maksimal sekitar 150 kata). Gunakan bullet/emoji secukupnya agar menyenangkan.
5. Sesekali gunakan gaya petualangan RPG (pahlawan, monster, quest) untuk memotivasi, tapi tetap edukatif.
6. Jika pertanyaan di luar topik pendidikan, arahkan dengan halus kembali ke belajar.
7. JANGAN pernah memberikan konten tidak pantas, kata-kata kasar, atau jawaban yang menyesatkan.
8. Jangan mengaku sebagai manusia — kamu adalah AI yang siap membantu.`;
}

/**
 * Local offline fallback replies when GEMINI_API_KEY is not configured
 * or the Gemini request fails. Keeps the bubble usable at all times.
 */
function localTutorFallback(history: AiChatMessage[], context?: AiChatPlayerContext, envDetected?: boolean): string {
  const lastUser = [...history].reverse().find((m) => m.role === 'user')?.content?.toLowerCase() ?? '';

  const name = context?.username ? `, ${context.username}` : ' Petualang';

  const rules: Array<{ keywords: string[]; reply: (t: string) => string }> = [
    {
      keywords: ['pythagoras', 'pytagoras'],
      reply: () =>
        'Rumus Pythagoras: a² + b² = c², di mana c adalah sisi terpanjang (hipotenusa).\nLangkah mengerjakan:\n1. Tentukan sisi mana yang paling panjang.\n2. Substitusikan dua sisi yang diketahui ke rumus.\n3. Selesaikan pangkat dua, lalu akarkan.\nContoh: sisi 6 dan 8 → c² = 36 + 64 = 100 → c = 10. 📐',
    },
    {
      keywords: ['luas', 'keliling', 'lingkaran'],
      reply: () =>
        'Ingat rumus lingkaran yuk! 🥧\n• Keliling = 2 × π × r (atau π × d)\n• Luas = π × r²\nTips: π biasanya dibulatkan 22/7 (r kelipatan 7) atau 3,14. Tulis dulu rumusnya, lalu masukkan angkanya pelan-pelan.',
    },
    {
      keywords: ['aljabar', 'persamaan', 'spldv', 'variabel', 'x ='],
      reply: () =>
        'Kunci aljabar adalah "kerjakan hal yang sama di kedua ruas"! ⚖️\nContoh: 2x + 3 = 11\n1. Kurangi kedua ruas dengan 3 → 2x = 8\n2. Bagi kedua ruas dengan 2 → x = 4\nUntuk SPLDV, gunakan eliminasi (jumlahkan/kurangkan persamaan) atau substitusi.',
    },
    {
      keywords: ['newton', 'hukum gerak', 'gaya', 'fisika'],
      reply: () =>
        'Hukum Newton: 🍎\n1. Newton I: benda diam tetap diam, bergerak tetap bergerak (inersia) jika gaya resultan = 0.\n2. Newton II: F = m × a (gaya = massa × percepatan).\n3. Newton III: aksi-reaksi — setiap gaya punya pasangan yang sama besar, arah berlawanan.\nTips soal: selalu tulis besaran yang diketahui dulu!',
    },
    {
      keywords: ['fotosintesis', 'tumbuhan', 'klorofil'],
      reply: () =>
        'Fotosintesis 🌱 = proses tumbuhan hijau membuat makanan sendiri.\nRumus: 6CO₂ + 6H₂O + cahaya matahari → C₆H₁₂O₆ (glukosa) + 6O₂\nTerjadi di kloroplas yang mengandung klorofil. Hasilnya glukosa untuk energi dan oksigen untuk kita bernapas!',
    },
    {
      keywords: ['proklamasi', 'kemerdekaan', '1945', 'sejarah'],
      reply: () =>
        'Proklamasi Kemerdekaan RI dibacakan Soekarno didampingi Mohammad Hatta pada 17 Agustus 1945 di Jalan Pegangsaan Timur 56, Jakarta. 🇮🇩 Skrip teks diketik oleh Sayuti Melik. Ini puncak perjuangan setelah penjajahan Jepang berakhir pasca-PD II.',
    },
    {
      keywords: ['grammar', 'tense', 'bahasa inggris', 'present', 'past'],
      reply: () =>
        'Rahasia tenses: lihat keterangan waktunya! ⏰\n• Simple Present (V1/s-es): every day, always → "She studies every night."\n• Simple Past (V2): yesterday, last year → "I went to Bali."\n• Present Continuous (am/is/are + V-ing): now → "They are studying."\nTips: hafalkan daftar Verb 1-2-3 untuk irregular verbs ya!',
    },
    {
      keywords: ['majas', 'puisi', 'cerpen', 'deskripsi'],
      reply: () =>
        'Majas itu bahasa kias yang bikin tulisan hidup! ✨\n• Simile: "pandai seperti kutubuku" (pembanding: seperti, bagaikan)\n• Metafora: "dia tulang punggung keluarga" (langsung)\n• Personifikasi: benda mati bertindak seperti manusia — "angin berbisik"\n• Hiperbola: melebih-lebihkan — "tangismya membanjiri kota"',
    },
    {
      keywords: ['belajar', 'tips', 'cara belajar', 'malas', 'motivasi'],
      reply: () =>
        'Strategi belajar para petualang hebat: 🗡️\n1. Belajar 25 menit lalu istirahat 5 menit (teknik Pomodoro).\n2. Latih soal sedikit tiap hari — konsistensi mengalahkan kecepatan!\n3. Untuk rumus, buat kartu hafalan dan tempel di meja belajar.\n4. Jelaskan ulang materi dengan bahasamu sendiri (metode Feynman).\n5. Cukup tidur 8 jam — otak menghafal saat tidur! 😴',
    },
    {
      keywords: ['halo', 'hai', 'hello', 'hi', 'assalam', 'selamat'],
      reply: () =>
        `Halo${name}! 👋 Aku Guru AI Eduquest, siap menemanimu berpetualang!\nTanyakan apa saja soal materi SMP: Matematika, IPA, IPS, Bahasa Indonesia, atau Bahasa Inggris. Kamu juga bisa minta tips belajar. Apa yang ingin kamu pelajari hari ini? 🌟`,
    },
  ];

  for (const rule of rules) {
    if (rule.keywords.some((k) => lastUser.includes(k))) {
      return rule.reply('');
    }
  }

  const weakLine =
    context?.weakestSubject
      ? ` Terakhir terlihat di datamu, ${SUBJECT_DISPLAY[context.weakestSubject] || context.weakestSubject} perlu lebih banyak latihan — coba tantangi monster mapel itu di Arena Pertempuran! ⚔️`
      : '';

  if (envDetected === true) {
    return `Pertanyaan yang menarik${name}! 🤔 Aku mendeteksi GEMINI_API_KEY sudah di-set tapi Google Gemini sedang bermasalah (mungkin key revoked/quota habis).\n\nCoba tanyakan hal spesifik seperti:\n• "Bagaimana cara mengerjakan soal Pythagoras?"\n• "Jelaskan hukum Newton kedua"\n• "Beri aku tips belajar tiap hari"\n\nJika terus bermasalah, minta admin/guru membuat key baru di https://aistudio.google.com/app/apikey lalu update di Vercel.${weakLine}`;
  }

  return `Pertanyaan yang menarik${name}! 🤔 Saat ini aku sedang berjalan dalam mode offline sehingga jawabanku terbatas.\n\nCoba tanyakan hal spesifik seperti:\n• "Bagaimana cara mengerjakan soal Pythagoras?"\n• "Jelaskan hukum Newton kedua"\n• "Beri aku tips belajar tiap hari"\n\nUntuk jawaban AI lengkap berbasis Google Gemini, minta guru/pengamamu menambahkan GEMINI_API_KEY di pengaturan server.${weakLine}`;
}

/**
 * Chat with the AI Tutor using the latest free Gemini Flash model.
 * Gracefully falls back to a local keyword-based tutor when offline.
 */
export async function chatWithAiTutor(
  history: AiChatMessage[],
  context?: AiChatPlayerContext
): Promise<AiChatResponse> {
  const apiKey = resolveGeminiApiKey();

  if (!apiKey) {
    return { reply: localTutorFallback(history, context, false), source: 'local' };
  }

  try {
    const recent = history.slice(-12).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const reply = await generateGeminiText(apiKey, recent, {
      systemInstruction: buildTutorSystemPrompt(context),
      temperature: 0.8,
      maxOutputTokens: 600,
    });

    return { reply, source: 'gemini' };
  } catch (error) {
    console.warn('Gemini chat tutor failed, falling back to local tutor:', error);
    return { reply: localTutorFallback(history, context, true), source: 'local' };
  }
}
