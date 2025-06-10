export type SudokuGrid = (number | null)[][];
export type NQueensGrid = boolean[][];

export interface SudokuState {
  grid: SudokuGrid;
  originalGrid: SudokuGrid;
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  currentCell: { row: number; col: number } | null;
  currentValue: number | null;
  isBacktracking: boolean;
  solveHistory: SolveStep[];
  stats: SolveStats;
}

export interface NQueensState {
  grid: NQueensGrid;
  gridSize: number;
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  currentCell: { row: number; col: number } | null;
  isBacktracking: boolean;
  solveHistory: NQueensStep[];
  stats: SolveStats;
  solutions: NQueensGrid[];
  currentSolution: number;
}

export interface SolveStep {
  row: number;
  col: number;
  value: number | null;
  isBacktrack: boolean;
  gridSnapshot: SudokuGrid;
  stepNumber: number;
}

export interface NQueensStep {
  row: number;
  col: number;
  placed: boolean;
  isBacktrack: boolean;
  gridSnapshot: NQueensGrid;
  stepNumber: number;
  conflictCells?: { row: number; col: number }[];
}

export interface SolveStats {
  totalAttempts: number;
  backtrackCount: number;
  timeElapsed: number;
  cellsModified: number;
}

export type CellState = 'empty' | 'original' | 'current' | 'trying' | 'solved' | 'backtrack';
export type QueenCellState = 'empty' | 'current' | 'placed' | 'backtrack' | 'conflict' | 'attacking';

export type ProblemType = 'sudoku' | 'nqueens';