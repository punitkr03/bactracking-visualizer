import { Info } from "lucide-react";
import React from "react";

interface NQueensControlsProps {
  gridSize: number;
  onGridSizeChange: (size: number) => void;
  onReset?: () => void;
  totalSolutions?: number;
}

export const NQueensControls: React.FC<NQueensControlsProps> = ({
  gridSize,
  onGridSizeChange,
}) => {
  const sizeOptions = [4, 5, 6, 7, 8, 9, 10];

  const getSolutionCount = (size: number): number => {
    const counts: { [key: number]: number } = {
      4: 2,
      5: 10,
      6: 4,
      7: 40,
      8: 92,
      9: 352,
      10: 724,
    };
    return counts[size] || 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        N-Queens Configuration
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Board Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => onGridSizeChange(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  gridSize === size
                    ? "bg-purple-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
              >
                {size}×{size}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Info size={16} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-800">
              Problem Info
            </span>
          </div>
          <div className="text-sm text-purple-700">
            <p>
              Board: {gridSize}×{gridSize}
            </p>
            <p>Total Solutions: {getSolutionCount(gridSize)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
