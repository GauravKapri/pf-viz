import type { Grid } from "@/types/Cell";
import type { AnimationStep } from "@/types/animation";

export interface GridContextState {
  grid: Grid;
}

export interface GridContextActions {
  setGrid: (grid: Grid | ((prev: Grid) => Grid)) => void;

  resetGrid: () => void;

  clearWalls: () => void;

  clearPath: () => void;

  applyStep: (step: AnimationStep) => void;
}

export type GridContextType = {
  state: GridContextState;
  actions: GridContextActions;
};
