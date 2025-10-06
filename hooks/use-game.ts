import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Mole, GameConfig } from '@/lib/types';
import { DIFFICULTY_CONFIG, getRandomHole, isGoldenMole, calculateScore } from '@/lib/game-logic';

export function useGame(config: GameConfig) {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    combo: 0,
    maxCombo: 0,
    hits: 0,
    misses: 0,
    timeLeft: config.duration,
  });

  const [moles, setMoles] = useState<Mole[]>(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      isActive: false,
      isGolden: false,
    }))
  );

  const spawnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentMoleRef = useRef<number | null>(null);

  const difficultyConfig = DIFFICULTY_CONFIG[config.difficulty];

  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = gameState.isPlaying;
  }, [gameState.isPlaying]);

  const spawnMole = useCallback(() => {
    if (!isPlayingRef.current) return;

    const holeIndex = getRandomHole(currentMoleRef.current ?? undefined);
    const isGolden = isGoldenMole();
    
    currentMoleRef.current = holeIndex;

    setMoles(prev => prev.map((mole, idx) => 
      idx === holeIndex 
        ? { ...mole, isActive: true, isGolden } 
        : mole
    ));

    // 두더지 자동 숨김
    hideTimeoutRef.current = setTimeout(() => {
      setMoles(prev => prev.map((mole, idx) => 
        idx === holeIndex 
          ? { ...mole, isActive: false, isGolden: false } 
          : mole
      ));
      currentMoleRef.current = null;

      // 다음 두더지 생성
      if (isPlayingRef.current) {
        spawnTimeoutRef.current = setTimeout(spawnMole, difficultyConfig.spawnInterval);
      }
    }, difficultyConfig.showTime);
  }, [difficultyConfig]);

  const whackMole = useCallback((moleId: number) => {
    if (!isPlayingRef.current) return;
    
    setMoles(prev => {
      const mole = prev[moleId];
      
      if (!mole.isActive) {
        // 빈 구멍 클릭 - 미스
        setGameState(state => ({
          ...state,
          misses: state.misses + 1,
          combo: 0,
          score: Math.max(0, state.score - 5),
        }));
        return prev;
      }

      // 두더지 타격 성공
      setGameState(state => {
        const newCombo = state.combo + 1;
        const points = calculateScore(mole.isGolden, state.combo);
        
        return {
          ...state,
          score: state.score + points,
          combo: newCombo,
          maxCombo: Math.max(state.maxCombo, newCombo),
          hits: state.hits + 1,
        };
      });

      // 기존 타이머 클리어하고 즉시 다음 두더지 생성
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      
      currentMoleRef.current = null;
      if (isPlayingRef.current) {
        spawnTimeoutRef.current = setTimeout(spawnMole, difficultyConfig.spawnInterval);
      }

      // 타격한 두더지 즉시 숨김
      return prev.map((m, idx) => 
        idx === moleId 
          ? { ...m, isActive: false, isGolden: false } 
          : m
      );
    });
  }, [spawnMole, difficultyConfig]);

  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      score: 0,
      combo: 0,
      maxCombo: 0,
      hits: 0,
      misses: 0,
      timeLeft: config.duration,
    });

    setMoles(prev => prev.map(mole => ({ 
      ...mole, 
      isActive: false, 
      isGolden: false 
    })));

    // 첫 두더지 생성
    setTimeout(spawnMole, 500);
  }, [config.duration, spawnMole]);

  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
    
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    
    setMoles(prev => prev.map(mole => ({ 
      ...mole, 
      isActive: false, 
      isGolden: false 
    })));
  }, []);

  const updateTimeLeft = useCallback((time: number) => {
    setGameState(prev => ({ ...prev, timeLeft: time }));
  }, []);

  // 게임 종료 시 클린업
  useEffect(() => {
    return () => {
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return {
    gameState,
    moles,
    whackMole,
    startGame,
    endGame,
    updateTimeLeft,
  };
}

