import React from 'react';
import { useGameStore } from '../store/gameStore';
import type { GameLog } from '../types/chess';

const pieceNames: Record<string, string> = {
  p: 'Pawn',
  n: 'Knight',
  b: 'Bishop',
  r: 'Rook',
  q: 'Queen',
  k: 'King'
};

export const GameLog: React.FC = () => {
  const moveHistory = useGameStore(state => state.moveHistory);
  const logRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [moveHistory]);

  const formatMove = (log: GameLog) => {
    const { move } = log;
    const pieceName = pieceNames[move.piece.toLowerCase()];
    const color = move.color === 'w' ? 'White' : 'Black';
    const capture = move.captured ? `captures ${pieceNames[move.captured.toLowerCase()]}` : 'to';
    const promotion = move.promotion ? ` (promotes to ${pieceNames[move.promotion.toLowerCase()]})` : '';
    return `${color} ${pieceName} ${move.from} ${capture} ${move.to}${promotion}`;
  };

  return (
    <div className="w-96 bg-white rounded-lg shadow-xl p-4">
      <h2 className="text-xl font-bold mb-4">Game Log</h2>
      <div 
        ref={logRef}
        className="h-[600px] overflow-y-auto space-y-2 pr-2"
      >
        {moveHistory.map((log, index) => (
          <div 
            key={log.timestamp}
            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
          >
            <span className="font-mono text-gray-500 min-w-[2rem]">{Math.floor(index/2 + 1)}.</span>
            <span className={log.move.color === 'w' ? 'text-amber-600' : 'text-gray-900'}>
              {formatMove(log)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};