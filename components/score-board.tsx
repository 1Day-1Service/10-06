'use client';

import { motion } from 'framer-motion';

interface ScoreBoardProps {
  timeLeft: number;
  score: number;
  combo: number;
}

export function ScoreBoard({ timeLeft, score, combo }: ScoreBoardProps) {
  return (
    <div className="flex justify-around items-center gap-3 p-5 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* 시간 */}
      <div className="flex flex-col items-center min-w-[90px]">
        <div className="text-xs font-medium text-gray-500 mb-1">시간</div>
        <div className={`text-3xl font-bold ${
          timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-900'
        }`}>
          {timeLeft}
        </div>
      </div>

      <div className="h-12 w-px bg-gray-200" />

      {/* 점수 */}
      <div className="flex flex-col items-center min-w-[90px]">
        <div className="text-xs font-medium text-gray-500 mb-1">점수</div>
        <motion.div 
          key={score}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          {score}
        </motion.div>
      </div>

      <div className="h-12 w-px bg-gray-200" />

      {/* 콤보 */}
      <div className="flex flex-col items-center min-w-[90px]">
        <div className="text-xs font-medium text-gray-500 mb-1">콤보</div>
        <motion.div 
          key={combo}
          initial={{ scale: 1 }}
          animate={{ scale: combo > 0 ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className={`text-3xl font-bold ${
            combo > 0 ? 'bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent' : 'text-gray-300'
          }`}
        >
          x{combo}
        </motion.div>
      </div>
    </div>
  );
}

