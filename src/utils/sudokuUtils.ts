import { SudokuGrid } from "../types";

export const createEmptyGrid = (): SudokuGrid => {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
};

export const copyGrid = (grid: SudokuGrid): SudokuGrid => {
  return grid.map((row) => [...row]);
};

export const isValidMove = (
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number
): boolean => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
};

export const findEmptyCell = (
  grid: SudokuGrid
): { row: number; col: number } | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return { row, col };
      }
    }
  }
  return null;
};

export const isGridComplete = (grid: SudokuGrid): boolean => {
  return findEmptyCell(grid) === null;
};

export const isGridValid = (grid: SudokuGrid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value !== null) {
        grid[row][col] = null;
        const valid = isValidMove(grid, row, col, value);
        grid[row][col] = value;
        if (!valid) return false;
      }
    }
  }
  return true;
};

export const samplePuzzles = {
  easy: [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ] as SudokuGrid,
  // medium: [
  //   [null, null, null, 6, null, null, 4, null, null],
  //   [7, null, null, null, null, 3, 6, null, null],
  //   [null, null, null, null, 9, 1, null, 8, null],
  //   [null, null, null, null, null, null, null, null, null],
  //   [null, 5, null, 1, 8, null, null, null, 3],
  //   [null, null, null, 3, null, 6, null, 4, 5],
  //   [null, 4, null, 2, null, null, null, 6, null],
  //   [9, null, 3, null, null, null, null, null, null],
  //   [null, 2, null, null, null, null, 1, null, null],
  // ] as SudokuGrid,

  // hard: [
  //   [null, null, null, null, null, null, null, null, null],
  //   [null, null, null, null, null, 3, null, 8, 5],
  //   [null, null, 1, null, 2, null, null, null, null],
  //   [null, null, null, 5, null, 7, null, null, null],
  //   [null, null, 4, null, null, null, 1, null, null],
  //   [null, 9, null, null, null, null, null, null, null],
  //   [5, null, null, null, null, null, null, 7, 3],
  //   [null, null, 2, null, 1, null, null, null, null],
  //   [null, null, null, null, 4, null, null, null, 9],
  // ] as SudokuGrid,
};
