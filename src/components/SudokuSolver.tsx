import { SudokuGrid, SolveStep, SolveStats } from '../types';
import { isValidMove, findEmptyCell, copyGrid } from '../utils/sudokuUtils';

export class SudokuSolver {
  private steps: SolveStep[] = [];
  private stats: SolveStats = {
    totalAttempts: 0,
    backtrackCount: 0,
    timeElapsed: 0,
    cellsModified: 0
  };
  private startTime: number = 0;

  solve(grid: SudokuGrid): { steps: SolveStep[]; stats: SolveStats; solved: boolean } {
    this.steps = [];
    this.stats = {
      totalAttempts: 0,
      backtrackCount: 0,
      timeElapsed: 0,
      cellsModified: 0
    };
    this.startTime = Date.now();

    const workingGrid = copyGrid(grid);
    const solved = this.backtrackSolve(workingGrid);
    
    this.stats.timeElapsed = Date.now() - this.startTime;
    
    return {
      steps: this.steps,
      stats: this.stats,
      solved
    };
  }

  private backtrackSolve(grid: SudokuGrid): boolean {
    const emptyCell = findEmptyCell(grid);
    
    if (!emptyCell) {
      return true; // Puzzle solved
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= 9; num++) {
      this.stats.totalAttempts++;
      
      if (isValidMove(grid, row, col, num)) {
        grid[row][col] = num;
        this.stats.cellsModified++;
        
        // Record the step
        this.steps.push({
          row,
          col,
          value: num,
          isBacktrack: false,
          gridSnapshot: copyGrid(grid),
          stepNumber: this.steps.length
        });

        if (this.backtrackSolve(grid)) {
          return true;
        }

        // Backtrack
        grid[row][col] = null;
        this.stats.backtrackCount++;

        // Record the backtrack step
        this.steps.push({
          row,
          col,
          value: null,
          isBacktrack: true,
          gridSnapshot: copyGrid(grid),
          stepNumber: this.steps.length
        });
      }
    }

    return false;
  }
}