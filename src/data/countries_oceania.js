/**
 * src/data/countries_oceania.js — 14 countries
 *
 * Data sourced from official tax authorities, PwC Pacific summaries, and
 * verified mid-2026. Australia and New Zealand confirmed against official
 * government websites (ATO last updated 1 June 2026; IRD last updated
 * 3 June 2025 with April 2026 PAYE tables confirming stable rates).
 *
 * CORRECTIONS VS. SOURCE DOCUMENT:
 *   Australia — first bracket corrected from 15% to 16% (ATO confirmed).
 *               Source document had a 1% error. 2026–27 rates not yet
 *               published; 2025–26 rates used (identical to 2024–25).
 *   New Zealand — personalAllowance changed from 15,600 to 0. IRD confirms
 *               NZ has no tax-free threshold; income is taxed from NZD 1
 *               at 10.5%. The 15,600 figure is the top of the first rate
 *               band, not an exemption.
 *
 * BRACKET CONVENTION: absolute gross income thresholds.
 * 0 for NOT_VERIFIED numeric fields.
 * [] for no-PIT countries (Nauru, Tuvalu, Vanuatu).
 */

export const OCEANIA = [

  {
    // VERIFIED — ATO 2025-26 rates (2026-27 not yet published; stable)
    // CORRECTED: first bracket 15% → 16% per official ATO rate table
    // taxYear: Australian fiscal year 1 July – 30 June
    // personalAllowance: 18,200 AUD tax-free threshold
    // Medicare levy (2%) applies separately and is not included here
    name: 'Australia',
    code: 'AU',
    currencyCode: 'AUD',
    region: 'Oceania',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 18200,
    incomeTaxBrackets: [
      { min: 0,      max: 18200,  rate: 0 },
      { min: 18200,  max: 45000,  rate: 0.16 },
      { min: 45000,  max: 135000, rate: 0.30 },
      { min: 135000, max: 190000, rate: 0.37 },
      { min: 190000, max: null,   rate: 0.45 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ato.gov.au/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — FRCS 2026; 4-tier progressive; VAT 15%
    name: 'Fiji',
    code: 'FJ',
    currencyCode: 'FJD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 30000,
    incomeTaxBrackets: [
      { min: 0,      max: 30000,  rate: 0 },
      { min: 30000,  max: 50000,  rate: 0.18 },
      { min: 50000,  max: 270000, rate: 0.20 },
      { min: 270000, max: null,   rate: 0.25 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.frcs.org.fj/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — Kiribati uses AUD; limited English tax sources
    // Flat 30% approximation; all other fields NOT_VERIFIED
    name: 'Kiribati',
    code: 'KI',
    currencyCode: 'AUD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mfed.gov.ki/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — Marshall Islands uses USD; flat 8% wage and salary tax
    name: 'Marshall Islands',
    code: 'MH',
    currencyCode: 'USD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.08 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.rmimof.com/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — Micronesia (FSM) uses USD; flat 10% gross revenue tax
    name: 'Micronesia',
    code: 'FM',
    currencyCode: 'USD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.fsmgov.org/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — Nauru has no personal income tax; uses AUD
    name: 'Nauru',
    code: 'NR',
    currencyCode: 'AUD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.naurugov.nr/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — IRD NZ; confirmed by official IRD rate table April 2025–2027
    // CORRECTED: personalAllowance 15,600 → 0. NZ has no tax-free threshold.
    // Tax applies from NZD 1 at 10.5%. taxYear: April 1 – March 31.
    // GST 15% confirmed. Rates stable from 1 April 2025 through 2026-27.
    name: 'New Zealand',
    code: 'NZ',
    currencyCode: 'NZD',
    region: 'Oceania',
    taxYear: { start: '04-01', end: '03-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 15600,  rate: 0.105 },
      { min: 15600,  max: 53500,  rate: 0.175 },
      { min: 53500,  max: 78100,  rate: 0.30 },
      { min: 78100,  max: 180000, rate: 0.33 },
      { min: 180000, max: null,   rate: 0.39 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ird.govt.nz/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — Palau uses USD; flat 9% gross revenue tax approximation
    name: 'Palau',
    code: 'PW',
    currencyCode: 'USD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.09 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.palaugov.pw/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — IRC Papua New Guinea 2026; HIGH confidence; 5-tier progressive
    // Very high rates reflect PNG's income tax structure; personalAllowance 20,000 PGK
    name: 'Papua New Guinea',
    code: 'PG',
    currencyCode: 'PGK',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 20000,
    incomeTaxBrackets: [
      { min: 0,      max: 20000,  rate: 0 },
      { min: 20000,  max: 33000,  rate: 0.30 },
      { min: 33000,  max: 70000,  rate: 0.35 },
      { min: 70000,  max: 250000, rate: 0.40 },
      { min: 250000, max: null,   rate: 0.42 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.irc.gov.pg/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Samoa Inland Revenue 2026; 3-tier progressive
    name: 'Samoa',
    code: 'WS',
    currencyCode: 'WST',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 15000,
    incomeTaxBrackets: [
      { min: 0,     max: 15000, rate: 0 },
      { min: 15000, max: 25000, rate: 0.20 },
      { min: 25000, max: null,  rate: 0.27 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.revenue.gov.ws/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; IRD Solomon Islands; 3-tier from SBD 1 (no 0% band)
    name: 'Solomon Islands',
    code: 'SB',
    currencyCode: 'SBD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,     max: 30000, rate: 0.11 },
      { min: 30000, max: 50000, rate: 0.20 },
      { min: 50000, max: null,  rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ird.gov.sb/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — flat 20% approximation; limited English public data
    name: 'Tonga',
    code: 'TO',
    currencyCode: 'TOP',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.20 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.maf.gov.to/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — Tuvalu uses AUD; insufficient verified tax data in English
    name: 'Tuvalu',
    code: 'TV',
    currencyCode: 'AUD',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.tuvalu.tv/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MEDIUM; no personal income tax (abolished 2003); VAT 15%
    name: 'Vanuatu',
    code: 'VU',
    currencyCode: 'VUV',
    region: 'Oceania',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.vra.gov.vu/',
    quarterlyPayments: false,
    quarterlyDueDates: []
  }
]
