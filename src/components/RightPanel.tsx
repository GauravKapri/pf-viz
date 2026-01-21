import { Separator } from "@/components/ui/separator";
import { useAppState } from "@/hooks/useApp";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between w-full">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export const RightPanel = () => {
  const { animationStats, graphAlgorithm } = useAppState();
  return (
    <div className="flex flex-col w-full max-w-[288px] space-y-6 text-sm">
      <section className="flex flex-col w-full space-y-2">
        <h3 className="font-medium">Algorithm Stats</h3>
        <Stat label="Algorithm" value={graphAlgorithm.toUpperCase()} />
        <Stat
          label="Visited Nodes"
          value={animationStats.visitedNodes.toString()}
        />
        <Stat
          label="Path Length"
          value={animationStats.pathLength.toString()}
        />
        <Stat
          label="Execution Time"
          value={`${animationStats.executionTime.toFixed(2)} ms`}
        />
      </section>

      <Separator />

      <section className="flex flex-col w-full space-y-2 text-muted-foreground">
        <h3 className="font-medium text-foreground">Controls Info</h3>
        <p>• Click & drag to draw walls</p>
        <p>• Drag nodes to reposition</p>
        <p>• Select algorithm before running</p>
      </section>
    </div>
  );
};
