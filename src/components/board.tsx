import Column from './column';
import { useGameState } from '../hooks/useGameState';
import { Circle } from 'lucide-react';

interface BoardProps {
  aiMode: boolean;
  aiDifficulty: string;
}

export default function Board({ aiMode, aiDifficulty }: BoardProps) {
  const { board, currentPlayer, makeMove, winner, isDraw, resetGame } = useGameState(aiMode, aiDifficulty);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 text-xl font-semibold">
        {winner ? (
          <div className="flex items-center gap-2">
            Player <Circle className={`w-6 h-6 ${winner === 1 ? 'text-red-500' : 'text-yellow-500'} fill-current`} /> wins!
          </div>
        ) : isDraw ? (
          <div>It's a draw!</div>
        ) : (
          <div className="flex items-center gap-2">
            Player <Circle className={`w-6 h-6 ${currentPlayer === 1 ? 'text-red-500' : 'text-yellow-500'} fill-current`} />'s turn
          </div>
        )}
      </div>

      <div className="bg-blue-600 p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-7 gap-2">
          {board.map((column, columnIndex) => (
            <Column
              key={columnIndex}
              column={column}
              onColumnClick={() => makeMove(columnIndex)}
              disabled={!!winner || isDraw}
            />
          ))}
        </div>
      </div>

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        New Game
      </button>
    </div>
  );
}