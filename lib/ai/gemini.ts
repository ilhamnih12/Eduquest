import { GoogleGenerativeAI } from '@google/generative-ai';
import { Subject, GradeLevel, Question } from '@/types/game';
import { StudyTipsResponse } from '@/types/ai';
import { getRandomLocalQuestion, getLocalQuestions } from '@/lib/game/question-bank';

/**
 * Generate a multiple-choice question tailored for Indonesian SMP students.
 * Utilizes Gemini 1.5 Flash / Pro with comprehensive fallback to local question bank.
 */
export async function generateAiQuestion(
  subject: Subject,
  grade: GradeLevel = 7,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  topic?: string,
  excludeIds: string[] = []
): Promise<Question> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your-gemini-api-key') {
    return getRandomLocalQuestion(subject, grade, excludeIds);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash for fast and reliable educational generation
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

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

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

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
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your-gemini-api-key') {
    return generateLocalStudyTips(subject, accuracyPercent, totalAnswered);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

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

    const result = await model.generateContent(prompt);
    const jsonMatch = result.response.text().match(/\{[\s\S]*\}/);
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
