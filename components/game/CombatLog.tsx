import * as React from 'react';
import { CombatLogEntry } from '@/types/game';
import { Scroll, Shield, Swords, Heart, Sparkles, AlertCircle } from 'lucide-react';

interface CombatLogProps {
  logs: CombatLogEntry[];
}

export function CombatLog({ logs }: CombatLogProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogIcon = (type: CombatLogEntry['type']) => {
    switch (type) {
      case 'player_attack':
        return <Swords className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />;
      case 'critical':
        return <Sparkles className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 animate-spin" />;
      case 'enemy_attack':
        return <AlertCircle className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />;
      case 'player_heal':
        return <Heart className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500 flex-shrink-0" />;
      case 'item_use':
        return <Shield className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />;
      default:
        return <Scroll className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />;
    }
  };

  const getLogBg = (type: CombatLogEntry['type']) => {
    switch (type) {
      case 'player_attack':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-800 dark:text-blue-200';
      case 'critical':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-800 dark:text-amber-200 font-bold';
      case 'enemy_attack':
        return 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-200';
      case 'player_heal':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-200';
      case 'item_use':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-slate-100 dark:bg-edu-borderDark/40 border-slate-200 dark:border-edu-borderDark text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="rounded-2xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-4 shadow-sm">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-edu-borderLight dark:border-edu-borderDark">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Scroll className="h-3.5 w-3.5" />
          Catatan Pertempuran (Combat Log)
        </h4>
        <span className="text-[10px] text-slate-400 font-bold">{logs.length} Aksi</span>
      </div>

      <div
        ref={containerRef}
        className="space-y-1.5 max-h-40 sm:max-h-48 overflow-y-auto pr-1 text-xs no-scrollbar"
      >
        {logs.length === 0 ? (
          <p className="text-center text-slate-400 py-4 italic text-xs">
            Belum ada pergerakan pertempuran...
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`flex items-start gap-2 p-2 rounded-xl border text-[11px] sm:text-xs leading-relaxed transition-all animate-in fade-in-50 ${getLogBg(
                log.type
              )}`}
            >
              {getLogIcon(log.type)}
              <div className="flex-1">
                <span className="font-semibold">{log.message}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
