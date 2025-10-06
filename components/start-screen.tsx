'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Difficulty, Duration } from '@/lib/types';
import { DIFFICULTY_CONFIG } from '@/lib/game-logic';
import { getBestScore } from '@/lib/storage';

interface StartScreenProps {
  onStart: (difficulty: Difficulty, duration: Duration) => void;
  onViewLeaderboard: () => void;
}

export function StartScreen({ onStart, onViewLeaderboard }: StartScreenProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [duration, setDuration] = useState<Duration>(30);

  const bestScore = getBestScore(difficulty);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 toss-gradient">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-4xl font-bold text-center tracking-tight">
            🔨 두더지 잡기
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">빠른 반응속도 테스트!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 난이도 선택 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">난이도 선택</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => {
                const config = DIFFICULTY_CONFIG[diff];
                return (
                  <Button
                    key={diff}
                    variant={difficulty === diff ? 'default' : 'outline'}
                    onClick={() => setDifficulty(diff)}
                    className="h-auto py-3"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">{config.emoji}</span>
                      <span className="text-sm">{config.label}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* 시간 선택 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">시간 선택</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={duration === 30 ? 'default' : 'outline'}
                onClick={() => setDuration(30)}
              >
                30초
              </Button>
              <Button
                variant={duration === 60 ? 'default' : 'outline'}
                onClick={() => setDuration(60)}
              >
                60초
              </Button>
            </div>
          </div>

          {/* 최고 기록 */}
          {bestScore > 0 && (
            <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="text-xs font-medium text-gray-600 mb-1">🏆 최고 기록</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {bestScore}점
              </div>
            </div>
          )}

          {/* 시작 버튼 */}
          <Button 
            onClick={() => onStart(difficulty, duration)}
            size="lg"
            className="w-full text-lg py-7 font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            게임 시작
          </Button>

          {/* 랭킹 보기 */}
          <Button
            onClick={onViewLeaderboard}
            variant="outline"
            className="w-full font-semibold"
          >
            📊 랭킹 보기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

