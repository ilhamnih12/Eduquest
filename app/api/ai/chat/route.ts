import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { chatWithAiTutor } from '@/lib/ai/gemini';
import { AiChatMessage, AiChatPlayerContext } from '@/types/ai';

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 1000;

export async function POST(request: Request) {
  try {
    // Wajib login — tidak ada lagi akses tamu/demo
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Kamu harus masuk terlebih dahulu untuk mengobrol dengan Guru AI.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { messages, context } = body as {
      messages?: AiChatMessage[];
      context?: AiChatPlayerContext;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ message: 'Riwayat pesan tidak boleh kosong.' }, { status: 400 });
    }

    // Sanitasi: batasi jumlah & panjang pesan, hanya role yang sah
    const sanitized: AiChatMessage[] = messages
      .slice(-MAX_MESSAGES)
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .map((m) => ({
        role: m.role,
        content: m.content.trim().slice(0, MAX_CONTENT_LENGTH),
      }));

    if (sanitized.length === 0) {
      return NextResponse.json({ message: 'Pesan tidak valid.' }, { status: 400 });
    }

    const safeContext: AiChatPlayerContext = {
      username:
        typeof context?.username === 'string' ? context.username.slice(0, 40) : undefined,
      level: typeof context?.level === 'number' ? Math.max(1, Math.min(99, context.level)) : undefined,
      title: typeof context?.title === 'string' ? context.title.slice(0, 60) : undefined,
      strongestSubject: typeof context?.strongestSubject === 'string' ? context.strongestSubject : undefined,
      weakestSubject: typeof context?.weakestSubject === 'string' ? context.weakestSubject : undefined,
      accuracy:
        typeof context?.accuracy === 'number' ? Math.max(0, Math.min(100, Math.round(context.accuracy))) : undefined,
    };

    const result = await chatWithAiTutor(sanitized, safeContext);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('API ai/chat error:', error);
    return NextResponse.json(
      {
        reply:
          'Aduh, koneksi ke Guru AI sedang terganggu. 🥺 Coba kirim ulang pertanyaanmu beberapa saat lagi, pahlawan!',
        source: 'local',
      },
      { status: 200 }
    );
  }
}
