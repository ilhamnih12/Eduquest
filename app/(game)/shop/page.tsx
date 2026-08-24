'use client';

import * as React from 'react';
import { ShopItemCard } from '@/components/game/ShopItemCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';

export default function ShopPage() {
  const { isInitialized, initGame } = useGameStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (!isInitialized && user) {
      initGame(user.id, user.username);
    }
  }, [isInitialized, initGame, user]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <Sidebar />
      <div className="flex-1 w-full min-w-0">
        <ShopItemCard />
      </div>
    </div>
  );
}
