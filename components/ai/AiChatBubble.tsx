'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Trash2,
  GraduationCap,
  CircleDot,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useGameStore } from '@/store/gameStore';
import type { AiChatMessage } from '@/types/ai';
import type { Subject } from '@/types/game';

const STORAGE_KEY = 'eduquest_ai_chat_v1';
const MAX_STORED_MESSAGES = 40;

const SUBJECT_NAMES: Record<Subject, string> = {
  matematika: 'Matematika',
  ipa: 'IPA',
  ips: 'IPS',
  indonesia: 'Bahasa Indonesia',
  inggris: 'Bahasa Inggris',
};

const QUICK_PROMPTS = [
  { label: '📐 Cara mengerjakan Pythagoras', text: 'Kalau sisi segitiga 6 cm dan 8 cm, bagaimana langkah mencari sisi miringnya? Jelaskan caranya!' },
  { label: '🍎 Jelaskan Hukum Newton II', text: 'Tolong jelaskan Hukum Newton kedua dengan contoh sehari-hari dong.' },
  { label: '✨ Tips belajar tiap hari', text: 'Beriku tips agar konsisten belajar setiap hari walau banyak PR.' },
  { label: '📚 Rumus luas lingkaran', text: 'Bagaimana cara menghafal dan memakai rumus luas dan keliling lingkaran?' },
];

interface ChatMessage extends AiChatMessage {
  id: string;
  source?: 'gemini' | 'local';
}

function createId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

