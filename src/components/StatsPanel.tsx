import React from "react";
import { SolveStats } from "../types";
import { Clock, Target, RotateCcw, Edit } from "lucide-react";

interface StatsPanelProps {
  stats: SolveStats;
  isVisible: boolean;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, isVisible }) => {
  if (!isVisible) return null;

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Algorithm Statistics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target size={20} className="text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Attempts</div>
            <div className="text-xl font-bold text-gray-800">
              {stats.totalAttempts.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
          <div className="p-2 bg-red-100 rounded-lg">
            <RotateCcw size={20} className="text-red-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Backtracks</div>
            <div className="text-xl font-bold text-gray-800">
              {stats.backtrackCount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <div className="p-2 bg-green-100 rounded-lg">
            <Edit size={20} className="text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Cells Modified</div>
            <div className="text-xl font-bold text-gray-800">
              {stats.cellsModified}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock size={20} className="text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Time Elapsed</div>
            <div className="text-xl font-bold text-gray-800">
              {formatTime(stats.timeElapsed)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Efficiency Ratio</div>
        <div className="text-lg font-semibold text-gray-800">
          {stats.totalAttempts > 0
            ? `${((stats.cellsModified / stats.totalAttempts) * 100).toFixed(
                1
              )}%`
            : "0%"}
        </div>
        <div className="text-xs text-gray-500">
          (Successful placements / Total attempts)
        </div>
      </div>
    </div>
  );
};
