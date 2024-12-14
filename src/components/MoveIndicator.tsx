import React from 'react';
import { Crown } from 'lucide-react';

interface MoveIndicatorProps {
  turn: 'w' | 'b';
}

export const MoveIndicator: React.FC<MoveIndicatorProps> = ({ turn }) => {
  return (
    <div className="absolute -left-40 top-0 flex justify-center">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
        <Crown className={turn === 'w' ? 'text-amber-400' : 'text-gray-900'} />
        <span className="font-semibold">
          {turn === 'w' ? "White's Turn" : "Black's Turn"}
        </span>
      </div>
    </div>
  );
};