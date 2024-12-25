import Cell from './cell';

interface ColumnProps {
  column: number[];
  onColumnClick: () => void;
  disabled: boolean;
}

export default function Column({ column, onColumnClick, disabled }: ColumnProps) {
  return (
    <div
      className={`grid grid-rows-6 gap-2 cursor-pointer ${!disabled && 'hover:bg-blue-700'} rounded transition-colors`}
      onClick={() => !disabled && onColumnClick()}
    >
      {[...column].reverse().map((cell, index) => (
        <Cell key={index} value={cell} />
      ))}
    </div>
  );
}