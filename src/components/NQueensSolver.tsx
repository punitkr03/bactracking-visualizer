import { NQueensGrid, NQueensStep, SolveStats } from "../types";
import {
  isQueenSafe,
  copyNQueensGrid,
  getConflictCells,
} from "../utils/nqueensUtils";

export class NQueensSolver {
  private steps: NQueensStep[] = [];
  private stats: SolveStats = {
    totalAttempts: 0,
    backtrackCount: 0,
    timeElapsed: 0,
    cellsModified: 0,
  };
  private startTime: number = 0;

  solve(size: number): {
    steps: NQueensStep[];
    stats: SolveStats;
    solved: boolean;
    solutions: NQueensGrid[];
  } {
    this.steps = [];
    this.stats = {
      totalAttempts: 0,
      backtrackCount: 0,
      timeElapsed: 0,
      cellsModified: 0,
    };
    this.startTime = Date.now();

    const grid: NQueensGrid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(false));
    const solutions: NQueensGrid[] = [];

    const solved = this.backtrackSolve(grid, 0, solutions);

    this.stats.timeElapsed = Date.now() - this.startTime;

    return {
      steps: this.steps,
      stats: this.stats,
      solved,
      solutions,
    };
  }

  private backtrackSolve(
    grid: NQueensGrid,
    col: number,
    solutions: NQueensGrid[]
  ): boolean {
    const size = grid.length;

    if (col >= size) {
      solutions.push(copyNQueensGrid(grid));
      return true; // Found a solution
    }

    for (let row = 0; row < size; row++) {
      this.stats.totalAttempts++;

      this.steps.push({
        row,
        col,
        placed: false,
        isBacktrack: false,
        gridSnapshot: copyNQueensGrid(grid),
        stepNumber: this.steps.length,
        conflictCells: !isQueenSafe(grid, row, col)
          ? getConflictCells(grid, row, col)
          : undefined,
      });

      if (isQueenSafe(grid, row, col)) {
        grid[row][col] = true;
        this.stats.cellsModified++;

        this.steps.push({
          row,
          col,
          placed: true,
          isBacktrack: false,
          gridSnapshot: copyNQueensGrid(grid),
          stepNumber: this.steps.length,
        });

        if (this.backtrackSolve(grid, col + 1, solutions)) {
          return true; // Found solution, stop here for visualization
        }

        grid[row][col] = false;
        this.stats.backtrackCount++;

        this.steps.push({
          row,
          col,
          placed: false,
          isBacktrack: true,
          gridSnapshot: copyNQueensGrid(grid),
          stepNumber: this.steps.length,
        });
      }
    }

    return false;
  }
}
