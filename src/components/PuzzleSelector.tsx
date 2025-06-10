import React from "react";
import { SudokuGrid } from "../types";
import { samplePuzzles } from "../utils/sudokuUtils";
interface PuzzleSelectorProps {
  onLoadPuzzle: (puzzle: SudokuGrid) => void;
  onClear: () => void;
  currentGrid: SudokuGrid;
}

export const PuzzleSelector: React.FC<PuzzleSelectorProps> = ({
  onLoadPuzzle,
  // onClear,
  // currentGrid,
}) => {
  const handleLoadSample = (difficulty: keyof typeof samplePuzzles) => {
    onLoadPuzzle(samplePuzzles[difficulty]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Puzzle Options
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Sample Puzzles
          </h4>
          <div className="flex space-x-2">
            {Object.keys(samplePuzzles).map((difficulty) => (
              <button
                key={difficulty}
                onClick={() =>
                  handleLoadSample(difficulty as keyof typeof samplePuzzles)
                }
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium capitalize"
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
