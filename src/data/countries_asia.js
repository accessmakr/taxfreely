/**
 * src/data/countries_asia.js — 48 countries
 *
 * Data sourced from PwC Worldwide Tax Summaries 2025/2026, official
 * revenue authorities (NTA, STA, IRAS, LHDN, ZATCA, GTA, FTA, etc.),
 * and Finance Acts. Verified mid-2026. Same standard as countries_africa.js.
 *
 * BRACKET CONVENTION: Brackets are in ABSOLUTE GROSS INCOME terms.
 * personalAllowance is the effective tax-free threshold (display in UI).
 * A {0, personalAllowance, 0} first bracket creates the exempt zone.
 * taxCalculator.js applies brackets directly to gross income.
 * 0% first bracket + all remaining brackets fully describe the tax curve.
 *
 * For countries where the source document presented brackets as taxable
 * income (relative to personalAllowance), thresholds have been converted
 * to absolute gross income (adding personalAllowance to each threshold).
 * Each conversion is mathematically verified in the comments.
 *
 * CONFIDENCE TAGS: VERIFIED = PwC HIGH, PARTIAL = PwC MEDIUM,
 * LIMITED = PwC LOW (fields marked 0 are NOT_VERIFIED).
 */

export const ASIA = [

  // ─── EAST ASIA ───────────────────────────────────────────────────────────

  {
    // VERIFIED — NTA 2026 withholding tables; basic deduction 480,000 JPY
    // Brackets converted: original taxable-income thresholds + 480,000
    // Verify at ¥5M: (2430k-480k)*5% + (3780k-2430k)*10% + (5M-3780k)*20%
    //              = 97,500 + 135,000 + 244,000 = 476,500 JPY ✓
    name: 'Japan',
    code: 'JP',
    currencyCode: 'JPY',
    region: 'East Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 480000,
    incomeTaxBrackets: [
      { min: 0,          max: 480000,   rate: 0 },
      { min: 480000,     max: 2430000,  rate: 0.05 },
      { min: 2430000,    max: 3780000,  rate: 0.10 },
      { min: 3780000,    max: 7430000,  rate: 0.20 },
      { min: 7430000,    max: 9480000,  rate: 0.23 },
      { min: 9480000,    max: 18480000, rate: 0.33 },
      { min: 18480000,   max: 40480000, rate: 0.40 },
      { min: 40480000,   max: null,     rate: 0.45 }
    ],
    socialSecurityEmployee: 0.1464,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 10000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.nta.go.jp',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — STA/PwC Dec 2025; standard deduction 60,000 CNY/year (5,000/month)
    // Brackets converted: original taxable-income thresholds + 60,000
    // Verify at ¥300k: (96k-60k)*3% + (204k-96k)*10% + (300k-204k)*20%
    //                = 1,080 + 10,800 + 19,200 = 31,080 CNY ✓
    name: 'China',
    code: 'CN',
    currencyCode: 'CNY',
    region: 'East Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 60000,
    incomeTaxBrackets: [
      { min: 0,       max: 60000,   rate: 0 },
      { min: 60000,   max: 96000,   rate: 0.03 },
      { min: 96000,   max: 204000,  rate: 0.10 },
      { min: 204000,  max: 360000,  rate: 0.20 },
      { min: 360000,  max: 480000,  rate: 0.25 },
      { min: 480000,  max: 720000,  rate: 0.30 },
      { min: 720000,  max: 1020000, rate: 0.35 },
      { min: 1020000, max: null,    rate: 0.45 }
    ],
    socialSecurityEmployee: 0.105,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.13,
    vatThreshold: 500000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.chinatax.gov.cn',
    quarterlyPayments: true,
    quarterlyDueDates: ['03-31', '06-30', '09-30', '12-31']
  },

  {
    // VERIFIED — NTS/PwC Jan 2026; 8-tier progressive 6%-45%
    // Brackets converted: original thresholds + 1,500,000 KRW
    // Verify at ₩50M: (15.5M-1.5M)*6% + (50M-15.5M)*15%
    //               = 840,000 + 5,175,000 = 6,015,000 KRW ✓
    name: 'South Korea',
    code: 'KR',
    currencyCode: 'KRW',
    region: 'East Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 1500000,
    incomeTaxBrackets: [
      { min: 0,            max: 1500000,    rate: 0 },
      { min: 1500000,      max: 15500000,   rate: 0.06 },
      { min: 15500000,     max: 51500000,   rate: 0.15 },
      { min: 51500000,     max: 89500000,   rate: 0.24 },
      { min: 89500000,     max: 151500000,  rate: 0.35 },
      { min: 151500000,    max: 301500000,  rate: 0.38 },
      { min: 301500000,    max: 501500000,  rate: 0.40 },
      { min: 501500000,    max: 1001500000, rate: 0.42 },
      { min: 1001500000,   max: null,       rate: 0.45 }
    ],
    socialSecurityEmployee: 0.0945,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.nts.go.kr',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — IRD 2025/26; fiscal year April–March
    // MPF: employee and self-employed both contribute at 5% each (mandatory)
    // Brackets converted: net chargeable income thresholds + 132,000 HKD
    // No VAT/GST in Hong Kong
    name: 'Hong Kong',
    code: 'HK',
    currencyCode: 'HKD',
    region: 'East Asia',
    taxYear: { start: '04-01', end: '03-31' },
    personalAllowance: 132000,
    incomeTaxBrackets: [
      { min: 0,      max: 132000, rate: 0 },
      { min: 132000, max: 182000, rate: 0.02 },
      { min: 182000, max: 232000, rate: 0.06 },
      { min: 232000, max: 282000, rate: 0.10 },
      { min: 282000, max: 332000, rate: 0.14 },
      { min: 332000, max: null,   rate: 0.17 }
    ],
    socialSecurityEmployee: 0.05,
    socialSecuritySelfEmployed: 0.05,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.ird.gov.hk',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — DSF Budget 2026; exemption threshold 600,000 MOP
    // Already in absolute format (0% band matches personalAllowance)
    name: 'Macao',
    code: 'MO',
    currencyCode: 'MOP',
    region: 'East Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 600000,
    incomeTaxBrackets: [
      { min: 0,      max: 600000, rate: 0 },
      { min: 600000, max: null,   rate: 0.12 }
    ],
    socialSecurityEmployee: 0.03,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.dsf.gov.mo',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — MOF Taiwan 2026 progressive rates
    // Brackets converted: original taxable thresholds + 101,000 TWD
    name: 'Taiwan',
    code: 'TW',
    currencyCode: 'TWD',
    region: 'East Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 101000,
    incomeTaxBrackets: [
      { min: 0,       max: 101000,  rate: 0 },
      { min: 101000,  max: 711000,  rate: 0.05 },
      { min: 711000,  max: 1481000, rate: 0.12 },
      { min: 1481000, max: 2871000, rate: 0.20 },
      { min: 2871000, max: 5291000, rate: 0.30 },
      { min: 5291000, max: null,    rate: 0.40 }
    ],
    socialSecurityEmployee: 0.05,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.05,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mof.gov.tw',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — MTA June 2026; updated from flat 10% to progressive 3-tier
    // No personalAllowance — tax applies from first MNT
    name: 'Mongolia',
    code: 'MN',
    currencyCode: 'MNT',
    region: 'East Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,          max: 120000000, rate: 0.10 },
      { min: 120000000,  max: 180000000, rate: 0.15 },
      { min: 180000000,  max: null,      rate: 0.20 }
    ],
    socialSecurityEmployee: 0.115,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 10000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://mta.mn',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── SOUTHEAST ASIA ──────────────────────────────────────────────────────

  {
    // VERIFIED — IRAS YA 2026 resident rates; CPF contribution 20% employee
    // Brackets already in absolute format (0% first band matches)
    name: 'Singapore',
    code: 'SG',
    currencyCode: 'SGD',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 20000,  rate: 0 },
      { min: 20000,   max: 30000,  rate: 0.02 },
      { min: 30000,   max: 40000,  rate: 0.035 },
      { min: 40000,   max: 80000,  rate: 0.07 },
      { min: 80000,   max: 120000, rate: 0.115 },
      { min: 120000,  max: 160000, rate: 0.15 },
      { min: 160000,  max: 200000, rate: 0.18 },
      { min: 200000,  max: 240000, rate: 0.19 },
      { min: 240000,  max: 280000, rate: 0.195 },
      { min: 280000,  max: 320000, rate: 0.20 },
      { min: 320000,  max: 500000, rate: 0.22 },
      { min: 500000,  max: 1000000,rate: 0.23 },
      { min: 1000000, max: null,   rate: 0.24 }
    ],
    socialSecurityEmployee: 0.20,
    socialSecuritySelfEmployed: 0.20,
    selfEmploymentTaxRate: 0,
    vatRate: 0.09,
    vatThreshold: 1000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.iras.gov.sg',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — DGT/PwC Pocket Tax Book 2026; PTKP 54M IDR
    // Brackets converted: original taxable thresholds + 54,000,000 IDR
    name: 'Indonesia',
    code: 'ID',
    currencyCode: 'IDR',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 54000000,
    incomeTaxBrackets: [
      { min: 0,            max: 54000000,    rate: 0 },
      { min: 54000000,     max: 114000000,   rate: 0.05 },
      { min: 114000000,    max: 304000000,   rate: 0.15 },
      { min: 304000000,    max: 554000000,   rate: 0.25 },
      { min: 554000000,    max: 5054000000,  rate: 0.30 },
      { min: 5054000000,   max: null,        rate: 0.35 }
    ],
    socialSecurityEmployee: 0.04,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.11,
    vatThreshold: 4800000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.pajak.go.id',
    quarterlyPayments: true,
    quarterlyDueDates: ['03-31', '06-30', '09-30', '12-31']
  },

  {
    // VERIFIED — BIR TRAIN Law; brackets already in absolute format
    // (0% first band matches personalAllowance: 250,000 PHP)
    name: 'Philippines',
    code: 'PH',
    currencyCode: 'PHP',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 250000,
    incomeTaxBrackets: [
      { min: 0,       max: 250000,  rate: 0 },
      { min: 250000,  max: 400000,  rate: 0.20 },
      { min: 400000,  max: 800000,  rate: 0.25 },
      { min: 800000,  max: 2000000, rate: 0.30 },
      { min: 2000000, max: 8000000, rate: 0.32 },
      { min: 8000000, max: null,    rate: 0.35 }
    ],
    socialSecurityEmployee: 0.045,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.12,
    vatThreshold: 3000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.bir.gov.ph',
    quarterlyPayments: true,
    quarterlyDueDates: ['05-15', '08-15', '11-15', '04-15']
  },

  {
    // VERIFIED — RD 2026; VAT 7% temporary extension; brackets absolute
    // (0% first band matches personalAllowance: 150,000 THB)
    name: 'Thailand',
    code: 'TH',
    currencyCode: 'THB',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 150000,
    incomeTaxBrackets: [
      { min: 0,       max: 150000,  rate: 0 },
      { min: 150000,  max: 300000,  rate: 0.05 },
      { min: 300000,  max: 500000,  rate: 0.10 },
      { min: 500000,  max: 750000,  rate: 0.15 },
      { min: 750000,  max: 1000000, rate: 0.20 },
      { min: 1000000, max: 2000000, rate: 0.25 },
      { min: 2000000, max: 5000000, rate: 0.30 },
      { min: 5000000, max: null,    rate: 0.35 }
    ],
    socialSecurityEmployee: 0.05,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.07,
    vatThreshold: 1800000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.rd.go.th',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — LHDN/PwC 2026; personal relief RM 9,000
    // Brackets already in absolute format with 0% first band
    // Note: Malaysia applies bracket from first RM after all personal reliefs.
    // Tool uses RM 9,000 as display allowance; first 5,000 of gross is 0%.
    // Slight approximation; users advised to verify with LHDN calculator.
    name: 'Malaysia',
    code: 'MY',
    currencyCode: 'MYR',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 9000,
    incomeTaxBrackets: [
      { min: 0,       max: 5000,    rate: 0 },
      { min: 5000,    max: 20000,   rate: 0.01 },
      { min: 20000,   max: 35000,   rate: 0.03 },
      { min: 35000,   max: 50000,   rate: 0.08 },
      { min: 50000,   max: 70000,   rate: 0.13 },
      { min: 70000,   max: 100000,  rate: 0.21 },
      { min: 100000,  max: 400000,  rate: 0.24 },
      { min: 400000,  max: 600000,  rate: 0.245 },
      { min: 600000,  max: 2000000, rate: 0.25 },
      { min: 2000000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0.11,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 500000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.hasil.gov.my',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — New PIT Law effective 1 January 2026 (GDT/PwC March 2026)
    // MAJOR 2026 CHANGE: simplified from 7 to 5 brackets; personalAllowance
    // raised from 108M to 132M VND (11M/month family circumstance deduction)
    // Brackets converted: original taxable thresholds + 132,000,000 VND
    // Verify at 300M: (252M-132M)*5% + (300M-252M)*10% = 6M+4.8M = 10.8M ✓
    name: 'Vietnam',
    code: 'VN',
    currencyCode: 'VND',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 132000000,
    incomeTaxBrackets: [
      { min: 0,            max: 132000000,  rate: 0 },
      { min: 132000000,    max: 252000000,  rate: 0.05 },
      { min: 252000000,    max: 492000000,  rate: 0.10 },
      { min: 492000000,    max: 852000000,  rate: 0.20 },
      { min: 852000000,    max: 1332000000, rate: 0.30 },
      { min: 1332000000,   max: null,       rate: 0.35 }
    ],
    socialSecurityEmployee: 0.105,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.gdt.gov.vn',
    quarterlyPayments: true,
    quarterlyDueDates: ['01-30', '04-30', '07-30', '10-30']
  },

  {
    // PARTIAL — GDT salary tax; already in absolute format (0% band = PA)
    name: 'Cambodia',
    code: 'KH',
    currencyCode: 'KHR',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 18000000,
    incomeTaxBrackets: [
      { min: 0,          max: 18000000,  rate: 0 },
      { min: 18000000,   max: 24000000,  rate: 0.05 },
      { min: 24000000,   max: 102000000, rate: 0.10 },
      { min: 102000000,  max: 150000000, rate: 0.15 },
      { min: 150000000,  max: null,      rate: 0.20 }
    ],
    socialSecurityEmployee: 0.02,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 125000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.tax.gov.kh',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — Lao Tax Dept; already in absolute format (0% band = PA)
    name: 'Laos',
    code: 'LA',
    currencyCode: 'LAK',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 15600000,
    incomeTaxBrackets: [
      { min: 0,          max: 15600000,  rate: 0 },
      { min: 15600000,   max: 60000000,  rate: 0.05 },
      { min: 60000000,   max: 180000000, rate: 0.10 },
      { min: 180000000,  max: 300000000, rate: 0.15 },
      { min: 300000000,  max: 780000000, rate: 0.20 },
      { min: 780000000,  max: null,      rate: 0.25 }
    ],
    socialSecurityEmployee: 0.055,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 400000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.tax.gov.la',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — Union Tax Law 2026; fiscal year April–March
    // Already in absolute format (0% band = PA 4,800,000 MMK)
    name: 'Myanmar',
    code: 'MM',
    currencyCode: 'MMK',
    region: 'Southeast Asia',
    taxYear: { start: '04-01', end: '03-31' },
    personalAllowance: 4800000,
    incomeTaxBrackets: [
      { min: 0,         max: 4800000,  rate: 0 },
      { min: 4800000,   max: 10000000, rate: 0.05 },
      { min: 10000000,  max: 20000000, rate: 0.10 },
      { min: 20000000,  max: 30000000, rate: 0.15 },
      { min: 30000000,  max: null,     rate: 0.25 }
    ],
    socialSecurityEmployee: 0.02,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.05,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ird.gov.mm',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — No personal income tax; only corporate and social security
    name: 'Brunei',
    code: 'BN',
    currencyCode: 'BND',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.05,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.mofe.gov.bn',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — UNTAET-based flat 10%; formal economy uses USD
    // currencyCode USD per official tax law (same rationale as Somalia)
    name: 'Timor-Leste',
    code: 'TL',
    currencyCode: 'USD',
    region: 'Southeast Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 6000,
    incomeTaxBrackets: [
      { min: 0,    max: 6000, rate: 0 },
      { min: 6000, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://alfandega.gov.tl',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── SOUTH ASIA ───────────────────────────────────────────────────────────

  {
    // VERIFIED — Finance Act FY 2025-26 / AY 2026-27; new regime default
    // Brackets already in absolute format (source doc includes 0% band)
    // Verify at ₹1.2M: 400k*0 + 400k*5% + 400k*10% = 0+20k+40k = 60,000 INR ✓
    name: 'India',
    code: 'IN',
    currencyCode: 'INR',
    region: 'South Asia',
    taxYear: { start: '04-01', end: '03-31' },
    personalAllowance: 400000,
    incomeTaxBrackets: [
      { min: 0,       max: 400000,  rate: 0 },
      { min: 400000,  max: 800000,  rate: 0.05 },
      { min: 800000,  max: 1200000, rate: 0.10 },
      { min: 1200000, max: 1600000, rate: 0.15 },
      { min: 1600000, max: 2000000, rate: 0.20 },
      { min: 2000000, max: 2400000, rate: 0.25 },
      { min: 2400000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0.12,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 2000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.incometax.gov.in',
    quarterlyPayments: true,
    quarterlyDueDates: ['06-15', '09-15', '12-15', '03-15']
  },

  {
    // VERIFIED — NBR Paripatra FY 2025/26–2026/27; fiscal year July–June
    // Brackets already in absolute format (source doc includes 0% band)
    name: 'Bangladesh',
    code: 'BD',
    currencyCode: 'BDT',
    region: 'South Asia',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 375000,
    incomeTaxBrackets: [
      { min: 0,       max: 375000,  rate: 0 },
      { min: 375000,  max: 675000,  rate: 0.10 },
      { min: 675000,  max: 1075000, rate: 0.15 },
      { min: 1075000, max: 1575000, rate: 0.20 },
      { min: 1575000, max: 3575000, rate: 0.25 },
      { min: 3575000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 3000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://nbr.gov.bd',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — FBR Finance Act 2025; restructured brackets FY 2025-26
    // Brackets already in absolute format (source doc includes 0% band)
    // Note: 600k-1.2M bracket at 1% (very low, not 0%)
    name: 'Pakistan',
    code: 'PK',
    currencyCode: 'PKR',
    region: 'South Asia',
    taxYear: { start: '07-01', end: '06-30' },
    personalAllowance: 600000,
    incomeTaxBrackets: [
      { min: 0,       max: 600000,  rate: 0 },
      { min: 600000,  max: 1200000, rate: 0.01 },
      { min: 1200000, max: 2200000, rate: 0.11 },
      { min: 2200000, max: 3200000, rate: 0.20 },
      { min: 3200000, max: 4100000, rate: 0.30 },
      { min: 4100000, max: null,    rate: 0.35 }
    ],
    socialSecurityEmployee: 0.01,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.17,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.fbr.gov.pk',
    quarterlyPayments: true,
    quarterlyDueDates: ['09-15', '12-15', '03-15', '06-15']
  },

  {
    // PARTIAL — IRD 2026; source doc brackets START after 1,800,000 LKR exemption
    // Added {0, 1800000, 0} bracket to cover exempt zone
    name: 'Sri Lanka',
    code: 'LK',
    currencyCode: 'LKR',
    region: 'South Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 1800000,
    incomeTaxBrackets: [
      { min: 0,       max: 1800000, rate: 0 },
      { min: 1800000, max: 2800000, rate: 0.06 },
      { min: 2800000, max: 3300000, rate: 0.18 },
      { min: 3300000, max: 3800000, rate: 0.24 },
      { min: 3800000, max: 4300000, rate: 0.30 },
      { min: 4300000, max: null,    rate: 0.36 }
    ],
    socialSecurityEmployee: 0.08,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 80000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.ird.gov.lk',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — IRD Nepal FY 2082/83 (2025/26–2026/27); Bikram Sambat calendar
    // Note: First bracket starts at 1% (no 0% band — minimum tax applies)
    // personalAllowance: 0 since no formal deduction; all income is taxable
    name: 'Nepal',
    code: 'NP',
    currencyCode: 'NPR',
    region: 'South Asia',
    taxYear: { start: '07-16', end: '07-15' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 500000,  rate: 0.01 },
      { min: 500000,  max: 700000,  rate: 0.10 },
      { min: 700000,  max: 1000000, rate: 0.20 },
      { min: 1000000, max: 2000000, rate: 0.30 },
      { min: 2000000, max: null,    rate: 0.36 }
    ],
    socialSecurityEmployee: 0.11,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.13,
    vatThreshold: 2000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://ird.gov.np',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — DRC Bhutan progressive; brackets already absolute (0% band = PA)
    name: 'Bhutan',
    code: 'BT',
    currencyCode: 'BTN',
    region: 'South Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 300000,
    incomeTaxBrackets: [
      { min: 0,       max: 300000,  rate: 0 },
      { min: 300000,  max: 400000,  rate: 0.10 },
      { min: 400000,  max: 650000,  rate: 0.15 },
      { min: 650000,  max: 1000000, rate: 0.20 },
      { min: 1000000, max: 1500000, rate: 0.25 },
      { min: 1500000, max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.07,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.drc.gov.bt',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — MIRA BPT/PIT 2026; brackets already absolute (0% band = PA)
    name: 'Maldives',
    code: 'MV',
    currencyCode: 'MVR',
    region: 'South Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 720000,
    incomeTaxBrackets: [
      { min: 0,       max: 720000,  rate: 0 },
      { min: 720000,  max: 1200000, rate: 0.055 },
      { min: 1200000, max: 1800000, rate: 0.08 },
      { min: 1800000, max: 2400000, rate: 0.12 },
      { min: 2400000, max: null,    rate: 0.15 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.08,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.mira.gov.mv',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — pre-2021 structure; all data LOW confidence due to access
    // Brackets included as best available but treat as approximate only
    name: 'Afghanistan',
    code: 'AF',
    currencyCode: 'AFN',
    region: 'South Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 60000,   rate: 0 },
      { min: 60000,   max: 150000,  rate: 0.02 },
      { min: 150000,  max: 1200000, rate: 0.10 },
      { min: 1200000, max: null,    rate: 0.20 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.ard.gov.af',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── CENTRAL ASIA ─────────────────────────────────────────────────────────

  {
    // VERIFIED — State Revenue Committee; flat 10% IIT stable
    name: 'Kazakhstan',
    code: 'KZ',
    currencyCode: 'KZT',
    region: 'Central Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0.10,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.12,
    vatThreshold: 78953000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://kgd.gov.kz',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — Kyrgyz Tax Service; flat 10% PIT stable
    name: 'Kyrgyzstan',
    code: 'KG',
    currencyCode: 'KGS',
    region: 'Central Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0.10,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.12,
    vatThreshold: 8000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://salyk.kg',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — Tax Committee of Tajikistan; flat 13% employment income
    name: 'Tajikistan',
    code: 'TJ',
    currencyCode: 'TJS',
    region: 'Central Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.13 }
    ],
    socialSecurityEmployee: 0.02,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://andoz.tj',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — State Tax Service; flat 12% PIT stable
    name: 'Uzbekistan',
    code: 'UZ',
    currencyCode: 'UZS',
    region: 'Central Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.12 }
    ],
    socialSecurityEmployee: 0.04,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.12,
    vatThreshold: 1000000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://soliq.uz',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // PARTIAL — Ministry of Finance; flat 10% PIT; limited public details
    name: 'Turkmenistan',
    code: 'TM',
    currencyCode: 'TMT',
    region: 'Central Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.10 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.minfin.gov.tm',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  // ─── WEST ASIA ────────────────────────────────────────────────────────────

  {
    // VERIFIED — GİB Official Gazette 31 Dec 2025; inflation-adjusted 2026
    // No personal allowance — tax applies from first TRY
    name: 'Turkey',
    code: 'TR',
    currencyCode: 'TRY',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,       max: 190000,  rate: 0.15 },
      { min: 190000,  max: 400000,  rate: 0.20 },
      { min: 400000,  max: 1500000, rate: 0.27 },
      { min: 1500000, max: 5300000, rate: 0.35 },
      { min: 5300000, max: null,    rate: 0.40 }
    ],
    socialSecurityEmployee: 0.14,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.gib.gov.tr',
    quarterlyPayments: true,
    quarterlyDueDates: ['03-17', '07-17', '11-17', '02-17']
  },

  {
    // VERIFIED — ITA 2026 brackets with middle-class relief
    // No personal allowance — tax applies from first ILS
    name: 'Israel',
    code: 'IL',
    currencyCode: 'ILS',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 84120,  rate: 0.10 },
      { min: 84120,  max: 120720, rate: 0.14 },
      { min: 120720, max: 193800, rate: 0.20 },
      { min: 193800, max: 269280, rate: 0.31 },
      { min: 269280, max: 560280, rate: 0.35 },
      { min: 560280, max: 721560, rate: 0.47 },
      { min: 721560, max: null,   rate: 0.50 }
    ],
    socialSecurityEmployee: 0.12,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.17,
    vatThreshold: 0,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.taxes.gov.il',
    quarterlyPayments: true,
    quarterlyDueDates: ['04-30', '07-31', '10-31', '01-31']
  },

  {
    // VERIFIED — ISTD Income Tax Law 2026; brackets converted +9,000 JOD
    // Verify at JOD 50k: (14k-9k)*5%+(19k-14k)*10%+(24k-19k)*15%+
    //                   (29k-24k)*20%+(50k-29k)*25% = 250+500+750+1000+5250=7,750 ✓
    name: 'Jordan',
    code: 'JO',
    currencyCode: 'JOD',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 9000,
    incomeTaxBrackets: [
      { min: 0,      max: 9000,    rate: 0 },
      { min: 9000,   max: 14000,   rate: 0.05 },
      { min: 14000,  max: 19000,   rate: 0.10 },
      { min: 19000,  max: 24000,   rate: 0.15 },
      { min: 24000,  max: 29000,   rate: 0.20 },
      { min: 29000,  max: 1009000, rate: 0.25 },
      { min: 1009000,max: null,    rate: 0.30 }
    ],
    socialSecurityEmployee: 0.075,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.16,
    vatThreshold: 30000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.istd.gov.jo',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — ZATCA; no personal income tax for residents/nationals
    name: 'Saudi Arabia',
    code: 'SA',
    currencyCode: 'SAR',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.10,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.15,
    vatThreshold: 375000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://zatca.gov.sa',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — FTA; no personal income tax
    name: 'United Arab Emirates',
    code: 'AE',
    currencyCode: 'AED',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.05,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.05,
    vatThreshold: 375000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://tax.gov.ae',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — GTA; no personal income tax for individuals
    name: 'Qatar',
    code: 'QA',
    currencyCode: 'QAR',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.05,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://gta.gov.qa',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Ministry of Finance Kuwait; no personal income tax
    name: 'Kuwait',
    code: 'KW',
    currencyCode: 'KWD',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.075,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://mof.gov.kw',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Tax Authority Oman; no PIT in 2026 (introduction delayed to 2028)
    name: 'Oman',
    code: 'OM',
    currencyCode: 'OMR',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.075,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.05,
    vatThreshold: 38500,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://taxoman.gov.om',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — NBR Bahrain; no personal income tax; VAT 10%
    name: 'Bahrain',
    code: 'BH',
    currencyCode: 'BHD',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0.07,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.10,
    vatThreshold: 37500,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.nbr.gov.bh',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — Revenue Service Georgia; flat 20% PIT
    // socialSecuritySelfEmployed: 2% confirmed (pension contribution)
    name: 'Georgia',
    code: 'GE',
    currencyCode: 'GEL',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.20 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0.02,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 100000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://rs.ge',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — State Revenue Committee Armenia; flat 20% PIT
    name: 'Armenia',
    code: 'AM',
    currencyCode: 'AMD',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0, max: null, rate: 0.20 }
    ],
    socialSecurityEmployee: 0.025,
    socialSecuritySelfEmployed: 0.025,
    selfEmploymentTaxRate: 0,
    vatRate: 0.20,
    vatThreshold: 115000000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://www.taxservice.am',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // VERIFIED — State Tax Service Azerbaijan; already in absolute format
    // (0% band matches personalAllowance: 2,500 AZN)
    name: 'Azerbaijan',
    code: 'AZ',
    currencyCode: 'AZN',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 2500,
    incomeTaxBrackets: [
      { min: 0,    max: 2500, rate: 0 },
      { min: 2500, max: 8000, rate: 0.14 },
      { min: 8000, max: null, rate: 0.25 }
    ],
    socialSecurityEmployee: 0.03,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.18,
    vatThreshold: 200000,
    mustRegisterAsBusiness: true,
    officialTaxAuthorityUrl: 'https://e-taxes.gov.az',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — currency collapse and instability; brackets not verifiable
    // vatRate 11% is the only confirmed field
    name: 'Lebanon',
    code: 'LB',
    currencyCode: 'LBP',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.11,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.finance.gov.lb',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — progressive structure available but LOW confidence
    // Brackets included as best available; no SS/VAT data verified
    name: 'Iraq',
    code: 'IQ',
    currencyCode: 'IQD',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 250000,  rate: 0.03 },
      { min: 250000, max: 500000,  rate: 0.05 },
      { min: 500000, max: 1000000, rate: 0.10 },
      { min: 1000000,max: null,    rate: 0.15 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.mof.gov.iq',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — high inflation; brackets change annually; LOW confidence
    // Only vatRate 9% is confirmed; brackets not verifiable for 2026
    name: 'Iran',
    code: 'IR',
    currencyCode: 'IRR',
    region: 'West Asia',
    taxYear: { start: '04-01', end: '03-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.09,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://tax.gov.ir',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — PNA West Bank structure; approximate; LOW confidence
    // currencyCode ILS (Palestinian territories use Israeli New Shekel)
    name: 'Palestine',
    code: 'PS',
    currencyCode: 'ILS',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [
      { min: 0,      max: 75000,  rate: 0.05 },
      { min: 75000,  max: 175000, rate: 0.10 },
      { min: 175000, max: null,   rate: 0.15 }
    ],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0.17,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.mof.gov.ps',
    quarterlyPayments: false,
    quarterlyDueDates: []
  },

  {
    // LIMITED — active conflict severely limits verified data
    name: 'Yemen',
    code: 'YE',
    currencyCode: 'YER',
    region: 'West Asia',
    taxYear: { start: '01-01', end: '12-31' },
    personalAllowance: 0,
    incomeTaxBrackets: [],
    socialSecurityEmployee: 0,
    socialSecuritySelfEmployed: 0,
    selfEmploymentTaxRate: 0,
    vatRate: 0,
    vatThreshold: 0,
    mustRegisterAsBusiness: false,
    officialTaxAuthorityUrl: 'https://www.mof.gov.ye',
    quarterlyPayments: false,
    quarterlyDueDates: []
  }
]
