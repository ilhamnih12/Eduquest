import type { GameStatistics, Subject, SubjectStat } from '@/types/game';

/**
 * Single source of truth for every playable school subject.
 * Keep UI labels and presentation metadata here so game screens, APIs and
 * reporting cannot silently drift apart when subjects are added.
 */
export const SUBJECT_IDS = [
  'matematika',
  'ipa',
  'ips',
  'indonesia',
  'inggris',
  'jawa',
  'informatika',
  'musik',
  'pjok',
  'pkn',
] as const satisfies readonly Subject[];

export interface SubjectMetadata {
  id: Subject;
  name: string;
  shortName: string;
  description: string;
  icon: 'calculator' | 'flask' | 'globe' | 'book' | 'languages' | 'landmark' | 'code' | 'music' | 'activity' | 'shield';
  emoji: string;
  textColor: string;
  bgColor: string;
}

export const SUBJECT_METADATA: Record<Subject, SubjectMetadata> = {
  matematika: {
    id: 'matematika',
    name: 'Matematika',
    shortName: 'Matematika',
    description: 'Angka, pola, geometri, dan penalaran',
    icon: 'calculator',
    emoji: '🔢',
    textColor: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  ipa: {
    id: 'ipa',
    name: 'Ilmu Pengetahuan Alam',
    shortName: 'IPA',
    description: 'Makhluk hidup, materi, energi, dan bumi',
    icon: 'flask',
    emoji: '🔬',
    textColor: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  ips: {
    id: 'ips',
    name: 'Ilmu Pengetahuan Sosial',
    shortName: 'IPS',
    description: 'Masyarakat, ruang, ekonomi, dan sejarah',
    icon: 'globe',
    emoji: '🌍',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  indonesia: {
    id: 'indonesia',
    name: 'Bahasa Indonesia',
    shortName: 'B. Indonesia',
    description: 'Literasi, sastra, dan komunikasi',
    icon: 'book',
    emoji: '📚',
    textColor: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  inggris: {
    id: 'inggris',
    name: 'Bahasa Inggris',
    shortName: 'B. Inggris',
    description: 'English communication and literacy',
    icon: 'languages',
    emoji: '🗣️',
    textColor: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  jawa: {
    id: 'jawa',
    name: 'Bahasa Jawa',
    shortName: 'B. Jawa',
    description: 'Basa, aksara, sastra, lan budaya Jawa',
    icon: 'landmark',
    emoji: '🪷',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  informatika: {
    id: 'informatika',
    name: 'Informatika',
    shortName: 'Informatika',
    description: 'Komputasi, data, pemrograman, dan dunia digital',
    icon: 'code',
    emoji: '💻',
    textColor: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
  musik: {
    id: 'musik',
    name: 'Seni Musik',
    shortName: 'Seni Musik',
    description: 'Irama, melodi, kreasi, dan apresiasi musik',
    icon: 'music',
    emoji: '🎵',
    textColor: 'text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
  },
  pjok: {
    id: 'pjok',
    name: 'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    shortName: 'PJOK',
    description: 'Gerak aktif, kebugaran, olahraga, dan kesehatan',
    icon: 'activity',
    emoji: '🏃',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  pkn: {
    id: 'pkn',
    name: 'Pendidikan Pancasila',
    shortName: 'Pendidikan Pancasila',
    description: 'Pancasila, konstitusi, kebinekaan, dan kewargaan',
    icon: 'shield',
    emoji: '🇮🇩',
    textColor: 'text-rose-500',
    bgColor: 'bg-rose-100 dark:bg-rose-900/30',
  },
};

export const SUBJECTS = SUBJECT_IDS.map((id) => SUBJECT_METADATA[id]);

export function isSubject(value: unknown): value is Subject {
  return typeof value === 'string' && SUBJECT_IDS.includes(value as Subject);
}

export function createDefaultSubjectPerformance(): SubjectStat {
  return {
    correct: 0,
    total: 0,
    streak: 0,
    bestStreak: 0,
  };
}

export function createDefaultStatistics(): GameStatistics {
  return {
    totalBattles: 0,
    victories: 0,
    defeats: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    bestStreak: 0,
    currentStreak: 0,
    goldEarnedTotal: 100,
    subjectPerformance: Object.fromEntries(
      SUBJECT_IDS.map((subject) => [subject, createDefaultSubjectPerformance()])
    ) as Record<Subject, SubjectStat>,
  };
}

export type PersistedGameStatistics = Omit<Partial<GameStatistics>, 'subjectPerformance'> & {
  subjectPerformance?: Partial<Record<Subject, Partial<SubjectStat>>>;
};

/** Merge a persisted pre-expansion statistics object with today's schema. */
export function normalizeStatistics(
  saved: PersistedGameStatistics | null | undefined
): GameStatistics {
  const defaults = createDefaultStatistics();
  const savedPerformance = saved?.subjectPerformance as Partial<Record<Subject, Partial<SubjectStat>>> | undefined;

  return {
    ...defaults,
    ...saved,
    subjectPerformance: Object.fromEntries(
      SUBJECT_IDS.map((subject) => [
        subject,
        {
          ...createDefaultSubjectPerformance(),
          ...(savedPerformance?.[subject] ?? {}),
        },
      ])
    ) as Record<Subject, SubjectStat>,
  };
}

interface SubjectTheme {
  color: string;
  badgeClass: string;
  bgGradient: string;
}

const SUBJECT_THEMES: Record<Subject, SubjectTheme> = {
  matematika: {
    color: '#E06C75',
    badgeClass: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
    bgGradient: 'from-rose-500/20 to-red-600/20',
  },
  ipa: {
    color: '#98C379',
    badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    bgGradient: 'from-emerald-500/20 to-teal-600/20',
  },
  ips: {
    color: '#D19A66',
    badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    bgGradient: 'from-amber-500/20 to-yellow-600/20',
  },
  indonesia: {
    color: '#61AFEF',
    badgeClass: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    bgGradient: 'from-blue-500/20 to-indigo-600/20',
  },
  inggris: {
    color: '#C678DD',
    badgeClass: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    bgGradient: 'from-purple-500/20 to-violet-600/20',
  },
  jawa: {
    color: '#CA8A04',
    badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    bgGradient: 'from-amber-500/20 to-orange-600/20',
  },
  informatika: {
    color: '#06B6D4',
    badgeClass: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
    bgGradient: 'from-cyan-500/20 to-sky-600/20',
  },
  musik: {
    color: '#EC4899',
    badgeClass: 'bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30',
    bgGradient: 'from-pink-500/20 to-fuchsia-600/20',
  },
  pjok: {
    color: '#10B981',
    badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    bgGradient: 'from-emerald-500/20 to-lime-600/20',
  },
  pkn: {
    color: '#F43F5E',
    badgeClass: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    bgGradient: 'from-rose-500/20 to-red-600/20',
  },
};

export function getSubjectMetadata(subject: unknown) {
  if (!isSubject(subject)) {
    return {
      id: 'general',
      name: 'Edukasi Umum',
      shortName: 'UMUM',
      description: 'Pengetahuan Umum SMP',
      desc: 'Pengetahuan Umum SMP',
      icon: 'sparkles' as const,
      emoji: '✨',
      textColor: 'text-slate-500',
      bgColor: 'bg-slate-100 dark:bg-slate-900/30',
      color: '#88C0D0',
      badgeClass: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
      bgGradient: 'from-slate-500/20 to-zinc-600/20',
    };
  }

  const metadata = SUBJECT_METADATA[subject];
  return {
    ...metadata,
    ...SUBJECT_THEMES[subject],
    // Legacy alias retained for existing cards while metadata is centralized.
    desc: metadata.description,
  };
}
