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