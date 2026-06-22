import { useState } from "react";
import {
  ureaPrices,
  phosphatePrices,
  potashPrices,
  ammoniaPrices,
  exchangeRatios,
  ratioBands,
  hormuzTransits,
  chinaQuotaStatus,
  apacVulnerability,
  kpiSnapshot,
  bottomLine,
  crisisEvents,
} from "@/data/fertilizer-data";
import { Logo } from "@/components/Logo";
import { KPICard } from "@/components/KPICard";
import { PriceChart } from "@/components/PriceChart";
import { RatioChart } from "@/components/RatioChart";
import { Sun, Moon, AlertTriangle, TrendingUp, Ship, Globe2, FileText, ExternalLink, Scale } from "lucide-react";
import { MofcomTab } from "@/components/MofcomTab";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "ratios" | "leading" | "vulnerability" | "mofcom">("overview");

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div className="flex flex-col">
              <h1 className="text-base font-semibold leading-tight tracking-tight" data-testid="text-app-title">
                HORMUZ — APAC Fertilizer Monitor
              </h1>
              <span className="text-xs text-muted-foreground leading-tight tabular">
                Iran/US conflict price tracker · Updated May 1, 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[hsl(var(--crisis-bg))] border border-[hsl(var(--crisis-border))]">
              <AlertTriangle size={13} className="text-[hsl(var(--primary))]" />
              <span className="text-xs font-medium text-foreground">Crisis Mode · Day 63</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover-elevate border border-transparent"
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* TABS */}
        <nav className="border-t border-border">
          <div className="max-w-[1600px] mx-auto px-6 flex gap-0 overflow-x-auto">
            {(
              [
                { id: "overview", label: "Price Overview", icon: TrendingUp },
                { id: "ratios", label: "Exchange Ratios", icon: FileText },
                { id: "leading", label: "Leading Indicators", icon: Ship },
                { id: "vulnerability", label: "APAC Vulnerability", icon: Globe2 },
                { id: "mofcom", label: "MOFCOM Sensitivity", icon: Scale },
              ] as const
            ).map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  data-testid={`tab-${t.id}`}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    active
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "ratios" && <RatiosTab />}
        {activeTab === "leading" && <LeadingTab />}
        {activeTab === "vulnerability" && <VulnerabilityTab />}
        {activeTab === "mofcom" && <MofcomTab />}

        {/* BOTTOM LINE — always visible */}
        <BottomLineCard />

        <Footer />
      </main>
    </div>
  );
}

