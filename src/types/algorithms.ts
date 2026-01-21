import type { AnimationStats, AnimationStep } from "@/types/animation";

export type GraphAlgorithm = "bfs" | "dfs" | "dijkstra" | "astar";

export type MazeAlgorithm =
  | "recursive-division"
  | "randomized-prims"
  | "binary-tree";

export interface AlgorithmResult {
  steps: AnimationStep[];
  stats: AnimationStats;
}
