'use client';

import * as React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Subject, GradeLevel } from '@/types/game';
import { getSubjectMeta } from '@/lib/utils';
import { EnemyCard } from './EnemyCard';
import { CharacterCard } from './CharacterCard';
import { QuestionModal } from './QuestionModal';
import { CombatLog } from './CombatLog';
import { RewardsModal } from './RewardsModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Swords,
  Calculator,
  FlaskConical,
  Globe2,
  BookOpen,
  Languages,
  Sparkles,
  ArrowLeft,
  Flame,
  Shield,
  Zap,
} from 'lucide-react';

export function BattleSystem() {
  const {
    gameState,
    battleState,
    isAiLoading,
    startBattle,
    selectAnswer,
    submitAnswer,
    fetchNextQuestion,
    useItemInBattle,
    closeBattleModal,
  } = useGameStore();

  const [selectedSubject, setSelectedSubject] = React.useState<Subject>('matematika');
  const [selectedGrade, setSelectedGrade] = React.useState<GradeLevel>(7);
  const [isStartingBattle, setIsStartingBattle] = React.useState(false);

  const subjects: { id: Subject; name: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { id: 'matematika', name: 'Matematika', icon: Calculator, desc: 'Aljabar, Geometri, Pythagoras, SPLDV & Pola Bilangan' },
    { id: 'ipa', name: 'Ilmu Pengetahuan Alam (IPA)', icon: FlaskConical, desc: 'Organisasi Sel, Hukum Newton, Kalor & Listrik' },
    { id: 'ips', name: 'Ilmu Pengetahuan Sosial (IPS)', icon: Globe2, desc: 'Letak Geografis, Kerajaan Nusantara, ASEAN & Pasar' },
    { id: 'indonesia', name: 'Bahasa Indonesia', icon: BookOpen, desc: 'Teks Deskripsi, Majas, Cerpen, Resensi & EYD/PUEBI' },
    { id: 'inggris', name: 'Bahasa Inggris', icon: Languages, desc: 'Grammar, Tenses, Narrative, Passive Voice & Vocabulary' },
  ];

  const handleStart = async (subj: Subject, grade: GradeLevel) => {
    setIsStartingBattle(true);
    await startBattle(subj, grade);
    setIsStartingBattle(false);
  };

  // If no battle is active, show the Arena Subject Selection Screen
  if (!battleState.isActive || !battleState.enemy) {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Arena Banner Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-edu-cardDark via-slate-900 to-edu-cardDark border border-edu-borderLight dark:border-edu-borderDark p-6 sm:p-10 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-edu-accentDark/20 blur-3xl" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="gold" className="text-xs px-3 py-1">
                🎮 ARENA PETUALANGAN RPG
              </Badge>
              <Badge variant="outline" className="text-xs text-cyan-300 border-cyan-400/30">
                Tingkat SMP Kelas 7 - 9
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Tantang Monster Pengetahuan, Uji Ketangkasan Akalmu!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pilih mata pelajaran dan tingkat kelas untuk memulai pertempuran edukasi. Setiap jawaban benar melancarkan serangan bertenaga AI Gemini, raih EXP, Keping Emas, dan item langka!
            </p>
          </div>
        </div>

        {/* Grade Selector Tabs */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            1. Pilih Tingkat Kelas SMP:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([7, 8, 9] as GradeLevel[]).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`p-3.5 rounded-2xl border text-center font-bold text-sm transition-all duration-200 active:scale-95 ${
                  selectedGrade === grade
                    ? 'border-edu-accentLight dark:border-edu-accentDark bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark ring-2 ring-edu-accentLight dark:ring-edu-accentDark shadow-sm'
                    : 'border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark text-slate-600 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <span className="block text-xs text-slate-400 font-semibold">Tingkat</span>
                <span className="text-base font-black">Kelas {grade} SMP</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subject Selection Cards */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            2. Pilih Arena Mata Pelajaran:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((item) => {
              const Icon = item.icon;
              const meta = getSubjectMeta(item.id);
              const isSelected = selectedSubject === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedSubject(item.id)}
                  className={`group relative rounded-3xl border p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-sm ${
                    isSelected
                      ? 'border-edu-accentLight dark:border-edu-accentDark bg-edu-cardLight dark:bg-edu-cardDark ring-2 ring-edu-accentLight dark:ring-edu-accentDark shadow-md'
                      : 'border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark hover:border-edu-accentLight/50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${meta.color}20`,
                        color: meta.color,
                        borderColor: `${meta.color}40`,
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-sm font-black text-edu-textLight dark:text-edu-textDark truncate">
                          {item.name}
                        </h3>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {meta.shortName}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-edu-borderLight dark:border-edu-borderDark flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      Target: Kelas {selectedGrade}
                    </span>
                    <Button
                      size="sm"
                      variant={isSelected ? 'primary' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStart(item.id, selectedGrade);
                      }}
                      isLoading={isStartingBattle && isSelected}
                      className="text-xs font-bold"
                    >
                      <Swords className="h-3.5 w-3.5 mr-1" />
                      Masuk Arena
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE BATTLE SCREEN
  const enemy = battleState.enemy;
  const isGameOver = battleState.isVictory !== null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Combat Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={closeBattleModal}
            className="text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kabur dari Arena
          </Button>
          <div className="h-5 w-[1px] bg-slate-300 dark:bg-edu-borderDark" />
          <span className="text-xs font-black text-edu-textLight dark:text-edu-textDark">
            Ronde ke-{battleState.currentTurn}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {battleState.streakCount >= 2 && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-300 text-xs font-black animate-pulse">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              Streak x{battleState.streakCount} (+{battleState.streakCount * 15}% Serangan)
            </div>
          )}
          <Badge variant="outline" className="text-xs">
            ⚔️ Pertempuran Aktif
          </Badge>
        </div>
      </div>

      {/* Duel Arena (Side-by-side Fighters) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {/* Player Hero Card */}
        <CharacterCard
          character={gameState.character}
          currentHp={battleState.playerCurrentHp}
          inventory={gameState.inventory}
          onUseItem={useItemInBattle}
          activeBattleBuffs={battleState.activeBattleBuffs}
          isHit={battleState.isAnswerSubmitted && battleState.isCorrect === false}
        />

        {/* Enemy Monster Card */}
        <EnemyCard
          enemy={enemy}
          currentHp={battleState.enemyCurrentHp}
          isHit={battleState.isAnswerSubmitted && battleState.isCorrect === true}
        />
      </div>

      {/* Question Card or Action Arena */}
      <QuestionModal
        question={battleState.currentQuestion}
        selectedOption={battleState.selectedOption}
        onSelectOption={selectAnswer}
        onSubmitAnswer={submitAnswer}
        isAnswerSubmitted={battleState.isAnswerSubmitted}
        isCorrect={battleState.isCorrect}
        streakCount={battleState.streakCount}
        eliminatedOptions={battleState.eliminatedOptions}
        isLoading={isAiLoading}
        onNextQuestion={fetchNextQuestion}
        isGameOver={isGameOver}
      />

      {/* Combat Log */}
      <CombatLog logs={battleState.combatLogs} />

      {/* Rewards Victory/Defeat Modal */}
      <RewardsModal
        isOpen={isGameOver}
        onClose={closeBattleModal}
        isVictory={battleState.isVictory === true}
        enemy={enemy}
        rewards={battleState.rewards}
        onPlayAgain={() => handleStart(battleState.subject, battleState.grade)}
      />
    </div>
  );
}
