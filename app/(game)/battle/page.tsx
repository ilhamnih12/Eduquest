'use client';

import * as React from 'react';
import { BattleSystem } from '@/components/game/BattleSystem';
import { Sidebar } from '@/components/layout/Sidebar';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';

export default function BattlePage() {
  const { isInitialized, initGame, battleState } = useGameStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (!isInitialized && user) {
      initGame(user.id, user.username);
    }
  }, [isInitialized, initGame, user]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Hide sidebar on small screens if in the middle of a battle to focus on combat */}
      <div className={battleState.isActive ? 'hidden lg:block' : 'w-full lg:w-72'}>
        <Sidebar />
      </div>
      <div className="flex-1 w-full min-w-0">
        <BattleSystem />
      </div>
    </div>
  );
}