// ============== OVERVIEW TAB ==============
function OverviewTab() {
  return (
    <>
      {/* KPI Strip */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Current Snapshot · ME FOB & APAC CFR
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
          <KPICard
            label="Urea ME FOB"
            value={kpiSnapshot.ureaMeFob.value}
            unit="$/MT"
            change={kpiSnapshot.ureaMeFob.change}
            baseline={kpiSnapshot.ureaMeFob.baseline}
            baselineLabel={kpiSnapshot.ureaMeFob.baselineLabel}
            testId="kpi-urea"
          />
          <KPICard
            label="DAP ME FOB"
            value={kpiSnapshot.dapMeFob.value}
            unit="$/MT"
            change={kpiSnapshot.dapMeFob.change}
            baseline={kpiSnapshot.dapMeFob.baseline}
            baselineLabel={kpiSnapshot.dapMeFob.baselineLabel}
            testId="kpi-dap"
          />
          <KPICard
            label="Potash NE Asia"
            value={kpiSnapshot.potashNeAsia.value}
            unit="$/MT"
            change={kpiSnapshot.potashNeAsia.change}
            baseline={kpiSnapshot.potashNeAsia.baseline}
            baselineLabel={kpiSnapshot.potashNeAsia.baselineLabel}
            testId="kpi-potash"
          />
          <KPICard
            label="Ammonia ME FOB"
            value={kpiSnapshot.ammoniaMeFob.value}
            unit="$/MT"
            change={kpiSnapshot.ammoniaMeFob.change}
            baseline={kpiSnapshot.ammoniaMeFob.baseline}
            baselineLabel={kpiSnapshot.ammoniaMeFob.baselineLabel}
            testId="kpi-ammonia"
          />
        </div>
      </section>

      {/* Charts grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Urea — APAC Benchmarks"
          subtitle="ME FOB, China FOB, SE Asia CFR, India CFR"
          source="Argus Media, S&P Global, World Bank Pink Sheet"
          sourceUrl="https://www.argusmedia.com/en/fertilizer"
        >
          <PriceChart
            data={ureaPrices}
            series={[
              { key: "meFob", label: "ME FOB", color: "hsl(var(--chart-1))" },
              { key: "chinaFob", label: "China FOB", color: "hsl(var(--chart-2))" },
              { key: "seAsiaCfr", label: "SE Asia CFR", color: "hsl(var(--chart-3))" },
              { key: "indiaCfr", label: "India CFR", color: "hsl(var(--chart-4))" },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="DAP / MAP — Phosphate Benchmarks"
          subtitle="China export halt since Mar 13, 2026"
          source="Argus Media, ProFarmer, Rio Times"
          sourceUrl="https://farmdocdaily.illinois.edu/2026/04/strait-of-hormuz-disruption-scenarios-and-fertilizer-purchasing-risks-for-u-s-crop-producers.html"
        >
          <PriceChart
            data={phosphatePrices}
            series={[
              { key: "dapMeFob", label: "DAP ME FOB", color: "hsl(var(--chart-1))" },
              { key: "mapBrazilCfr", label: "MAP Brazil CFR", color: "hsl(var(--chart-2))" },
              { key: "chinaDapFob", label: "China DAP FOB", color: "hsl(var(--chart-3))" },
              { key: "indiaDapCfr", label: "India DAP CFR", color: "hsl(var(--chart-4))" },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Potash (KCl) — The Divergent Nutrient"
          subtitle="Below 5-year averages despite global crisis"
          source="IMARC Group, Intratec Solutions"
          sourceUrl="https://www.imarcgroup.com/potassium-chloride-pricing-report"
        >
          <PriceChart
            data={potashPrices}
            series={[
              { key: "neAsia", label: "NE Asia", color: "hsl(var(--chart-1))" },
              { key: "seAsia", label: "SE Asia", color: "hsl(var(--chart-2))" },
              { key: "brazil", label: "Brazil CFR", color: "hsl(var(--chart-3))" },
              { key: "india", label: "India contract", color: "hsl(var(--chart-4))" },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Ammonia — Stranded Cargoes"
          subtitle="3 ME vessels stuck west of Hormuz since March"
          source="S&P Global, Argus Media"
          sourceUrl="https://www.spglobal.com/energy/en/news-research/latest-news/agriculture/041726-muted-reaction-in-fertilizer-markets-to-strait-of-hormuz-reopening"
        >
          <PriceChart
            data={ammoniaPrices}
            series={[
              { key: "meFob", label: "ME FOB", color: "hsl(var(--chart-1))" },
              { key: "tampaCfr", label: "Tampa CFR", color: "hsl(var(--chart-2))" },
              { key: "seAsia", label: "SE Asia CFR", color: "hsl(var(--chart-3))" },
            ]}
          />
        </ChartCard>
      </section>

      {/* Crisis Timeline */}
      <CrisisTimeline />
    </>
  );
}

// ============== EXCHANGE RATIOS TAB ==============
function RatiosTab() {
  return (
    <>
      <section className="bg-card border border-card-border rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-[hsl(var(--crisis-bg))] border border-[hsl(var(--crisis-border))]">
            <FileText size={18} className="text-[hsl(var(--primary))]" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold mb-1">Crop-to-Fertilizer Exchange Ratios</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bushels of crop required to buy one ton of fertilizer. Higher ratio = worse farmer purchasing power
              = imminent demand destruction. Watch the demand-destruction threshold (red dashed line) — sustained
              breaches force acreage shifts and N-rate cuts.{" "}
              <a
                href="https://farmdocdaily.illinois.edu/wp-content/uploads/2026/04/fdd041026.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Source: Farmdoc Daily / U. Illinois <ExternalLink size={11} />
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Corn-to-Urea (US, CBOT vs ME FOB)"
          subtitle="Currently 126 bu/t — past demand destruction line"
          source="USDA, CBOT, Argus"
          sourceUrl="https://farmdocdaily.illinois.edu/2026/04/strait-of-hormuz-disruption-scenarios-and-fertilizer-purchasing-risks-for-u-s-crop-producers.html"
          accent
        >
          <RatioChart
            data={exchangeRatios}
            ratioKey="cornUreaUS"
            ratioLabel="Corn/Urea (US)"
            fiveYrAvg={ratioBands.cornUreaUS.fiveYrAvg}
            fiveYrLow={ratioBands.cornUreaUS.fiveYrLow}
            fiveYrHigh={ratioBands.cornUreaUS.fiveYrHigh}
            threshold={ratioBands.cornUreaUS.demandDestructionThreshold}
            thresholdLabel="Demand destruction"
            color="hsl(var(--chart-1))"
          />
        </ChartCard>

        <ChartCard
          title="Corn-to-Urea (APAC proxy)"
          subtitle="Tracks China DCE corn vs SE Asia urea CFR"
          source="DCE, ICIS, Argus"
          sourceUrl="https://www.argusmedia.com/en/fertilizer"
        >
          <RatioChart
            data={exchangeRatios}
            ratioKey="cornUreaAPAC"
            ratioLabel="Corn/Urea (APAC)"
            fiveYrAvg={ratioBands.cornUreaAPAC.fiveYrAvg}
            fiveYrLow={ratioBands.cornUreaAPAC.fiveYrLow}
            fiveYrHigh={ratioBands.cornUreaAPAC.fiveYrHigh}
            threshold={ratioBands.cornUreaAPAC.demandDestructionThreshold}
            thresholdLabel="Demand destruction"
            color="hsl(var(--chart-2))"
          />
        </ChartCard>

        <ChartCard
          title="Soy-to-MAP (Brazil)"
          subtitle="Top of 5-yr range; bellwether for phosphate strike"
          source="CBOT, Brazilian Ministry of Ag"
          sourceUrl="https://www.riotimesonline.com/brazil-faces-fertilizer-crisis-as-war-and-china-choke-it/"
          accent
        >
          <RatioChart
            data={exchangeRatios}
            ratioKey="soyMapBrazil"
            ratioLabel="Soy/MAP (Brazil)"
            fiveYrAvg={ratioBands.soyMapBrazil.fiveYrAvg}
            fiveYrLow={ratioBands.soyMapBrazil.fiveYrLow}
            fiveYrHigh={ratioBands.soyMapBrazil.fiveYrHigh}
            threshold={ratioBands.soyMapBrazil.demandDestructionThreshold}
            thresholdLabel="Demand destruction"
            color="hsl(var(--chart-3))"
          />
        </ChartCard>

        <ChartCard
          title="Corn-to-Potash (US) — The Divergence"
          subtitle="Well below threshold; KCl is where farmers reallocate capital"
          source="USDA, World Bank"
          sourceUrl="https://farmdocdaily.illinois.edu/wp-content/uploads/2026/04/fdd041026.pdf"
        >
          <RatioChart
            data={exchangeRatios}
            ratioKey="cornPotashUS"
            ratioLabel="Corn/Potash (US)"
            fiveYrAvg={ratioBands.cornPotashUS.fiveYrAvg}
            fiveYrLow={ratioBands.cornPotashUS.fiveYrLow}
            fiveYrHigh={ratioBands.cornPotashUS.fiveYrHigh}
            threshold={ratioBands.cornPotashUS.demandDestructionThreshold}
            thresholdLabel="Demand destruction"
            color="hsl(var(--chart-4))"
          />
        </ChartCard>
      </section>
    </>
  );
}

// ============== LEADING INDICATORS TAB ==============
function LeadingTab() {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <KPICard
          label="Hormuz Commercial Transits / wk"
          value={kpiSnapshot.hormuzCommercial.value}
          unit="vessels"
          change={kpiSnapshot.hormuzCommercial.change}
          baseline={kpiSnapshot.hormuzCommercial.baseline}
          baselineLabel={kpiSnapshot.hormuzCommercial.baselineLabel}
          invertColor={false}
          testId="kpi-hormuz"
        />
        <KPICard
          label="World Bank Fertilizer Index"
          value={kpiSnapshot.worldBankIndex.value}
          unit="(2024=100)"
          change={kpiSnapshot.worldBankIndex.change}
          baseline={kpiSnapshot.worldBankIndex.baseline}
          baselineLabel={kpiSnapshot.worldBankIndex.baselineLabel}
          testId="kpi-wbindex"
        />
      </section>

      <ChartCard
        title="Strait of Hormuz — Commercial vs Dark Fleet Transits"
        subtitle="Commercial flows collapsed 80%+; dark fleet activity rising"
        source="Lloyd's List Intelligence, Kpler, U.S. Treasury OFAC"
        sourceUrl="https://home.treasury.gov/news/press-releases/sb0472"
      >
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={hormuzTransits} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="commercialGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="darkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-5))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--chart-5))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--popover-border))",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area
              type="monotone"
              dataKey="commercial"
              name="Commercial transits"
              stroke="hsl(var(--chart-2))"
              fill="url(#commercialGrad)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="darkFleet"
              name="Dark fleet (estimated)"
              stroke="hsl(var(--chart-5))"
              fill="url(#darkGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* China Quota Status Table */}
      <section className="bg-card border border-card-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-base font-semibold">China Export Quota Status</h3>
          <p className="text-sm text-muted-foreground mt-1">
            APAC price ceiling depends on Beijing's August 2026 review. Current halts removed ~10 Mt/yr P-fertilizer supply.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 sticky top-0">
              <tr className="text-left">
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Product</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Restricted Since</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Expected Reopening</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">Normal Annual</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">2026 YTD</th>
              </tr>
            </thead>
            <tbody>
              {chinaQuotaStatus.map((row) => (
                <tr key={row.product} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{row.product}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                        row.status === "Halted"
                          ? "bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]"
                          : row.status === "Restricted"
                          ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                          : "bg-[hsl(var(--status-down))]/10 text-[hsl(var(--status-down))]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground tabular">{row.restrictedSince}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.expectedReopening}</td>
                  <td className="px-4 py-3 text-right tabular mono">{row.normalAnnualExport}</td>
                  <td className="px-4 py-3 text-right tabular mono">{row.currentExport2026YTD}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 bg-muted/20 border-t border-border text-xs text-muted-foreground">
          Source:{" "}
          <a
            href="https://www.linkedin.com/posts/jinlong-zhang-ab6ab529_phosphate-map-dap-activity-7438791734534455297-kGM4"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-0.5"
          >
            China Customs notices, Argus Media <ExternalLink size={10} />
          </a>
        </div>
      </section>
    </>
  );
}

