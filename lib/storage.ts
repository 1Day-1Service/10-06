import { LeaderboardEntry } from './types';

const STORAGE_KEY = 'whack-a-mole-leaderboard';

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
    return [];
  }
}

export function saveToLeaderboard(entry: Omit<LeaderboardEntry, 'id' | 'timestamp'>): void {
  const leaderboard = getLeaderboard();
  
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  
  const updatedLeaderboard = [...leaderboard, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 50); // 최대 50개 저장
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeaderboard));
  } catch (error) {
    console.error('Failed to save leaderboard:', error);
  }
}

export function getTopScores(difficulty?: string, limit: number = 10): LeaderboardEntry[] {
  const leaderboard = getLeaderboard();
  
  const filtered = difficulty
    ? leaderboard.filter(entry => entry.difficulty === difficulty)
    : leaderboard;
  
  return filtered.slice(0, limit);
}

export function getBestScore(difficulty: string): number {
  const scores = getTopScores(difficulty, 1);
  return scores.length > 0 ? scores[0].score : 0;
}

