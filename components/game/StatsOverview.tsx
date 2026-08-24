'use client';

import * as React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Subject, CharacterAttributes } from '@/types/game';
import { StudyTipsResponse } from '@/types/ai';
import { getSubjectMeta, formatGold } from '@/lib/utils';
import { calculateEffectiveStats } from '@/lib/game/level-calculator';
import { getItemById } from '@/lib/game/item-database';
import { formatMathText } from '@/lib/game/question-format';
import { ProgressBar } from './ProgressBar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Trophy,
  Swords,
  Heart,
  Shield,
  Zap,
  Sparkles,
  Flame,
  BrainCircuit,
  Plus,
  ArrowUpRight,
  Calculator,
  FlaskConical,
  Globe2,
  BookOpen,
  Languages,
} from 'lucide-react';

export function StatsOverview() {
  const { gameState, allocateAttributePoint } = useGameStore();
  const [selectedSubjectAi, setSelectedSubjectAi] = React.useState<Subject>('matematika');
  const [aiStudyTips, setAiStudyTips] = React.useState<StudyTipsResponse | null>(null);
  const [isLoadingAiTips, setIsLoadingAiTips] = React.useState<boolean>(false);

  const character = gameState.character;
  const stats = gameState.statistics;

  const weapon = character.equippedWeaponId ? getItemById(character.equippedWeaponId) : null;
  const armor = character.equippedArmorId ? getItemById(character.equippedArmorId) : null;
  const effective = calculateEffectiveStats(character, weapon, armor);

  const winRate = stats.totalBattles > 0 ? Math.round((stats.victories / stats.totalBattles) * 100) : 0;
  const overallAccuracy =
    stats.questionsAnswered > 0 ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) : 0;

  const subjectList: Subject[] = ['matematika', 'ipa', 'ips', 'indonesia', 'inggris'];

  const fetchStudyTips = async (subj: Subject) => {
    setIsLoadingAiTips(true);
    setSelectedSubjectAi(subj);
    const subjStat = stats.subjectPerformance[subj] || { correct: 0, total: 0 };
    const accuracy = subjStat.total > 0 ? Math.round((subjStat.correct / subjStat.total) * 100) : 0;

    try {
      const res = await fetch('/api/ai/study-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subj,
          accuracy,
          totalQuestions: subjStat.total,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiStudyTips(data);
      }
    } catch (e) {
      console.warn('Failed to fetch AI study tips:', e);
    } finally {
      setIsLoadingAiTips(false);
    }
  };

  React.useEffect(() => {
    // Auto load study tips for lowest performing subject or math
    fetchStudyTips('matematika');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attributeInfo: { key: keyof CharacterAttributes; name: string; icon: string; desc: string }[] = [
    { key: 'strength', name: 'Kekuatan (STR)', icon: '⚔️', desc: 'Meningkatkan serangan fisik dasar (+2.5 Dmg)' },
    { key: 'vitality', name: 'Ketahanan (VIT)', icon: '🛡️', desc: 'Meningkatkan Max HP (+12 HP) & pertahanan' },
    { key: 'intelligence', name: 'Kecerdasan (INT)', icon: '🧠', desc: 'Meningkatkan pemahaman & peluang kritis' },
    { key: 'agility', name: 'Ketangkasan (AGI)', icon: '⚡', desc: 'Meningkatkan laju refleks & critical strike' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark text-2xl shadow-inner">
            📊
          </div>
          <div>
            <h1 className="text-xl font-black text-edu-textLight dark:text-edu-textDark">
              Rapor Evaluasi & Statistik Cendekia
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Analisis performa 5 mata pelajaran, alokasi atribut, dan rekomendasi AI Guru.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs px-3 py-1 font-bold">
            Tingkat {character.title}
          </Badge>
        </div>
      </div>

      {/* Battle & Academic Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Battles */}
        <div className="p-5 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Pertempuran</span>
            <Swords className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-edu-textLight dark:text-edu-textDark">
            {stats.totalBattles}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {stats.victories} Menang ({winRate}% Winrate)
          </p>
        </div>

        {/* Total Questions Solved */}
        <div className="p-5 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Soal Terjawab</span>
            <BrainCircuit className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-edu-textLight dark:text-edu-textDark">
            {stats.questionsAnswered}
          </p>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            {stats.correctAnswers} Tepat ({overallAccuracy}% Akurasi)
          </p>
        </div>

        {/* Best Streak */}
        <div className="p-5 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Rekor Streak</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-edu-textLight dark:text-edu-textDark">
            {stats.bestStreak}x
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            Jawaban Benar Beruntun
          </p>
        </div>

        {/* Total Gold Earned */}
        <div className="p-5 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Total Emas</span>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-black text-amber-500">
            {formatGold(stats.goldEarnedTotal)}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
            Saldo: {formatGold(character.gold)} Emas
          </p>
        </div>
      </div>

      {/* Attribute Allocation & Effective Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Attribute Points Allocator */}
        <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-edu-borderLight dark:border-edu-borderDark pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-edu-textLight dark:text-edu-textDark flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Alokasi Poin Atribut
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tingkatkan atribut untuk memperkuat karaktermu.
              </p>
            </div>
            <div className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-black text-xs">
              Sisa Poin: {character.unassignedPoints}
            </div>
          </div>

          <div className="space-y-2.5">
            {attributeInfo.map((attr) => {
              const currentVal = character.attributes[attr.key] || 5;

              return (
                <div
                  key={attr.key}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-edu-bgDark border border-edu-borderLight dark:border-edu-borderDark"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{attr.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-edu-textLight dark:text-edu-textDark">
                        {attr.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">{attr.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-edu-accentLight dark:text-edu-accentDark w-6 text-center">
                      {currentVal}
                    </span>
                    <button
                      disabled={character.unassignedPoints <= 0}
                      onClick={() => allocateAttributePoint(attr.key)}
                      className="h-8 w-8 rounded-xl bg-edu-accentLight dark:bg-edu-accentDark text-white dark:text-edu-bgDark flex items-center justify-center font-bold disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calculated Effective Stats */}
        <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 shadow-sm space-y-4">
          <div className="border-b border-edu-borderLight dark:border-edu-borderDark pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-edu-textLight dark:text-edu-textDark">
              Total Kekuatan Karakter (Effective Stats)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hasil gabungan Level + Atribut + Senjata + Baju Zirah.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
                <span>Maksimal HP</span>
                <Heart className="h-4 w-4 fill-rose-500" />
              </div>
              <p className="text-xl font-black text-rose-600 dark:text-rose-400">
                {effective.maxHp} HP
              </p>
              <p className="text-[10px] text-slate-400">Dasar: 100 + VIT & Zirah</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Daya Serang</span>
                <Swords className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-xl font-black text-blue-600 dark:text-blue-400">
                {effective.attack} ATK
              </p>
              <p className="text-[10px] text-slate-400">Termasuk bonus Senjata</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Pertahanan</span>
                <Shield className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {effective.defense} DEF
              </p>
              <p className="text-[10px] text-slate-400">Mitigasi serangan lawan</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>Peluang Kritis</span>
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <p className="text-xl font-black text-purple-600 dark:text-purple-400">
                {effective.critRate}% CRIT
              </p>
              <p className="text-[10px] text-slate-400">x1.75 Multiplier Serangan</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Subjects Performance Breakdown */}
      <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-edu-borderLight dark:border-edu-borderDark pb-3">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-edu-textLight dark:text-edu-textDark">
              Performa 5 Mata Pelajaran Kurikulum SMP
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pantau tingkat akurasi dan penguasaan setiap bidang studi.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Klik mata pelajaran untuk konsultasi AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectList.map((subj) => {
            const meta = getSubjectMeta(subj);
            const subStat = stats.subjectPerformance[subj] || { correct: 0, total: 0, streak: 0, bestStreak: 0 };
            const acc = subStat.total > 0 ? Math.round((subStat.correct / subStat.total) * 100) : 0;
            const isSelected = selectedSubjectAi === subj;

            return (
              <div
                key={subj}
                onClick={() => fetchStudyTips(subj)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                  isSelected
                    ? 'border-edu-accentLight dark:border-edu-accentDark bg-edu-accentLight/5 dark:bg-edu-accentDark/10 ring-2 ring-edu-accentLight dark:ring-edu-accentDark'
                    : 'border-edu-borderLight dark:border-edu-borderDark bg-slate-50 dark:bg-edu-bgDark'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={meta.badgeClass}>
                    {meta.name}
                  </Badge>
                  <span className="text-xs font-black text-edu-textLight dark:text-edu-textDark">
                    {acc}% Akurasi ({subStat.correct}/{subStat.total} Soal)
                  </span>
                </div>

                <ProgressBar
                  current={subStat.correct}
                  max={subStat.total || 1}
                  color={acc >= 75 ? 'green' : acc >= 50 ? 'yellow' : 'blue'}
                  height="h-2.5"
                  showNumeric={false}
                />

                <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Rekor Streak: {subStat.bestStreak}x Benar</span>
                  <span className="text-edu-accentLight dark:text-edu-accentDark font-bold flex items-center gap-0.5">
                    Konsultasi AI <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Guru Study Recommendations Advisor */}
      <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-gradient-to-br from-edu-cardLight to-slate-100 dark:from-edu-cardDark dark:to-slate-900 p-6 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-edu-borderLight dark:border-edu-borderDark">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-edu-accentLight dark:bg-edu-accentDark text-white dark:text-edu-bgDark">
              <BrainCircuit className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-edu-textLight dark:text-edu-textDark">
                AI Guru Pembimbing Belajar (Gemini)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Saran belajar cerdas berdasarkan statistik performamu di {getSubjectMeta(selectedSubjectAi).name}
              </p>
            </div>
          </div>

          <Badge variant="outline" className="text-[10px]">
            {aiStudyTips?.source === 'gemini' ? '✨ Gemini AI Live' : '📚 AI Template Guru'}
          </Badge>
        </div>

        {isLoadingAiTips ? (
          <div className="py-8 text-center space-y-2">
            <div className="h-8 w-8 rounded-full border-2 border-edu-accentLight border-t-transparent animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Menganalisis Rapor Siswa dengan Gemini AI...</p>
          </div>
        ) : aiStudyTips ? (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-white dark:bg-edu-bgDark border border-edu-borderLight dark:border-edu-borderDark space-y-2">
              <h4 className="text-sm font-black text-edu-accentLight dark:text-edu-accentDark">
                {aiStudyTips.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {formatMathText(aiStudyTips.summary)}
              </p>
            </div>

            {/* Tips list */}
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                💡 Langkah Strategis Belajar:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {aiStudyTips.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-edu-cardDark border border-edu-borderLight dark:border-edu-borderDark text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <span className="font-bold text-edu-accentLight dark:text-edu-accentDark block mb-1">
                      Tips #{idx + 1}
                    </span>
                    {formatMathText(tip)}
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="p-3.5 rounded-2xl bg-edu-accentLight/10 dark:bg-edu-accentDark/10 border border-edu-accentLight/20 text-xs italic text-edu-accentLight dark:text-edu-accentDark text-center font-semibold">
              &quot;{formatMathText(aiStudyTips.motivationalQuote)}&quot;
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
