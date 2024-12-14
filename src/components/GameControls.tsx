import React from 'react';
import { useGameStore } from '../store/gameStore';
import { RotateCcw, Play, Pause } from 'lucide-react';

export const GameControls: React.FC = () => {
  const { initGame, undoLastMove } = useGameStore();
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);

  const handleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
    // Implementation for auto-play feature
  };

  return (
    <div className="flex gap-4 bg-white rounded-lg shadow-xl p-4">
      <button
        onClick={initGame}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        New Game
      </button>
      <button
        onClick={undoLastMove}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Undo Move
      </button>
      <button
        onClick={handleAutoPlay}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isAutoPlay ? (
          <>
            <Pause className="w-4 h-4" />
            Stop Auto-Play
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Auto-Play
          </>
        )}
      </button>
    </div>
  );
};