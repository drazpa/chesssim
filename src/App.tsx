import React from 'react';
import { useGameStore } from './store/gameStore';
import { Chessboard } from './components/Chessboard';
import { GameLog } from './components/GameLog';
import { AutoPlay } from './components/AutoPlay';
import { GameStats } from './components/GameStats';
import { GameEndModal } from './components/GameEndModal';
import { GameStatus } from './components/GameStatus';

function App() {
  const { initGame, isCheckmate, isStalemate, turn, isCheck } = useGameStore();
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    useGameStore.getState().initGame();
  }, []);

  React.useEffect(() => {
    if (isCheckmate || isStalemate) {
      setShowModal(true);
    }
  }, [isCheckmate, isStalemate]);

  const handleCloseModal = () => {
    setShowModal(false);
    initGame();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Advanced Chess Simulator
        </h1>
        
        <div className="flex gap-8 items-start justify-center">
          <GameStats />
          <div className="space-y-8">
            <div className="relative">
              <Chessboard />
              <GameStatus isCheck={isCheck} isCheckmate={isCheckmate} turn={turn} />
            </div>
            <AutoPlay />
          </div>
          <GameLog />
        </div>

        {showModal && (
          <GameEndModal 
            winner={isStalemate ? 'draw' : turn}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;