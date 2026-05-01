import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: number | string;
  unit?: string;
  change: number;
  baseline: number | string;
  baselineLabel: string;
  invertColor?: boolean; // true = up is bad (e.g. price for buyer), false = up is good
  testId?: string;
}

export function KPICard({
  label,
  value,
  unit = "",
  change,
  baseline,
  baselineLabel,
  invertColor = true,
  testId,
}: KPICardProps) {
  const isUp = change > 0.1;
  const isDown = change < -0.1;
  const isFlat = !isUp && !isDown;

  const colorClass = isFlat
    ? "text-muted-foreground"
    : (isUp && invertColor) || (isDown && !invertColor)
    ? "text-[hsl(var(--status-up))]"
    : "text-[hsl(var(--status-down))]";

  const Icon = isFlat ? Minus : isUp ? ArrowUp : ArrowDown;

  return (
    <div
      className="bg-card border border-card-border rounded-lg p-4 flex flex-col gap-2 hover-elevate transition-all"
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight">
          {label}
        </span>
        <div
          className={cn(
            "flex items-center gap-0.5 text-xs font-semibold tabular px-1.5 py-0.5 rounded",
            colorClass,
            !isFlat && "bg-current/10"
          )}
        >
          <Icon size={12} strokeWidth={2.5} />
          <span>
            {Math.abs(change).toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold tabular leading-none" data-testid={`${testId}-value`}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-sm text-muted-foreground font-medium">{unit}</span>}
      </div>
      <div className="text-xs text-muted-foreground tabular border-t border-border pt-2 mt-auto">
        vs <span className="font-medium text-foreground">{typeof baseline === "number" ? baseline.toLocaleString() : baseline}</span> {baselineLabel}
      </div>
    </div>
  );
}
