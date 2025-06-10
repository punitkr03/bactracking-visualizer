import React from "react";
import { NQueensGrid as NQueensGridType, QueenCellState } from "../types";
import { Crown } from "lucide-react";
import { getAttackingCells } from "../utils/nqueensUtils";

interface NQueensGridProps {
  grid: NQueensGridType;
  currentCell: { row: number; col: number } | null;
  isBacktracking: boolean;
  conflictCells?: { row: number; col: number }[];
}

export const NQueensGrid: React.FC<NQueensGridProps> = ({
  grid,
  currentCell,
  isBacktracking,
  conflictCells = [],
}) => {
  const size = grid.length;
  const cellSize = Math.max(40, Math.min(60, 480 / size));

  const getCellState = (row: number, col: number): QueenCellState => {
    if (currentCell && currentCell.row === row && currentCell.col === col) {
      return isBacktracking ? "backtrack" : "current";
    }
    if (conflictCells.some((cell) => cell.row === row && cell.col === col)) {
      return "conflict";
    }
    if (grid[row][col]) {
      return "placed";
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j]) {
          const attacking = getAttackingCells(grid, i, j);
          if (attacking.some((cell) => cell.row === row && cell.col === col)) {
            return "attacking";
          }
        }
      }
    }

    return "empty";
  };

  const getCellClassName = (
    row: number,
    col: number,
    state: QueenCellState
  ): string => {
    const isLight = (row + col) % 2 === 0;
    const baseClasses = `flex items-center justify-center transition-all duration-300`;
    let bgClass = isLight ? "bg-white" : "bg-gray-700";
    switch (state) {
      case "current":
        bgClass = "bg-blue-200 ring-2 ring-blue-400 animate-pulse";
        break;
      case "placed":
        bgClass = "bg-green-200";
        break;
      case "backtrack":
        bgClass = "bg-red-200 ring-2 ring-red-400";
        break;
      case "conflict":
        bgClass = "bg-red-300";
        break;
      case "attacking":
        bgClass = isLight ? "bg-yellow-100" : "bg-yellow-200";
        break;
    }
    return `${baseClasses} ${bgClass}`;
  };

  return (
    <div className="inline-block bg-gray-300 p-3 rounded-lg shadow-lg">
      <div
        className="grid gap-0 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          width: `${size * cellSize}px`,
          height: `${size * cellSize}px`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((hasQueen, colIndex) => {
            const state = getCellState(rowIndex, colIndex);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellClassName(rowIndex, colIndex, state)}
                style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
              >
                {hasQueen && (
                  <Crown
                    size={Math.min(cellSize * 0.6, 24)}
                    className="text-purple-700"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
