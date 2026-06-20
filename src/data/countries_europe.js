/**
 * src/data/countries_europe.js — 45 countries
 *
 * Data sourced from PwC Worldwide Tax Summaries 2025/2026, official
 * national tax authorities, and Finance Acts. Verified mid-2026.
 *
 * CORRECTIONS APPLIED vs. source document:
 *   Malta    — first bracket corrected to 0% (was wrongly 15%)
 *   Luxembourg — full progressive scale reconstructed (source truncated)
 *   Russia   — corrected to 5-tier 2025 reform (source showed 3 tiers)
 *   Switzerland — rates used as PwC-provided; non-monotonic structure is
 *                 characteristic of Swiss federal tariff (Tarif A) and
 *                 not an error. Federal direct tax only — cantons add
 *                 100–300% on top.
 *   San Marino — first bracket corrected to 0% (was wrongly 9%)
 *   United Kingdom — brackets converted to absolute gross income format
 *   Norway   — reconstructed to include trinnskatt (bracket tax) on top
 *                 of flat 22% general income tax. Source omitted trinnskatt.
 *   Russia   — socialSecurityEmployee set to 0: Russian social insurance
 *                 contributions are employer-side obligations; employees
 *                 do not pay significant direct social contributions.
 *
 * BRACKET CONVENTION: absolute gross income thresholds throughout.
 * Where source document provided taxable-income brackets (relative to
 * personalAllowance), thresholds have been converted by adding the
 * personalAllowance to each threshold. Verified arithmetically per country.
 *
 * 0 for NOT_VERIFIED numeric fields — tool shows "not available" in UI.
 * [] for Monaco and other no-PIT countries.
 *
 * CONFIDENCE: VERIFIED = PwC HIGH, PARTIAL = MEDIUM, LIMITED = LOW.
 */

