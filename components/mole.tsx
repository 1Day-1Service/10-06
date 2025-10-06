'use client';

import { motion } from 'framer-motion';
import { Mole as MoleType } from '@/lib/types';

interface MoleProps {
  mole: MoleType;
  onWhack: (id: number) => void;
}

export function Mole({ mole, onWhack }: MoleProps) {
  return (
    <div 
      className="relative w-full h-full flex items-end justify-center cursor-pointer group"
      onClick={() => onWhack(mole.id)}
    >
      {/* 구멍 */}
      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-amber-900 to-amber-950 rounded-full border-4 border-amber-950/50 shadow-inner" />
      
      {/* 두더지 */}
      {mole.isActive && (
        <motion.div
          initial={{ y: 100, scale: 0.8 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 100, scale: 0.8 }}
          transition={{ 
            duration: 0.15, 
            ease: 'easeOut',
            scale: { duration: 0.1 }
          }}
          className="absolute bottom-4 z-10"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`text-6xl sm:text-7xl select-none ${
              mole.isGolden ? 'animate-pulse drop-shadow-lg' : ''
            }`}
          >
            {mole.isGolden ? '⭐' : '🐹'}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

