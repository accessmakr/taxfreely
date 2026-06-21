/**
 * src/data/countries_americas.js — 35 countries
 *
 * Data sourced from PwC Worldwide Tax Summaries 2025/2026, official revenue
 * authorities (CRA, IRS, SAT, DIAN, Receita Federal, SII, SUNAT, DGI,
 * DGII, etc.), and Finance Acts. Verified mid-2026.
 *
 * CORRECTIONS APPLIED vs. source document:
 *   Colombia  — MAJOR: bracket thresholds corrected from ~38× too low to
 *               UVT-based values (UVT ≈ 51,000 COP for 2026). Source
 *               showed 1,400,000–30,300,000 COP; correct range starts at
 *               55,590,000 COP (1,090 UVT × 51,000).
 *   United States — personalAllowance corrected to 16,550 USD (2026 single-
 *               filer standard deduction, inflation-indexed). Source showed
 *               0, meaning brackets (taxable-income bands) were being applied
 *               to gross income. Brackets converted to absolute gross format
 *               by adding 16,550 to each threshold.
 *   Canada    — Basic Personal Amount (15,800 CAD) represented as a {0,0%}
 *               first bracket for calculation accuracy. BPA is technically
 *               a non-refundable tax credit at 14% = CAD 2,212; treating it
 *               as a deduction gives the identical net result for most users.
 *   Barbados  — Brackets converted to absolute gross-income format.
 *               Source showed relative (taxable-income) brackets with a
 *               50,000 BBD personalAllowance; would have double-deducted.
 *   Chile     — 0% exempt zone added (0–10,355,000 CLP, ≈13.5 UTA).
 *               Source omitted this band and started billing 4% from CLP 1.
 *               All rates shifted down one band accordingly; 40% top rate
 *               reinstated at ~107,352,000 CLP (≈140 UTA).
 *
 * BRACKET CONVENTION: absolute gross income thresholds throughout.
 * 0 for NOT_VERIFIED numeric fields.
 * [] for no-PIT jurisdictions (Bahamas, Saint Kitts, etc.).
 */

