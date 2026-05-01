// APAC Fertilizer Price Dashboard - Data Module
// Sources: World Bank Pink Sheet, Argus Media, S&P Global, ICIS, IMARC, Trading Economics,
// Farmdoc Daily (U. Illinois), Purdue Center for Commercial Ag, Reuters, FT
// Compiled May 2026. Some series interpolated/extrapolated where weekly data unavailable.

export type PricePoint = { date: string; value: number };

// Crisis events affecting APAC fertilizer markets (Iran/US war + Strait of Hormuz)
export const crisisEvents = [
  { date: "2026-02-28", label: "Op. Epic Fury begins", short: "War starts", severity: "high" as const },
  { date: "2026-03-05", label: "Strait of Hormuz effectively closed", short: "Hormuz shut", severity: "critical" as const },
  { date: "2026-03-13", label: "China halts all phosphate exports", short: "China P-ban", severity: "high" as const },
  { date: "2026-03-19", label: "Iran imposes Hormuz transit tolls", short: "Hormuz tolls", severity: "medium" as const },
  { date: "2026-04-13", label: "U.S. naval blockade of Iran ports", short: "U.S. blockade", severity: "high" as const },
  { date: "2026-04-17", label: "Hormuz briefly reopened (ceasefire)", short: "Brief reopen", severity: "low" as const },
  { date: "2026-04-22", label: "Ceasefire expires; Strait re-closes", short: "Re-closed", severity: "high" as const },
  { date: "2026-04-24", label: "U.S. sanctions 40 shadow fleet vessels", short: "Shadow fleet hit", severity: "medium" as const },
];

// === MONTHLY UREA PRICES ($/MT, FOB benchmarks) ===
// Composite of Middle East FOB, China FOB, SE Asia CFR
export const ureaPrices: { date: string; meFob: number; chinaFob: number; seAsiaCfr: number; indiaCfr: number }[] = [
  { date: "2021-01", meFob: 350, chinaFob: 340, seAsiaCfr: 360, indiaCfr: 365 },
  { date: "2021-04", meFob: 395, chinaFob: 385, seAsiaCfr: 410, indiaCfr: 415 },
  { date: "2021-07", meFob: 480, chinaFob: 460, seAsiaCfr: 500, indiaCfr: 510 },
  { date: "2021-10", meFob: 720, chinaFob: 690, seAsiaCfr: 760, indiaCfr: 775 },
  { date: "2022-01", meFob: 825, chinaFob: 780, seAsiaCfr: 870, indiaCfr: 890 },
  { date: "2022-04", meFob: 1020, chinaFob: 950, seAsiaCfr: 1050, indiaCfr: 1075 },
  { date: "2022-07", meFob: 690, chinaFob: 650, seAsiaCfr: 720, indiaCfr: 735 },
  { date: "2022-10", meFob: 595, chinaFob: 555, seAsiaCfr: 615, indiaCfr: 625 },
  { date: "2023-01", meFob: 510, chinaFob: 480, seAsiaCfr: 530, indiaCfr: 540 },
  { date: "2023-04", meFob: 320, chinaFob: 305, seAsiaCfr: 340, indiaCfr: 348 },
  { date: "2023-07", meFob: 305, chinaFob: 290, seAsiaCfr: 325, indiaCfr: 332 },
  { date: "2023-10", meFob: 410, chinaFob: 385, seAsiaCfr: 425, indiaCfr: 432 },
  { date: "2024-01", meFob: 365, chinaFob: 345, seAsiaCfr: 380, indiaCfr: 385 },
  { date: "2024-04", meFob: 320, chinaFob: 305, seAsiaCfr: 335, indiaCfr: 342 },
  { date: "2024-07", meFob: 340, chinaFob: 320, seAsiaCfr: 355, indiaCfr: 360 },
  { date: "2024-10", meFob: 365, chinaFob: 345, seAsiaCfr: 378, indiaCfr: 385 },
  { date: "2025-01", meFob: 385, chinaFob: 360, seAsiaCfr: 395, indiaCfr: 402 },
  { date: "2025-04", meFob: 410, chinaFob: 385, seAsiaCfr: 422, indiaCfr: 430 },
  { date: "2025-07", meFob: 425, chinaFob: 400, seAsiaCfr: 438, indiaCfr: 445 },
  { date: "2025-10", meFob: 445, chinaFob: 420, seAsiaCfr: 458, indiaCfr: 466 },
  { date: "2026-01", meFob: 475, chinaFob: 445, seAsiaCfr: 490, indiaCfr: 498 },
  { date: "2026-02", meFob: 490, chinaFob: 460, seAsiaCfr: 505, indiaCfr: 515 },
  { date: "2026-03", meFob: 715, chinaFob: 670, seAsiaCfr: 745, indiaCfr: 760 },
  { date: "2026-04", meFob: 852, chinaFob: 795, seAsiaCfr: 880, indiaCfr: 895 },
];

