import React from 'react';
import { useGameStore } from '../store/gameStore';

const pieceNames: Record<string, string> = {
  p: 'Pawn',
  n: 'Knight',
  b: 'Bishop',
  r: 'Rook',
  q: 'Queen',
};

export const GameStats: React.FC = () => {
  const { gameStats } = useGameStore();

  const renderPieceCount = (pieces: Record<string, number>, color: 'w' | 'b') => (
    <div className="grid grid-cols-5 gap-2">
      {Object.entries(pieces).map(([piece, count]) => (
        <div key={piece} className="flex flex-col items-center bg-gray-50 p-2 rounded">
          <img 
            src={`https://www.chess.com/chess-themes/pieces/neo/150/${color}${piece}.png`}
            alt={pieceNames[piece]}
            className="w-8 h-8"
          />
          <span className="text-sm font-medium">{count}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">White Pieces</h3>
        {renderPieceCount(gameStats.white.piecesLeft, 'w')}
        <div className="mt-2">
          <span className="text-sm text-gray-600">Wins: {gameStats.white.wins}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Black Pieces</h3>
        {renderPieceCount(gameStats.black.piecesLeft, 'b')}
        <div className="mt-2">
          <span className="text-sm text-gray-600">Wins: {gameStats.black.wins}</span>
        </div>
      </div>
    </div>
  );
};