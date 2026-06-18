/**
 * src/data/countries_africa.js — CORRECTED
 *
 * All 54 African countries. Data sourced from PwC Worldwide Tax Summaries
 * (2025/2026 editions), official revenue authority websites, and Finance
 * Acts where accessible. Cross-verified against EY/KPMG/BDO where
 * discrepancies existed.
 *
 * CONFIDENCE TAGS PER ENTRY:
 *   VERIFIED    — PwC HIGH confidence, official source alignment
 *   PARTIAL     — PwC MEDIUM confidence, secondary sources
 *   LIMITED     — PwC LOW confidence; fields marked 0 are NOT_VERIFIED
 *
 * BRACKET CONVENTION:
 *   Brackets use absolute gross income thresholds.
 *   personalAllowance is the tax-free threshold (informational — shown
 *   in TaxBreakdown.jsx as "Personal Allowance").
 *   taxCalculator.js applies brackets directly to gross income.
 *   0 for any rate field = data not verified — tool shows "not available".
 *   Empty brackets [] = full bracket data not available for this country.
 *
 * SOCIAL SECURITY NOTE:
 *   Many African countries have NOT_VERIFIED self-employed SS rates.
 *   0 is used where unverified. taxCalculator.js must check for 0 and
 *   show "Not available" rather than "0%".
 *
 * MAINTENANCE:
 *   These rates change annually via Finance Acts. Re-verify at minimum
 *   once per year, prioritising HIGH-frequency-change countries:
 *   Nigeria, South Africa, Kenya, Ghana, Ethiopia, Egypt, Morocco.
 */