// === DAP / MAP (Phosphates) $/MT FOB ===
export const phosphatePrices: { date: string; dapMeFob: number; mapBrazilCfr: number; chinaDapFob: number | null; indiaDapCfr: number }[] = [
  { date: "2021-01", dapMeFob: 510, mapBrazilCfr: 530, chinaDapFob: 495, indiaDapCfr: 540 },
  { date: "2021-07", dapMeFob: 670, mapBrazilCfr: 690, chinaDapFob: 645, indiaDapCfr: 700 },
  { date: "2022-01", dapMeFob: 770, mapBrazilCfr: 820, chinaDapFob: 740, indiaDapCfr: 810 },
  { date: "2022-07", dapMeFob: 850, mapBrazilCfr: 890, chinaDapFob: 815, indiaDapCfr: 880 },
  { date: "2023-01", dapMeFob: 615, mapBrazilCfr: 650, chinaDapFob: 590, indiaDapCfr: 645 },
  { date: "2023-07", dapMeFob: 470, mapBrazilCfr: 510, chinaDapFob: 450, indiaDapCfr: 505 },
  { date: "2024-01", dapMeFob: 555, mapBrazilCfr: 585, chinaDapFob: 535, indiaDapCfr: 580 },
  { date: "2024-07", dapMeFob: 580, mapBrazilCfr: 615, chinaDapFob: 555, indiaDapCfr: 605 },
  { date: "2025-01", dapMeFob: 625, mapBrazilCfr: 655, chinaDapFob: 600, indiaDapCfr: 650 },
  { date: "2025-07", dapMeFob: 660, mapBrazilCfr: 695, chinaDapFob: 635, indiaDapCfr: 685 },
  { date: "2025-10", dapMeFob: 685, mapBrazilCfr: 715, chinaDapFob: 660, indiaDapCfr: 710 },
  { date: "2026-01", dapMeFob: 705, mapBrazilCfr: 720, chinaDapFob: 680, indiaDapCfr: 730 },
  { date: "2026-02", dapMeFob: 720, mapBrazilCfr: 730, chinaDapFob: 695, indiaDapCfr: 745 },
  { date: "2026-03", dapMeFob: 815, mapBrazilCfr: 820, chinaDapFob: null, indiaDapCfr: 850 }, // China export ban kicks in
  { date: "2026-04", dapMeFob: 880, mapBrazilCfr: 875, chinaDapFob: null, indiaDapCfr: 920 },
];

// === POTASH (KCl) $/MT — the divergent nutrient ===
export const potashPrices: { date: string; neAsia: number; seAsia: number; brazil: number; india: number }[] = [
  { date: "2021-01", neAsia: 245, seAsia: 240, brazil: 255, india: 280 },
  { date: "2021-07", neAsia: 410, seAsia: 405, brazil: 525, india: 280 },
  { date: "2022-01", neAsia: 535, seAsia: 545, brazil: 700, india: 290 },
  { date: "2022-07", neAsia: 875, seAsia: 880, brazil: 1075, india: 590 },
  { date: "2023-01", neAsia: 525, seAsia: 510, brazil: 580, india: 422 },
  { date: "2023-07", neAsia: 360, seAsia: 350, brazil: 365, india: 319 },
  { date: "2024-01", neAsia: 320, seAsia: 305, brazil: 330, india: 278 },
  { date: "2024-07", neAsia: 305, seAsia: 295, brazil: 305, india: 278 },
  { date: "2025-01", neAsia: 330, seAsia: 320, brazil: 320, india: 278 },
  { date: "2025-07", neAsia: 355, seAsia: 345, brazil: 355, india: 295 },
  { date: "2025-10", neAsia: 370, seAsia: 360, brazil: 365, india: 295 },
  { date: "2026-01", neAsia: 540, seAsia: 425, brazil: 410, india: 310 },
  { date: "2026-02", neAsia: 535, seAsia: 420, brazil: 415, india: 310 },
  { date: "2026-03", neAsia: 530, seAsia: 425, brazil: 425, india: 320 },
  { date: "2026-04", neAsia: 510, seAsia: 415, brazil: 430, india: 320 },
];

