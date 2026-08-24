import { NextResponse } from 'next/server';
import { generateStudyTips } from '@/lib/ai/gemini';
import { Subject } from '@/types/game';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, accuracy = 0, totalQuestions = 0 } = body;

    if (!subject) {
      return NextResponse.json({ message: 'Mata pelajaran wajib ditentukan.' }, { status: 400 });
    }

    const tips = await generateStudyTips(
      subject as Subject,
      Number(accuracy),
      Number(totalQuestions)
    );

    return NextResponse.json(tips, { status: 200 });
  } catch (error) {
    console.error('API study-tips error:', error);
    return NextResponse.json(
      {
        subject: 'matematika',
        title: 'Tips Pembelajaran Mandiri SMP',
        summary: 'Pertahankan semangat belajar dan ulangi soal-soal yang belum dipahami.',
        tips: [
          'Fokus pada pemahaman konsep inti',
          'Gunakan media coret-coretan untuk rumus',
          'Beli Ramuan HP di Toko jika kesulitan',
        ],
        recommendedTopics: ['Konsep Dasar', 'Latihan Soal'],
        motivationalQuote: 'Belajar adalah kunci meraih masa depan cemerlang.',
        source: 'local_generator',
      },
      { status: 200 }
    );
  }
}