export function AiChatBubble() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { gameState, isInitialized } = useGameStore();

  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // Jangan tampilkan bubble di halaman auth (sebelum login)
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // Muat riwayat chat dari localStorage saat pertama kali
  React.useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed)) {
          setMessages(parsed.slice(-MAX_STORED_MESSAGES));
        }
      }
    } catch {
      // abaikan data korup
    }
  }, []);

  // Simpan riwayat setiap berubah
  React.useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
    } catch {
      // storage penuh — abaikan
    }
  }, [messages, isMounted]);

  // Auto-scroll ke pesan terbaru
  React.useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isSending]);

  // Fokus ke input saat panel dibuka
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const buildContext = () => {
    const stats = gameState.statistics;
    const total = stats.questionsAnswered;
    const accuracy = total > 0 ? Math.round((stats.correctAnswers / total) * 100) : undefined;

    let strongestSubject: Subject | undefined;
    let weakestSubject: Subject | undefined;
    let bestRate = -1;
    let worstRate = 101;

    (Object.keys(SUBJECT_NAMES) as Subject[]).forEach((subject) => {
      const perf = stats.subjectPerformance[subject];
      if (!perf || perf.total === 0) return;
      const rate = perf.correct / perf.total;
      if (rate > bestRate) {
        bestRate = rate;
        strongestSubject = subject;
      }
      if (rate < worstRate) {
        worstRate = rate;
        weakestSubject = subject;
      }
    });

    return {
      username: user?.username || gameState.character.name,
      level: isInitialized ? gameState.character.level : undefined,
      title: gameState.character.title,
      strongestSubject,
      weakestSubject,
      accuracy,
    };
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isSending) return;

    const userMessage: ChatMessage = { id: createId(), role: 'user', content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          context: buildContext(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Guru AI sedang tidak bisa membalas.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'assistant',
          content: data.reply,
          source: data.source,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'assistant',
          content:
            err instanceof Error
              ? `⚠️ ${err.message}`
              : '⚠️ Terjadi kesalahan jaringan. Coba lagi ya!',
          source: 'local',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // abaikan
    }
  };

  if (!isMounted || isAuthPage) return null;

  const lastSource = [...messages].reverse().find((m) => m.role === 'assistant')?.source;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* ================= PANEL CHAT ================= */}
      {isOpen && (
        <div className="w-[calc(100vw-2.5rem)] sm:w-[380px] rounded-3xl overflow-hidden border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-2xl shadow-edu-accentLight/10 flex flex-col animate-[chatPopIn_0.22s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-edu-accentLight to-sky-500 dark:from-edu-accentDark dark:to-indigo-600 px-4 py-3 flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white">
              <GraduationCap className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white/60 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white leading-tight flex items-center gap-1.5">
                Guru AI Eduquest
                <span className="inline-flex items-center gap-0.5 rounded-full bg-white/25 px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wide text-white">
                  <Sparkles className="h-2.5 w-2.5" />
                  Gemini
                </span>
              </p>
              <p className="text-[10px] text-white/85 font-semibold truncate">
                {isSending ? 'sedang mengetik…' : 'Online — siap membantu belajarmu!'}
              </p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                title="Hapus riwayat obrolan"
                className="flex h-8 w-8 items-center justify-center rounded-xl text-white/80 hover:bg-white/20 hover:text-white transition-colors active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              title="Tutup"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white/80 hover:bg-white/20 hover:text-white transition-colors active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Daftar Pesan */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3 max-h-[52vh] min-h-[240px] bg-edu-bgLight/60 dark:bg-edu-bgDark/60"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="text-center space-y-1.5 py-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-edu-accentLight/10 dark:bg-edu-accentDark/15 text-edu-accentLight dark:text-edu-accentDark">
                    <Bot className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-black text-edu-textLight dark:text-edu-textDark">
                    Halo{user?.username ? `, ${user.username}` : ' Petualang'}! 👋
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                    Aku <span className="font-bold text-edu-accentLight dark:text-edu-accentDark">Guru AI</span> berdasi
                    Google Gemini. Tanyakan materi SMP atau minta tips belajar — aku jelaskan langkah demi langkah!
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      onClick={() => sendMessage(prompt.text)}
                      className="text-left text-[11px] font-bold px-3 py-2.5 rounded-xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark hover:border-edu-accentLight dark:hover:border-edu-accentDark hover:bg-edu-accentLight/5 dark:hover:bg-edu-accentDark/10 text-slate-600 dark:text-slate-300 transition-all active:scale-[0.98]"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap break-words ${
                    message.role === 'user'
                      ? 'rounded-2xl rounded-br-md bg-edu-accentLight dark:bg-edu-accentDark text-white dark:text-edu-bgDark font-semibold'
                      : 'rounded-2xl rounded-bl-md bg-edu-cardLight dark:bg-edu-cardDark border border-edu-borderLight dark:border-edu-borderDark text-edu-textLight dark:text-edu-textDark shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-md bg-edu-cardLight dark:bg-edu-cardDark border border-edu-borderLight dark:border-edu-borderDark shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-edu-accentLight dark:bg-edu-accentDark animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-edu-accentLight dark:bg-edu-accentDark animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-edu-accentLight dark:bg-edu-accentDark animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Indikator mode offline */}
          {lastSource === 'local' && !isSending && (
            <div className="px-4 py-1.5 bg-amber-500/10 border-t border-amber-500/20 flex items-center gap-1.5">
              <CircleDot className="h-3 w-3 text-amber-500" />
              <span className="text-[9.5px] font-bold text-amber-600 dark:text-amber-400 leading-tight">
                Mode offline — jawaban terbatas. Set GEMINI_API_KEY untuk kecerdasan penuh.
              </span>
            </div>
          )}

          {/* Input */}
          <div className="p-2.5 border-t border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={800}
                placeholder="Tulis pertanyaan materi SMP di sini…"
                className="flex-1 resize-none max-h-28 rounded-xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-bgLight/70 dark:bg-edu-bgDark/70 px-3.5 py-2.5 text-xs text-edu-textLight dark:text-edu-textDark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-edu-accentLight/60 dark:focus:ring-edu-accentDark/60 focus:border-transparent transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isSending}
                title="Kirim pesan"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-edu-accentLight dark:bg-edu-accentDark text-white dark:text-edu-bgDark shadow-md hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[9px] text-slate-400 dark:text-slate-500 font-semibold">
              Ditenagai Google Gemini • Jawaban AI tetap perlu dicek guru ya 🔍
            </p>
          </div>
        </div>
      )}

      {/* ================= TOMBOL BUBBLE ================= */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title={isOpen ? 'Tutup Guru AI' : 'Tanya Guru AI'}
        aria-label={isOpen ? 'Tutup Guru AI' : 'Buka Guru AI'}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-edu-accentLight to-sky-500 dark:from-edu-accentDark dark:to-indigo-600 text-white shadow-xl shadow-edu-accentLight/30 hover:scale-105 transition-transform active:scale-95"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-edu-bgLight dark:border-edu-bgDark" />
          </span>
        )}
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
      </button>
    </div>
  );
}