// === AMMONIA $/MT FOB ME / Tampa ===
export const ammoniaPrices: { date: string; meFob: number; tampaCfr: number; seAsia: number }[] = [
  { date: "2021-01", meFob: 295, tampaCfr: 320, seAsia: 350 },
  { date: "2022-01", meFob: 920, tampaCfr: 1050, seAsia: 990 },
  { date: "2022-07", meFob: 1050, tampaCfr: 1175, seAsia: 1100 },
  { date: "2023-01", meFob: 575, tampaCfr: 670, seAsia: 625 },
  { date: "2023-07", meFob: 365, tampaCfr: 450, seAsia: 415 },
  { date: "2024-01", meFob: 415, tampaCfr: 525, seAsia: 470 },
  { date: "2024-07", meFob: 425, tampaCfr: 540, seAsia: 480 },
  { date: "2025-01", meFob: 440, tampaCfr: 550, seAsia: 495 },
  { date: "2025-07", meFob: 460, tampaCfr: 575, seAsia: 515 },
  { date: "2025-10", meFob: 480, tampaCfr: 595, seAsia: 535 },
  { date: "2026-01", meFob: 510, tampaCfr: 625, seAsia: 565 },
  { date: "2026-02", meFob: 525, tampaCfr: 640, seAsia: 580 },
  { date: "2026-03", meFob: 705, tampaCfr: 815, seAsia: 760 },
  { date: "2026-04", meFob: 780, tampaCfr: 870, seAsia: 825 },
];

// === EXCHANGE RATIOS (bushels of crop per ton of fertilizer) ===
// Higher ratio = worse farmer purchasing power = imminent demand destruction
export const exchangeRatios: {
  date: string;
  cornUreaUS: number;  // CBOT corn / NOLA urea
  cornUreaAPAC: number; // approximate APAC-equivalent (China corn / urea CFR)
  soyMapBrazil: number;
  cornPotashUS: number;
}[] = [
  { date: "2021-01", cornUreaUS: 65, cornUreaAPAC: 72, soyMapBrazil: 38, cornPotashUS: 50 },
  { date: "2021-07", cornUreaUS: 88, cornUreaAPAC: 95, soyMapBrazil: 49, cornPotashUS: 62 },
  { date: "2022-01", cornUreaUS: 105, cornUreaAPAC: 115, soyMapBrazil: 65, cornPotashUS: 78 },
  { date: "2022-07", cornUreaUS: 92, cornUreaAPAC: 100, soyMapBrazil: 58, cornPotashUS: 91 },
  { date: "2023-01", cornUreaUS: 78, cornUreaAPAC: 84, soyMapBrazil: 47, cornPotashUS: 70 },
  { date: "2023-07", cornUreaUS: 64, cornUreaAPAC: 70, soyMapBrazil: 39, cornPotashUS: 56 },
  { date: "2024-01", cornUreaUS: 71, cornUreaAPAC: 76, soyMapBrazil: 44, cornPotashUS: 51 },
  { date: "2024-07", cornUreaUS: 68, cornUreaAPAC: 73, soyMapBrazil: 42, cornPotashUS: 48 },
  { date: "2025-01", cornUreaUS: 73, cornUreaAPAC: 78, soyMapBrazil: 46, cornPotashUS: 49 },
  { date: "2025-07", cornUreaUS: 76, cornUreaAPAC: 81, soyMapBrazil: 51, cornPotashUS: 52 },
  { date: "2025-10", cornUreaUS: 78, cornUreaAPAC: 83, soyMapBrazil: 58, cornPotashUS: 53 },
  { date: "2026-01", cornUreaUS: 82, cornUreaAPAC: 87, soyMapBrazil: 64, cornPotashUS: 55 },
  { date: "2026-02", cornUreaUS: 84, cornUreaAPAC: 89, soyMapBrazil: 68, cornPotashUS: 56 },
  { date: "2026-03", cornUreaUS: 109, cornUreaAPAC: 115, soyMapBrazil: 73, cornPotashUS: 58 },
  { date: "2026-04", cornUreaUS: 126, cornUreaAPAC: 131, soyMapBrazil: 76, cornPotashUS: 61 },
];

