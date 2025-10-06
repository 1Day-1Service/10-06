'use client';

import { Mole } from './mole';
import { Mole as MoleType } from '@/lib/types';

interface GameBoardProps {
  moles: MoleType[];
  onWhack: (id: number) => void;
}

export function GameBoard({ moles, onWhack }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl shadow-2xl border-4 border-emerald-900/20">
      {moles.map((mole) => (
        <div 
          key={mole.id} 
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
        >
          <Mole mole={mole} onWhack={onWhack} />
        </div>
      ))}
    </div>
  );
}

