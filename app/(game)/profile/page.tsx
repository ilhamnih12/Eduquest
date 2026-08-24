'use client';

import * as React from 'react';
import { StatsOverview } from '@/components/game/StatsOverview';
import { AchievementBadge } from '@/components/game/AchievementBadge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';
import { RotateCcw, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function ProfilePage() {
  const { isInitialized, initGame, resetAllProgress, syncDataToServer } = useGameStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState<string>('report');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = React.useState<boolean>(false);
  const [isSyncing, setIsSyncing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isInitialized && user) {
      initGame(user.id, user.username);
    }
  }, [isInitialized, initGame, user]);

  const tabs = [
    { id: 'report', label: 'Rapor & AI Guru', icon: '📊' },
    { id: 'achievements', label: 'Daftar Prestasi', icon: '🏆' },
    { id: 'settings', label: 'Pengaturan & Cloud', icon: '⚙️' },
  ];

  const handleSync = async () => {
    setIsSyncing(true);
    await syncDataToServer();
    setIsSyncing(false);
  };

  const handleReset = async () => {
    await resetAllProgress();
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <Sidebar />
      <div className="flex-1 w-full min-w-0 space-y-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'report' && <StatsOverview />}

        {activeTab === 'achievements' && <AchievementBadge />}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Cloud Sync section */}
            <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark text-2xl shadow-inner">
                  ☁️
                </div>
                <div>
                  <h3 className="text-base font-black text-edu-textLight dark:text-edu-textDark">
                    Sinkronisasi Cloud Upstash Redis
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sinkronkan data petualangan lokal IndexedDB dengan server cloud.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  size="md"
                  variant="primary"
                  onClick={handleSync}
                  isLoading={isSyncing}
                  className="font-bold text-xs"
                >
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                  Sinkronkan Sekarang ke Server
                </Button>
              </div>
            </div>

            {/* Reset Data Section */}
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-500 text-2xl shadow-inner">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-base font-black text-rose-600 dark:text-rose-400">
                    Reset Progres Petualangan
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Menghapus seluruh progres level, statistik jawaban, tas, dan keping emas kembali ke level 1.
                  </p>
                </div>
              </div>

              {!isResetConfirmOpen ? (
                <Button
                  size="md"
                  variant="danger"
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="text-xs font-bold"
                >
                  <RotateCcw className="h-4 w-4 mr-1.5" />
                  Mulai Ulang Progres Game
                </Button>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-600/15 border border-rose-600/30 space-y-3">
                  <p className="text-xs font-bold text-rose-700 dark:text-rose-300">
                    Apakah kamu yakin ingin mereset seluruh progres? Aksi ini tidak dapat dibatalkan.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={handleReset}
                      className="text-xs font-black"
                    >
                      Ya, Hapus Semua Progres
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsResetConfirmOpen(false)}
                      className="text-xs font-bold"
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* App Credits */}
            <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 shadow-sm space-y-2 text-center">
              <Sparkles className="h-6 w-6 text-amber-500 mx-auto" />
              <h4 className="text-sm font-black text-edu-textLight dark:text-edu-textDark">
                Eduquest RPG v1.0.0 (Kurikulum Merdeka SMP)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dikembangkan oleh <strong className="text-edu-accentLight dark:text-edu-accentDark">edinst</strong> &{' '}
                <strong className="text-edu-accentLight dark:text-edu-accentDark">Arena AI</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
