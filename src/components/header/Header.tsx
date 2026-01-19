import { Info, Menu } from "lucide-react";
import { useCallback } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { LeftPanel } from "../LeftPanel";
import { RightPanel } from "../RightPanel";

import { useGridActions, useGridState } from "@/hooks/useGrid";
import { useAppActions, useAppState } from "@/hooks/useApp";
import { useAnimationRunner } from "@/hooks/useAnimationRunner";
import { executeGraphAlgorithm } from "@/lib/graphAlgorithms";

import type { Position } from "@/types/Cell";

export const Header = () => {
  const { resetGrid, clearPath, clearWalls } = useGridActions();
  const { grid } = useGridState();
  const { graphAlgorithm, isAnimating } = useAppState();
  const { setAnimationStats } = useAppActions();
  const { runGraphAnimation, cancelAnimation } = useAnimationRunner();

  const handleRunAlgorithm = useCallback(() => {
    if (isAnimating) return;

    let start: Position | null = null;
    let end: Position | null = null;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const cell = grid[r][c];
        if (cell.state === "start") start = cell.position;
        else if (cell.state === "end") end = cell.position;
      }
    }

    if (!start || !end) {
      console.error("Start or end position not found");
      return;
    }

    const { steps, stats } = executeGraphAlgorithm(
      graphAlgorithm,
      grid,
      start,
      end,
    );

    if (steps.length === 0) {
      console.warn("No animation steps generated");
      return;
    }

    setAnimationStats(stats);
    runGraphAnimation(steps);
  }, [grid, graphAlgorithm, isAnimating, runGraphAnimation, setAnimationStats]);

  return (
    <header className="border-b bg-card shrink-0">
      <div className="mx-auto max-w-400 px-4 py-3 flex items-center justify-between gap-2">
        {/* Left */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight hover:underline"
          >
            Pathfinding Visualizer
          </a>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Version: 1
          </Badge>
        </div>

        {/* Center / Primary Actions (ALWAYS VISIBLE) */}
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleRunAlgorithm} disabled={isAnimating}>
            {isAnimating ? "Running..." : "Run"}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={isAnimating ? cancelAnimation : resetGrid}
          >
            {isAnimating ? "Stop" : "Reset"}
          </Button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Desktop-only extras */}
          <div className="hidden lg:flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={clearWalls}
              disabled={isAnimating}
            >
              Clear Walls
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={clearPath}
              disabled={isAnimating}
            >
              Clear Path
            </Button>
          </div>

          {/* Mobile drawers */}
          <div className="flex lg:hidden gap-2">
            {/* Controls Drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4 w-72 overflow-y-auto">
                <SheetHeader className="px-0 py-3">
                  <SheetTitle>Controls</SheetTitle>
                  <SheetDescription className="sr-only">
                    Select algorithms, mazes, and board options
                  </SheetDescription>
                </SheetHeader>
                <LeftPanel />
              </SheetContent>
            </Sheet>

            {/* Stats Drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Info className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4 w-72 overflow-y-auto">
                <SheetHeader className="px-0 py-3">
                  <SheetTitle>Stats</SheetTitle>
                  <SheetDescription className="sr-only">
                    View algorithm statistics and execution details
                  </SheetDescription>
                </SheetHeader>
                <RightPanel />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
