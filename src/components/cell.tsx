import { Circle } from 'lucide-react';

interface CellProps {
  value: number;
}

export default function Cell({ value }: CellProps) {
  return (
    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center p-1">
      {value > 0 && (
        <Circle
          className={`w-full h-full ${
            value === 1 ? 'text-red-500' : 'text-yellow-500'
          } fill-current`}
        />
      )}
    </div>
  );
}