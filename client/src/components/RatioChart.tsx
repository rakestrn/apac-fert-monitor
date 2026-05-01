import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface RatioChartProps {
  data: any[];
  ratioKey: string;
  ratioLabel: string;
  fiveYrAvg: number;
  fiveYrLow: number;
  fiveYrHigh: number;
  threshold: number;
  thresholdLabel: string;
  color: string;
  unit?: string;
  height?: number;
}

export function RatioChart({
  data,
  ratioKey,
  ratioLabel,
  fiveYrAvg,
  fiveYrLow,
  fiveYrHigh,
  threshold,
  thresholdLabel,
  color,
  unit = "bu/t",
  height = 240,
}: RatioChartProps) {
  // Synthesize band data
  const enriched = data.map((d) => ({
    ...d,
    bandLow: fiveYrLow,
    bandRange: fiveYrHigh - fiveYrLow,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={enriched} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`band-${ratioKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.08} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} width={36} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--popover-border))",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
          }}
          formatter={(v: any, name: string) => {
            if (name === "bandLow" || name === "bandRange") return [null, null];
            return [`${v} ${unit}`, ratioLabel];
          }}
          filterNull
        />

        {/* 5-year band as stacked area */}
        <Area
          type="monotone"
          dataKey="bandLow"
          stackId="band"
          stroke="none"
          fill="transparent"
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="bandRange"
          stackId="band"
          stroke={color}
          strokeOpacity={0.2}
          strokeDasharray="2 2"
          fill={`url(#band-${ratioKey})`}
          isAnimationActive={false}
        />

        {/* 5-yr average line */}
        <ReferenceLine
          y={fiveYrAvg}
          stroke="hsl(var(--muted-foreground))"
          strokeDasharray="4 2"
          label={{ value: `5y avg ${fiveYrAvg}`, position: "insideBottomRight", fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
        />

        {/* Demand destruction threshold */}
        <ReferenceLine
          y={threshold}
          stroke="hsl(var(--destructive))"
          strokeDasharray="3 3"
          label={{ value: thresholdLabel, position: "insideTopRight", fill: "hsl(var(--destructive))", fontSize: 10, fontWeight: 600 }}
        />

        {/* Actual ratio line */}
        <Line
          type="monotone"
          dataKey={ratioKey}
          stroke={color}
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4 }}
          name={ratioLabel}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
