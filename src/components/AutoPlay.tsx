import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const AutoPlay: React.FC = () => {
  const { initGame, isAutoPlaying, toggleAutoPlay } = useGameStore();
  
  return (
    <div className="flex justify-center gap-4 bg-white rounded-lg shadow-xl p-4">
      <button
        onClick={toggleAutoPlay}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isAutoPlaying ? (
          <>
            <Pause className="w-5 h-5" />
            Stop CPU vs CPU
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Start CPU vs CPU
          </>
        )}
      </button>
      <button
        onClick={initGame}
        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
        New Game
      </button>
    </div>
  );
};