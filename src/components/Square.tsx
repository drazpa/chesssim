import React from 'react';
import { clsx } from 'clsx';

interface SquareProps {
  position: string;
  isLight: boolean;
  isSelected: boolean;
  isPossibleMove: boolean;
  fen: string;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  position,
  isLight,
  isSelected,
  isPossibleMove,
  fen,
  onClick,
}) => {
  const getPieceImage = (piece: string) => {
    const color = piece.toLowerCase() === piece ? 'b' : 'w';
    const pieceName = piece.toLowerCase();
    return `https://www.chess.com/chess-themes/pieces/neo/150/${color}${pieceName}.png`;
  };

  const getPiece = () => {
    if (!fen) return null;
    
    const fenParts = fen.split(' ')[0];
    if (!fenParts) return null;

    const ranks = fenParts.split('/');
    if (!ranks || ranks.length !== 8) return null;

    const [file, rank] = position.split('');
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankIndex = 8 - parseInt(rank);

    if (rankIndex < 0 || rankIndex >= ranks.length) return null;

    const rank_pieces = ranks[rankIndex];
    let currentFile = 0;
    
    for (let i = 0; i < rank_pieces.length; i++) {
      const char = rank_pieces[i];
      if (isNaN(parseInt(char))) {
        if (currentFile === fileIndex) {
          return char;
        }
        currentFile++;
      } else {
        currentFile += parseInt(char);
        if (currentFile > fileIndex) {
          return null;
        }
      }
    }
    return null;
  };

  const piece = getPiece();

  return (
    <div
      className={clsx(
        'relative w-full h-full flex items-center justify-center cursor-pointer transition-colors',
        isLight ? 'bg-amber-100' : 'bg-amber-800',
        isSelected && 'ring-4 ring-blue-400 ring-inset',
        isPossibleMove && 'ring-4 ring-green-400 ring-inset'
      )}
      onClick={onClick}
    >
      {piece && (
        <img
          src={getPieceImage(piece)}
          alt={piece}
          className="w-4/5 h-4/5 object-contain"
          draggable={false}
        />
      )}
      {isPossibleMove && !piece && (
        <div className="absolute w-3 h-3 bg-green-400 rounded-full opacity-50" />
      )}
    </div>
  );
};