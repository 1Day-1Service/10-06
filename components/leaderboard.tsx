'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTopScores } from '@/lib/storage';
import { LeaderboardEntry, Difficulty } from '@/lib/types';
import { DIFFICULTY_CONFIG } from '@/lib/game-logic';

interface LeaderboardProps {
  onBack: () => void;
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [filter, setFilter] = useState<Difficulty | 'all'>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const scores = getTopScores(filter === 'all' ? undefined : filter, 10);
    setEntries(scores);
  }, [filter]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 toss-gradient">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center tracking-tight">
            🏆 랭킹
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 필터 */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              size="sm"
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              전체
            </Button>
            {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => {
              const config = DIFFICULTY_CONFIG[diff];
              return (
                <Button
                  key={diff}
                  size="sm"
                  variant={filter === diff ? 'default' : 'outline'}
                  onClick={() => setFilter(diff)}
                >
                  {config.emoji} {config.label}
                </Button>
              );
            })}
          </div>

          {/* 랭킹 목록 */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {entries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                아직 기록이 없습니다
              </div>
            ) : (
              entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0
                      ? 'bg-yellow-100 border-2 border-yellow-400'
                      : index === 1
                      ? 'bg-gray-100 border-2 border-gray-400'
                      : index === 2
                      ? 'bg-orange-100 border-2 border-orange-400'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold w-8">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </div>
                    <div>
                      <div className="font-semibold">{entry.nickname}</div>
                      <div className="text-xs text-gray-500">
                        {DIFFICULTY_CONFIG[entry.difficulty].emoji} {DIFFICULTY_CONFIG[entry.difficulty].label} | 
                        콤보 x{entry.maxCombo} | 명중 {entry.accuracy}%
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {entry.score}점
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 뒤로가기 */}
          <Button 
            onClick={onBack} 
            className="w-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            ← 돌아가기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