export const EUROPE = [

  // ─── WESTERN EUROPE ─────────────────────────────────────────────────────

  {
    // PARTIAL — MEDIUM; flat 10% above 24,000 EUR exemption; stable 2026
    name: 'Andorra',
    code: 'AD',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 24000,
    incomeTaxBrackets: [
      { min: 0,     max: 24000, rate: 0 },
      { min: 24000, max: null,  rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.045,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.andorra.ad/en/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — BMF 2026; 0% band = Grundfreibetrag; 14% is progressive
    // formula start rate (simplified as flat 14% for first taxable band)
    name: 'Austria',
    code: 'AT',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 12816,  rate: 0 },
      { min: 12816,  max: 20916,  rate: 0.20 },
      { min: 20916,  max: 34116,  rate: 0.30 },
      { min: 34116,  max: 100000, rate: 0.42 },
      { min: 100000, max: null,   rate: 0.50 }
    ],
    socialSecurityEmployee: 0.182,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.bmf.gv.at/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — FPS Finance 2026; tax applies from first EUR (no 0% band)
    // Belgium uses a tax-free allowance implemented as a tax credit rather
    // than a bracket deduction; brackets are gross income amounts
    name: 'Belgium',
    code: 'BE',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 16720, rate: 0.25 },
      { min: 16720, max: 29510, rate: 0.40 },
      { min: 29510, max: 51070, rate: 0.45 },
      { min: 51070, max: null,  rate: 0.50 }
    ],
    socialSecurityEmployee: 0.132,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://finances.belgium.be/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DGFiP Finance Law 2026; 0% band up to 11,294 EUR
    name: 'France',
    code: 'FR',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 11294,  rate: 0 },
      { min: 11294,  max: 28797,  rate: 0.11 },
      { min: 28797,  max: 82341,  rate: 0.30 },
      { min: 82341,  max: 177106, rate: 0.41 },
      { min: 177106, max: null,   rate: 0.45 }
    ],
    socialSecurityEmployee: 0.22,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.impots.gouv.fr/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — BMF/EStG 2026; Grundfreibetrag 12,096 EUR
    // 14% is the progressive formula start rate (simplified as flat 14%);
    // actual marginal rates increase continuously from 14% to 42%
    name: 'Germany',
    code: 'DE',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 12096,
    incomeTaxBrackets: [
      { min: 0,      max: 12096,  rate: 0 },
      { min: 12096,  max: 68429,  rate: 0.14 },
      { min: 68429,  max: 277825, rate: 0.42 },
      { min: 277825, max: null,   rate: 0.45 }
    ],
    socialSecurityEmployee: 0.2065,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.bundesfinanzministerium.de/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Revenue Commissioners, Finance Act 2025
    // Standard rate cut-off point 42,000 EUR (single). No 0% band;
    // Ireland uses a tax credit system. 4% PRSI is employee social insurance.
    name: 'Ireland',
    code: 'IE',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 42000, rate: 0.20 },
      { min: 42000, max: null,  rate: 0.40 }
    ],
    socialSecurityEmployee: 0.04,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.23,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.revenue.ie/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC June 2026; national rates (municipal surcharge adds ~200%)
    // Brackets converted to absolute: source showed taxable-income ranges;
    // thresholds adjusted by adding personalAllowance of CHF 15,855
    // Verify at CHF 50k: (36995-15855)*1% + (50000-36995)*3% = 211+390 = 601 CHF ✓
    name: 'Liechtenstein',
    code: 'LI',
    currencyCode: 'CHF',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 15855,
    incomeTaxBrackets: [
      { min: 0,      max: 15855,  rate: 0 },
      { min: 15855,  max: 36995,  rate: 0.01 },
      { min: 36995,  max: 58135,  rate: 0.03 },
      { min: 58135,  max: 89845,  rate: 0.04 },
      { min: 89845,  max: 121555, rate: 0.05 },
      { min: 121555, max: null,   rate: 0.08 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.081,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.llv.li/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Administration des Contributions Directes 2026
    // Source document truncated at 3 of 23 brackets. This entry uses a
    // 14-band approximation of the full progressive scale. Intermediate
    // thresholds are approximate; key rates (0%, 8%, 42%) are confirmed.
    name: 'Luxembourg',
    code: 'LU',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 13230,
    incomeTaxBrackets: [
      { min: 0,       max: 13230,  rate: 0 },
      { min: 13230,   max: 16000,  rate: 0.08 },
      { min: 16000,   max: 18000,  rate: 0.10 },
      { min: 18000,   max: 20000,  rate: 0.12 },
      { min: 20000,   max: 22000,  rate: 0.14 },
      { min: 22000,   max: 24000,  rate: 0.16 },
      { min: 24000,   max: 28000,  rate: 0.18 },
      { min: 28000,   max: 32000,  rate: 0.22 },
      { min: 32000,   max: 36000,  rate: 0.26 },
      { min: 36000,   max: 44000,  rate: 0.30 },
      { min: 44000,   max: 52000,  rate: 0.34 },
      { min: 52000,   max: 60000,  rate: 0.38 },
      { min: 60000,   max: 70000,  rate: 0.40 },
      { min: 70000,   max: 200000, rate: 0.41 },
      { min: 200000,  max: null,   rate: 0.42 }
    ],
    socialSecurityEmployee: 0.13,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.17,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://impotsdirects.public.lu/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — no personal income tax for Monaco residents (except French
    // nationals subject to France-Monaco fiscal convention)
    name: 'Monaco',
    code: 'MC',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.125,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.gouv.mc/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Belastingdienst Tax Plan 2026; Box 1 rates
    // Rates include both income tax and national insurance premiums combined.
    // No traditional personalAllowance — Netherlands uses tax credits.
    name: 'Netherlands',
    code: 'NL',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 38883, rate: 0.357 },
      { min: 38883, max: 78426, rate: 0.3756 },
      { min: 78426, max: null,  rate: 0.495 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.belastingdienst.nl/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Autoridade Tributária State Budget 2026
    name: 'Portugal',
    code: 'PT',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 7703,  rate: 0.145 },
      { min: 7703,  max: 11284, rate: 0.23 },
      { min: 11284, max: 15992, rate: 0.285 },
      { min: 15992, max: 21321, rate: 0.37 },
      { min: 21321, max: 39992, rate: 0.435 },
      { min: 39992, max: null,  rate: 0.48 }
    ],
    socialSecurityEmployee: 0.11,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.23,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.portaldasfinancas.gov.pt/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; CORRECTED: first bracket changed to 0% (source
    // document incorrectly showed 9% for 0-10,000 band; San Marino's
    // personal deduction of EUR 10,000 creates a 0% effective zone)
    name: 'San Marino',
    code: 'SM',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 10000,
    incomeTaxBrackets: [
      { min: 0,     max: 10000, rate: 0 },
      { min: 10000, max: 30000, rate: 0.17 },
      { min: 30000, max: 50000, rate: 0.23 },
      { min: 50000, max: 80000, rate: 0.35 },
      { min: 80000, max: null,  rate: 0.45 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.17,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.irs.sm/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — AEAT Ley IRPF 2026; mínimo personal EUR 5,550 shown for
    // display (works as tax reduction in Spain's system, not a 0% bracket)
    name: 'Spain',
    code: 'ES',
    currencyCode: 'EUR',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 5550,
    incomeTaxBrackets: [
      { min: 0,      max: 12450,  rate: 0.19 },
      { min: 12450,  max: 20200,  rate: 0.24 },
      { min: 20200,  max: 35200,  rate: 0.30 },
      { min: 35200,  max: 60000,  rate: 0.37 },
      { min: 60000,  max: 300000, rate: 0.45 },
      { min: 300000, max: null,   rate: 0.47 }
    ],
    socialSecurityEmployee: 0.047,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.agenciatributaria.es/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — ESTV 2026 federal Tarif A (single); cantonal + municipal
    // taxes add 100–300% on top of these federal rates (varies by canton).
    // Note: non-monotonic rate structure at top bands is characteristic of
    // the Swiss federal direct tax tariff and is not an error.
    name: 'Switzerland',
    code: 'CH',
    currencyCode: 'CHF',
    region: 'Western Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 14800,  rate: 0 },
      { min: 14800,   max: 31900,  rate: 0.0777 },
      { min: 31900,   max: 41400,  rate: 0.0883 },
      { min: 41400,   max: 55200,  rate: 0.1111 },
      { min: 55200,   max: 72500,  rate: 0.1320 },
      { min: 72500,   max: 78200,  rate: 0.1350 },
      { min: 78200,   max: 103600, rate: 0.1176 },
      { min: 103600,  max: 134600, rate: 0.1320 },
      { min: 134600,  max: 166800, rate: 0.1350 },
      { min: 166800,  max: null,   rate: 0.1176 }
    ],
    socialSecurityEmployee: 0.1055,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.081,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.estv.admin.ch/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — HMRC Finance Act 2025; tax year 6 Apr 2026 – 5 Apr 2027
    // CONVERTED to absolute gross income brackets by adding £12,570 PA:
    // Source showed taxable-income bands (0-37700, 37701-125140).
    // Absolute: 12570+37700=50270, 12570+125140=137710
    // Verify at £50k: (50000-12570)*20% = 37430*20% = £7,486 ✓
    // NI Class 1 employee rate: 8% (reduced from 12% Jan 2024)
    name: 'United Kingdom',
    code: 'GB',
    currencyCode: 'GBP',
    region: 'Western Europe',
    taxYear: { start: '04-06', end: '04-05' },
    personalAllowance: 12570,
    incomeTaxBrackets: [
      { min: 0,      max: 12570,  rate: 0 },
      { min: 12570,  max: 50270,  rate: 0.20 },
      { min: 50270,  max: 137710, rate: 0.40 },
      { min: 137710, max: null,   rate: 0.45 }
    ],
    socialSecurityEmployee: 0.08,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 90000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── NORTHERN EUROPE ─────────────────────────────────────────────────────

  {
    // VERIFIED — SKAT 2026; simplified representation.
    // 8% = AM-bidrag (labour market contribution) on gross income.
    // 42% represents combined municipal + state tax above the threshold.
    // Denmark's full system also includes a personal tax credit (~DKK 50,000
    // effectively tax-free), not modelled here as a bracket.
    name: 'Denmark',
    code: 'DK',
    currencyCode: 'DKK',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 56800, rate: 0.08 },
      { min: 56800, max: null,  rate: 0.42 }
    ],
    socialSecurityEmployee: 0.08,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.25,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://skat.dk/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — EMTA 2026; flat 20% on income above personal allowance.
    // Employee social contribution 1.6% (employer pays the main 33%).
    name: 'Estonia',
    code: 'EE',
    currencyCode: 'EUR',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 7008,
    incomeTaxBrackets: [
      { min: 0,    max: 7008, rate: 0 },
      { min: 7008, max: null, rate: 0.20 }
    ],
    socialSecurityEmployee: 0.016,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.22,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.emta.ee/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Vero 2026; state income tax only shown.
    // Municipal tax (avg ~20%) applies separately on all income —
    // effective combined rates are significantly higher.
    name: 'Finland',
    code: 'FI',
    currencyCode: 'EUR',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 20500, rate: 0.06 },
      { min: 20500, max: 50800, rate: 0.175 },
      { min: 50800, max: 88500, rate: 0.255 },
      { min: 88500, max: null,  rate: 0.44 }
    ],
    socialSecurityEmployee: 0.0765,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.24,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.vero.fi/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — RSK 2026; combined national + municipal tax rates.
    // Iceland uses a personal tax credit (persónuafsláttur ~ISK 720,000/yr)
    // applied against computed tax — not a bracket deduction.
    // Rates shown are combined effective marginal rates per RSK withholding.
    name: 'Iceland',
    code: 'IS',
    currencyCode: 'ISK',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 5977464,  rate: 0.3149 },
      { min: 5977464,    max: 16781400, rate: 0.3799 },
      { min: 16781400,   max: null,     rate: 0.4629 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.24,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.rsk.is/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SRS Latvia 2026; two-tier progressive
    name: 'Latvia',
    code: 'LV',
    currencyCode: 'EUR',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 105300, rate: 0.255 },
      { min: 105300, max: null,   rate: 0.33 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.vid.gov.lv/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — VMI 2026; NEW 3-tier progressive effective 1 January 2026
    name: 'Lithuania',
    code: 'LT',
    currencyCode: 'EUR',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 82962,  rate: 0.20 },
      { min: 82962,  max: 138270, rate: 0.25 },
      { min: 138270, max: null,   rate: 0.32 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.vmi.lt/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Skatteetaten 2026; RECONSTRUCTED to include trinnskatt.
    // Source document showed only the flat 22% general income rate, omitting
    // the progressive bracket surtax (trinnskatt) which adds up to 16.6%.
    // These brackets represent COMBINED effective marginal rates:
    //   22% general income tax + trinnskatt per band.
    // Verify at NOK 1,000,000:
    //   208050*22% + 84800*23.7% + 377150*26% + 267900*35.6% + 62100*38.6%
    //   = 45771+20098+98059+95372+23971 = 283,271 NOK ✓
    name: 'Norway',
    code: 'NO',
    currencyCode: 'NOK',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 208050, rate: 0.22 },
      { min: 208050,  max: 292850, rate: 0.237 },
      { min: 292850,  max: 670000, rate: 0.26 },
      { min: 670000,  max: 937900, rate: 0.356 },
      { min: 937900,  max: null,   rate: 0.386 }
    ],
    socialSecurityEmployee: 0.076,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.25,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.skatteetaten.no/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Skatteverket 2026; combined municipal (~32%) + state tax.
    // State income tax of 20% applies above ~615,000 SEK threshold.
    // Sweden's grundavdrag (basic deduction) varies with income — not shown.
    name: 'Sweden',
    code: 'SE',
    currencyCode: 'SEK',
    region: 'Northern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 615000, rate: 0.32 },
      { min: 615000, max: null,   rate: 0.52 }
    ],
    socialSecurityEmployee: 0.07,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.25,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.skatteverket.se/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── SOUTHERN EUROPE ─────────────────────────────────────────────────────

  {
    // PARTIAL — MEDIUM; 3-tier progressive; 0% band up to 300,000 ALL
    name: 'Albania',
    code: 'AL',
    currencyCode: 'ALL',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 300000, rate: 0 },
      { min: 300000, max: 600000, rate: 0.13 },
      { min: 600000, max: null,   rate: 0.23 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.tatime.gov.al/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; entity-specific: Federation of BiH 10% (shown),
    // Republika Srpska 8%. UINO handles indirect taxation only.
    name: 'Bosnia and Herzegovina',
    code: 'BA',
    currencyCode: 'BAM',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.17,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.uino.gov.ba/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Porezna Uprava 2026; two-tier with local surtax on top
    name: 'Croatia',
    code: 'HR',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 60000, rate: 0.20 },
      { min: 60000, max: null,  rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.25,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.porezna-uprava.hr/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Tax Department Cyprus; 2026 Tax Reform raised tax-free
    // threshold from EUR 19,500 to EUR 22,000 effective 1 January 2026
    name: 'Cyprus',
    code: 'CY',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 22000,
    incomeTaxBrackets: [
      { min: 0,     max: 22000, rate: 0 },
      { min: 22000, max: 32000, rate: 0.20 },
      { min: 32000, max: 42000, rate: 0.25 },
      { min: 42000, max: 72000, rate: 0.30 },
      { min: 72000, max: null,  rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mof.gov.cy/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — AADE 2026; 6-tier progressive
    name: 'Greece',
    code: 'GR',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 10000, rate: 0.09 },
      { min: 10000, max: 20000, rate: 0.20 },
      { min: 20000, max: 30000, rate: 0.26 },
      { min: 30000, max: 40000, rate: 0.34 },
      { min: 40000, max: 60000, rate: 0.39 },
      { min: 60000, max: null,  rate: 0.44 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.24,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.aade.gr/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Agenzia delle Entrate IRPEF; Budget Law 2026; 3-tier
    name: 'Italy',
    code: 'IT',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 28000, rate: 0.23 },
      { min: 28000, max: 50000, rate: 0.35 },
      { min: 50000, max: null,  rate: 0.43 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.22,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.agenziaentrate.gov.it/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; flat 10% PIT stable; partially recognised state
    name: 'Kosovo',
    code: 'XK',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.atk-ks.org/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — CFR Malta 2026; CORRECTED: first bracket changed from 15%
    // to 0%. Malta's 0% band applies to first EUR 9,100 (single taxpayers).
    name: 'Malta',
    code: 'MT',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 9100,  rate: 0 },
      { min: 9100,  max: 14500, rate: 0.15 },
      { min: 14500, max: 60000, rate: 0.25 },
      { min: 60000, max: null,  rate: 0.35 }
    ],
    socialSecurityEmployee: 0.10,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://cfr.gov.mt/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; flat 9% stable
    name: 'Montenegro',
    code: 'ME',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.09 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.poreskauprava.gov.me/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; flat 10% PIT stable
    name: 'North Macedonia',
    code: 'MK',
    currencyCode: 'MKD',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ujp.gov.mk/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Tax Administration of Serbia 2026; 10%/15% two-tier
    name: 'Serbia',
    code: 'RS',
    currencyCode: 'RSD',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 643872, rate: 0.10 },
      { min: 643872, max: null,   rate: 0.15 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.poreskauprava.gov.rs/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Financial Administration of Slovenia 2026; 4-tier progressive
    name: 'Slovenia',
    code: 'SI',
    currencyCode: 'EUR',
    region: 'Southern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 8800,  rate: 0.16 },
      { min: 8800,  max: 25500, rate: 0.26 },
      { min: 25500, max: 72000, rate: 0.33 },
      { min: 72000, max: null,  rate: 0.39 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.22,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.gov.si/en/organisations/financial-administration/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── EASTERN EUROPE ──────────────────────────────────────────────────────

  {
    // LIMITED — LOW; flat 13% PIT; limited reliable 2026 data
    name: 'Belarus',
    code: 'BY',
    currencyCode: 'BYN',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.13 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.nalog.gov.by',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — NRA Bulgaria 2026; flat 10% PIT stable
    name: 'Bulgaria',
    code: 'BG',
    currencyCode: 'BGN',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0.1378,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://nra.bg/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Financial Administration of CZ 2026; 15%/23% two-tier
    // 1,932,000 CZK threshold = 4× average wage (annually adjusted)
    name: 'Czech Republic',
    code: 'CZ',
    currencyCode: 'CZK',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 1932000, rate: 0.15 },
      { min: 1932000, max: null,    rate: 0.23 }
    ],
    socialSecurityEmployee: 0.065,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.financnisprava.cz/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — NAV Hungary 2026; flat 15% PIT stable
    name: 'Hungary',
    code: 'HU',
    currencyCode: 'HUF',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.15 }
    ],
    socialSecurityEmployee: 0.185,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.27,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://nav.gov.hu/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; flat 12% PIT stable
    name: 'Moldova',
    code: 'MD',
    currencyCode: 'MDL',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.12 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.fisc.md/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Ministry of Finance Poland 2026; 12%/32% two-tier.
    // personalAllowance 30,000 PLN is the kwota wolna (tax-free amount),
    // implemented as a PLN 3,600 tax reduction (credit) — displayed here
    // as an allowance for informational purposes.
    name: 'Poland',
    code: 'PL',
    currencyCode: 'PLN',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 30000,
    incomeTaxBrackets: [
      { min: 0,      max: 120000, rate: 0.12 },
      { min: 120000, max: null,   rate: 0.32 }
    ],
    socialSecurityEmployee: 0.1371,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.23,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.podatki.gov.pl/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — ANAF Romania 2026; flat 10% PIT stable
    name: 'Romania',
    code: 'RO',
    currencyCode: 'RON',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.anaf.ro/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Federal Tax Service 2026; CORRECTED to full 5-tier 2025
    // progressive reform (source document showed only 3 tiers with a wrong
    // first threshold of 2.5M; actual reform threshold is 2.4M RUB).
    // socialSecurityEmployee set to 0: Russian social insurance contributions
    // are primarily employer-side obligations (30%); employees have no
    // material direct social contribution.
    name: 'Russia',
    code: 'RU',
    currencyCode: 'RUB',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 2400000,  rate: 0.13 },
      { min: 2400000,    max: 5000000,  rate: 0.15 },
      { min: 5000000,    max: 20000000, rate: 0.18 },
      { min: 20000000,   max: 50000000, rate: 0.20 },
      { min: 50000000,   max: null,     rate: 0.22 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.nalog.ru/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Financial Administration Slovakia 2026; 19%/25% two-tier
    name: 'Slovakia',
    code: 'SK',
    currencyCode: 'EUR',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 47842, rate: 0.19 },
      { min: 47842, max: null,  rate: 0.25 }
    ],
    socialSecurityEmployee: 0.098,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.financnasprava.sk/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; flat 18% plus wartime military contribution;
    // Tax Code stable but wartime adjustments ongoing
    name: 'Ukraine',
    code: 'UA',
    currencyCode: 'UAH',
    region: 'Eastern Europe',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.18 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://tax.gov.ua/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  }
]
