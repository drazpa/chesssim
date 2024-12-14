import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chess } from 'chess.js';
import type { GameState, ChessMove, GameStats } from '../types/chess';

const initialGameStats: GameStats = {
  white: {
    capturedPieces: [],
    piecesLeft: { p: 8, n: 2, b: 2, r: 2, q: 1 },
    wins: 0
  },
  black: {
    capturedPieces: [],
    piecesLeft: { p: 8, n: 2, b: 2, r: 2, q: 1 },
    wins: 0
  }
};

interface GameStore extends GameState {
  chess: Chess;
  isAutoPlaying: boolean;
  initGame: () => void;
  makeMove: (from: string, to: string) => void;
  calculateBestMove: () => void;
  undoLastMove: () => void;
  getSuggestedMoves: (square: string) => string[];
  toggleAutoPlay: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => {
      const chess = new Chess();
      let autoPlayInterval: number | null = null;

      const stopAutoPlay = () => {
        if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
          autoPlayInterval = null;
        }
      };

      const updatePieceCounts = () => {
        const fen = chess.fen();
        const pieces = fen.split(' ')[0];
        const stats = { ...initialGameStats };

        // Count remaining pieces
        for (const char of pieces) {
          if (char === '/') continue;
          if (!isNaN(parseInt(char))) continue;
          
          const color = char === char.toUpperCase() ? 'white' : 'black';
          const piece = char.toLowerCase();
          
          if (piece in stats[color].piecesLeft) {
            stats[color].piecesLeft[piece as keyof typeof stats[color].piecesLeft]++;
          }
        }

        return stats;
      };

      return {
        chess,
        fen: chess.fen(),
        turn: 'w',
        isCheck: chess.isCheck(),
        isCheckmate: chess.isCheckmate(),
        isStalemate: chess.isStalemate(),
        moveHistory: [],
        suggestedMoves: [],
        isAutoPlaying: false,
        gameStats: initialGameStats,

        initGame: () => {
          stopAutoPlay();
          const chess = new Chess();
          set({
            chess,
            fen: chess.fen(),
            turn: 'w',
            isCheck: chess.isCheck(),
            isCheckmate: chess.isCheckmate(),
            isStalemate: chess.isStalemate(),
            moveHistory: [],
            suggestedMoves: [],
            isAutoPlaying: false,
            gameStats: initialGameStats
          });
        },

        makeMove: (from: string, to: string) => {
          const { chess, gameStats } = get();
          try {
            const move = chess.move({ from, to, promotion: 'q' });
            if (move) {
              const moveLog: ChessMove = {
                from: move.from,
                to: move.to,
                piece: move.piece,
                color: move.color,
                captured: move.captured,
                promotion: move.promotion
              };

              const newStats = updatePieceCounts();
              
              // Update wins if game is over
              if (chess.isCheckmate()) {
                // The winner is the opposite of the current turn
                const winner = chess.turn() === 'w' ? 'black' : 'white';
                newStats[winner].wins = (gameStats[winner].wins || 0) + 1;
              }

              set({
                fen: chess.fen(),
                turn: chess.turn(),
                isCheck: chess.isCheck(),
                isCheckmate: chess.isCheckmate(),
                isStalemate: chess.isStalemate(),
                moveHistory: [...get().moveHistory, { move: moveLog, timestamp: Date.now() }],
                gameStats: newStats
              });

              if (get().isAutoPlaying && !chess.isGameOver()) {
                setTimeout(() => get().calculateBestMove(), 500);
              } else if (chess.turn() === 'b' && !chess.isGameOver() && !get().isAutoPlaying) {
                setTimeout(() => get().calculateBestMove(), 500);
              }
            }
          } catch (error) {
            console.error('Invalid move:', error);
          }
        },

        calculateBestMove: () => {
          const { chess } = get();
          if (chess.isGameOver()) {
            stopAutoPlay();
            set({ isAutoPlaying: false });
            return;
          }

          const moves = chess.moves({ verbose: true });
          if (moves.length > 0) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            get().makeMove(randomMove.from, randomMove.to);
          }
        },

        undoLastMove: () => {
          stopAutoPlay();
          const { chess, moveHistory } = get();
          if (moveHistory.length > 0) {
            chess.undo();
            const newHistory = [...moveHistory];
            newHistory.pop();
            const newStats = updatePieceCounts();
            
            set({
              fen: chess.fen(),
              turn: chess.turn(),
              isCheck: chess.isCheck(),
              isCheckmate: chess.isCheckmate(),
              isStalemate: chess.isStalemate(),
              moveHistory: newHistory,
              isAutoPlaying: false,
              gameStats: newStats
            });
          }
        },

        getSuggestedMoves: (square: string) => {
          const { chess } = get();
          return chess.moves({ square, verbose: true }).map(move => move.to);
        },

        toggleAutoPlay: () => {
          const { isAutoPlaying, chess } = get();
          if (isAutoPlaying) {
            stopAutoPlay();
            set({ isAutoPlaying: false });
          } else {
            set({ isAutoPlaying: true });
            if (!chess.isGameOver()) {
              get().calculateBestMove();
            }
          }
        }
      };
    },
    {
      name: 'chess-storage',
      partialize: (state) => ({ gameStats: state.gameStats }),
    }
  )
);