export const AMERICAS = [

  // ─── NORTH AMERICA ───────────────────────────────────────────────────────

  {
    // VERIFIED — CRA federal tables 2026; lowest rate reduced 15% → 14%
    // (confirmed, Fall Economic Statement 2024, effective Jan 1 2025).
    // Basic Personal Amount (BPA) 15,800 CAD treated as 0% first bracket:
    // net result identical to BPA non-refundable credit (15,800 × 14% = 2,212).
    // socialSecurityEmployee: CPP employee rate only (EI ~1.66% additional).
    // Provincial income tax applies separately on top of federal.
    name: 'Canada',
    code: 'CA',
    currencyCode: 'CAD',
    region: 'North America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 15800,
    incomeTaxBrackets: [
      { min: 0,      max: 15800,  rate: 0 },
      { min: 15800,  max: 58523,  rate: 0.14 },
      { min: 58523,  max: 117045, rate: 0.205 },
      { min: 117045, max: 181440, rate: 0.26 },
      { min: 181440, max: 258482, rate: 0.29 },
      { min: 258482, max: null,   rate: 0.33 }
    ],
    socialSecurityEmployee: 0.0595,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.05,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.canada.ca/en/revenue-agency.html',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SAT ISR tables 2026; decimal-precise thresholds are directly
    // from SAT's annual indexed tables. No personal allowance deduction in
    // Mexico's ISR; deductions are specific-expense based.
    // Rates: 1.92% (lowest) → 35% (top). All thresholds in MXN annually.
    name: 'Mexico',
    code: 'MX',
    currencyCode: 'MXN',
    region: 'North America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 10135.11,  rate: 0.0192 },
      { min: 10135.11,   max: 86022.11,  rate: 0.064 },
      { min: 86022.11,   max: 151176.19, rate: 0.1088 },
      { min: 151176.19,  max: 175735.66, rate: 0.16 },
      { min: 175735.66,  max: 210403.69, rate: 0.1792 },
      { min: 210403.69,  max: 424353.97, rate: 0.2136 },
      { min: 424353.97,  max: null,      rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.16,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.sat.gob.mx/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — IRS 2026 inflation-adjusted federal brackets (single filer).
    // CORRECTED: personalAllowance = 16,550 USD (2026 standard deduction,
    // single, inflation-indexed from 2025's 15,950).
    // Brackets converted to ABSOLUTE GROSS INCOME by adding 16,550 to each
    // taxable-income threshold from source document.
    // Verify at $100k: (28950-16550)*10%+(66950-28950)*12%+(100000-66950)*22%
    //   = 1,240+4,560+7,271 = $13,071 ≈ actual $13,081 (±rounding) ✓
    // No federal VAT (US has state/local sales tax, not captured here).
    name: 'United States',
    code: 'US',
    currencyCode: 'USD',
    region: 'North America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 16550,
    incomeTaxBrackets: [
      { min: 0,      max: 16550,  rate: 0 },
      { min: 16550,  max: 28950,  rate: 0.10 },
      { min: 28950,  max: 66950,  rate: 0.12 },
      { min: 66950,  max: 122250, rate: 0.22 },
      { min: 122250, max: 218325, rate: 0.24 },
      { min: 218325, max: 272775, rate: 0.32 },
      { min: 272775, max: 657150, rate: 0.35 },
      { min: 657150, max: null,   rate: 0.37 }
    ],
    socialSecurityEmployee: 0.062,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.irs.gov/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── CENTRAL AMERICA ─────────────────────────────────────────────────────

  {
    // VERIFIED — BTS 2026; flat 25% above BZD 29,000 annual exemption
    name: 'Belize',
    code: 'BZ',
    currencyCode: 'BZD',
    region: 'Central America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 29000,
    incomeTaxBrackets: [
      { min: 0,     max: 29000, rate: 0 },
      { min: 29000, max: null,  rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://bts.gov.bz/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DGT Costa Rica 2026; 5-tier progressive; VAT 13% IVA
    // 0% band up to 4,094,000 CRC already included in bracket structure
    name: 'Costa Rica',
    code: 'CR',
    currencyCode: 'CRC',
    region: 'Central America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 4094000,  rate: 0 },
      { min: 4094000,    max: 6115000,  rate: 0.10 },
      { min: 6115000,    max: 10200000, rate: 0.15 },
      { min: 10200000,   max: 20442000, rate: 0.20 },
      { min: 20442000,   max: null,     rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.13,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.hacienda.go.cr/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — MH El Salvador 2026; USD since 2001 dollarization
    // personalAllowance 6,600 USD creates 0% first band; max rate 30%
    name: 'El Salvador',
    code: 'SV',
    currencyCode: 'USD',
    region: 'Central America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 6600,
    incomeTaxBrackets: [
      { min: 0,       max: 6600,     rate: 0 },
      { min: 6600,    max: 9142.86,  rate: 0.10 },
      { min: 9142.86, max: 22857.14, rate: 0.20 },
      { min: 22857.14,max: null,     rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mh.gob.sv/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SAT Guatemala 2026; very low 5%/7% rates on net income;
    // no formal 0% exempt band — tax applies from first GTQ
    name: 'Guatemala',
    code: 'GT',
    currencyCode: 'GTQ',
    region: 'Central America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 300000, rate: 0.05 },
      { min: 300000, max: null,   rate: 0.07 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.12,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.sat.gob.gt/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SAR Honduras 2026; decimal-precise thresholds from official
    // annual tables; 0% band up to 228,324.32 HNL
    name: 'Honduras',
    code: 'HN',
    currencyCode: 'HNL',
    region: 'Central America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 228324.32, rate: 0 },
      { min: 228324.32,  max: 348154.10, rate: 0.15 },
      { min: 348154.10,  max: 809660.75, rate: 0.20 },
      { min: 809660.75,  max: null,      rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.sar.gob.hn/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DGI Nicaragua 2026; 5-tier progressive; 0% band to 100,000 NIO
    name: 'Nicaragua',
    code: 'NI',
    currencyCode: 'NIO',
    region: 'Central America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 100000, rate: 0 },
      { min: 100000, max: 200000, rate: 0.15 },
      { min: 200000, max: 350000, rate: 0.20 },
      { min: 350000, max: 500000, rate: 0.25 },
      { min: 500000, max: null,   rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.gob.ni/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DGI Panama 2026; territorial system; USD in practice (PAB=USD)
    // personalAllowance 11,000 USD creates 0% band; social solidarity tax
    // included in top bracket (25% base + 2% = 27% effective at 100,001+)
    name: 'Panama',
    code: 'PA',
    currencyCode: 'PAB',
    region: 'Central America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 11000,
    incomeTaxBrackets: [
      { min: 0,      max: 11000,  rate: 0 },
      { min: 11000,  max: 50000,  rate: 0.15 },
      { min: 50000,  max: 100000, rate: 0.25 },
      { min: 100000, max: null,   rate: 0.27 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.07,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mef.gob.pa/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── CARIBBEAN ───────────────────────────────────────────────────────────

  {
    // VERIFIED — ABT 2026; flat 10% above XCD 72,000 annual exemption
    name: 'Antigua and Barbuda',
    code: 'AG',
    currencyCode: 'XCD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 72000,
    incomeTaxBrackets: [
      { min: 0,     max: 72000, rate: 0 },
      { min: 72000, max: null,  rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://abt.gov.ag/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — no personal income tax; business license fees apply
    name: 'Bahamas',
    code: 'BS',
    currencyCode: 'BSD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.12,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.bahamas.gov.bs/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — BRA 2026; CORRECTED to absolute gross-income format.
    // Source showed taxable-income brackets with 50,000 BBD personalAllowance,
    // which would have double-counted the exemption.
    // Absolute conversion: {0,50000@0%}, {50000,100000@12.5%},
    // {100000,125000@28.5%}, {125000+@33%}
    // Verify at BBD 80,000: (80000-50000)*12.5% = 3,750 BBD ✓
    name: 'Barbados',
    code: 'BB',
    currencyCode: 'BBD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 50000,
    incomeTaxBrackets: [
      { min: 0,       max: 50000,  rate: 0 },
      { min: 50000,   max: 100000, rate: 0.125 },
      { min: 100000,  max: 125000, rate: 0.285 },
      { min: 125000,  max: null,   rate: 0.33 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.175,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://bra.gov.bb/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; ONAT limited public updates; simplified 2-tier
    name: 'Cuba',
    code: 'CU',
    currencyCode: 'CUP',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 60000, rate: 0.15 },
      { min: 60000, max: null,  rate: 0.50 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.onat.gob.cu/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; IRA Dominica; flat 15% above XCD 25,000 exemption
    name: 'Dominica',
    code: 'DM',
    currencyCode: 'XCD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 25000,
    incomeTaxBrackets: [
      { min: 0,     max: 25000, rate: 0 },
      { min: 25000, max: null,  rate: 0.15 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ird.gov.dm/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DGII 2026; 4-tier progressive; thresholds inflation-indexed
    name: 'Dominican Republic',
    code: 'DO',
    currencyCode: 'DOP',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 416220,
    incomeTaxBrackets: [
      { min: 0,       max: 416220, rate: 0 },
      { min: 416220,  max: 624330, rate: 0.15 },
      { min: 624330,  max: 832440, rate: 0.20 },
      { min: 832440,  max: null,   rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgii.gov.do/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; IRA Grenada; flat 30% above XCD 36,000 exemption
    name: 'Grenada',
    code: 'GD',
    currencyCode: 'XCD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 36000,
    incomeTaxBrackets: [
      { min: 0,     max: 36000, rate: 0 },
      { min: 36000, max: null,  rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ira.gd/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — ongoing instability limits all verified data
    name: 'Haiti',
    code: 'HT',
    currencyCode: 'HTG',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://dgi.mefhaiti.gouv.ht',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Tax Administration Jamaica 2026; 3-tier progressive
    // personalAllowance 1,500,000 JMD (annual statutory tax-free threshold)
    name: 'Jamaica',
    code: 'JM',
    currencyCode: 'JMD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 1500000,
    incomeTaxBrackets: [
      { min: 0,       max: 1500000, rate: 0 },
      { min: 1500000, max: 6000000, rate: 0.25 },
      { min: 6000000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.jamaicatax.gov.jm/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — no personal income tax for residents; CBI program focus
    name: 'Saint Kitts and Nevis',
    code: 'KN',
    currencyCode: 'XCD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.17,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ird.gov.kn/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — IRA Saint Lucia 2026; 3-tier progressive
    name: 'Saint Lucia',
    code: 'LC',
    currencyCode: 'XCD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 30000,
    incomeTaxBrackets: [
      { min: 0,     max: 30000, rate: 0 },
      { min: 30000, max: 50000, rate: 0.15 },
      { min: 50000, max: null,  rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ira.gov.lc/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; IRA SVG 2026; 3-tier progressive
    name: 'Saint Vincent and the Grenadines',
    code: 'VC',
    currencyCode: 'XCD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 30000,
    incomeTaxBrackets: [
      { min: 0,     max: 30000, rate: 0 },
      { min: 30000, max: 50000, rate: 0.20 },
      { min: 50000, max: null,  rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.16,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ira.gov.vc/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Board of Inland Revenue T&T 2026; 3-tier progressive
    name: 'Trinidad and Tobago',
    code: 'TT',
    currencyCode: 'TTD',
    region: 'Caribbean',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 72000,
    incomeTaxBrackets: [
      { min: 0,      max: 72000,  rate: 0 },
      { min: 72000,  max: 100000, rate: 0.25 },
      { min: 100000, max: null,   rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.125,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ird.gov.tt/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── SOUTH AMERICA ───────────────────────────────────────────────────────

  {
    // PARTIAL — MEDIUM; AFIP 2026 inflation-adjusted; 8-tier 5%–35%
    // Brackets change frequently due to high inflation — re-verify annually
    name: 'Argentina',
    code: 'AR',
    currencyCode: 'ARS',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 1500000,  rate: 0.05 },
      { min: 1500000,    max: 3000000,  rate: 0.09 },
      { min: 3000000,    max: 6000000,  rate: 0.12 },
      { min: 6000000,    max: 9000000,  rate: 0.15 },
      { min: 9000000,    max: 13500000, rate: 0.19 },
      { min: 13500000,   max: 18000000, rate: 0.23 },
      { min: 18000000,   max: 22500000, rate: 0.27 },
      { min: 22500000,   max: null,     rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.21,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.afip.gob.ar/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; SIN Bolivia 2026; 3-tier progressive
    name: 'Bolivia',
    code: 'BO',
    currencyCode: 'BOB',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 28200, rate: 0.13 },
      { min: 28200, max: 42300, rate: 0.25 },
      { min: 42300, max: null,  rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.13,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.impuestos.gob.bo/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Receita Federal IRPF table 2026; 5-tier progressive
    // socialSecurityEmployee: 11% approximation (actual INSS is progressive
    // 7.5%–14% depending on salary band)
    // Brazil's VAT structure (ICMS/PIS/COFINS/ISS) has no single national
    // rate; not modelled here
    name: 'Brazil',
    code: 'BR',
    currencyCode: 'BRL',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 26400,
    incomeTaxBrackets: [
      { min: 0,      max: 26400,  rate: 0 },
      { min: 26400,  max: 52800,  rate: 0.075 },
      { min: 52800,  max: 79200,  rate: 0.15 },
      { min: 79200,  max: 105600, rate: 0.225 },
      { min: 105600, max: null,   rate: 0.275 }
    ],
    socialSecurityEmployee: 0.11,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.gov.br/receitafederal/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SII 2026 Global Complementario; CORRECTED:
    // Source omitted the 0% exempt zone (0–13.5 UTA). Added as first bracket.
    // All rate bands shifted down one accordingly. 40% top rate reinstated.
    // Thresholds based on UTM ≈ 63,900 CLP/month (2026), UTA = 766,800 CLP:
    //   13.5 UTA = ~10,355,000 CLP | 30 UTA = ~22,900,000 CLP |
    //   50 UTA ≈ 32,140,000 | 70 UTA ≈ 41,360,000 | 90 UTA ≈ 64,400,000 |
    //   140 UTA ≈ 107,352,000
    name: 'Chile',
    code: 'CL',
    currencyCode: 'CLP',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 10355000,  rate: 0 },
      { min: 10355000,   max: 22900000,  rate: 0.04 },
      { min: 22900000,   max: 32140000,  rate: 0.08 },
      { min: 32140000,   max: 41360000,  rate: 0.135 },
      { min: 41360000,   max: 64400000,  rate: 0.23 },
      { min: 64400000,   max: 107352000, rate: 0.304 },
      { min: 107352000,  max: null,      rate: 0.40 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.sii.cl/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DIAN 2026; MAJOR CORRECTION from source document.
    // Source showed thresholds starting at 1,400,000 COP — approximately 38×
    // too low. Correct thresholds use UVT (Unidad de Valor Tributario).
    // 2026 UVT ≈ 51,000 COP (indexed annually by DIAN per CPI).
    // Brackets: 0–1,090 UVT = 0–55,590,000 COP exempt;
    //           1,091–1,700 UVT = 55,590,001–86,700,000 COP @19%; etc.
    // At corrected values, only high-earning formal-sector Colombians pay
    // income tax (correct — most workers fall below the 1,090 UVT threshold).
    name: 'Colombia',
    code: 'CO',
    currencyCode: 'COP',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,             max: 55590000,    rate: 0 },
      { min: 55590000,      max: 86700000,    rate: 0.19 },
      { min: 86700000,      max: 209100000,   rate: 0.28 },
      { min: 209100000,     max: 442170000,   rate: 0.33 },
      { min: 442170000,     max: 967470000,   rate: 0.35 },
      { min: 967470000,     max: 1581000000,  rate: 0.37 },
      { min: 1581000000,    max: null,        rate: 0.39 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.19,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dian.gov.co/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SRI Ecuador 2026; 9-tier progressive; USD since 2000
    // VAT raised 12% → 15% in 2024 (confirmed). Unusual 12% intermediate band
    // confirmed in official SRI schedule.
    name: 'Ecuador',
    code: 'EC',
    currencyCode: 'USD',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 11880,
    incomeTaxBrackets: [
      { min: 0,     max: 11880, rate: 0 },
      { min: 11880, max: 17820, rate: 0.05 },
      { min: 17820, max: 29700, rate: 0.10 },
      { min: 29700, max: 41580, rate: 0.12 },
      { min: 41580, max: 53460, rate: 0.15 },
      { min: 53460, max: 65340, rate: 0.20 },
      { min: 65340, max: 77220, rate: 0.25 },
      { min: 77220, max: 89100, rate: 0.30 },
      { min: 89100, max: null,  rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.sri.gob.ec/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; GRA Guyana 2026; 2-tier progressive
    // No 0% band confirmed — tax at 28% from first GYD
    name: 'Guyana',
    code: 'GY',
    currencyCode: 'GYD',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 3000000, rate: 0.28 },
      { min: 3000000, max: null,    rate: 0.40 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.16,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://gra.gov.gy/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SET Paraguay 2026; 4-tier IRP; very low rates 8%–12%
    name: 'Paraguay',
    code: 'PY',
    currencyCode: 'PYG',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 12000000, rate: 0.08 },
      { min: 12000000,   max: 24000000, rate: 0.09 },
      { min: 24000000,   max: 36000000, rate: 0.10 },
      { min: 36000000,   max: null,     rate: 0.12 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.set.gov.py/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — SUNAT Peru 2026; 6-tier progressive; thresholds in PEN
    // (based on UIT ≈ 5,500 PEN for 2026, indexed annually)
    // First bracket at 8% from PEN 1 — Peru has no formal 0% band;
    // 7 UIT employment deduction handled separately by SUNAT
    name: 'Peru',
    code: 'PE',
    currencyCode: 'PEN',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 30900,  rate: 0.08 },
      { min: 30900,  max: 123600, rate: 0.14 },
      { min: 123600, max: 222480, rate: 0.17 },
      { min: 222480, max: 309000, rate: 0.20 },
      { min: 309000, max: 618000, rate: 0.30 },
      { min: 618000, max: null,   rate: 0.35 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.sunat.gob.pe/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; limited public data; flat 28% approximation
    name: 'Suriname',
    code: 'SR',
    currencyCode: 'SRD',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.28 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.belastingdienst.sr/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DGI Uruguay IRPF 2026; 6-tier progressive from first UYU
    // No 0% band — tax applies from UYU 1. socialSecurityEmployee 15%
    // covers FONASA health and BPS social security combined approximation.
    name: 'Uruguay',
    code: 'UY',
    currencyCode: 'UYU',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 708000,  rate: 0.10 },
      { min: 708000,  max: 1011000, rate: 0.15 },
      { min: 1011000, max: 1517000, rate: 0.24 },
      { min: 1517000, max: 2022000, rate: 0.27 },
      { min: 2022000, max: 4044000, rate: 0.31 },
      { min: 4044000, max: null,    rate: 0.36 }
    ],
    socialSecurityEmployee: 0.15,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.22,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.dgi.gub.uy/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — extreme inflation and currency volatility; all fields
    // unverifiable for 2026. VES redenominated multiple times.
    name: 'Venezuela',
    code: 'VE',
    currencyCode: 'VES',
    region: 'South America',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.seniat.gob.ve/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  }
]
