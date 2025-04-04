import { useState, useCallback, useEffect } from 'react';
import { checkWinner, getAIMove } from '../utils/gameLogic';

const ROWS = 6;
const COLS = 7;

/**
 * Manages the state of the current game.
 *
 * @returns {object} The game state and actions.
 * @returns {number[][]} board - The current state of the game board.
 * @returns {number} currentPlayer - The current player (1 or 2).
 * @returns {number | null} winner - The winner of the game (1 or 2) or null if there is no winner yet.
 * @returns {boolean} isDraw - Whether the game is a draw.
 * @returns {function} makeMove - Function to make a move in the specified column.
 * @returns {function} resetGame - Function to reset the game to its initial state.
 */

export function useGameState(aiMode = false, aiDifficulty = 'Easy') {
  const [board, setBoard] = useState<number[][]>(() =>
    Array(COLS).fill(null).map(() => Array(ROWS).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState<number | null>(null);
  const [isAITurn, setIsAITurn] = useState(false);

  const isDraw = board.every(column => column.every(cell => cell !== 0));

  const makeMove = useCallback((columnIndex: number) => {
    if (winner || isDraw || (aiMode && isAITurn)) return;

    setBoard(currentBoard => {
      const newBoard = currentBoard.map(column => [...column]);
      const column = newBoard[columnIndex];

      const emptyCell = column.findIndex(cell => cell === 0);
      if (emptyCell === -1) return currentBoard;

      column[emptyCell] = currentPlayer;

      if (checkWinner(newBoard, columnIndex, emptyCell, currentPlayer)) {
        setWinner(currentPlayer);
        return newBoard;
      }

      return newBoard;
    });

    setCurrentPlayer(current => (current === 1 ? 2 : 1));
    if (aiMode) setIsAITurn(true);
  }, [currentPlayer, winner, isDraw, aiMode, isAITurn]);

  useEffect(() => {
    if (aiMode && isAITurn && !winner && !isDraw) {
      const aiMove = getAIMove(board, aiDifficulty);
      setTimeout(() => {
        setBoard(currentBoard => {
          const newBoard = currentBoard.map(column => [...column]);
          const column = newBoard[aiMove];

          const emptyCell = column.findIndex(cell => cell === 0);
          if (emptyCell !== -1) {
            column[emptyCell] = currentPlayer;

            if (checkWinner(newBoard, aiMove, emptyCell, currentPlayer)) {
              setWinner(currentPlayer);
            }
          }

          return newBoard;
        });

        setCurrentPlayer(current => (current === 1 ? 2 : 1));
        setIsAITurn(false);
      }, 500);
    }
  }, [aiMode, isAITurn, board, aiDifficulty, currentPlayer, winner, isDraw]);

  const resetGame = useCallback(() => {
    setBoard(Array(COLS).fill(null).map(() => Array(ROWS).fill(0)));
    setCurrentPlayer(1);
    setWinner(null);
    setIsAITurn(false);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    makeMove,
    resetGame
  };
}