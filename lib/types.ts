export type Difficulty = 'easy' | 'normal' | 'hard' | 'hell';
export type Duration = 30 | 60;

export interface GameConfig {
  difficulty: Difficulty;
  duration: Duration;
}

export interface Mole {
  id: number;
  isActive: boolean;
  isGolden: boolean;
}

export interface GameState {
  isPlaying: boolean;
  score: number;
  combo: number;
  maxCombo: number;
  hits: number;
  misses: number;
  timeLeft: number;
}

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  difficulty: Difficulty;
  accuracy: number;
  maxCombo: number;
  timestamp: number;
}

export interface DifficultyConfig {
  showTime: number;
  spawnInterval: number;
  label: string;
  emoji: string;
}

