import React from 'react';
import { Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface GameEndModalProps {
  winner: 'w' | 'b' | 'draw';
  onClose: () => void;
}

export const GameEndModal: React.FC<GameEndModalProps> = ({ winner, onClose }) => {
  const { isCheckmate, isStalemate, gameStats } = useGameStore();

  const getEndMessage = () => {
    if (isCheckmate) {
      const winningColor = winner === 'w' ? 'Black' : 'White';
      return `Checkmate! ${winningColor} Wins!`;
    }
    if (isStalemate) {
      return 'Stalemate! Game is a Draw!';
    }
    return winner === 'draw' ? 'Game Draw!' : `${winner === 'w' ? 'White' : 'Black'} Wins!`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">{getEndMessage()}</h2>
          <div className="mb-6 text-gray-600">
            <p>Game Statistics</p>
            <div className="flex justify-center gap-8 mt-2">
              <div>
                <p className="font-semibold">White</p>
                <p>Wins: {gameStats.white.wins}</p>
              </div>
              <div>
                <p className="font-semibold">Black</p>
                <p>Wins: {gameStats.black.wins}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};