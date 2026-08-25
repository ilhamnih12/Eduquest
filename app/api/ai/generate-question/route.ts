import { NextResponse } from 'next/server';
import { generateAiQuestion } from '@/lib/ai/gemini';
import { Subject, GradeLevel } from '@/types/game';
import { isSubject } from '@/lib/game/subjects';

const GRADES: GradeLevel[] = [7, 8, 9];
const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

function isGrade(value: unknown): value is GradeLevel {
  return GRADES.includes(value as GradeLevel);
}

function isDifficulty(value: unknown): value is (typeof DIFFICULTIES)[number] {
  return typeof value === 'string' && DIFFICULTIES.includes(value as (typeof DIFFICULTIES)[number]);
}

export async function POST(request: Request) {
  let subject: Subject = 'matematika';
  let grade: GradeLevel = 7;
  let difficulty: (typeof DIFFICULTIES)[number] = 'medium';
  let topic: string | undefined;
  let excludeIds: string[] = [];
  let variationSeed: string | undefined;
  let previousQuestionTexts: string[] = [];

  try {
    const body = await request.json();

    if (!isSubject(body?.subject)) {
      return NextResponse.json({ message: 'Mata pelajaran tidak dikenali.' }, { status: 400 });
    }

    subject = body.subject;
    if (isGrade(body.grade)) grade = body.grade;
    if (isDifficulty(body.difficulty)) difficulty = body.difficulty;
    topic = typeof body.topic === 'string' && body.topic.trim() ? body.topic.trim().slice(0, 120) : undefined;
    excludeIds = Array.isArray(body.excludeIds)
      ? body.excludeIds.filter((id: unknown): id is string => typeof id === 'string').slice(-50)
      : [];
    variationSeed = typeof body.variationSeed === 'string' ? body.variationSeed.slice(0, 80) : undefined;
    previousQuestionTexts = Array.isArray(body.previousQuestionTexts)
      ? body.previousQuestionTexts
          .filter((text: unknown): text is string => typeof text === 'string')
          .map((text: string) => text.slice(0, 300))
          .slice(-3)
      : [];

    const question = await generateAiQuestion(
      subject,
      grade,
      difficulty,
      topic,
      excludeIds,
      variationSeed,
      previousQuestionTexts
    );

    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.error('API generate-question error:', error);
    // Fallback memakai pilihan yang diminta, bukan selalu Matematika kelas 7.
    const { getRandomLocalQuestion } = await import('@/lib/game/question-bank');
    const fallbackQuestion = getRandomLocalQuestion(subject, grade, excludeIds, topic);
    return NextResponse.json(fallbackQuestion, { status: 200 });
  }
}
