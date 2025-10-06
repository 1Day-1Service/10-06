'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateAccuracy } from '@/lib/game-logic';
import { saveToLeaderboard } from '@/lib/storage';
import { Difficulty } from '@/lib/types';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  maxCombo: number;
  hits: number;
  misses: number;
  difficulty: Difficulty;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function GameOverModal({
  isOpen,
  score,
  maxCombo,
  hits,
  misses,
  difficulty,
  onPlayAgain,
  onGoHome,
}: GameOverModalProps) {
  const [nickname, setNickname] = useState('');
  const [saved, setSaved] = useState(false);

  const accuracy = calculateAccuracy(hits, misses);

  function handleSave() {
    if (!nickname.trim()) return;

    saveToLeaderboard({
      nickname: nickname.trim(),
      score,
      difficulty,
      accuracy,
      maxCombo,
    });

    setSaved(true);
  }

  function handlePlayAgain() {
    setNickname('');
    setSaved(false);
    onPlayAgain();
  }

  function handleGoHome() {
    setNickname('');
    setSaved(false);
    onGoHome();
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center font-bold">
            🎉 게임 종료
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* 최종 점수 */}
          <div className="text-center space-y-2 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <div className="text-xs font-medium text-gray-600">최종 점수</div>
            <div className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {score}
            </div>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="text-xs font-medium text-gray-600 mb-1">최고 콤보</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">x{maxCombo}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="text-xs font-medium text-gray-600 mb-1">명중률</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{accuracy}%</div>
            </div>
          </div>

          {/* 닉네임 입력 */}
          {!saved ? (
            <div className="space-y-2">
              <label className="text-sm font-semibold">닉네임</label>
              <div className="flex gap-2">
                <Input
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={10}
                  className="font-medium"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                  }}
                />
                <Button 
                  onClick={handleSave} 
                  disabled={!nickname.trim()}
                  className="font-semibold"
                >
                  등록
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl text-center font-semibold border border-green-200">
              ✅ 랭킹에 등록되었습니다!
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handlePlayAgain} 
              className="flex-1 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              다시하기
            </Button>
            <Button 
              onClick={handleGoHome} 
              variant="outline" 
              className="flex-1 font-semibold"
            >
              홈으로
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

