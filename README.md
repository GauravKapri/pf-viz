# pf-viz
Interactive pathfinding algorithm visualizer built with React &amp; TypeScript. Watch BFS, DFS, Dijkstra, and A* find the shortest path in real-time. Draw walls, generate mazes, and adjust animation speed. Track algorithm performance with live statistics. Perfect for learning graph algorithms visually.

🔗 **Live Demo:**  
👉 https://gauravkapri.github.io/pf-viz/

## ✨ Features

### 🔍 Pathfinding Algorithms
- **Breadth-First Search (BFS)** - Guarantees shortest path for unweighted graphs
- **Depth-First Search (DFS)** - Explores as far as possible along each branch
- **Dijkstra's Algorithm** - Finds shortest path considering weighted cells
- **A-Star Search** - Heuristic-based algorithm for optimal pathfinding

### 🌀 Maze Generation
- **Recursive Division** - Divides space recursively to create perfect mazes
- **Randomized Prim's Algorithm** - Generates mazes using minimum spanning trees
- **Binary Tree** - Simple and fast maze generation technique

### 🎨 Interactive Features
- **Visual Grid Interface** - Draw walls by clicking and dragging
- **Real-time Animation** - Watch algorithms explore the grid step-by-step
- **Adjustable Speed** - Control animation speed (slow, medium, fast)
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Statistics Dashboard** - View visited nodes, path length, and execution time

- ## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Reactjs + typescript
- tailwindcss
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎮 How to Use

1. **Select an Algorithm** - Choose from BFS, DFS, Dijkstra, or A* in the left panel
2. **Draw Walls** - Click and drag on the grid to create obstacles
3. **Generate Mazes** - Use maze generation algorithms for quick setups
4. **Run Visualization** - Click the "Run" button to watch the algorithm in action
5. **Adjust Settings** - Change animation speed or clear the grid as needed

### Controls
- **Run** - Execute the selected pathfinding algorithm
- **Reset** - Clear the entire grid and reset to initial state
- **Clear Walls** - Remove all walls while preserving the path
- **Clear Path** - Remove algorithm visualization while keeping walls

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── main/           # Main grid and cell components
│   └── ui/             # Reusable UI components
├── contexts/           # React context providers
│   ├── AppContext.ts   # Application state context
│   └── GridContext.ts  # Grid state context
├── hooks/              # Custom React hooks
├── lib/                # Core logic and utilities
│   ├── graphAlgorithms.ts    # Pathfinding algorithm executor
│   ├── mazeAlgorithms.ts     # Maze generation executor
│   └── constants.ts          # Application constants
└── types/              # TypeScript type definitions
```

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Icon library
- **shadcn/ui** - Component library

## 👨‍💻 Author

**Gaurav Kapri** 
