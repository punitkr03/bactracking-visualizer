import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Square,
  RotateCcw,
} from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
  canSolve: boolean;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isPaused,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStop,
  onStepBack,
  onStepForward,
  onSpeedChange,
  onReset,
  canSolve,
}) => {
  const speedOptions = [
    { value: 1000, label: "1x" },
    { value: 500, label: "2x" },
    { value: 250, label: "4x" },
    { value: 100, label: "10x" },
    { value: 50, label: "20x" },
    { value: 25, label: "40x" },
    { value: 10, label: "100x" },
    { value: 5, label: "200x" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={onStepBack}
          disabled={currentStep === 0}
          className="p-2 rounded-lg bg-gray-100 ho
          
          ver:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Step Back"
        >
          <SkipBack size={20} />
        </button>

        {!isPlaying ? (
          <button
            onClick={onPlay}
            disabled={!canSolve}
            className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Play"
          >
            <Play size={24} />
          </button>
        ) : (
          <button
            onClick={onPause}
            className="p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
            title="Pause"
          >
            <Pause size={24} />
          </button>
        )}

        <button
          onClick={onStop}
          disabled={!isPlaying && !isPaused}
          className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Stop"
        >
          <Square size={20} />
        </button>

        <button
          onClick={onStepForward}
          disabled={currentStep >= totalSteps - 1}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Step Forward"
        >
          <SkipForward size={20} />
        </button>

        <button
          onClick={onReset}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Step: {currentStep} / {totalSteps}
          </span>
          <div>
            <span>Speed: </span>
            <span className="font-semibold">
              {speedOptions.find((option) => option.value === speed)?.label ||
                "N/A"}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                totalSteps > 0 ? Number(currentStep / totalSteps) * 100 : 0
              }%`,
            }}
          />
        </div>

        <div className="flex justify-center space-x-2">
          {speedOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSpeedChange(option.value)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                speed === option.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
