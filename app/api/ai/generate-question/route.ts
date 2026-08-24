import { NextResponse } from 'next/server';
import { generateAiQuestion } from '@/lib/ai/gemini';
import { Subject, GradeLevel } from '@/types/game';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, grade = 7, difficulty = 'medium', topic, excludeIds = [] } = body;

    if (!subject) {
      return NextResponse.json({ message: 'Mata pelajaran wajib ditentukan.' }, { status: 400 });
    }

    const question = await generateAiQuestion(
      subject as Subject,
      grade as GradeLevel,
      difficulty,
      topic,
      excludeIds
    );

    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.error('API generate-question error:', error);
    // Fallback directly
    const { getRandomLocalQuestion } = await import('@/lib/game/question-bank');
    const fallbackQuestion = getRandomLocalQuestion('matematika', 7);
    return NextResponse.json(fallbackQuestion, { status: 200 });
  }
}
