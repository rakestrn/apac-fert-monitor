import { mofcomEvents, sensitivityMatrix, analysisFindings } from "@/data/mofcom-analysis";
import { FileText, TrendingUp, TrendingDown, ExternalLink, AlertTriangle } from "lucide-react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";

export function MofcomTab() {
  return (
    <>
      {/* Header / methodology */}
      <section className="bg-card border border-card-border rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-[hsl(var(--crisis-bg))] border border-[hsl(var(--crisis-border))]">
            <FileText size={18} className="text-[hsl(var(--primary))]" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold mb-1">MOFCOM Sensitivity · August 2026 Quota Review</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Historical correlation analysis: <span className="text-foreground font-medium">formal Chinese export bulletins</span> (MOFCOM/GACC published notices only, not informal SOE directives) versus <span className="text-foreground font-medium">SE Asia CFR urea price response</span>, 2021–2026. Plus a forward sensitivity matrix for the upcoming August 31 quota expiry decision.{" "}
              <a
                href="https://www.globaltradealert.org/intervention/100224/export-related-non-tariff-measure-nes/china-new-export-inspection-requirements-for-certain-fertilisers"
                target="_blank" rel="noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Foundational source: GACC 81/2021 <ExternalLink size={11} />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* THESIS card */}
      <section className="bg-gradient-to-br from-[hsl(var(--crisis-bg))] to-card border-2 border-[hsl(var(--crisis-border))] rounded-lg p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-[hsl(var(--primary))]" />
          <h3 className="text-sm font-semibold uppercase tracking-wide">Investment Thesis</h3>
        </div>
        <p className="text-base font-medium leading-snug max-w-4xl">{analysisFindings.thesis}</p>
      </section>

      {/* SENSITIVITY MATRIX */}
      <section className="bg-card border border-card-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-base font-semibold">Sensitivity Matrix · Aug 2026 Quota Decision</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Estimated SE Asia CFR urea response to a ±X% change in the August quota allocation, across baseline price scenarios. Cell shows % move and resulting price. Cuts amplified 1.3× due to India ban + floor price asymmetry.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                  Quota Δ
                </th>
                {sensitivityMatrix.baselinePrices.map((b) => (
                  <th
                    key={b}
                    className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right"
                  >
                    ${b}/t baseline
                    {b === 850 && (
                      <span className="block text-[10px] normal-case text-primary font-bold">
                        ← Current
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sensitivityMatrix.data.map((row) => (
                <tr
                  key={row.quota}
                  className={`border-t border-border ${
                    row.quota === 0 ? "bg-muted/30" : "hover:bg-muted/20"
                  } transition-colors`}
                >
                  <td className="px-4 py-3 font-semibold tabular">
                    {row.quota === 0 ? "Hold" : `${row.quota > 0 ? "+" : ""}${row.quota}%`}
                  </td>
                  {row.impactPct.map((pct, i) => {
                    const newP = row.newPrice[i];
                    const isUp = pct > 0.1;
                    const isDown = pct < -0.1;
                    const colorCls = isUp
                      ? "text-[hsl(var(--status-up))]"
                      : isDown
                      ? "text-[hsl(var(--status-down))]"
                      : "text-muted-foreground";
                    const isCurrent = sensitivityMatrix.baselinePrices[i] === 850;
                    return (
                      <td
                        key={i}
                        className={`px-4 py-3 text-right tabular mono ${
                          isCurrent ? "bg-[hsl(var(--primary))]/5" : ""
                        }`}
                      >
                        <div className={`font-semibold ${colorCls}`}>
                          {isUp ? "+" : ""}
                          {pct.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">${newP}/t</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 bg-muted/20 border-t border-border text-xs text-muted-foreground">
          Methodology: ε = -0.27 (central elasticity), with tightness-scaled multiplier (4×–12×). Asymmetric cut/release amplification.
        </div>
      </section>

      {/* EVENT STUDY CHART */}
      <section className="bg-card border border-card-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-base font-semibold">Event Study · Price Response by Quarter</h3>
          <p className="text-sm text-muted-foreground mt-1">
            SE Asia CFR urea % change vs prior quarter, measured at T0 (event quarter), T+1Q, T+2Q.
            Bars colored by direction (red = restriction, green = release).
          </p>
        </div>
        <div className="p-3">
          <ResponsiveContainer width="100%" height={340}>
            <ComposedChart
              data={mofcomEvents.map((e) => ({
                ...e,
                label: `${e.id} · ${e.notice}`,
                t0: e.pctPriorToT0 ?? 0,
                t1: e.pctPriorToT1 ?? 0,
                t2: e.pctPriorToT2 ?? 0,
              }))}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--popover-border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <ReferenceLine y={0} stroke="hsl(var(--border))" />
              <Bar dataKey="t0" name="T0 (event quarter)" isAnimationActive={false}>
                {mofcomEvents.map((e, i) => (
                  <Cell
                    key={i}
                    fill={
                      e.direction === "restrict"
                        ? "hsl(var(--status-up))"
                        : "hsl(var(--status-down))"
                    }
                    opacity={0.4}
                  />
                ))}
              </Bar>
              <Bar dataKey="t1" name="T+1Q" isAnimationActive={false}>
                {mofcomEvents.map((e, i) => (
                  <Cell
                    key={i}
                    fill={
                      e.direction === "restrict"
                        ? "hsl(var(--status-up))"
                        : "hsl(var(--status-down))"
                    }
                    opacity={0.7}
                  />
                ))}
              </Bar>
              <Bar dataKey="t2" name="T+2Q" isAnimationActive={false}>
                {mofcomEvents.map((e, i) => (
                  <Cell
                    key={i}
                    fill={
                      e.direction === "restrict"
                        ? "hsl(var(--status-up))"
                        : "hsl(var(--status-down))"
                    }
                    opacity={1}
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* EVENT LIST */}
      <section className="bg-card border border-card-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-base font-semibold">Formal Event Log</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Each row is a formally published bulletin. Informal SOE directives (~20 additional events
            2021–2026) are excluded per methodology.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="px-3 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground w-12">
                  ID
                </th>
                <th className="px-3 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                  Date
                </th>
                <th className="px-3 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                  Notice
                </th>
                <th className="px-3 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                  Product
                </th>
                <th className="px-3 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                  Direction
                </th>
                <th className="px-3 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">
                  T+2Q % (SE Asia CFR)
                </th>
              </tr>
            </thead>
            <tbody>
              {mofcomEvents.map((e) => {
                const t2 = e.pctPriorToT2;
                const dirColor =
                  e.direction === "restrict"
                    ? "bg-[hsl(var(--status-up))]/10 text-[hsl(var(--status-up))]"
                    : "bg-[hsl(var(--status-down))]/10 text-[hsl(var(--status-down))]";
                const Icon = e.direction === "restrict" ? TrendingUp : TrendingDown;
                return (
                  <tr key={e.id} className="border-t border-border hover:bg-muted/30 transition-colors align-top">
                    <td className="px-3 py-3 mono font-semibold text-xs">{e.id}</td>
                    <td className="px-3 py-3 tabular mono text-xs whitespace-nowrap">{e.date}</td>
                    <td className="px-3 py-3 font-medium">{e.notice}</td>
                    <td className="px-3 py-3 text-muted-foreground text-xs">{e.product}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${dirColor}`}
                      >
                        <Icon size={11} strokeWidth={2.5} />
                        {e.direction === "restrict" ? "Restrict" : "Release"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right tabular mono">
                      {t2 !== undefined ? (
                        <span className={t2 > 0 ? "text-[hsl(var(--status-up))]" : "text-[hsl(var(--status-down))]"}>
                          {t2 > 0 ? "+" : ""}
                          {t2.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">n/a</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* KEY FINDINGS + POSITIONING */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-card-border rounded-lg p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Key Findings
          </h3>
          <ul className="space-y-2">
            {analysisFindings.bullets.map((b, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-primary font-bold mt-0.5">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-card-border rounded-lg p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Positioning Implications
          </h3>
          <ul className="space-y-2">
            {analysisFindings.positioning.map((b, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-[hsl(var(--chart-2))] font-bold mt-0.5">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