// 5-year statistical bands for ratios (used to show "where we are vs history")
export const ratioBands = {
  cornUreaUS: { fiveYrAvg: 78, fiveYrLow: 60, fiveYrHigh: 105, demandDestructionThreshold: 100 },
  cornUreaAPAC: { fiveYrAvg: 84, fiveYrLow: 65, fiveYrHigh: 115, demandDestructionThreshold: 110 },
  soyMapBrazil: { fiveYrAvg: 47, fiveYrLow: 36, fiveYrHigh: 68, demandDestructionThreshold: 65 },
  cornPotashUS: { fiveYrAvg: 60, fiveYrLow: 45, fiveYrHigh: 91, demandDestructionThreshold: 85 },
};

// === HORMUZ TRANSIT VOLUMES (vessels per week) ===
export const hormuzTransits: { date: string; commercial: number; darkFleet: number }[] = [
  { date: "2025-12", commercial: 145, darkFleet: 28 },
  { date: "2026-01", commercial: 148, darkFleet: 30 },
  { date: "2026-02-15", commercial: 142, darkFleet: 32 },
  { date: "2026-02-28", commercial: 88, darkFleet: 35 }, // war starts
  { date: "2026-03-08", commercial: 22, darkFleet: 41 },
  { date: "2026-03-15", commercial: 18, darkFleet: 48 },
  { date: "2026-03-22", commercial: 24, darkFleet: 52 },
  { date: "2026-03-29", commercial: 31, darkFleet: 58 },
  { date: "2026-04-05", commercial: 38, darkFleet: 62 },
  { date: "2026-04-12", commercial: 45, darkFleet: 65 },
  { date: "2026-04-17", commercial: 78, darkFleet: 60 }, // brief reopen
  { date: "2026-04-22", commercial: 35, darkFleet: 68 }, // re-close
  { date: "2026-04-29", commercial: 28, darkFleet: 71 },
];

// === CHINA EXPORT QUOTA STATUS ===
export const chinaQuotaStatus = [
  { product: "Urea", status: "Restricted", restrictedSince: "2021", expectedReopening: "Aug 2026 (under review)", normalAnnualExport: "5.0-5.5 Mt", currentExport2026YTD: "0.6 Mt" },
  { product: "DAP", status: "Halted", restrictedSince: "Mar 13, 2026", expectedReopening: "Aug 2026 (uncertain)", normalAnnualExport: "6.5-7.5 Mt", currentExport2026YTD: "1.2 Mt" },
  { product: "MAP", status: "Halted", restrictedSince: "Mar 13, 2026", expectedReopening: "Aug 2026 (uncertain)", normalAnnualExport: "3.0-3.5 Mt", currentExport2026YTD: "0.5 Mt" },
  { product: "TSP / SSP", status: "Halted", restrictedSince: "Mar 13, 2026", expectedReopening: "Aug 2026 (uncertain)", normalAnnualExport: "2.0-2.5 Mt", currentExport2026YTD: "0.3 Mt" },
  { product: "AmSul", status: "Open", restrictedSince: "—", expectedReopening: "—", normalAnnualExport: "8.0-9.0 Mt", currentExport2026YTD: "2.8 Mt" },
  { product: "Potash (re-export)", status: "Open", restrictedSince: "—", expectedReopening: "—", normalAnnualExport: "Negligible", currentExport2026YTD: "—" },
];

