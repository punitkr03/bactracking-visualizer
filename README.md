# Algorithm Visualization Tool

A modern, interactive web application for visualizing and understanding backtracking algorithms through step-by-step animations. Built with React, TypeScript, and Tailwind CSS.

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 🌟 Overview

This is an educational tool designed to help students, educators, and programming enthusiasts understand how backtracking algorithms work by providing real-time visualizations. The application currently features two classic problems that demonstrate the power and elegance of backtracking:

- **Sudoku Solver** - Watch how the algorithm systematically fills a 9×9 grid while respecting Sudoku constraints
- **N-Queens Problem** - Visualize the placement of N queens on an N×N chessboard where no two queens attack each other

## ✨ Features

### 🎮 Interactive Visualization

- **Play/Pause Controls**: Start, stop, and pause algorithm execution
- **Step-by-Step Navigation**: Move forward and backward through each step
- **Variable Speed Control**: Adjust animation speed from 1x to 200x
- **Real-time Highlighting**: See current cells being processed and backtracking moves

### 📊 Algorithm Analytics

- **Performance Statistics**: Track total attempts, backtrack count, execution time, and cells modified
- **Step Counter**: Monitor progress through the solving process
- **Solution Information**: View number of possible solutions for N-Queens problems

### 🎯 Sudoku Solver Features

- **Interactive Grid**: Manually input your own puzzles
- **Pre-loaded Examples**: Start with sample easy puzzles
- **Validation**: Real-time checking for valid puzzle configurations
- **Visual Feedback**: Different colors for original cells, current attempts, and backtracking

### 👑 N-Queens Features

- **Configurable Board Size**: Choose from 4×4 to 10×10 grids
- **Conflict Visualization**: See which cells are under attack
- **Solution Count Display**: Know how many solutions exist for each board size
- **Queen Placement Animation**: Watch queens being placed and removed during backtracking

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive, modern UI
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **Package Manager**: PNPM for efficient dependency management

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- PNPM (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/algovis.git
   cd algovis
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Building for Production

```bash
pnpm build
# or
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Use

### Sudoku Solver

1. Select the "Sudoku" tab
2. Modify the puzzle by clicking on empty cells (optional)
3. Click the "Play" button to start the visualization
4. Use controls to pause, step through, or adjust speed
5. Watch as the algorithm tries different values and backtracks when needed

### N-Queens

1. Select the "N-Queens" tab
2. Choose your preferred board size (4×4 to 10×10)
3. Click "Play" to start the visualization
4. Observe how queens are placed column by column
5. See the algorithm backtrack when no valid position is available

## 🧠 Algorithm Details

### Sudoku Backtracking Algorithm

The Sudoku solver uses a recursive backtracking approach:

1. Find the next empty cell
2. Try values 1-9 in that cell
3. Check if the value is valid (no conflicts in row, column, or 3×3 box)
4. If valid, recursively solve the remaining puzzle
5. If no valid value works, backtrack and try the next value

### N-Queens Backtracking Algorithm

The N-Queens solver places queens column by column:

1. Start with the leftmost column
2. Try placing a queen in each row of the current column
3. Check if the placement is safe (no conflicts with existing queens)
4. If safe, recursively solve for the next column
5. If no safe position exists, backtrack to the previous column

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── NQueensConfig.tsx    # N-Queens configuration controls
│   ├── NQueensGrid.tsx      # N-Queens board visualization
│   ├── NQueensSolver.tsx    # N-Queens algorithm implementation
│   ├── PlaybackControls.tsx # Play/pause/step controls
│   ├── StatsPanel.tsx       # Algorithm statistics display
│   ├── SudokuGrid.tsx       # Sudoku grid visualization
│   ├── SudokuSolver.tsx     # Sudoku algorithm implementation
│   └── TabSelector.tsx      # Algorithm tab switcher
├── utils/               # Utility functions
│   ├── nqueensUtils.ts      # N-Queens helper functions
│   └── sudokuUtils.ts       # Sudoku helper functions
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- 🐛 Report bugs or issues
- 💡 Suggest new features or algorithms
- 🔧 Submit pull requests with improvements
- 📚 Improve documentation
- 🎨 Enhance UI/UX design

### Development Guidelines

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain component modularity
4. Add appropriate error handling
5. Include comments for complex logic

## 🗺️ Roadmap

### Planned Features

- [ ] More algorithms (Maze solving, Graph traversal)
- [ ] Custom puzzle import/export
- [ ] Algorithm comparison mode
- [ ] Mobile-responsive improvements
- [ ] Dark mode support
- [ ] Educational explanations and tutorials
- [ ] Performance benchmarking
- [ ] Solution path highlighting

## 📞 Support

If you have questions, suggestions, or need help:

- Open an issue on GitHub
- Check the documentation
- Reach out to the maintainers

---

**Made with ❤️ for the programming community**

_Help others learn algorithms through visualization!_
