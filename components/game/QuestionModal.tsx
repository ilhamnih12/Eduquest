import * as React from 'react';
import { Question } from '@/types/game';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getSubjectMeta } from '@/lib/utils';
import { formatMathText } from '@/lib/game/question-format';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Flame,
  HelpCircle,
} from 'lucide-react';

interface QuestionModalProps {
  question: Question | null;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onSubmitAnswer: () => void;
  isAnswerSubmitted: boolean;
  isCorrect: boolean | null;
  streakCount: number;
  eliminatedOptions?: number[];
  isLoading?: boolean;
  onNextQuestion: () => void;
  isGameOver?: boolean;
}

export function QuestionModal({
  question,
  selectedOption,
  onSelectOption,
  onSubmitAnswer,
  isAnswerSubmitted,
  isCorrect,
  streakCount,
  eliminatedOptions = [],
  isLoading = false,
  onNextQuestion,
  isGameOver = false,
}: QuestionModalProps) {
  if (isLoading || !question) {
    return (
      <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-8 shadow-xl text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-2xl bg-edu-accentLight/20 dark:bg-edu-accentDark/20 flex items-center justify-center animate-spin">
            <Sparkles className="h-6 w-6 text-edu-accentLight dark:text-edu-accentDark" />
          </div>
        </div>
        <h3 className="text-base font-bold text-edu-textLight dark:text-edu-textDark">
          Lagi menyiapkan soal dari Guru AI...
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Tunggu sebentar, soal dibuat sesuai kelas dan subbab yang kamu pilih.
        </p>
      </div>
    );
  }

  const meta = getSubjectMeta(question.subject);
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-edu-borderLight dark:border-edu-borderDark">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={meta.badgeClass}>
            {meta.name}
          </Badge>
          <Badge variant="secondary" className="text-[11px]">
            {question.topic}
          </Badge>
          <Badge
            variant={
              question.difficulty === 'hard'
                ? 'danger'
                : question.difficulty === 'medium'
                ? 'warning'
                : 'success'
            }
            className="capitalize text-[11px]"
          >
            {question.difficulty === 'hard'
              ? 'Tinggi (HOTS)'
              : question.difficulty === 'medium'
              ? 'Sedang'
              : 'Dasar'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {streakCount >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black animate-pulse">
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              Streak x{streakCount} (+{streakCount * 15}% Dmg)
            </div>
          )}
          <Badge variant="outline" className="text-[10px] text-slate-400">
            {question.source === 'gemini' ? '✨ Gemini AI' : '📚 Kurikulum SMP'}
          </Badge>
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-edu-accentLight/15 text-edu-accentLight dark:text-edu-accentDark text-xs font-black flex-shrink-0 mt-0.5">
            ?
          </span>
          <h2 className="whitespace-pre-wrap text-base sm:text-lg font-bold leading-relaxed text-edu-textLight dark:text-edu-textDark">
            {formatMathText(question.question)}
          </h2>
        </div>

        {question.hint && !isAnswerSubmitted && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="whitespace-pre-wrap leading-relaxed">
              <span className="font-bold">Petunjuk Guru:</span> {formatMathText(question.hint)}
            </div>
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = index === question.correctAnswer;
          const isEliminated = eliminatedOptions.includes(index);

          let optionStyle =
            'border-edu-borderLight dark:border-edu-borderDark bg-white dark:bg-edu-bgDark hover:border-edu-accentLight dark:hover:border-edu-accentDark text-edu-textLight dark:text-edu-textDark';

          if (isEliminated && !isAnswerSubmitted) {
            optionStyle = 'opacity-30 pointer-events-none line-through border-dashed bg-slate-100 dark:bg-slate-800';
          } else if (isAnswerSubmitted) {
            if (isCorrectOption) {
              optionStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-100 font-bold ring-2 ring-emerald-500';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-rose-500 bg-rose-500/15 text-rose-900 dark:text-rose-100 font-bold ring-2 ring-rose-500';
            } else {
              optionStyle = 'opacity-50 border-edu-borderLight dark:border-edu-borderDark bg-slate-50 dark:bg-edu-bgDark/40';
            }
          } else if (isSelected) {
            optionStyle = 'border-edu-accentLight dark:border-edu-accentDark bg-edu-accentLight/10 dark:bg-edu-accentDark/20 ring-2 ring-edu-accentLight dark:ring-edu-accentDark text-edu-accentLight dark:text-edu-accentDark font-bold';
          }

          return (
            <button
              key={index}
              disabled={isAnswerSubmitted || isEliminated}
              onClick={() => onSelectOption(index)}
              className={`flex items-start gap-3 p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${optionStyle}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black flex-shrink-0 ${
                  isSelected
                    ? 'bg-edu-accentLight dark:bg-edu-accentDark text-white dark:text-edu-bgDark'
                    : 'bg-slate-200 dark:bg-edu-borderDark text-slate-700 dark:text-slate-300'
                }`}
              >
                {optionLetters[index]}
              </span>
              <span className="flex-1 whitespace-pre-wrap leading-relaxed">{formatMathText(option)}</span>
            </button>
          );
        })}
      </div>

      {/* Answer Explanation After Submit */}
      {isAnswerSubmitted && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border animate-in fade-in-50 space-y-2 ${
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 font-black text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span>Luar Biasa! Jawaban Kamu Benar! 🎉</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                <span>Jawaban Belum Tepat. Pilihan yang Benar adalah ({optionLetters[question.correctAnswer]})</span>
              </>
            )}
          </div>
          <p className="whitespace-pre-wrap text-xs leading-relaxed opacity-90 pl-7">
            <span className="font-bold">Pembahasan:</span> {formatMathText(question.explanation)}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2 flex items-center justify-end">
        {!isAnswerSubmitted ? (
          <Button
            size="lg"
            variant="primary"
            onClick={onSubmitAnswer}
            disabled={selectedOption === null}
            className="w-full sm:w-auto font-black"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Lancarkan Jawaban!
          </Button>
        ) : (
          !isGameOver && (
            <Button
              size="lg"
              variant="primary"
              onClick={onNextQuestion}
              className="w-full sm:w-auto font-black"
            >
              Lanjutkan Ronde Berikutnya
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )
        )}
      </div>
    </div>
  );
}
