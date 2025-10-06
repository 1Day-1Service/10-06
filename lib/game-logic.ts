import { Difficulty, DifficultyConfig } from './types';

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    showTime: 2000,
    spawnInterval: 1500,
    label: '쉬움',
    emoji: '🟢',
  },
  normal: {
    showTime: 1500,
    spawnInterval: 1200,
    label: '보통',
    emoji: '🟡',
  },
  hard: {
    showTime: 1000,
    spawnInterval: 900,
    label: '어려움',
    emoji: '🔴',
  },
  hell: {
    showTime: 700,
    spawnInterval: 600,
    label: '지옥',
    emoji: '💀',
  },
};

export function getRandomHole(currentHole?: number): number {
  const holes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const availableHoles = currentHole !== undefined 
    ? holes.filter(h => h !== currentHole)
    : holes;
  
  return availableHoles[Math.floor(Math.random() * availableHoles.length)];
}

export function isGoldenMole(): boolean {
  return Math.random() < 0.1; // 10% 확률
}

export function calculateScore(isGolden: boolean, combo: number): number {
  const baseScore = isGolden ? 30 : 10;
  const comboMultiplier = Math.min(1 + (combo * 0.1), 3); // 최대 3배
  return Math.floor(baseScore * comboMultiplier);
}

export function calculateAccuracy(hits: number, misses: number): number {
  const total = hits + misses;
  if (total === 0) return 0;
  return Math.round((hits / total) * 100);
}

