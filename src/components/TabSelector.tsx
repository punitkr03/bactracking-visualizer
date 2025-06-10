import React from "react";
import { ProblemType } from "../types";
import { Grid3X3, Crown } from "lucide-react";

interface TabSelectorProps {
  activeTab: ProblemType;
  onTabChange: (tab: ProblemType) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: "sudoku" as ProblemType,
      name: "Sudoku Solver",
      icon: Grid3X3,
      description: "Classic 9×9 number puzzle",
    },
    {
      id: "nqueens" as ProblemType,
      name: "N-Queens Problem",
      icon: Crown,
      description: "Place N queens on N×N board",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
      <div className="flex space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={24} />
              <div className="text-left">
                <div className="font-semibold">{tab.name}</div>
                <div
                  className={`text-sm ${
                    isActive ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {tab.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
