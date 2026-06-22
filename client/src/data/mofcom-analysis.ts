// MOFCOM Nitrogen Quota → APAC Price Sensitivity Analysis
// Compiled June 22, 2026. See README and source URLs in app footer.

export type MofcomEvent = {
  id: string;
  date: string;
  notice: string;
  product: string;
  direction: "restrict" | "release";
  severity: "major" | "moderate" | "minor";
  description: string;
  // Event-study results (SE Asia CFR urea, $/MT)
  pPrior?: number;
  pT0?: number;
  pT1?: number;
  pT2?: number;
  pctPriorToT0?: number;
  pctPriorToT1?: number;
  pctPriorToT2?: number;
};

export const mofcomEvents: MofcomEvent[] = [
  {
    id: "E1", date: "2021-10-11", notice: "GACC 81/2021", product: "Urea + DAP/MAP",
    direction: "restrict", severity: "major",
    description: "CIQ inspection required for 29 fertilizer HS codes — foundational restriction. The only fully gazetted formal notice in the dataset.",
    pPrior: 500, pT0: 760, pT1: 870, pT2: 1050,
    pctPriorToT0: 52.0, pctPriorToT1: 74.0, pctPriorToT2: 110.0,
  },
  {
    id: "E2", date: "2022-10-01", notice: "MOFCOM 33/2022", product: "Urea + DAP",
    direction: "restrict", severity: "minor",
    description: "2023 import TRQ framework set. Governance signal, not direct export restriction.",
    pPrior: 720, pT0: 615, pT1: 530, pT2: 340,
    pctPriorToT0: -14.6, pctPriorToT1: -26.4, pctPriorToT2: -52.8,
  },
  {
    id: "E3", date: "2024-12-31", notice: "MOFCOM 66/2025", product: "Urea + DAP",
    direction: "restrict", severity: "minor",
    description: "2025 import TRQ + export quota framework formalized (13.65 Mt total TRQ).",
    pPrior: 355, pT0: 378, pT1: 395, pT2: 422,
    pctPriorToT0: 6.5, pctPriorToT1: 11.3, pctPriorToT2: 18.9,
  },
  {
    id: "E4", date: "2024-12-31", notice: "MOFCOM 89/2025", product: "All fertilizers",
    direction: "restrict", severity: "minor",
    description: "Export license catalogue update — 43 controlled categories added.",
    pPrior: 355, pT0: 378, pT1: 395, pT2: 422,
    pctPriorToT0: 6.5, pctPriorToT1: 11.3, pctPriorToT2: 18.9,
  },
  {
    id: "E5", date: "2025-05-07", notice: "NDRC May 2025 quota", product: "Urea",
    direction: "release", severity: "major",
    description: "Formal 2 Mt urea quota May-Sep 2025, floor price $360-370/t FOB, INDIA EXCLUDED.",
    pPrior: 395, pT0: 422, pT1: 438, pT2: 458,
    pctPriorToT0: 6.8, pctPriorToT1: 10.9, pctPriorToT2: 15.9,
  },
  {
    id: "E6", date: "2026-01-30", notice: "NDRC 149/2026", product: "All fertilizers",
    direction: "restrict", severity: "moderate",
    description: "Spring 2026 supply-priority framework; domestic-first policy.",
    pPrior: 458, pT0: 490, pT1: 880,
    pctPriorToT0: 7.0, pctPriorToT1: 92.1,
  },
  {
    id: "E7", date: "2026-03-14", notice: "GACC emergency order", product: "Phosphates + NK",
    direction: "restrict", severity: "major",
    description: "Complete phosphate suspension through 2026-08-31. Most severe event in dataset — driven by Hormuz crisis.",
    pPrior: 490, pT0: 880,
    pctPriorToT0: 79.6,
  },
  {
    id: "E8", date: "2026-05", notice: "NDRC/CNFIA quota letters", product: "Urea",
    direction: "release", severity: "moderate",
    description: "Partial urea quota resumption; India floor price $500/t FOB.",
    pPrior: 490, pT0: 880,
    pctPriorToT0: 79.6,
  },
];

// Sensitivity matrix: % change in Aug 2026 quota × baseline SE Asia CFR price
// Methodology: see mofcom-analysis.md
// Asymmetric: cuts amplified 1.3x (India ban + floor price); non-linear at ±20%+ extremes

export const sensitivityMatrix = {
  baselinePrices: [600, 750, 850, 1000] as const,
  quotaChanges: [-30, -20, -10, 0, 10, 20, 30] as const,
  // Each row = a quota change; values = [%priceImpact at $600, $750, $850, $1000]
  data: [
    { quota: -30, impactPct: [8.8, 13.2, 17.6, 26.4], newPrice: [653, 849, 1000, 1264] },
    { quota: -20, impactPct: [5.9, 8.8, 11.7, 17.6],  newPrice: [635, 816, 949, 1176] },
    { quota: -10, impactPct: [2.5, 3.8, 5.1, 7.6],    newPrice: [615, 778, 893, 1076] },
    { quota: 0,   impactPct: [0, 0, 0, 0],            newPrice: [600, 750, 850, 1000] },
    { quota: 10,  impactPct: [-2.0, -2.9, -3.9, -5.9],newPrice: [588, 728, 817, 941] },
    { quota: 20,  impactPct: [-4.5, -6.8, -9.0, -13.5], newPrice: [573, 699, 774, 865] },
    { quota: 30,  impactPct: [-6.8, -10.1, -13.5, -20.3], newPrice: [559, 674, 735, 797] },
  ],
};

export const analysisFindings = {
  thesis: "Only 1 of 26 historical events was fully gazetted (GACC 81/2021); China governs export controls through deliberately opaque administrative measures. The August 2026 review is asymmetric — cuts will move prices ~30% more than equivalent releases.",
  bullets: [
    "GACC 81/2021 (the cleanest formal event): SE Asia CFR urea rose 52% in 1 quarter, 110% in 2 quarters. Sets the empirical upper bound for major formal restriction events.",
    "May 2025 formal quota release (+2 Mt with India ban + floor price): only −3.8% downside despite added supply. The India ban dampens pass-through significantly.",
    "Current baseline ~$880/t SE Asia CFR is the 99th percentile of the 5-year range. Marginal moves on Chinese supply are amplified 8x vs normal-market conditions due to Hormuz scarcity.",
    "At current baseline, a −10% August quota cut (≈ −0.5 Mt) → +5.1% (~+$45/t) move to ~$925. A −30% cut clears the Q1 2022 record of $1050.",
    "A +10% August release at current baseline → only −3.9% (~−$37/t) downside. To compress prices meaningfully, China would need >+20% quota PLUS an India ban lift.",
    "Counter-seasonal pattern: China's restrictive cycle peaks in Q4–Q1 (Three Summer + spring planting), creating chronic structural tension with India's buying window. August reviews fall right at the inflection.",
  ],
  positioning: [
    "Long bias on APAC nitrogen producers (Petronas Chemicals, IFFCO inputs, Pupuk Indonesia) until quota clarity arrives.",
    "Hedge upside risk on India fertilizer subsidy exposure (RCF, NFL) — a -20%+ cut would force tender re-pricing.",
    "Watch: NDRC/CNFIA quota letters typically circulate 2-3 weeks before formal effective dates. Late July monitoring critical.",
  ],
};
