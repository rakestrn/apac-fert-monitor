import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { crisisEvents } from "@/data/fertilizer-data";

interface PriceChartProps {
  data: any[];
  series: { key: string; label: string; color: string }[];
  unit?: string;
  showCrisis?: boolean;
  height?: number;
}

export function PriceChart({
  data,
  series,
  unit = "$/MT",
  showCrisis = true,
  height = 320,
}: PriceChartProps) {
  // Find which crisis events fall within the data's date range
  const dataStartDate = data[0]?.date;
  const dataEndDate = data[data.length - 1]?.date;

  // Crisis events to show as vertical reference lines (only major ones, in range)
  const majorEvents = [
    { date: "2026-02-28", short: "War starts" },
    { date: "2026-03-13", short: "China P-ban" },
  ];
  const visibleCrises = showCrisis
    ? majorEvents.filter((e) => {
        const eventMonth = e.date.substring(0, 7);
        return eventMonth >= dataStartDate && eventMonth <= dataEndDate;
      })
    : [];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid
          stroke="hsl(var(--border))"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--popover-border))",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            boxShadow: "var(--shadow-lg)",
          }}
          labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600, marginBottom: 4 }}
          formatter={(value: any, name: string) => {
            if (value === 0) return ["—", name];
            return [`$${Number(value).toLocaleString()} ${unit.replace("$/", "/")}`, name];
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
          iconType="line"
        />

        {/* Crisis event markers */}
        {visibleCrises.map((event) => (
          <ReferenceLine
            key={event.date}
            x={event.date.substring(0, 7)}
            stroke="hsl(var(--destructive))"
            strokeDasharray="2 2"
            strokeWidth={1}
            label={{
              value: event.short,
              position: "top",
              fill: "hsl(var(--destructive))",
              fontSize: 9,
              fontWeight: 600,
            }}
          />
        ))}

        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
