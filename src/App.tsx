import Board from './components/board';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Connect Four</h1>
      <Board />
    </div>
  );
}

export default App;