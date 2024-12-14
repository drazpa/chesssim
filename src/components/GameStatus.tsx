import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface GameStatusProps {
  isCheck: boolean;
  isCheckmate: boolean;
  turn: 'w' | 'b';
}

export const GameStatus: React.FC<GameStatusProps> = ({ isCheck, isCheckmate, turn }) => {
  if (!isCheck && !isCheckmate) return null;

  const color = turn === 'w' ? 'White' : 'Black';
  const message = isCheckmate ? `${color} is in Checkmate!` : `${color} is in Check!`;
  const bgColor = isCheckmate ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className={`absolute top-4 left-1/2 -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-10`}>
      <AlertTriangle className="w-5 h-5" />
      <span className="font-semibold">{message}</span>
    </div>
  );
};