import { useCallback, useRef } from "react";
import { useAppActions, useAppState } from "./useApp";
import { useGridActions } from "./useGrid";
import type { AnimationStep } from "@/types/animation";
import { SPEED_DELAY_MS } from "@/types/app";

/**
 * useAnimationRunner
 * Handles all animations (graph & maze) with batching and cancellation
 */
export function useAnimationRunner() {
  const { speed, isAnimating } = useAppState();
  const { setMode, setIsAnimating } = useAppActions();
  const { applyStep, clearPath } = useGridActions();

  // Cancellation ref
  const isCancelledRef = useRef(false);

  // Batch settings
  const MAZE_BATCH_SIZE = 2;
  const MAZE_FRAME_DELAY = 30;
  const GRAPH_BATCH_SIZE = 5;

  /**
   * Generic batched runner
   */
  const runBatchedAnimation = useCallback(
    async (steps: AnimationStep[], batchSize: number, delay: number) => {
      isCancelledRef.current = false;

      let stepIndex = 0;

      while (stepIndex < steps.length && !isCancelledRef.current) {
        for (
          let i = 0;
          i < batchSize && stepIndex < steps.length;
          i++, stepIndex++
        ) {
          const step = steps[stepIndex];
          applyStep(step);
        }

        if (stepIndex < steps.length) {
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    },
    [applyStep],
  );

  /**
   * Run a graph algorithm animation
   */
  const runGraphAnimation = useCallback(
    async (steps: AnimationStep[]) => {
      if (isAnimating) {
        console.warn("Animation already running");
        return;
      }

      setIsAnimating(true);
      setMode("running-algorithm");
      clearPath();

      const delay = SPEED_DELAY_MS[speed];

      try {
        await runBatchedAnimation(steps, GRAPH_BATCH_SIZE, delay);
      } catch (e) {
        console.error("Graph animation error:", e);
      } finally {
        setIsAnimating(false);
        setMode("idle");
      }
    },
    [
      isAnimating,
      speed,
      setIsAnimating,
      setMode,
      clearPath,
      runBatchedAnimation,
    ],
  );

  /**
   * Run a maze generation animation
   */
  const runMazeAnimation = useCallback(
    async (steps: AnimationStep[]) => {
      if (isAnimating) {
        console.warn("Animation already running");
        return;
      }

      setIsAnimating(true);
      setMode("generating-maze");

      try {
        await runBatchedAnimation(steps, MAZE_BATCH_SIZE, MAZE_FRAME_DELAY);
      } catch (e) {
        console.error("Maze animation error:", e);
      } finally {
        setIsAnimating(false);
        setMode("idle");
      }
    },
    [isAnimating, setIsAnimating, setMode, runBatchedAnimation],
  );

  /**
   * Cancel the current animation immediately
   */
  const cancelAnimation = useCallback(() => {
    isCancelledRef.current = true;
    setIsAnimating(false);
    setMode("idle");
  }, [setIsAnimating, setMode]);

  return {
    runGraphAnimation,
    runMazeAnimation,
    cancelAnimation,
    isAnimating,
  };
}
