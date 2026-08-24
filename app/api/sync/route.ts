import { NextResponse } from 'next/server';
import { saveServerGameState, loadServerGameState } from '@/lib/db/vercel-kv';
import { GameState } from '@/types/game';

export async function POST(request: Request) {
  try {
    const clientState: GameState = await request.json();

    if (!clientState || !clientState.userId) {
      return NextResponse.json({ message: 'Data game tidak valid.' }, { status: 400 });
    }

    const serverState = await loadServerGameState(clientState.userId);

    let finalState: GameState = clientState;

    // Merge logic if server has more advanced level or battles
    if (serverState) {
      if (serverState.character.level > clientState.character.level ||
          (serverState.character.level === clientState.character.level && serverState.character.exp > clientState.character.exp)) {
        finalState = serverState;
      }
    }

    finalState.lastSaved = new Date().toISOString();
    await saveServerGameState(clientState.userId, finalState);

    return NextResponse.json(
      {
        message: 'Sinkronisasi berhasil.',
        syncedState: finalState,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Sync API error:', error);
    return NextResponse.json({ message: 'Gagal melakukan sinkronisasi server.' }, { status: 500 });
  }
}
