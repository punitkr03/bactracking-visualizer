import { Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NQueensControls } from "./components/NQueensConfig";
import { NQueensGrid } from "./components/NQueensGrid";
import { NQueensSolver } from "./components/NQueensSolver";
import { PlaybackControls } from "./components/PlaybackControls";
import { StatsPanel } from "./components/StatsPanel";
import { SudokuGrid } from "./components/SudokuGrid";
import { SudokuSolver } from "./components/SudokuSolver";
import { TabSelector } from "./components/TabSelector";
import { NQueensState, ProblemType, SudokuState } from "./types";
import {
  copyNQueensGrid,
  countNQueensSolutions,
  createEmptyNQueensGrid,
} from "./utils/nqueensUtils";
import { copyGrid, isGridValid, samplePuzzles } from "./utils/sudokuUtils";

function App() {
  const [activeTab, setActiveTab] = useState<ProblemType>("sudoku");

  const [sudokuState, setSudokuState] = useState<SudokuState>({
    grid: copyGrid(samplePuzzles.easy),
    originalGrid: copyGrid(samplePuzzles.easy),
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    totalSteps: 0,
    speed: 1000,
    currentCell: null,
    currentValue: null,
    isBacktracking: false,
    solveHistory: [],
    stats: {
      totalAttempts: 0,
      backtrackCount: 0,
      timeElapsed: 0,
      cellsModified: 0,
    },
  });

  const [nqueensState, setNQueensState] = useState<NQueensState>({
    grid: createEmptyNQueensGrid(8),
    gridSize: 8,
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    totalSteps: 0,
    speed: 1000,
    currentCell: null,
    isBacktracking: false,
    solveHistory: [],
    stats: {
      totalAttempts: 0,
      backtrackCount: 0,
      timeElapsed: 0,
      cellsModified: 0,
    },
    solutions: [],
    currentSolution: 0,
  });

  const [sudokuSolver] = useState(() => new SudokuSolver());
  const [nqueensSolver] = useState(() => new NQueensSolver());
  const [animationTimeout, setAnimationTimeout] = useState<number | null>(null);

  const handleSudokuCellChange = useCallback(
    (row: number, col: number, value: number | null) => {
      if (sudokuState.isPlaying || sudokuState.originalGrid[row][col] !== null)
        return;

      setSudokuState((prev) => ({
        ...prev,
        grid: prev.grid.map((r, rIndex) =>
          rIndex === row
            ? r.map((c, cIndex) => (cIndex === col ? value : c))
            : [...r]
        ),
      }));
    },
    [sudokuState.isPlaying, sudokuState.originalGrid]
  );

  const handleSudokuPlay = useCallback(() => {
    if (!isGridValid(sudokuState.grid)) {
      alert("Invalid puzzle! Please check for duplicates.");
      return;
    }

    if (sudokuState.solveHistory.length === 0) {
      const result = sudokuSolver.solve(sudokuState.grid);
      if (!result.solved) {
        alert("This puzzle has no solution!");
        return;
      }

      setSudokuState((prev) => ({
        ...prev,
        solveHistory: result.steps,
        totalSteps: result.steps.length,
        stats: result.stats,
        isPlaying: true,
        isPaused: false,
        currentStep: 0,
      }));
    } else {
      setSudokuState((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
      }));
    }
  }, [sudokuState.grid, sudokuState.solveHistory, sudokuSolver]);

  const handleNQueensPlay = useCallback(() => {
    if (nqueensState.solveHistory.length === 0) {
      const result = nqueensSolver.solve(nqueensState.gridSize);
      if (!result.solved) {
        alert("No solution found!");
        return;
      }

      setNQueensState((prev) => ({
        ...prev,
        solveHistory: result.steps,
        totalSteps: result.steps.length,
        stats: result.stats,
        solutions: result.solutions,
        isPlaying: true,
        isPaused: false,
        currentStep: 0,
      }));
    } else {
      setNQueensState((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
      }));
    }
  }, [nqueensState.gridSize, nqueensState.solveHistory, nqueensSolver]);

  const handleNQueensGridSizeChange = useCallback((size: number) => {
    setNQueensState((prev) => ({
      ...prev,
      grid: createEmptyNQueensGrid(size),
      gridSize: size,
      isPlaying: false,
      isPaused: false,
      currentStep: 0,
      totalSteps: 0,
      currentCell: null,
      isBacktracking: false,
      solveHistory: [],
      solutions: [],
      stats: {
        totalAttempts: 0,
        backtrackCount: 0,
        timeElapsed: 0,
        cellsModified: 0,
      },
    }));
  }, []);

  const handlePause = useCallback(() => {
    if (activeTab === "sudoku") {
      setSudokuState((prev) => ({ ...prev, isPlaying: false, isPaused: true }));
    } else {
      setNQueensState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: true,
      }));
    }

    if (animationTimeout) {
      clearTimeout(animationTimeout);
      setAnimationTimeout(null);
    }
  }, [activeTab, animationTimeout]);

  const handleStop = useCallback(() => {
    if (activeTab === "sudoku") {
      setSudokuState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentStep: 0,
        grid: copyGrid(prev.originalGrid),
        currentCell: null,
        isBacktracking: false,
      }));
    } else {
      setNQueensState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentStep: 0,
        grid: createEmptyNQueensGrid(prev.gridSize),
        currentCell: null,
        isBacktracking: false,
      }));
    }

    if (animationTimeout) {
      clearTimeout(animationTimeout);
      setAnimationTimeout(null);
    }
  }, [activeTab, animationTimeout]);

  const handleStepForward = useCallback(() => {
    if (activeTab === "sudoku") {
      if (sudokuState.currentStep < sudokuState.totalSteps - 1) {
        const nextStep = sudokuState.currentStep + 1;
        const step = sudokuState.solveHistory[nextStep];

        setSudokuState((prev) => ({
          ...prev,
          currentStep: nextStep,
          grid: copyGrid(step.gridSnapshot),
          currentCell: { row: step.row, col: step.col },
          isBacktracking: step.isBacktrack,
        }));
      }
    } else {
      if (nqueensState.currentStep < nqueensState.totalSteps - 1) {
        const nextStep = nqueensState.currentStep + 1;
        const step = nqueensState.solveHistory[nextStep];

        setNQueensState((prev) => ({
          ...prev,
          currentStep: nextStep,
          grid: copyNQueensGrid(step.gridSnapshot),
          currentCell: { row: step.row, col: step.col },
          isBacktracking: step.isBacktrack,
        }));
      }
    }
  }, [
    activeTab,
    sudokuState.currentStep,
    sudokuState.totalSteps,
    sudokuState.solveHistory,
    nqueensState.currentStep,
    nqueensState.totalSteps,
    nqueensState.solveHistory,
  ]);

  const handleStepBack = useCallback(() => {
    if (activeTab === "sudoku") {
      if (sudokuState.currentStep > 0) {
        const prevStep = sudokuState.currentStep - 1;
        const step = sudokuState.solveHistory[prevStep];

        setSudokuState((prev) => ({
          ...prev,
          currentStep: prevStep,
          grid: copyGrid(step.gridSnapshot),
          currentCell: { row: step.row, col: step.col },
          isBacktracking: step.isBacktrack,
        }));
      }
    } else {
      if (nqueensState.currentStep > 0) {
        const prevStep = nqueensState.currentStep - 1;
        const step = nqueensState.solveHistory[prevStep];

        setNQueensState((prev) => ({
          ...prev,
          currentStep: prevStep,
          grid: copyNQueensGrid(step.gridSnapshot),
          currentCell: { row: step.row, col: step.col },
          isBacktracking: step.isBacktrack,
        }));
      }
    }
  }, [
    activeTab,
    sudokuState.currentStep,
    sudokuState.solveHistory,
    nqueensState.currentStep,
    nqueensState.solveHistory,
  ]);

  const handleSpeedChange = useCallback(
    (speed: number) => {
      if (activeTab === "sudoku") {
        setSudokuState((prev) => ({ ...prev, speed }));
      } else {
        setNQueensState((prev) => ({ ...prev, speed }));
      }
    },
    [activeTab]
  );

  const handleReset = useCallback(() => {
    if (activeTab === "sudoku") {
      setSudokuState((prev) => ({
        ...prev,
        grid: copyGrid(prev.originalGrid),
        isPlaying: false,
        isPaused: false,
        currentStep: 0,
        totalSteps: 0,
        currentCell: null,
        isBacktracking: false,
        solveHistory: [],
        stats: {
          totalAttempts: 0,
          backtrackCount: 0,
          timeElapsed: 0,
          cellsModified: 0,
        },
      }));
    } else {
      setNQueensState((prev) => ({
        ...prev,
        grid: createEmptyNQueensGrid(prev.gridSize),
        isPlaying: false,
        isPaused: false,
        currentStep: 0,
        totalSteps: 0,
        currentCell: null,
        isBacktracking: false,
        solveHistory: [],
        solutions: [],
        stats: {
          totalAttempts: 0,
          backtrackCount: 0,
          timeElapsed: 0,
          cellsModified: 0,
        },
      }));
    }

    if (animationTimeout) {
      clearTimeout(animationTimeout);
      setAnimationTimeout(null);
    }
  }, [activeTab, animationTimeout]);

  // const handleLoadPuzzle = useCallback(
  //   (puzzle: typeof samplePuzzles.easy) => {
  //     setSudokuState((prev) => ({
  //       ...prev,
  //       grid: copyGrid(puzzle),
  //       originalGrid: copyGrid(puzzle),
  //       isPlaying: false,
  //       isPaused: false,
  //       currentStep: 0,
  //       totalSteps: 0,
  //       currentCell: null,
  //       isBacktracking: false,
  //       solveHistory: [],
  //       stats: {
  //         totalAttempts: 0,
  //         backtrackCount: 0,
  //         timeElapsed: 0,
  //         cellsModified: 0,
  //       },
  //     }));

  //     if (animationTimeout) {
  //       clearTimeout(animationTimeout);
  //       setAnimationTimeout(null);
  //     }
  //   },
  //   [animationTimeout]
  // );

  // const handleClear = useCallback(() => {
  //   const emptyGrid = createEmptyGrid();
  //   setSudokuState((prev) => ({
  //     ...prev,
  //     grid: emptyGrid,
  //     originalGrid: emptyGrid,
  //     isPlaying: false,
  //     isPaused: false,
  //     currentStep: 0,
  //     totalSteps: 0,
  //     currentCell: null,
  //     isBacktracking: false,
  //     solveHistory: [],
  //     stats: {
  //       totalAttempts: 0,
  //       backtrackCount: 0,
  //       timeElapsed: 0,
  //       cellsModified: 0,
  //     },
  //   }));
  // }, []);

  useEffect(() => {
    const currentState = activeTab === "sudoku" ? sudokuState : nqueensState;

    if (
      currentState.isPlaying &&
      currentState.currentStep < currentState.totalSteps - 1
    ) {
      const timeout = setTimeout(() => {
        handleStepForward();
      }, currentState.speed);

      setAnimationTimeout(timeout);
      return () => clearTimeout(timeout);
    } else if (
      currentState.isPlaying &&
      currentState.currentStep >= currentState.totalSteps - 1
    ) {
      if (activeTab === "sudoku") {
        setSudokuState((prev) => ({
          ...prev,
          isPlaying: false,
          isPaused: false,
        }));
      } else {
        setNQueensState((prev) => ({
          ...prev,
          isPlaying: false,
          isPaused: false,
        }));
      }
    }
  }, [activeTab, sudokuState, nqueensState, handleStepForward]);

  const currentState = activeTab === "sudoku" ? sudokuState : nqueensState;
  const canSolve =
    activeTab === "sudoku"
      ? !sudokuState.isPlaying && isGridValid(sudokuState.grid)
      : !nqueensState.isPlaying;

  const handlePlay =
    activeTab === "sudoku" ? handleSudokuPlay : handleNQueensPlay;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <Zap size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-blue-600 bg-clip-text text-transparent p-4">
              Backtracking Algorithm Visualizer
            </h1>
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <Zap size={32} />
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore classic backtracking algorithms through interactive
            visualizations. Watch how these algorithms systematically search for
            solutions!
          </p>
        </div>

        {/* Tab Selector */}
        <div className="max-w-4xl mx-auto">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Problem Grid and Controls */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex justify-center">
              {activeTab === "sudoku" ? (
                <SudokuGrid
                  grid={sudokuState.grid}
                  originalGrid={sudokuState.originalGrid}
                  currentCell={sudokuState.currentCell}
                  isBacktracking={sudokuState.isBacktracking}
                  onCellChange={handleSudokuCellChange}
                  isPlaying={sudokuState.isPlaying}
                />
              ) : (
                <NQueensGrid
                  grid={nqueensState.grid}
                  currentCell={nqueensState.currentCell}
                  isBacktracking={nqueensState.isBacktracking}
                  conflictCells={
                    nqueensState.currentStep < nqueensState.solveHistory.length
                      ? nqueensState.solveHistory[nqueensState.currentStep]
                          ?.conflictCells
                      : undefined
                  }
                  // isPlaying={nqueensState.isPlaying}
                />
              )}
            </div>

            <PlaybackControls
              isPlaying={currentState.isPlaying}
              isPaused={currentState.isPaused}
              currentStep={currentState.currentStep}
              totalSteps={currentState.totalSteps}
              speed={currentState.speed}
              onPlay={handlePlay}
              onPause={handlePause}
              onStop={handleStop}
              onStepBack={handleStepBack}
              onStepForward={handleStepForward}
              onSpeedChange={handleSpeedChange}
              onReset={handleReset}
              canSolve={canSolve}
            />
          </div>

          {/* Right Column - Controls and Stats */}
          <div className="space-y-6">
            {activeTab === "sudoku" ? (
              <></>
            ) : (
              // <PuzzleSelector
              //   onLoadPuzzle={handleLoadPuzzle}
              //   onClear={handleClear}
              //   currentGrid={sudokuState.grid}
              // />
              <NQueensControls
                gridSize={nqueensState.gridSize}
                onGridSizeChange={handleNQueensGridSizeChange}
                onReset={handleReset}
                totalSolutions={countNQueensSolutions(nqueensState.gridSize)}
              />
            )}
            {/* Algorithm Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {activeTab === "sudoku"
                  ? "Sudoku Backtracking"
                  : "N-Queens Backtracking"}
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                {activeTab === "sudoku" ? (
                  <>
                    <p>
                      The algorithm tries values 1-9 in each empty cell
                      systematically.
                    </p>
                    <p>
                      When it finds an invalid placement, it backtracks and
                      tries the next value.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      The algorithm places queens column by column, checking for
                      conflicts.
                    </p>
                    <p>
                      When a queen can't be placed safely, it backtracks to try
                      different positions.
                    </p>
                  </>
                )}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
                    <span className="text-xs">
                      Current position being processed
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
                    <span className="text-xs">
                      {activeTab === "sudoku"
                        ? "Successfully placed values"
                        : "Successfully placed queens"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
                    <span className="text-xs">Backtracking step</span>
                  </div>
                  {activeTab === "nqueens" && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded"></div>
                      <span className="text-xs">Cells under attack</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <StatsPanel
              stats={currentState.stats}
              isVisible={currentState.totalSteps > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
