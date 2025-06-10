import React from "react";
import { SudokuGrid as SudokuGridType, CellState } from "../types";

interface SudokuGridProps {
  grid: SudokuGridType;
  originalGrid: SudokuGridType;
  currentCell: { row: number; col: number } | null;
  isBacktracking: boolean;
  onCellChange: (row: number, col: number, value: number | null) => void;
  isPlaying: boolean;
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  originalGrid,
  currentCell,
  isBacktracking,
  // onCellChange,
  // isPlaying,
}) => {
  const getCellState = (row: number, col: number): CellState => {
    if (currentCell && currentCell.row === row && currentCell.col === col) {
      return isBacktracking ? "backtrack" : "current";
    }
    if (originalGrid[row][col] !== null) {
      return "original";
    }
    if (grid[row][col] !== null) {
      return "solved";
    }
    return "empty";
  };

  const getCellClassName = (state: CellState): string => {
    const baseClasses =
      "w-10 h-10 flex items-center justify-center text-lg font-semibold transition-all duration-300";

    switch (state) {
      case "original":
        return `${baseClasses} bg-gray-100 text-gray-800 font-bold`;
      case "current":
        return `${baseClasses} bg-blue-200 text-blue-900 ring-2 ring-blue-400 ring-offset-1 animate-pulse z-10`;
      case "trying":
        return `${baseClasses} bg-yellow-200 text-yellow-900`;
      case "solved":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "backtrack":
        return `${baseClasses} bg-red-200 text-red-900 ring-2 ring-red-400 ring-offset-1 z-10`;
      default:
        return `${baseClasses} bg-white hover:bg-gray-50`;
    }
  };

  const getBoxClassName = (row: number, col: number): string => {
    let className = "";
    if (col < 8) className += " border-r border-gray-300";
    if (row < 8) className += " border-b border-gray-300";
    if (row % 3 === 0 && row > 0) className += " border-t-2 border-t-gray-600";
    if (col % 3 === 0 && col > 0) className += " border-l-2 border-l-gray-600";
    if (row === 0) className += " border-t-2 border-t-gray-600";
    if (col === 0) className += " border-l-2 border-l-gray-600";
    if (row === 8) className += " border-b-2 border-b-gray-600";
    if (col === 8) className += " border-r-2 border-r-gray-600";

    return className;
  };

  // const handleCellClick = (row: number, col: number) => {
  //   if (isPlaying || originalGrid[row][col] !== null) return;

  //   const currentValue = grid[row][col];
  //   const nextValue =
  //     currentValue === null ? 1 : currentValue === 9 ? null : currentValue + 1;
  //   onCellChange(row, col, nextValue);
  // };

  // const handleKeyDown = (
  //   event: React.KeyboardEvent,
  //   row: number,
  //   col: number
  // ) => {
  //   if (isPlaying || originalGrid[row][col] !== null) return;

  //   const key = event.key;
  //   if (key >= "1" && key <= "9") {
  //     onCellChange(row, col, parseInt(key));
  //   } else if (key === "Backspace" || key === "Delete") {
  //     onCellChange(row, col, null);
  //   }
  // };

  return (
    <div className="inline-block p-4 rounded-lg bg-gray-300 shadow-lg">
      <div className="grid grid-cols-9 gap-0 bg-white p-1 rounded">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const state = getCellState(rowIndex, colIndex);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${getCellClassName(state)} ${getBoxClassName(
                  rowIndex,
                  colIndex
                )}`}
                // onClick={() => handleCellClick(rowIndex, colIndex)}
                // onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                tabIndex={originalGrid[rowIndex][colIndex] === null ? 0 : -1}
                role="button"
                aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
              >
                {cell || ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
