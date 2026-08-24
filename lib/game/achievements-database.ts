import { Achievement, GameStatistics, Character } from '@/types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_victory',
    title: 'Langkah Pertama',
    description: 'Menangkan pertempuran pendidikan pertamamu.',
    icon: 'Trophy',
    category: 'battle',
    requirement: 1,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 50,
    rewardExp: 50,
  },
  {
    id: 'battle_5',
    title: 'Petarung Gigih',
    description: 'Raih 5 kemenangan dalam pertempuran melawan monster soal.',
    icon: 'Swords',
    category: 'battle',
    requirement: 5,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 100,
    rewardExp: 120,
  },
  {
    id: 'battle_20',
    title: 'Kesatria Ulung',
    description: 'Raih 20 kemenangan pertempuran.',
    icon: 'Crown',
    category: 'battle',
    requirement: 20,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 300,
    rewardExp: 400,
  },
  {
    id: 'streak_5',
    title: 'Kombo Cerdas',
    description: 'Jawab 5 pertanyaan berturut-turut dengan benar tanpa salah.',
    icon: 'Zap',
    category: 'study',
    requirement: 5,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 80,
    rewardExp: 100,
  },
  {
    id: 'streak_10',
    title: 'Pikiran Jenius',
    description: 'Capai rekor streak 10 jawaban benar beruntun.',
    icon: 'Sparkles',
    category: 'study',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 250,
    rewardExp: 350,
  },
  {
    id: 'level_5',
    title: 'Pelajar Berbakat',
    description: 'Tingkatkan level karakter hingga mencapai Level 5.',
    icon: 'Award',
    category: 'level',
    requirement: 5,
    currentProgress: 1,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 120,
    rewardExp: 150,
  },
  {
    id: 'level_10',
    title: 'Petualang Cerdas',
    description: 'Tingkatkan level karakter hingga mencapai Level 10.',
    icon: 'Flame',
    category: 'level',
    requirement: 10,
    currentProgress: 1,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 350,
    rewardExp: 500,
  },
  {
    id: 'gold_500',
    title: 'Tabungan Juara',
    description: 'Kumpulkan total akumulasi 500 keping emas dari petualangan.',
    icon: 'Coins',
    category: 'wealth',
    requirement: 500,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 100,
    rewardExp: 100,
  },
  {
    id: 'math_master',
    title: 'Pakar Matematika',
    description: 'Jawab 10 soal Matematika dengan benar.',
    icon: 'Calculator',
    category: 'study',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 150,
    rewardExp: 200,
  },
  {
    id: 'science_master',
    title: 'Ilmuwan Muda',
    description: 'Jawab 10 soal IPA dengan benar.',
    icon: 'FlaskConical',
    category: 'study',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 150,
    rewardExp: 200,
  },
  {
    id: 'social_master',
    title: 'Sejarawan Nusantara',
    description: 'Jawab 10 soal IPS dengan benar.',
    icon: 'Globe2',
    category: 'study',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 150,
    rewardExp: 200,
  },
  {
    id: 'indo_master',
    title: 'Pujangga Bahasa',
    description: 'Jawab 10 soal Bahasa Indonesia dengan benar.',
    icon: 'BookOpen',
    category: 'study',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 150,
    rewardExp: 200,
  },
  {
    id: 'english_master',
    title: 'Bilingual Scholar',
    description: 'Jawab 10 soal Bahasa Inggris dengan benar.',
    icon: 'Languages',
    category: 'study',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    unlockedAt: null,
    rewardGold: 150,
    rewardExp: 200,
  },
];

/**
 * Recalculate achievements progress and trigger unlocks
 */
export function checkAchievements(
  currentAchievements: Achievement[],
  stats: GameStatistics,
  character: Character
): {
  updatedAchievements: Achievement[];
  newlyUnlocked: Achievement[];
  totalRewardGold: number;
  totalRewardExp: number;
} {
  const newlyUnlocked: Achievement[] = [];
  let totalRewardGold = 0;
  let totalRewardExp = 0;

  const updatedAchievements = currentAchievements.map((ach) => {
    if (ach.unlocked) return ach;

    let progress = 0;
    switch (ach.id) {
      case 'first_victory':
      case 'battle_5':
      case 'battle_20':
        progress = stats.victories;
        break;
      case 'streak_5':
      case 'streak_10':
        progress = stats.bestStreak;
        break;
      case 'level_5':
      case 'level_10':
        progress = character.level;
        break;
      case 'gold_500':
        progress = stats.goldEarnedTotal || character.gold;
        break;
      case 'math_master':
        progress = stats.subjectPerformance?.matematika?.correct || 0;
        break;
      case 'science_master':
        progress = stats.subjectPerformance?.ipa?.correct || 0;
        break;
      case 'social_master':
        progress = stats.subjectPerformance?.ips?.correct || 0;
        break;
      case 'indo_master':
        progress = stats.subjectPerformance?.indonesia?.correct || 0;
        break;
      case 'english_master':
        progress = stats.subjectPerformance?.inggris?.correct || 0;
        break;
      default:
        progress = ach.currentProgress;
    }

    const isNowUnlocked = progress >= ach.requirement;

    if (isNowUnlocked && !ach.unlocked) {
      newlyUnlocked.push({
        ...ach,
        currentProgress: progress,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      });
      totalRewardGold += ach.rewardGold;
      totalRewardExp += ach.rewardExp;

      return {
        ...ach,
        currentProgress: progress,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      };
    }

    return {
      ...ach,
      currentProgress: Math.min(progress, ach.requirement),
    };
  });

  return {
    updatedAchievements,
    newlyUnlocked,
    totalRewardGold,
    totalRewardExp,
  };
}
