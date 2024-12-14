import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Square } from './Square';
import { MoveIndicator } from './MoveIndicator';

export const Chessboard: React.FC = () => {
  const { fen, turn, makeMove } = useGameStore();
  const [selectedSquare, setSelectedSquare] = React.useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = React.useState<string[]>([]);

  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const handleSquareClick = (square: string) => {
    if (selectedSquare === null) {
      setSelectedSquare(square);
      setPossibleMoves(useGameStore.getState().getSuggestedMoves(square));
    } else {
      if (possibleMoves.includes(square)) {
        makeMove(selectedSquare, square);
      }
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  return (
    <div className="relative w-[600px] h-[600px] bg-neutral-100 rounded-lg shadow-xl">
      <MoveIndicator turn={turn} />
      <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
        {ranks.map((rank, rankIndex) =>
          files.map((file, fileIndex) => {
            const square = `${file}${rank}`;
            const isSelected = selectedSquare === square;
            const isPossibleMove = possibleMoves.includes(square);
            
            return (
              <Square
                key={square}
                position={square}
                isLight={(rankIndex + fileIndex) % 2 === 0}
                isSelected={isSelected}
                isPossibleMove={isPossibleMove}
                fen={fen}
                onClick={() => handleSquareClick(square)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};