// ============== APAC VULNERABILITY TAB ==============
function VulnerabilityTab() {
  const sorted = [...apacVulnerability].sort((a, b) => b.urea + b.dap + b.ammonia - (a.urea + a.dap + a.ammonia));

  return (
    <>
      <section className="bg-card border border-card-border rounded-lg p-5">
        <h2 className="text-base font-semibold mb-1">APAC Country Gulf-Import Dependency</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          % of national fertilizer consumption sourced from Persian Gulf (vulnerable to Hormuz transit). Higher = more
          exposed. Data based on 2023 trade flows.{" "}
          <a
            href="https://farmdocdaily.illinois.edu/2026/03/strait-of-hormuz-closure-and-fertilizer-supply-risks-for-us-agriculture.html"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-0.5"
          >
            Source: Farmdoc Daily, Purdue Center for Commercial Ag <ExternalLink size={11} />
          </a>
        </p>
      </section>

      <ChartCard
        title="APAC Country Vulnerability — % Gulf-Sourced (grouped)"
        subtitle="Australia urea & India ammonia are the most exposed positions"
      >
        <ResponsiveContainer width="100%" height={460}>
          <BarChart data={sorted} layout="vertical" margin={{ top: 8, right: 24, left: 12, bottom: 8 }} barGap={2}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit="%"
              domain={[0, 100]}
            />
            <YAxis
              type="category"
              dataKey="country"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--popover-border))",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              formatter={(v: any, name: string) => [`${v}%`, name]}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="urea" name="Urea" fill="hsl(var(--chart-1))" radius={[0, 2, 2, 0]} isAnimationActive={false} />
            <Bar dataKey="dap" name="DAP/MAP" fill="hsl(var(--chart-2))" radius={[0, 2, 2, 0]} isAnimationActive={false} />
            <Bar dataKey="ammonia" name="Ammonia" fill="hsl(var(--chart-4))" radius={[0, 2, 2, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <section className="bg-card border border-card-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-base font-semibold">Country Detail Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Country</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">Urea %</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">DAP/MAP %</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">Ammonia %</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">Potash %</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Risk</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => {
                const totalRisk = row.urea + row.dap + row.ammonia;
                const riskTier =
                  totalRisk > 120 ? "High" : totalRisk > 70 ? "Medium" : "Low";
                const riskColor =
                  riskTier === "High"
                    ? "bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]"
                    : riskTier === "Medium"
                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                    : "bg-[hsl(var(--status-down))]/10 text-[hsl(var(--status-down))]";
                return (
                  <tr key={row.country} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <span className="mr-2">{row.flag}</span>
                      {row.country}
                    </td>
                    <td className="px-4 py-3 text-right tabular mono">{row.urea}%</td>
                    <td className="px-4 py-3 text-right tabular mono">{row.dap}%</td>
                    <td className="px-4 py-3 text-right tabular mono">{row.ammonia}%</td>
                    <td className="px-4 py-3 text-right tabular mono">{row.potash}%</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${riskColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {riskTier}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

// ============== SHARED COMPONENTS ==============
function ChartCard({
  title,
  subtitle,
  source,
  sourceUrl,
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  source?: string;
  sourceUrl?: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-card border rounded-lg overflow-hidden flex flex-col ${
        accent ? "border-[hsl(var(--crisis-border))]" : "border-card-border"
      }`}
    >
      <div className="px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold leading-tight">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground mt-1 leading-snug">{subtitle}</p>}
          </div>
          {accent && (
            <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] whitespace-nowrap">
              Watch
            </span>
          )}
        </div>
      </div>
      <div className="p-3 flex-1">{children}</div>
      {source && (
        <div className="px-4 py-2 bg-muted/20 border-t border-border text-xs text-muted-foreground">
          Source:{" "}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              {source} <ExternalLink size={10} />
            </a>
          ) : (
            source
          )}
        </div>
      )}
    </div>
  );
}

function CrisisTimeline() {
  return (
    <section className="bg-card border border-card-border rounded-lg p-5">
      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-muted-foreground">
        Crisis Timeline · Iran/US Conflict & Hormuz
      </h3>
      <div className="relative">
        <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
        <div className="space-y-3">
          {crisisEvents.map((event) => {
            const sevColor =
              event.severity === "critical"
                ? "bg-[hsl(var(--destructive))]"
                : event.severity === "high"
                ? "bg-[hsl(var(--primary))]"
                : event.severity === "medium"
                ? "bg-[hsl(var(--chart-4))]"
                : "bg-[hsl(var(--status-down))]";
            return (
              <div key={event.date} className="flex items-start gap-4 pl-1">
                <div className={`w-3 h-3 rounded-full ${sevColor} ring-4 ring-background z-10 shrink-0 mt-1`} />
                <div className="flex-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="text-xs font-semibold text-muted-foreground tabular mono">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="text-sm font-medium">{event.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BottomLineCard() {
  return (
    <section className="bg-gradient-to-br from-[hsl(var(--crisis-bg))] to-card border-2 border-[hsl(var(--crisis-border))] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={18} className="text-[hsl(var(--primary))]" />
        <h2 className="text-base font-semibold uppercase tracking-wide">Bottom Line · Investment View</h2>
      </div>

      <p className="text-base font-medium mb-5 leading-snug max-w-4xl">{bottomLine.thesis}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Key Observations
          </h3>
          <ul className="space-y-1.5">
            {bottomLine.bullets.map((b, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-primary font-bold mt-0.5">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Risk Scenarios</h3>
          <ul className="space-y-1.5">
            {bottomLine.risks.map((b, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-[hsl(var(--destructive))] font-bold mt-0.5">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Watchlist</h3>
          <ul className="space-y-1.5">
            {bottomLine.watchlist.map((b, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-[hsl(var(--chart-2))] font-bold mt-0.5">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pt-5 pb-2 text-xs text-muted-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-foreground">HORMUZ</span> · APAC Fertilizer Monitor · Built May 1, 2026
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>Data: World Bank · Argus · S&P Global · Farmdoc Daily · IMARC · USDA</span>
        </div>
      </div>
      <p className="mt-2 max-w-3xl leading-relaxed">
        Prices are FOB / CFR benchmark estimates compiled from public sources. Some weekly series interpolated from
        monthly data. For trading or position-sizing decisions, validate with primary subscription sources (ICIS, Argus,
        Fertecon).
      </p>
    </footer>
  );
}
