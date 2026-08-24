import { Item } from '@/types/game';

export const ITEM_DATABASE: Record<string, Item> = {
  // === RAMUAN PEMULIH (CONSUMABLES) ===
  potion_hp_small: {
    id: 'potion_hp_small',
    name: 'Ramuan Pemulih Kecil',
    description: 'Memulihkan 35 HP secara instan di saat genting pertempuran.',
    category: 'consumable',
    rarity: 'common',
    icon: 'FlaskConical',
    price: 25,
    sellPrice: 12,
    maxStack: 20,
    stats: {
      healAmount: 35,
    },
  },
  potion_hp_medium: {
    id: 'potion_hp_medium',
    name: 'Ramuan Pemulih Sedang',
    description: 'Ramuan herbal berenergi yang memulihkan 80 HP karakter.',
    category: 'consumable',
    rarity: 'uncommon',
    icon: 'FlaskRound',
    price: 60,
    sellPrice: 30,
    maxStack: 15,
    stats: {
      healAmount: 80,
    },
  },
  potion_hp_large: {
    id: 'potion_hp_large',
    name: 'Ramuan Pemulih Besar',
    description: 'Esensi murni pengetahuan yang memulihkan 160 HP.',
    category: 'consumable',
    rarity: 'rare',
    icon: 'Wine',
    price: 120,
    sellPrice: 60,
    maxStack: 10,
    stats: {
      healAmount: 160,
    },
  },
  potion_elixir: {
    id: 'potion_elixir',
    name: 'Elixir Cendekiawan',
    description: 'Ramuan langka legendaris yang memulihkan 100% HP maksimal!',
    category: 'consumable',
    rarity: 'epic',
    icon: 'Sparkles',
    price: 250,
    sellPrice: 125,
    maxStack: 5,
    stats: {
      healAmount: 9999,
    },
  },

  // === ITEM BUFF & DUKUNGAN ===
  buff_attack: {
    id: 'buff_attack',
    name: 'Serbuk Fokus Belajar',
    description: 'Meningkatkan serangan sebesar 30% selama 3 ronde pertempuran.',
    category: 'booster',
    rarity: 'uncommon',
    icon: 'Zap',
    price: 45,
    sellPrice: 22,
    maxStack: 10,
    durationTurns: 3,
    stats: {
      attackBonus: 15,
    },
  },
  buff_defense: {
    id: 'buff_defense',
    name: 'Perisai Konsentrasi',
    description: 'Meningkatkan pertahanan sebesar 40% selama 3 ronde pertempuran.',
    category: 'booster',
    rarity: 'uncommon',
    icon: 'ShieldAlert',
    price: 40,
    sellPrice: 20,
    maxStack: 10,
    durationTurns: 3,
    stats: {
      defenseBonus: 20,
    },
  },
  scroll_hint: {
    id: 'scroll_hint',
    name: 'Gulungan Petunjuk AI',
    description: 'Mengeliminasi 2 pilihan jawaban salah pada soal yang sedang dihadapi.',
    category: 'special',
    rarity: 'rare',
    icon: 'Scroll',
    price: 50,
    sellPrice: 25,
    maxStack: 10,
  },
  stone_revival: {
    id: 'stone_revival',
    name: 'Batu Kebangkitan',
    description: 'Menghidupkan kembali karakter dengan 50% HP jika tumbang di medan laga.',
    category: 'special',
    rarity: 'epic',
    icon: 'Gem',
    price: 180,
    sellPrice: 90,
    maxStack: 3,
    stats: {
      revivePercent: 50,
    },
  },
  talisman_exp: {
    id: 'talisman_exp',
    name: 'Jimat Cendekiawan',
    description: 'Memberikan tambahan 50% EXP dari hasil pertempuran berikutnya.',
    category: 'booster',
    rarity: 'rare',
    icon: 'Flame',
    price: 75,
    sellPrice: 35,
    maxStack: 5,
    stats: {
      expBoostPercent: 50,
    },
  },

  // === SENJATA (WEAPONS) ===
  weapon_wooden_ruler: {
    id: 'weapon_wooden_ruler',
    name: 'Penggaris Kayu Pemula',
    description: 'Alat ukur sederhana yang kokoh. Memberikan +12 Serangan.',
    category: 'weapon',
    rarity: 'common',
    icon: 'Ruler',
    price: 90,
    sellPrice: 45,
    maxStack: 1,
    stats: {
      attackBonus: 12,
      critRateBonus: 2,
    },
  },
  weapon_pen_blade: {
    id: 'weapon_pen_blade',
    name: 'Pedang Pena Baja',
    description: 'Pena tajam setajam pikiran kritis! Memberikan +28 Serangan dan +6% Kritis.',
    category: 'weapon',
    rarity: 'rare',
    icon: 'Feather',
    price: 320,
    sellPrice: 160,
    maxStack: 1,
    stats: {
      attackBonus: 28,
      critRateBonus: 6,
    },
  },
  weapon_calculus_staff: {
    id: 'weapon_calculus_staff',
    name: 'Tongkat Kalkulus Ajaib',
    description: 'Tongkat yang memancarkan aura matematika murni. +55 Serangan, +15% Kritis.',
    category: 'weapon',
    rarity: 'legendary',
    icon: 'Wand2',
    price: 750,
    sellPrice: 375,
    maxStack: 1,
    stats: {
      attackBonus: 55,
      critRateBonus: 15,
    },
  },

  // === PERLENGKAPAN BERTAHAN (ARMOR) ===
  armor_school_vest: {
    id: 'armor_school_vest',
    name: 'Rompi Seragam Pramuka',
    description: 'Rompi kain tebal yang melindungi diri dari cuaca dan serangan ringan. +8 Pertahanan, +25 Max HP.',
    category: 'armor',
    rarity: 'common',
    icon: 'Shirt',
    price: 80,
    sellPrice: 40,
    maxStack: 1,
    stats: {
      defenseBonus: 8,
      maxHpBonus: 25,
    },
  },
  armor_lab_coat: {
    id: 'armor_lab_coat',
    name: 'Jas Baja Laboratorium',
    description: 'Jas tahan reaksi kimia dan benturan fisik. +22 Pertahanan, +65 Max HP.',
    category: 'armor',
    rarity: 'rare',
    icon: 'Shield',
    price: 290,
    sellPrice: 145,
    maxStack: 1,
    stats: {
      defenseBonus: 22,
      maxHpBonus: 65,
    },
  },
  armor_archmage_robe: {
    id: 'armor_archmage_robe',
    name: 'Jubah Mahaguru Nusantara',
    description: 'Jubah agung bermotif batik berenergi mistis ilmu pengetahuan. +45 Pertahanan, +140 Max HP.',
    category: 'armor',
    rarity: 'legendary',
    icon: 'Crown',
    price: 800,
    sellPrice: 400,
    maxStack: 1,
    stats: {
      defenseBonus: 45,
      maxHpBonus: 140,
    },
  },
};

export function getItemById(id: string): Item | undefined {
  return ITEM_DATABASE[id];
}

export function getAllShopItems(): Item[] {
  return Object.values(ITEM_DATABASE);
}