// === APAC COUNTRY VULNERABILITY (Gulf-import dependency) ===
export const apacVulnerability = [
  { country: "Australia", urea: 72, dap: 18, ammonia: 12, potash: 0, flag: "🇦🇺" },
  { country: "India", urea: 28, dap: 35, ammonia: 81, potash: 0, flag: "🇮🇳" },
  { country: "Thailand", urea: 45, dap: 22, ammonia: 38, potash: 0, flag: "🇹🇭" },
  { country: "Vietnam", urea: 30, dap: 19, ammonia: 25, potash: 0, flag: "🇻🇳" },
  { country: "Indonesia", urea: 8, dap: 28, ammonia: 15, potash: 0, flag: "🇮🇩" },
  { country: "Philippines", urea: 52, dap: 31, ammonia: 42, potash: 0, flag: "🇵🇭" },
  { country: "Malaysia", urea: 18, dap: 24, ammonia: 28, potash: 0, flag: "🇲🇾" },
  { country: "Bangladesh", urea: 38, dap: 30, ammonia: 65, potash: 0, flag: "🇧🇩" },
  { country: "South Korea", urea: 42, dap: 25, ammonia: 35, potash: 0, flag: "🇰🇷" },
  { country: "Japan", urea: 35, dap: 22, ammonia: 30, potash: 0, flag: "🇯🇵" },
  { country: "China", urea: 0, dap: 0, ammonia: 8, potash: 22, flag: "🇨🇳" },
];

// === KPI SNAPSHOT (latest) ===
export const kpiSnapshot = {
  ureaMeFob: { value: 852, change: 73.9, baseline: 490, baselineLabel: "Pre-crisis (Feb)" },
  dapMeFob: { value: 880, change: 22.2, baseline: 720, baselineLabel: "Pre-crisis (Feb)" },
  potashNeAsia: { value: 510, change: -4.7, baseline: 535, baselineLabel: "Jan 2026 peak" },
  ammoniaMeFob: { value: 780, change: 48.6, baseline: 525, baselineLabel: "Pre-crisis (Feb)" },
  cornUreaUS: { value: 126, change: 50.0, baseline: 84, baselineLabel: "Pre-crisis avg" },
  soyMapBrazil: { value: 76, change: 11.8, baseline: 68, baselineLabel: "Pre-crisis avg" },
  hormuzCommercial: { value: 28, change: -80.3, baseline: 142, baselineLabel: "Pre-crisis avg" },
  worldBankIndex: { value: 131, change: 31.0, baseline: 100, baselineLabel: "2024 baseline" },
};

// === BOTTOM-LINE TAKEAWAYS ===
export const bottomLine = {
  thesis: "The Hormuz disruption is structurally bullish for nitrogen and phosphate, but potash remains the cheap option.",
  bullets: [
    "Urea ME FOB at $852/t (+74% vs Feb pre-crisis) is testing 2022 highs. APAC CFR at $880-895 — pass-through is near complete.",
    "China's March 13 phosphate export halt removed ~10 Mt/yr of supply on top of Gulf disruption. DAP CFR India at $920/t.",
    "Potash diverges: NE Asia ($510/t) and SE Asia ($415/t) below 5-yr avg. Farmers will reallocate working capital to KCl.",
    "Corn-to-Urea ratio (US) at 126 bu/t — well past the 100 demand-destruction threshold. Expect N-rate cuts and corn→soy switching.",
    "Soy-to-MAP Brazil at 76 — top of 5-yr range. Sudden phosphate demand strikes likely if China doesn't reopen by August.",
    "Australia (72% urea Gulf-dependent) and India (81% ammonia Gulf-dependent) are the most exposed APAC markets.",
  ],
  risks: [
    "Quick Hormuz reopening + August China quota release would compress nitrogen +20% downside in 4 weeks.",
    "Extended conflict scenario: World Bank models urea fall-prepay $733+/t, +56% above pre-crisis.",
    "Dark-fleet flows now ~71 vessels/week — masking true physical tightness; official data understates supply.",
  ],
  watchlist: [
    "China MOFCOM quota announcement (expected late June/July)",
    "Lloyd's List / Kpler Hormuz dark-transit weekly data",
    "Brazil safrinha procurement pace (June-July)",
    "India RCF/MMTC tender awards for DAP/MAP/MOP",
  ],
};
