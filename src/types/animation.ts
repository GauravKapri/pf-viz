import type { CellState } from "@/types/Cell";

export type CellMutation = {
  kind: "setState";
  row: number;
  col: number;
  state: CellState;
};

export interface AnimationStep {
  mutations: CellMutation[];
  phase: "maze" | "search" | "path";
}

export interface AnimationStats {
  visitedNodes: number;
  pathLength: number;
  executionTime: number;
}
