/**
 * Checks if the given player has won the game.
 *
 * @param board - The game board represented as a 2D array of numbers.
 * @param curentColumn - The column index of the last move.
 * @param currentRow - The row index of the last move.
 * @param player - The player being checked (e.g., 1 or 2).
 * @returns `true` if the player has won, otherwise `false`.
 */

export function checkWinner(
  board: number[][],
  curentColumn: number,
  currentRow: number,
  player: number
): boolean {
  // Check horizontal
  for (let currentColumn = 0; currentColumn <= 3; currentColumn++) {
    if (
      board[currentColumn][currentRow] === player &&
      board[currentColumn + 1][currentRow] === player &&
      board[currentColumn + 2][currentRow] === player &&
      board[currentColumn + 3][currentRow] === player
    ) {
      return true;
    }
  }

  // Check vertical
  if (currentRow >= 3) {
    if (
      board[curentColumn][currentRow] === player &&
      board[curentColumn][currentRow - 1] === player &&
      board[curentColumn][currentRow - 2] === player &&
      board[curentColumn][currentRow - 3] === player
    ) {
      return true;
    }
  }

  // Check diagonal (positive slope)
  for (let curColumn = 0; curColumn <= 3; curColumn++) {
    for (let currentRow = 0; currentRow <= 2; currentRow++) {
      if (
        board[curColumn][currentRow] === player &&
        board[curColumn + 1][currentRow + 1] === player &&
        board[curColumn + 2][currentRow + 2] === player &&
        board[curColumn + 3][currentRow + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonal (negative slope)
  for (let currentColumn = 0; currentColumn <= 3; currentColumn++) {
    for (let currentRow = 3; currentRow <= 5; currentRow++) {
      if (
        board[currentColumn][currentRow] === player &&
        board[currentColumn + 1][currentRow - 1] === player &&
        board[currentColumn + 2][currentRow - 2] === player &&
        board[currentColumn + 3][currentRow - 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
}

function evaluateBoard(board: number[][], player: number): number {
  let score = 0;
  return score;
}

export function getAIMove(board: number[][], difficulty: string): number {
  const availableColumns = board.map((column, index) => column.includes(0) ? index : -1).filter(index => index !== -1);

  if (difficulty === 'Easy') {
    return availableColumns[Math.floor(Math.random() * availableColumns.length)];
  }

  if (difficulty === 'Medium') {
    // Block opponent's winning move or make a random move
    for (const column of availableColumns) {
      const tempBoard = board.map(col => [...col]);
      const row = tempBoard[column].findIndex(cell => cell === 0);
      tempBoard[column][row] = 2; 
      if (checkWinner(tempBoard, column, row, 2)) return column;
    }
    return availableColumns[Math.floor(Math.random() * availableColumns.length)];
  }

  if (difficulty === 'Hard') {
    // Prioritize winning moves, then block opponent, then random
    for (const column of availableColumns) {
      const tempBoard = board.map(col => [...col]);
      const row = tempBoard[column].findIndex(cell => cell === 0);
      tempBoard[column][row] = 1; 
      if (checkWinner(tempBoard, column, row, 1)) return column;
    }
    return getAIMove(board, 'Medium');
  }


  if (difficulty === 'Impossible') {
    // Same as hard, placeholder
    for (const column of availableColumns) {
      const tempBoard = board.map(col => [...col]);
      const row = tempBoard[column].findIndex(cell => cell === 0);
      tempBoard[column][row] = 1; 
      if (checkWinner(tempBoard, column, row, 1)) return column;
    }
    return getAIMove(board, 'Medium');
  }
  return availableColumns[0];
}