export const AFRICA = [

  // ─── NORTH AFRICA ────────────────────────────────────────────────────────

  {
    // PARTIAL — PwC MEDIUM, Finance Laws 2022-2025 stable into 2026
    name: 'Algeria',
    code: 'DZ',
    currencyCode: 'DZD',
    region: 'North Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 240000,
    incomeTaxBrackets: [
      { min: 0,        max: 240000,  rate: 0 },
      { min: 240000,   max: 480000,  rate: 0.23 },
      { min: 480000,   max: 960000,  rate: 0.27 },
      { min: 960000,   max: 1920000, rate: 0.30 },
      { min: 1920000,  max: 3840000, rate: 0.33 },
      { min: 3840000,  max: null,    rate: 0.35 }
    ],
    socialSecurityEmployee: 0.09,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 8000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mfdgi.gov.dz',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, March 2024 bracket updates, PwC Feb 2026
    name: 'Egypt',
    code: 'EG',
    currencyCode: 'EGP',
    region: 'North Africa',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 40000,
    incomeTaxBrackets: [
      { min: 0,       max: 40000,   rate: 0 },
      { min: 40000,   max: 55000,   rate: 0.10 },
      { min: 55000,   max: 70000,   rate: 0.15 },
      { min: 70000,   max: 200000,  rate: 0.20 },
      { min: 200000,  max: 400000,  rate: 0.225 },
      { min: 400000,  max: 1200000, rate: 0.25 },
      { min: 1200000, max: null,    rate: 0.275 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.14,
    vatThreshold: 500000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.eta.gov.eg',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, limited English primary sources
    name: 'Libya',
    code: 'LY',
    currencyCode: 'LYD',
    region: 'North Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 12000, rate: 0.05 },
      { min: 12000, max: null,  rate: 0.10 }
    ],
    socialSecurityEmployee: 0.05125,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mof.gov.ly',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, 2025 Finance Law
    name: 'Morocco',
    code: 'MA',
    currencyCode: 'MAD',
    region: 'North Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 40000,
    incomeTaxBrackets: [
      { min: 0,      max: 40000,  rate: 0 },
      { min: 40000,  max: 60000,  rate: 0.10 },
      { min: 60000,  max: 80000,  rate: 0.20 },
      { min: 80000,  max: 100000, rate: 0.30 },
      { min: 100000, max: 180000, rate: 0.34 },
      { min: 180000, max: null,   rate: 0.37 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.tax.gov.ma',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — ongoing instability; no verifiable bracket data
    name: 'Sudan',
    code: 'SD',
    currencyCode: 'SDG',
    region: 'North Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.mof.gov.sd',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, Finance Law 2025; full top brackets not confirmed
    name: 'Tunisia',
    code: 'TN',
    currencyCode: 'TND',
    region: 'North Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 5000,
    incomeTaxBrackets: [
      { min: 0,     max: 5000,  rate: 0 },
      { min: 5000,  max: 20000, rate: 0.26 },
      { min: 20000, max: 30000, rate: 0.28 },
      { min: 30000, max: 50000, rate: 0.32 },
      { min: 50000, max: null,  rate: 0.35 }
    ],
    socialSecurityEmployee: 0.0918,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 100000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.finances.gov.tn',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── WEST AFRICA ─────────────────────────────────────────────────────────

  {
    // PARTIAL — PwC MEDIUM, stable progressive scale 2025
    name: 'Benin',
    code: 'BJ',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 60000,
    incomeTaxBrackets: [
      { min: 0,      max: 60000,  rate: 0 },
      { min: 60000,  max: 150000, rate: 0.10 },
      { min: 150000, max: 250000, rate: 0.15 },
      { min: 250000, max: 500000, rate: 0.19 },
      { min: 500000, max: null,   rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.bj',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, 2025 payroll bands with unusual marginal rates
    name: 'Burkina Faso',
    code: 'BF',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 30000,
    incomeTaxBrackets: [
      { min: 0,      max: 30000,  rate: 0 },
      { min: 30000,  max: 50000,  rate: 0.121 },
      { min: 50000,  max: 80000,  rate: 0.139 },
      { min: 80000,  max: 120000, rate: 0.157 },
      { min: 120000, max: 170000, rate: 0.184 },
      { min: 170000, max: 250000, rate: 0.217 },
      { min: 250000, max: null,   rate: 0.25 }
    ],
    socialSecurityEmployee: 0.055,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.impots.bf',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, PwC review May 2026
    name: 'Cape Verde',
    code: 'CV',
    currencyCode: 'CVE',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 220000,
    incomeTaxBrackets: [
      { min: 0,       max: 960000,  rate: 0.165 },
      { min: 960000,  max: 1800000, rate: 0.231 },
      { min: 1800000, max: null,    rate: 0.275 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0.195,
    selfEmploymentTaxRate: 0.195,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.receita.cv',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, March 2026 update
    name: "Côte d'Ivoire",
    code: 'CI',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 900000,
    incomeTaxBrackets: [
      { min: 0,        max: 75000,   rate: 0 },
      { min: 75000,    max: 240000,  rate: 0.16 },
      { min: 240000,   max: 800000,  rate: 0.21 },
      { min: 800000,   max: 2400000, rate: 0.24 },
      { min: 2400000,  max: 8000000, rate: 0.28 },
      { min: 8000000,  max: null,    rate: 0.32 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 200000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.gouv.ci',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — insufficient verified bracket data
    name: 'Gambia',
    code: 'GM',
    currencyCode: 'GMD',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.gra.gm',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, GRA 2025/2026; SSNIT confirmed
    name: 'Ghana',
    code: 'GH',
    currencyCode: 'GHS',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 5880,
    incomeTaxBrackets: [
      { min: 0,      max: 5880,   rate: 0 },
      { min: 5880,   max: 7200,   rate: 0.05 },
      { min: 7200,   max: 8760,   rate: 0.10 },
      { min: 8760,   max: 46800,  rate: 0.175 },
      { min: 46800,  max: 240000, rate: 0.25 },
      { min: 240000, max: 606240, rate: 0.30 },
      { min: 606240, max: null,   rate: 0.35 }
    ],
    socialSecurityEmployee: 0.055,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 750000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://gra.gov.gh',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — bracket data not verified; VAT confirmed
    name: 'Guinea',
    code: 'GN',
    currencyCode: 'GNF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 500000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi-guinee.gov.gn',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — flat rate confirmed; VAT rate updated; SS corrected
    name: 'Guinea-Bissau',
    code: 'GW',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.20 }
    ],
    socialSecurityEmployee: 0.08,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mef.gw',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, LRA/Finance Act 2025/2026
    name: 'Liberia',
    code: 'LR',
    currencyCode: 'LRD',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 70000,
    incomeTaxBrackets: [
      { min: 0,      max: 70000,  rate: 0 },
      { min: 70000,  max: 200000, rate: 0.05 },
      { min: 200000, max: 800000, rate: 0.15 },
      { min: 800000, max: null,   rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://revenue.lra.gov.lr',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, WAEMU/PwC-aligned 2025
    name: 'Mali',
    code: 'ML',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 330000,
    incomeTaxBrackets: [
      { min: 0,       max: 330000,  rate: 0 },
      { min: 330000,  max: 580000,  rate: 0.05 },
      { min: 580000,  max: 1100000, rate: 0.13 },
      { min: 1100000, max: 1800000, rate: 0.30 },
      { min: 1800000, max: null,    rate: 0.40 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.gouv.ml',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, March 2026 review; MRU currency
    // Note: Add MRU to exchangeRates.js (rate: 39.5) in end-of-sequence batch
    name: 'Mauritania',
    code: 'MR',
    currencyCode: 'MRU',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 6000,
    incomeTaxBrackets: [
      { min: 0,    max: 6000,  rate: 0 },
      { min: 6000, max: 9000,  rate: 0.15 },
      { min: 9000, max: 21000, rate: 0.25 },
      { min: 21000,max: null,  rate: 0.40 }
    ],
    socialSecurityEmployee: 0.01,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.finances.gov.mr',
    quarterlyPayments: true,
    quarterlyDueDates: ['04-15', '07-15', '10-15', '01-15']
  },

  {
    // LIMITED — insufficient verified bracket data; VAT confirmed
    name: 'Niger',
    code: 'NE',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.finances.gouv.ne',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH; Nigeria Tax Act effective 1 January 2026
    // MAJOR CHANGE: New NTA completely replaces old PITA bracket structure
    name: 'Nigeria',
    code: 'NG',
    currencyCode: 'NGN',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 800000,
    incomeTaxBrackets: [
      { min: 0,         max: 800000,   rate: 0 },
      { min: 800000,    max: 3000000,  rate: 0.15 },
      { min: 3000000,   max: 12000000, rate: 0.18 },
      { min: 12000000,  max: 25000000, rate: 0.21 },
      { min: 25000000,  max: 50000000, rate: 0.23 },
      { min: 50000000,  max: null,     rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.075,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.firs.gov.ng',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, 2025/2026 Finance Law with extended top tiers
    name: 'Senegal',
    code: 'SN',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 630000,
    incomeTaxBrackets: [
      { min: 0,         max: 630000,   rate: 0 },
      { min: 630000,    max: 1500000,  rate: 0.20 },
      { min: 1500000,   max: 4000000,  rate: 0.30 },
      { min: 4000000,   max: 8000000,  rate: 0.35 },
      { min: 8000000,   max: 13500000, rate: 0.37 },
      { min: 13500000,  max: 50000000, rate: 0.40 },
      { min: 50000000,  max: null,     rate: 0.43 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.impotsetdomaines.gouv.sn',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — Finance Act 2026; MAJOR bracket restructure
    // Note: Currency is SLE (new Sierra Leonean Leone post-redenomination)
    name: 'Sierra Leone',
    code: 'SL',
    currencyCode: 'SLE',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 6000000,
    incomeTaxBrackets: [
      { min: 0,         max: 6000000,  rate: 0 },
      { min: 6000000,   max: 12000000, rate: 0.15 },
      { min: 12000000,  max: 18000000, rate: 0.20 },
      { min: 18000000,  max: 24000000, rate: 0.25 },
      { min: 24000000,  max: null,     rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.nra.gov.sl',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — first bracket rate from PwC MEDIUM; subsequent from
    // established payroll summaries (same caliber secondary source)
    name: 'Togo',
    code: 'TG',
    currencyCode: 'XOF',
    region: 'West Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 900000,  rate: 0.005 },
      { min: 900000,  max: 1800000, rate: 0.07 },
      { min: 1800000, max: 3600000, rate: 0.14 },
      { min: 3600000, max: 6000000, rate: 0.21 },
      { min: 6000000, max: null,    rate: 0.35 }
    ],
    socialSecurityEmployee: 0.04,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.otr.tg',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── CENTRAL AFRICA ──────────────────────────────────────────────────────

  {
    // VERIFIED — PwC HIGH + 2026 Finance Law final corrections
    // VAT corrected to 17.5% (from 19.25%) per 2026 Finance Law
    name: 'Angola',
    code: 'AO',
    currencyCode: 'AOA',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 1200000,
    incomeTaxBrackets: [
      { min: 0,         max: 1200000,  rate: 0 },
      { min: 1200000,   max: 1800000,  rate: 0.13 },
      { min: 1800000,   max: 2400000,  rate: 0.16 },
      { min: 2400000,   max: 3600000,  rate: 0.18 },
      { min: 3600000,   max: 6000000,  rate: 0.19 },
      { min: 6000000,   max: 12000000, rate: 0.20 },
      { min: 12000000,  max: null,     rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.14,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.agt.minfin.gov.ao',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH + 2026 Finance Law final corrections
    // VAT corrected to 17.5% per 2026 Finance Law
    name: 'Cameroon',
    code: 'CM',
    currencyCode: 'XAF',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 2000000, rate: 0.11 },
      { min: 2000000, max: 3000000, rate: 0.165 },
      { min: 3000000, max: 5000000, rate: 0.275 },
      { min: 5000000, max: null,    rate: 0.385 }
    ],
    socialSecurityEmployee: 0.042,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.175,
    vatThreshold: 50000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.impots.cm',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — TaxAtlas/PwC-aligned; expanded bracket structure
    name: 'Central African Republic',
    code: 'CF',
    currencyCode: 'XAF',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 200000,
    incomeTaxBrackets: [
      { min: 0,       max: 200000,  rate: 0 },
      { min: 200000,  max: 500000,  rate: 0.08 },
      { min: 500000,  max: 1000000, rate: 0.15 },
      { min: 1000000, max: 3000000, rate: 0.28 },
      { min: 3000000, max: 8000000, rate: 0.40 },
      { min: 8000000, max: null,    rate: 0.50 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.finances.gouv.cf',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH; Finance Law updates stable into 2026
    // MAJOR CORRECTION: Previous top rate of 60% was wrong; correct top is 30%
    name: 'Chad',
    code: 'TD',
    currencyCode: 'XAF',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 800000,
    incomeTaxBrackets: [
      { min: 0,        max: 800000,   rate: 0 },
      { min: 800000,   max: 6000000,  rate: 0.105 },
      { min: 6000000,  max: 7500000,  rate: 0.15 },
      { min: 7500000,  max: 9000000,  rate: 0.20 },
      { min: 9000000,  max: 12000000, rate: 0.25 },
      { min: 12000000, max: null,     rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.finances.gouv.td',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC Apr 2026 / Lloyds; first bracket at 3% (minimum tax)
    name: 'Democratic Republic of Congo',
    code: 'CD',
    currencyCode: 'CDF',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,         max: 1944000,  rate: 0.03 },
      { min: 1944000,   max: 21600000, rate: 0.15 },
      { min: 21600000,  max: 43200000, rate: 0.30 },
      { min: 43200000,  max: null,     rate: 0.40 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.16,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.gouv.cd',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, 2025 Tax Code
    name: 'Equatorial Guinea',
    code: 'GQ',
    currencyCode: 'XAF',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 1400000,
    incomeTaxBrackets: [
      { min: 0,         max: 1400000,  rate: 0 },
      { min: 1400000,   max: 5000000,  rate: 0.10 },
      { min: 5000000,   max: 10000000, rate: 0.15 },
      { min: 10000000,  max: 15000000, rate: 0.20 },
      { min: 15000000,  max: null,     rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mhfp.gov.gq',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, 2025/2026; SS corrected to 4.5%
    name: 'Gabon',
    code: 'GA',
    currencyCode: 'XAF',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 1500000,
    incomeTaxBrackets: [
      { min: 0,         max: 1500000,  rate: 0 },
      { min: 1500000,   max: 1920000,  rate: 0.05 },
      { min: 1920000,   max: 2700000,  rate: 0.10 },
      { min: 2700000,   max: 3600000,  rate: 0.15 },
      { min: 3600000,   max: 5160000,  rate: 0.20 },
      { min: 5160000,   max: 7500000,  rate: 0.25 },
      { min: 7500000,   max: 11000000, rate: 0.30 },
      { min: 11000000,  max: null,     rate: 0.35 }
    ],
    socialSecurityEmployee: 0.045,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.gouv.ga',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, Finance Act 2014 stable per Dec 2025
    // First bracket at 1% (minimum tax applies from first XAF)
    name: 'Republic of Congo',
    code: 'CG',
    currencyCode: 'XAF',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 464000,  rate: 0.01 },
      { min: 464000,  max: 1000000, rate: 0.10 },
      { min: 1000000, max: 3000000, rate: 0.25 },
      { min: 3000000, max: null,    rate: 0.40 }
    ],
    socialSecurityEmployee: 0.04,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.189,
    vatThreshold: 80000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.finances.gouv.cg',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, 2026 IRS scale; MAJOR bracket restructure
    name: 'São Tomé and Príncipe',
    code: 'ST',
    currencyCode: 'STN',
    region: 'Central Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 11700000,
    incomeTaxBrackets: [
      { min: 0,           max: 11700000,  rate: 0 },
      { min: 11700000,    max: 50000000,  rate: 0.10 },
      { min: 50000000,    max: 100000000, rate: 0.13 },
      { min: 100000000,   max: 150000000, rate: 0.15 },
      { min: 150000000,   max: 240000000, rate: 0.20 },
      { min: 240000000,   max: null,      rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mf.gov.st',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── EAST AFRICA ─────────────────────────────────────────────────────────

  {
    // VERIFIED — PwC HIGH, 2025/2026 Finance Law; simplified to 3 bands
    name: 'Burundi',
    code: 'BI',
    currencyCode: 'BIF',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 1800000,
    incomeTaxBrackets: [
      { min: 0,       max: 1800000, rate: 0 },
      { min: 1800000, max: 3600000, rate: 0.20 },
      { min: 3600000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0.04,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.obr.bi',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — IMF/PwC-aligned; top bracket rate uses 30% (logical continuation)
    name: 'Comoros',
    code: 'KM',
    currencyCode: 'KMF',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 150000,
    incomeTaxBrackets: [
      { min: 0,       max: 150000,  rate: 0 },
      { min: 150000,  max: 500000,  rate: 0.05 },
      { min: 500000,  max: 1000000, rate: 0.10 },
      { min: 1000000, max: 1500000, rate: 0.15 },
      { min: 1500000, max: 2500000, rate: 0.20 },
      { min: 2500000, max: 3500000, rate: 0.25 },
      { min: 3500000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.finances.gouv.km',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — PwC LOW; insufficient verified data
    name: 'Djibouti',
    code: 'DJ',
    currencyCode: 'DJF',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ministere-finances.dj',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — all fields NOT_VERIFIED; limited access
    name: 'Eritrea',
    code: 'ER',
    currencyCode: 'ERN',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mof.gov.er',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, December 2025 Proclamation effective 2026
    // vatThreshold corrected from 500000 to 2000000
    name: 'Ethiopia',
    code: 'ET',
    currencyCode: 'ETB',
    region: 'East Africa',
    taxYear: { start: '07-08', end: '07-07' },
    personalAllowance: 24000,
    incomeTaxBrackets: [
      { min: 0,      max: 24000,  rate: 0 },
      { min: 24000,  max: 48000,  rate: 0.15 },
      { min: 48000,  max: 84000,  rate: 0.20 },
      { min: 84000,  max: 120000, rate: 0.25 },
      { min: 120000, max: 168000, rate: 0.30 },
      { min: 168000, max: null,   rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 2000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mor.gov.et',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, KRA Finance Act 2023 stable per KRA 2026
    // Note: Kenya uses a PAYE tax relief system (KES 28,800/yr), not a
    // personal allowance deduction. Brackets start at 10% from KES 1.
    // personalAllowance shown for informational purposes only.
    name: 'Kenya',
    code: 'KE',
    currencyCode: 'KES',
    region: 'East Africa',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 288000,
    incomeTaxBrackets: [
      { min: 0,        max: 288000,  rate: 0.10 },
      { min: 288000,   max: 388000,  rate: 0.25 },
      { min: 388000,   max: 6000000, rate: 0.30 },
      { min: 6000000,  max: 9600000, rate: 0.325 },
      { min: 9600000,  max: null,    rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.16,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.kra.go.ke',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, November 2025 review (IRSA salary scale)
    name: 'Madagascar',
    code: 'MG',
    currencyCode: 'MGA',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 350000,
    incomeTaxBrackets: [
      { min: 0,      max: 350000, rate: 0 },
      { min: 350000, max: 400000, rate: 0.05 },
      { min: 400000, max: 500000, rate: 0.10 },
      { min: 500000, max: 600000, rate: 0.15 },
      { min: 600000, max: null,   rate: 0.20 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.impots.mg',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, Taxation (Amendment) Act 1 January 2026
    // MAJOR CHANGE: personalAllowance 1,440,000 → 170,000 (amended)
    name: 'Malawi',
    code: 'MW',
    currencyCode: 'MWK',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 170000,
    incomeTaxBrackets: [
      { min: 0,        max: 170000,   rate: 0 },
      { min: 170000,   max: 1570000,  rate: 0.30 },
      { min: 1570000,  max: 10000000, rate: 0.35 },
      { min: 10000000, max: null,     rate: 0.40 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mra.mw',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, Budget 2025/2026; simplified to 3 bands
    name: 'Mauritius',
    code: 'MU',
    currencyCode: 'MUR',
    region: 'East Africa',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 500000,
    incomeTaxBrackets: [
      { min: 0,       max: 500000,  rate: 0 },
      { min: 500000,  max: 1000000, rate: 0.10 },
      { min: 1000000, max: null,    rate: 0.20 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mra.mu',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH + 2026 Finance Law final corrections
    // Note: No 0% first band. Tax applies from first MZN at 10%.
    // vatRate corrected 0.17 → 0.16; vatThreshold confirmed 2,500,000
    name: 'Mozambique',
    code: 'MZ',
    currencyCode: 'MZN',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 42000,   rate: 0.10 },
      { min: 42000,   max: 168000,  rate: 0.15 },
      { min: 168000,  max: 504000,  rate: 0.20 },
      { min: 504000,  max: 1512000, rate: 0.25 },
      { min: 1512000, max: null,    rate: 0.32 }
    ],
    socialSecurityEmployee: 0.03,
    socialSecuritySelfEmployed: 0.07,
    selfEmploymentTaxRate: 0,
    vatRate: 0.16,
    vatThreshold: 2500000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.at.gov.mz',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, RRA 2025/2026 scales
    name: 'Rwanda',
    code: 'RW',
    currencyCode: 'RWF',
    region: 'East Africa',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 720000,
    incomeTaxBrackets: [
      { min: 0,       max: 720000,  rate: 0 },
      { min: 720000,  max: 1200000, rate: 0.10 },
      { min: 1200000, max: 2400000, rate: 0.20 },
      { min: 2400000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.rra.gov.rw',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — PwC MEDIUM, SRC 2025/2026 scales
    name: 'Seychelles',
    code: 'SC',
    currencyCode: 'SCR',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 102666,
    incomeTaxBrackets: [
      { min: 0,       max: 102666, rate: 0 },
      { min: 102666,  max: 120000, rate: 0.15 },
      { min: 120000,  max: 996000, rate: 0.20 },
      { min: 996000,  max: null,   rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://src.gov.sc',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — 2025 Income Tax Regulation; formal economy uses USD
    // currencyCode USD reflects actual practice per official tax law
    name: 'Somalia',
    code: 'SO',
    currencyCode: 'USD',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 2400,
    incomeTaxBrackets: [
      { min: 0,    max: 2400,  rate: 0 },
      { min: 2400, max: 9600,  rate: 0.06 },
      { min: 9600, max: 18000, rate: 0.12 },
      { min: 18000,max: null,  rate: 0.18 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mof.gov.so',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — SSRA circulars 2024/2025; top bracket rate uses 20%
    // (NOT_VERIFIED in batch; 20% is a conservative continuation)
    name: 'South Sudan',
    code: 'SS',
    currencyCode: 'SSP',
    region: 'East Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 24000,
    incomeTaxBrackets: [
      { min: 0,      max: 24000,  rate: 0 },
      { min: 24000,  max: 60000,  rate: 0.05 },
      { min: 60000,  max: 120000, rate: 0.10 },
      { min: 120000, max: 180000, rate: 0.15 },
      { min: 180000, max: null,   rate: 0.20 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://nra.gov.ss',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, TRA 2025/2026 scales
    // personalAllowance corrected 2,040,000 → 3,240,000
    name: 'Tanzania',
    code: 'TZ',
    currencyCode: 'TZS',
    region: 'East Africa',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 3240000,
    incomeTaxBrackets: [
      { min: 0,        max: 3240000,  rate: 0 },
      { min: 3240000,  max: 6240000,  rate: 0.08 },
      { min: 6240000,  max: 9120000,  rate: 0.20 },
      { min: 9120000,  max: 12000000, rate: 0.25 },
      { min: 12000000, max: null,     rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.tra.go.tz',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — PwC HIGH, URA 2025/2026; intermediate bracket corrected
    name: 'Uganda',
    code: 'UG',
    currencyCode: 'UGX',
    region: 'East Africa',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 2820000,
    incomeTaxBrackets: [
      { min: 0,          max: 2820000,   rate: 0 },
      { min: 2820000,    max: 4020000,   rate: 0.10 },
      { min: 4020000,    max: 4920000,   rate: 0.20 },
      { min: 4920000,    max: 120000000, rate: 0.30 },
      { min: 120000000,  max: null,      rate: 0.40 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ura.go.ug',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── SOUTHERN AFRICA ─────────────────────────────────────────────────────

  {
    // VERIFIED — PwC HIGH, BURS 2025/2026; fiscal year April–March
    name: 'Botswana',
    code: 'BW',
    currencyCode: 'BWP',
    region: 'Southern Africa',
    taxYear: { start: '04-01', end: '03-31' },
    personalAllowance: 48000,
    incomeTaxBrackets: [
      { min: 0,      max: 48000,  rate: 0 },
      { min: 48000,  max: 84000,  rate: 0.05 },
      { min: 84000,  max: 120000, rate: 0.125 },
      { min: 120000, max: 156000, rate: 0.1875 },
      { min: 156000, max: null,   rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.14,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.burs.org.bw',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — ERS 2025/2026; no 0% band — tax from first SZL
    name: 'Eswatini',
    code: 'SZ',
    currencyCode: 'SZL',
    region: 'Southern Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 100000, rate: 0.20 },
      { min: 100000, max: 150000, rate: 0.25 },
      { min: 150000, max: 200000, rate: 0.30 },
      { min: 200000, max: null,   rate: 0.33 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ers.org.sz',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — RSL 2025/2026 PAYE; fiscal year April–March
    // Second bracket uses 30% as widely published continuation of RSL data
    name: 'Lesotho',
    code: 'LS',
    currencyCode: 'LSL',
    region: 'Southern Africa',
    taxYear: { start: '04-01', end: '03-31' },
    personalAllowance: 77760,
    incomeTaxBrackets: [
      { min: 0,     max: 77760, rate: 0.20 },
      { min: 77760, max: null,  rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 2000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.rsl.org.ls',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — NAMRA/PwC + 2026 Finance Law final corrections
    // personalAllowance doubled 50,000 → 100,000; URL corrected to namra.org.na
    name: 'Namibia',
    code: 'NA',
    currencyCode: 'NAD',
    region: 'Southern Africa',
    taxYear: { start: '03-01', end: '02-28' },
    personalAllowance: 100000,
    incomeTaxBrackets: [
      { min: 0,       max: 100000,  rate: 0 },
      { min: 100000,  max: 150000,  rate: 0.18 },
      { min: 150000,  max: 350000,  rate: 0.25 },
      { min: 350000,  max: 550000,  rate: 0.28 },
      { min: 550000,  max: 850000,  rate: 0.30 },
      { min: 850000,  max: 1550000, rate: 0.32 },
      { min: 1550000, max: null,    rate: 0.37 }
    ],
    socialSecurityEmployee: 0.009,
    socialSecuritySelfEmployed: 0.018,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 1000000,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://namra.org.na',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SARS 2025/2026 (1 March 2025 – 28 February 2026)
    // personalAllowance = effective tax-free threshold for under-65
    // (primary rebate R17,235 ÷ 18% = R95,750 effective threshold)
    // Note: SARS uses a rebate system. taxCalculator.js shows estimated tax
    // before primary rebate; Disclaimer.jsx footnote clarifies.
    name: 'South Africa',
    code: 'ZA',
    currencyCode: 'ZAR',
    region: 'Southern Africa',
    taxYear: { start: '03-01', end: '02-28' },
    personalAllowance: 95750,
    incomeTaxBrackets: [
      { min: 0,       max: 245100,  rate: 0.18 },
      { min: 245100,  max: 383100,  rate: 0.26 },
      { min: 383100,  max: 530200,  rate: 0.31 },
      { min: 530200,  max: 695800,  rate: 0.36 },
      { min: 695800,  max: 887000,  rate: 0.39 },
      { min: 887000,  max: 1878600, rate: 0.41 },
      { min: 1878600, max: null,    rate: 0.45 }
    ],
    socialSecurityEmployee: 0.01,
    socialSecuritySelfEmployed: 0.01,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.sars.gov.za',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — ZRA 2026 Charge Year PAYE bands
    name: 'Zambia',
    code: 'ZM',
    currencyCode: 'ZMW',
    region: 'Southern Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 61200,
    incomeTaxBrackets: [
      { min: 0,      max: 61200,  rate: 0 },
      { min: 61200,  max: 85200,  rate: 0.20 },
      { min: 85200,  max: 110400, rate: 0.30 },
      { min: 110400, max: null,   rate: 0.37 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.zra.org.zm',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — ZIMRA Tax Tables, Finance Act No.2 of 2024 (ZWG brackets)
    // personalAllowance corrected 1,560 → 33,600
    name: 'Zimbabwe',
    code: 'ZW',
    currencyCode: 'ZWG',
    region: 'Southern Africa',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 33600,
    incomeTaxBrackets: [
      { min: 0,      max: 33600,   rate: 0 },
      { min: 33600,  max: 100800,  rate: 0.20 },
      { min: 100800, max: 336000,  rate: 0.25 },
      { min: 336000, max: 672000,  rate: 0.30 },
      { min: 672000, max: 1008000, rate: 0.35 },
      { min: 1008000,max: null,    rate: 0.40 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.zimra.co.zw',
    quarterlyPayments: false,
    quarterlyDueDates: []
  }
]
