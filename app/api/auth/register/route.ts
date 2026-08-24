import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getServerUserByEmail, saveServerUser, saveServerGameState } from '@/lib/db/vercel-kv';
import { User } from '@/types/user';
import { GameState } from '@/types/game';
import { INITIAL_ACHIEVEMENTS } from '@/lib/game/achievements-database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Semua kolom pendaftaran wajib diisi.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await getServerUserByEmail(cleanEmail);

    if (existing) {
      return NextResponse.json(
        { message: 'Alamat email sudah terdaftar. Silakan gunakan email lain atau masuk.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newUser: User = {
      id: userId,
      email: cleanEmail,
      username: username.trim(),
      passwordHash: hashedPassword,
      provider: 'credentials',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    await saveServerUser(newUser);

    // Create starter game state
    const initialGameState: GameState = {
      userId,
      character: {
        name: username.trim(),
        avatar: '🎓',
        title: 'Murid Pemula SMP',
        level: 1,
        exp: 0,
        maxExp: 100,
        hp: 100,
        maxHp: 100,
        baseAttack: 15,
        baseDefense: 10,
        gold: 120,
        unassignedPoints: 3,
        attributes: {
          strength: 5,
          vitality: 5,
          intelligence: 5,
          agility: 5,
        },
        equippedWeaponId: 'weapon_wooden_ruler',
        equippedArmorId: 'armor_school_vest',
        activeBuffs: [],
      },
      inventory: [
        { itemId: 'potion_hp_small', quantity: 3 },
        { itemId: 'scroll_hint', quantity: 2 },
        { itemId: 'weapon_wooden_ruler', quantity: 1, equipped: true },
        { itemId: 'armor_school_vest', quantity: 1, equipped: true },
      ],
      statistics: {
        totalBattles: 0,
        victories: 0,
        defeats: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        bestStreak: 0,
        currentStreak: 0,
        goldEarnedTotal: 120,
        subjectPerformance: {
          matematika: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
          ipa: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
          ips: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
          indonesia: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
          inggris: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
        },
      },
      achievements: INITIAL_ACHIEVEMENTS,
      lastSaved: new Date().toISOString(),
    };

    await saveServerGameState(userId, initialGameState);

    return NextResponse.json(
      {
        message: 'Pendaftaran berhasil! Selamat datang di Eduquest RPG.',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { message: 'Terjadi kegagalan saat mendaftarkan akun.' },
      { status: 500 }
    );
  }
}
