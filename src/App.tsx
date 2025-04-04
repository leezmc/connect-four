import { useState } from 'react';
import Board from './components/board';

function App() {
  const [setupMode, setSetupMode] = useState(true);
  const [aiMode, setAiMode] = useState(false);
  const [aiDifficulty, setAiDifficulty] = useState('Easy');

  if (setupMode) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Connect Four</h1>
        <div className="flex flex-col items-center gap-4">
          <label>
            <input
              type="checkbox"
              checked={aiMode}
              onChange={() => setAiMode(!aiMode)}
            />
            Play against AI
          </label>
          {aiMode && (
            <select
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              {/* <option value="Impossible">Impossible</option> */}
            </select>
          )}
          <button
            onClick={() => setSetupMode(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Connect Four</h1>
      <Board aiMode={aiMode} aiDifficulty={aiDifficulty} />
    </div>
  );
}

export default App;