'use client';

import { useState } from 'react';
import { StartScreen } from '@/components/start-screen';
import { GameBoard } from '@/components/game-board';
import { ScoreBoard } from '@/components/score-board';
import { GameOverModal } from '@/components/game-over-modal';
import { Leaderboard } from '@/components/leaderboard';
import { useGame } from '@/hooks/use-game';
import { useTimer } from '@/hooks/use-timer';
import { Difficulty, Duration } from '@/lib/types';

type Screen = 'start' | 'game' | 'leaderboard';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('start');
  const [config, setConfig] = useState<{ difficulty: Difficulty; duration: Duration }>({
    difficulty: 'normal',
    duration: 30,
  });
  const [showGameOver, setShowGameOver] = useState(false);

  const { gameState, moles, whackMole, startGame, endGame, updateTimeLeft } = useGame(config);

  const { timeLeft, reset: resetTimer } = useTimer(
    config.duration,
    gameState.isPlaying,
    () => {
      endGame();
      setShowGameOver(true);
    }
  );

  // 게임 상태에 타이머 동기화
  if (gameState.isPlaying && gameState.timeLeft !== timeLeft) {
    updateTimeLeft(timeLeft);
  }

  function handleStart(difficulty: Difficulty, duration: Duration) {
    setShowGameOver(false);
    setConfig({ difficulty, duration });
    setTimeout(() => {
      setScreen('game');
      resetTimer();
      startGame();
    }, 50);
  }

  function handlePlayAgain() {
    setShowGameOver(false);
    setTimeout(() => {
      resetTimer();
      startGame();
    }, 50);
  }

  function handleGoHome() {
    setShowGameOver(false);
    setScreen('start');
    endGame();
  }

  function handleViewLeaderboard() {
    setScreen('leaderboard');
  }

  function handleBackToStart() {
    setScreen('start');
  }

  if (screen === 'start') {
    return (
      <StartScreen 
        onStart={handleStart} 
        onViewLeaderboard={handleViewLeaderboard}
      />
    );
  }

  if (screen === 'leaderboard') {
    return <Leaderboard onBack={handleBackToStart} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 toss-gradient-green">
      <div className="space-y-6 w-full max-w-2xl">
        {/* 점수판 */}
        <ScoreBoard 
          timeLeft={timeLeft}
          score={gameState.score}
          combo={gameState.combo}
        />

        {/* 게임 보드 */}
        <div className="flex justify-center">
          <GameBoard moles={moles} onWhack={whackMole} />
        </div>

        {/* 홈으로 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white hover:shadow-xl transition-all font-semibold text-gray-700"
          >
            ← 홈으로
          </button>
        </div>
      </div>

      {/* 게임 종료 모달 */}
      <GameOverModal
        isOpen={showGameOver}
        score={gameState.score}
        maxCombo={gameState.maxCombo}
        hits={gameState.hits}
        misses={gameState.misses}
        difficulty={config.difficulty}
        onPlayAgain={handlePlayAgain}
        onGoHome={handleGoHome}
      />
    </div>
  );
}
