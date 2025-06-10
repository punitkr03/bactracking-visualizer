import { NQueensGrid } from "../types";

export const createEmptyNQueensGrid = (size: number): NQueensGrid => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));
};

export const copyNQueensGrid = (grid: NQueensGrid): NQueensGrid => {
  return grid.map((row) => [...row]);
};

export const isQueenSafe = (
  grid: NQueensGrid,
  row: number,
  col: number
): boolean => {
  const size = grid.length;
  // Check this row on left side
  for (let i = 0; i < col; i++) {
    if (grid[row][i]) return false;
  }
  // Check upper diagonal on left side
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (grid[i][j]) return false;
  }
  // Check lower diagonal on left side
  for (let i = row, j = col; j >= 0 && i < size; i++, j--) {
    if (grid[i][j]) return false;
  }
  return true;
};

//Conflict cells to highlight invalid cells to place the queen
export const getAttackingCells = (
  grid: NQueensGrid,
  row: number,
  col: number
): { row: number; col: number }[] => {
  const size = grid.length;
  const attacking: { row: number; col: number }[] = [];
  // Row attacks
  for (let j = 0; j < size; j++) {
    if (j !== col) attacking.push({ row, col: j });
  }
  // Column attacks
  for (let i = 0; i < size; i++) {
    if (i !== row) attacking.push({ row: i, col });
  }
  // Diagonal attacks
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i !== row && j !== col && Math.abs(i - row) === Math.abs(j - col)) {
        attacking.push({ row: i, col: j });
      }
    }
  }
  return attacking;
};

// Cells that are under attack by a queen placed at (row, col)
export const getConflictCells = (
  grid: NQueensGrid,
  row: number,
  col: number
): { row: number; col: number }[] => {
  const size = grid.length;
  const conflicts: { row: number; col: number }[] = [];
  for (let j = 0; j < col; j++) {
    if (grid[row][j]) conflicts.push({ row, col: j });
  }
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (grid[i][j]) conflicts.push({ row: i, col: j });
  }
  for (let i = row + 1, j = col - 1; i < size && j >= 0; i++, j--) {
    if (grid[i][j]) conflicts.push({ row: i, col: j });
  }
  return conflicts;
};

export const countNQueensSolutions = (size: number): number => {
  const grid = createEmptyNQueensGrid(size);
  let count = 0;
  const solve = (col: number): void => {
    if (col >= size) {
      count++;
      return;
    }
    for (let row = 0; row < size; row++) {
      if (isQueenSafe(grid, row, col)) {
        grid[row][col] = true; // Place queen
        solve(col + 1);
        grid[row][col] = false; // Remove queen (backtrack)
      }
    }
  };

  solve(0);
  return count;
};

export const getAllNQueensSolutions = (size: number): NQueensGrid[] => {
  const grid = createEmptyNQueensGrid(size);
  const solutions: NQueensGrid[] = [];

  const solve = (col: number): void => {
    if (col >= size) {
      solutions.push(copyNQueensGrid(grid));
      return;
    }

    for (let row = 0; row < size; row++) {
      if (isQueenSafe(grid, row, col)) {
        grid[row][col] = true;
        solve(col + 1);
        grid[row][col] = false;
      }
    }
  };

  solve(0);
  return solutions;
};
