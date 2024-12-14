export interface ChessMove {
  from: string;
  to: string;
  piece: string;
  color: 'w' | 'b';
  captured?: string;
  promotion?: string;
}

export interface GameLog {
  move: ChessMove;
  timestamp: number;
  evaluation?: number;
}

export interface Square {
  position: string;
  piece: string | null;
  color: 'w' | 'b' | null;
  isHighlighted: boolean;
  isPossibleMove: boolean;
  isCheck: boolean;
}

export interface GameState {
  fen: string;
  turn: 'w' | 'b';
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  moveHistory: GameLog[];
  suggestedMoves: ChessMove[];
  gameStats: GameStats;
}

export interface GameStats {
  white: PlayerStats;
  black: PlayerStats;
}

export interface PlayerStats {
  capturedPieces: string[];
  piecesLeft: {
    p: number;
    n: number;
    b: number;
    r: number;
    q: number;
  };
  wins: number;
}