/**
 * src/data/exchangeRates.js
 *
 * Static currency reference data for all 195 countries. Bundled at build
 * time — this is what makes multi-currency conversion and country
 * comparison work fully offline.
 *
 * RATE CONVENTION: rate = units of that currency per 1 USD.
 *   e.g. EUR rate 0.92 means 1 USD = 0.92 EUR.
 *   USD itself is the base, rate = 1.0, by definition.
 *
 * DECIMALS: the number of minor-unit digits conventionally displayed for
 * that currency (ISO 4217 practice) — read by formatters.js (msg 18) so
 * "¥1,520" renders correctly while "$1,520.00" does too.
 *
 * MAINTENANCE: rates below are accurate as of RATES_LAST_UPDATED. Forex
 * rates drift continuously — this is normal for any finance app, exactly
 * like tax brackets needing periodic updates when laws change. Updating
 * is a single edit to this one file: change the rate values, bump
 * RATES_LAST_UPDATED, commit. No other file references individual rates
 * directly — currencyConverter.js (msg 18) reads this object at call time.
 *
 * Recommended update cadence: quarterly, or whenever a currency moves
 * more than ~10% (high-volatility currencies — ARS, TRY, VES, LBP, IRR,
 * SSP, ETB, EGP, NGN, MWK — may warrant more frequent updates than the
 * pegged/stable majority).
 */

export const BASE_CURRENCY = 'USD'
export const RATES_LAST_UPDATED = '2026-06-01'

export const CURRENCIES = {

  // ─── Base ──────────────────────────────────────────────────────────────
  USD: { name: 'US Dollar',                symbol: '$',   decimals: 2, rate: 1 },

  // ─── Africa (38 currencies) ─────────────────────────────────────────────
  NGN: { name: 'Nigerian Naira',           symbol: '₦',   decimals: 2, rate: 1550 },
  GHS: { name: 'Ghanaian Cedi',            symbol: 'GH₵', decimals: 2, rate: 15.5 },
  ZAR: { name: 'South African Rand',       symbol: 'R',   decimals: 2, rate: 18.5 },
  KES: { name: 'Kenyan Shilling',          symbol: 'KSh', decimals: 2, rate: 129 },
  TZS: { name: 'Tanzanian Shilling',       symbol: 'TSh', decimals: 2, rate: 2700 },
  UGX: { name: 'Ugandan Shilling',         symbol: 'USh', decimals: 0, rate: 3700 },
  ETB: { name: 'Ethiopian Birr',           symbol: 'Br',  decimals: 2, rate: 125 },
  EGP: { name: 'Egyptian Pound',           symbol: 'E£',  decimals: 2, rate: 50 },
  MAD: { name: 'Moroccan Dirham',          symbol: 'MAD', decimals: 2, rate: 9.8 },
  TND: { name: 'Tunisian Dinar',           symbol: 'DT',  decimals: 3, rate: 3.1 },
  DZD: { name: 'Algerian Dinar',           symbol: 'DA',  decimals: 2, rate: 134 },
  LYD: { name: 'Libyan Dinar',             symbol: 'LD',  decimals: 3, rate: 4.8 },
  XOF: { name: 'West African CFA Franc',   symbol: 'CFA', decimals: 0, rate: 605 },
  XAF: { name: 'Central African CFA Franc',symbol: 'FCFA',decimals: 0, rate: 605 },
  RWF: { name: 'Rwandan Franc',            symbol: 'FRw', decimals: 0, rate: 1340 },
  BIF: { name: 'Burundian Franc',          symbol: 'FBu', decimals: 2, rate: 2900 },
  MGA: { name: 'Malagasy Ariary',          symbol: 'Ar',  decimals: 0, rate: 4600 },
  MZN: { name: 'Mozambican Metical',       symbol: 'MT',  decimals: 2, rate: 64 },
  AOA: { name: 'Angolan Kwanza',           symbol: 'Kz',  decimals: 2, rate: 920 },
  ZMW: { name: 'Zambian Kwacha',           symbol: 'ZK',  decimals: 2, rate: 27 },
  ZWG: { name: 'Zimbabwe Gold',            symbol: 'ZiG', decimals: 2, rate: 14 },
  BWP: { name: 'Botswana Pula',            symbol: 'P',   decimals: 2, rate: 13.6 },
  NAD: { name: 'Namibian Dollar',          symbol: 'N$',  decimals: 2, rate: 18.5 },
  SZL: { name: 'Swazi Lilangeni',          symbol: 'L',   decimals: 2, rate: 18.5 },
  LSL: { name: 'Lesotho Loti',             symbol: 'L',   decimals: 2, rate: 18.5 },
  MWK: { name: 'Malawian Kwacha',          symbol: 'MK',  decimals: 2, rate: 1750 },
  SLE: { name: 'Sierra Leonean Leone',     symbol: 'Le',  decimals: 2, rate: 22.5 },
  LRD: { name: 'Liberian Dollar',          symbol: 'L$',  decimals: 2, rate: 190 },
  GMD: { name: 'Gambian Dalasi',           symbol: 'D',   decimals: 2, rate: 71 },
  GNF: { name: 'Guinean Franc',            symbol: 'FG',  decimals: 0, rate: 8600 },
  CVE: { name: 'Cape Verdean Escudo',      symbol: '$',   decimals: 2, rate: 101 },
  STN: { name: 'São Tomé Dobra',           symbol: 'Db',  decimals: 2, rate: 22.8 },
  SCR: { name: 'Seychellois Rupee',        symbol: 'SR',  decimals: 2, rate: 13.7 },
  MUR: { name: 'Mauritian Rupee',          symbol: '₨',   decimals: 2, rate: 46 },
  KMF: { name: 'Comorian Franc',           symbol: 'CF',  decimals: 0, rate: 452 },
  DJF: { name: 'Djiboutian Franc',         symbol: 'Fdj', decimals: 0, rate: 178 },
  SOS: { name: 'Somali Shilling',          symbol: 'Sh',  decimals: 2, rate: 571 },
  SSP: { name: 'South Sudanese Pound',     symbol: 'SSP', decimals: 2, rate: 4500 },
  SDG: { name: 'Sudanese Pound',           symbol: 'SDG', decimals: 2, rate: 600 },
  ERN: { name: 'Eritrean Nakfa',           symbol: 'Nfk', decimals: 2, rate: 15 },
  CDF: { name: 'Congolese Franc',          symbol: 'FC',  decimals: 2, rate: 2850 },

  // ─── Asia (45 currencies) ────────────────────────────────────────────────
  CNY: { name: 'Chinese Yuan',             symbol: '¥',   decimals: 2, rate: 7.25 },
  JPY: { name: 'Japanese Yen',             symbol: '¥',   decimals: 0, rate: 152 },
  KRW: { name: 'South Korean Won',         symbol: '₩',   decimals: 0, rate: 1380 },
  KPW: { name: 'North Korean Won',         symbol: '₩',   decimals: 2, rate: 108 },
  INR: { name: 'Indian Rupee',             symbol: '₹',   decimals: 2, rate: 85.5 },
  PKR: { name: 'Pakistani Rupee',          symbol: '₨',   decimals: 2, rate: 280 },
  BDT: { name: 'Bangladeshi Taka',         symbol: '৳',   decimals: 2, rate: 122 },
  LKR: { name: 'Sri Lankan Rupee',         symbol: 'Rs',  decimals: 2, rate: 300 },
  NPR: { name: 'Nepalese Rupee',           symbol: '₨',   decimals: 2, rate: 136 },
  IDR: { name: 'Indonesian Rupiah',        symbol: 'Rp',  decimals: 0, rate: 16200 },
  PHP: { name: 'Philippine Peso',          symbol: '₱',   decimals: 2, rate: 58.5 },
  VND: { name: 'Vietnamese Dong',          symbol: '₫',   decimals: 0, rate: 25400 },
  THB: { name: 'Thai Baht',                symbol: '฿',   decimals: 2, rate: 34.5 },
  MYR: { name: 'Malaysian Ringgit',        symbol: 'RM',  decimals: 2, rate: 4.45 },
  SGD: { name: 'Singapore Dollar',         symbol: 'S$',  decimals: 2, rate: 1.35 },
  BND: { name: 'Brunei Dollar',            symbol: 'B$',  decimals: 2, rate: 1.35 },
  MMK: { name: 'Myanmar Kyat',             symbol: 'K',   decimals: 2, rate: 2100 },
  KHR: { name: 'Cambodian Riel',           symbol: '៛',   decimals: 2, rate: 4100 },
  LAK: { name: 'Lao Kip',                  symbol: '₭',   decimals: 0, rate: 21800 },
  MNT: { name: 'Mongolian Tögrög',         symbol: '₮',   decimals: 2, rate: 3450 },
  KZT: { name: 'Kazakhstani Tenge',        symbol: '₸',   decimals: 2, rate: 495 },
  UZS: { name: 'Uzbekistani Som',          symbol: "so'm",decimals: 2, rate: 12800 },
  KGS: { name: 'Kyrgyzstani Som',          symbol: 'с',   decimals: 2, rate: 87 },
  TJS: { name: 'Tajikistani Somoni',       symbol: 'ЅМ',  decimals: 2, rate: 10.9 },
  TMT: { name: 'Turkmenistani Manat',      symbol: 'm',   decimals: 2, rate: 3.5 },
  AFN: { name: 'Afghan Afghani',           symbol: '؋',   decimals: 2, rate: 70 },
  SAR: { name: 'Saudi Riyal',              symbol: '﷼',   decimals: 2, rate: 3.75 },
  AED: { name: 'UAE Dirham',               symbol: 'د.إ', decimals: 2, rate: 3.67 },
  QAR: { name: 'Qatari Riyal',             symbol: '﷼',   decimals: 2, rate: 3.64 },
  KWD: { name: 'Kuwaiti Dinar',            symbol: 'KD',  decimals: 3, rate: 0.307 },
  BHD: { name: 'Bahraini Dinar',           symbol: '.د.ب',decimals: 3, rate: 0.376 },
  OMR: { name: 'Omani Rial',               symbol: '﷼',   decimals: 3, rate: 0.385 },
  JOD: { name: 'Jordanian Dinar',          symbol: 'JD',  decimals: 3, rate: 0.709 },
  LBP: { name: 'Lebanese Pound',           symbol: 'ل.ل', decimals: 2, rate: 89500 },
  SYP: { name: 'Syrian Pound',             symbol: '£S',  decimals: 2, rate: 13000 },
  IQD: { name: 'Iraqi Dinar',              symbol: 'ع.د', decimals: 2, rate: 1310 },
  YER: { name: 'Yemeni Rial',              symbol: '﷼',   decimals: 2, rate: 1700 },
  ILS: { name: 'Israeli New Shekel',       symbol: '₪',   decimals: 2, rate: 3.65 },
  TRY: { name: 'Turkish Lira',             symbol: '₺',   decimals: 2, rate: 38 },
  IRR: { name: 'Iranian Rial',             symbol: '﷼',   decimals: 2, rate: 620000 },
  AZN: { name: 'Azerbaijani Manat',        symbol: '₼',   decimals: 2, rate: 1.70 },
  GEL: { name: 'Georgian Lari',            symbol: '₾',   decimals: 2, rate: 2.75 },
  AMD: { name: 'Armenian Dram',            symbol: '֏',   decimals: 2, rate: 390 },
  TWD: { name: 'Taiwan Dollar',            symbol: 'NT$', decimals: 2, rate: 32.3 },
  HKD: { name: 'Hong Kong Dollar',         symbol: 'HK$', decimals: 2, rate: 7.80 },
  MOP: { name: 'Macanese Pataca',          symbol: 'MOP$',decimals: 2, rate: 8.0 },

  // ─── Europe (20 currencies) ──────────────────────────────────────────────
  EUR: { name: 'Euro',                     symbol: '€',   decimals: 2, rate: 0.92 },
  GBP: { name: 'British Pound',            symbol: '£',   decimals: 2, rate: 0.785 },
  CHF: { name: 'Swiss Franc',              symbol: 'CHF', decimals: 2, rate: 0.88 },
  NOK: { name: 'Norwegian Krone',          symbol: 'kr',  decimals: 2, rate: 10.6 },
  SEK: { name: 'Swedish Krona',            symbol: 'kr',  decimals: 2, rate: 10.4 },
  DKK: { name: 'Danish Krone',             symbol: 'kr',  decimals: 2, rate: 6.85 },
  ISK: { name: 'Icelandic Króna',          symbol: 'kr',  decimals: 0, rate: 138 },
  PLN: { name: 'Polish Złoty',             symbol: 'zł',  decimals: 2, rate: 3.95 },
  CZK: { name: 'Czech Koruna',             symbol: 'Kč',  decimals: 2, rate: 23.5 },
  HUF: { name: 'Hungarian Forint',         symbol: 'Ft',  decimals: 0, rate: 378 },
  RON: { name: 'Romanian Leu',             symbol: 'lei', decimals: 2, rate: 4.58 },
  BGN: { name: 'Bulgarian Lev',            symbol: 'лв',  decimals: 2, rate: 1.80 },
  RSD: { name: 'Serbian Dinar',            symbol: 'дин', decimals: 2, rate: 107.5 },
  BAM: { name: 'Bosnia Convertible Mark',  symbol: 'KM',  decimals: 2, rate: 1.80 },
  MKD: { name: 'Macedonian Denar',         symbol: 'ден', decimals: 2, rate: 56.5 },
  ALL: { name: 'Albanian Lek',             symbol: 'L',   decimals: 2, rate: 92 },
  MDL: { name: 'Moldovan Leu',             symbol: 'L',   decimals: 2, rate: 17.7 },
  UAH: { name: 'Ukrainian Hryvnia',        symbol: '₴',   decimals: 2, rate: 41.5 },
  BYN: { name: 'Belarusian Ruble',         symbol: 'Br',  decimals: 2, rate: 3.27 },
  RUB: { name: 'Russian Ruble',            symbol: '₽',   decimals: 2, rate: 92 },

  // ─── Americas (25 currencies, plus USD already defined above) ────────────
  CAD: { name: 'Canadian Dollar',          symbol: 'C$',  decimals: 2, rate: 1.39 },
  MXN: { name: 'Mexican Peso',             symbol: 'Mex$',decimals: 2, rate: 18.7 },
  BRL: { name: 'Brazilian Real',           symbol: 'R$',  decimals: 2, rate: 5.65 },
  ARS: { name: 'Argentine Peso',           symbol: '$',   decimals: 2, rate: 1150 },
  CLP: { name: 'Chilean Peso',             symbol: '$',   decimals: 0, rate: 960 },
  COP: { name: 'Colombian Peso',           symbol: '$',   decimals: 2, rate: 4150 },
  PEN: { name: 'Peruvian Sol',             symbol: 'S/',  decimals: 2, rate: 3.75 },
  UYU: { name: 'Uruguayan Peso',           symbol: '$U',  decimals: 2, rate: 41.5 },
  PYG: { name: 'Paraguayan Guaraní',       symbol: '₲',   decimals: 0, rate: 7850 },
  BOB: { name: 'Bolivian Boliviano',       symbol: 'Bs',  decimals: 2, rate: 6.91 },
  VES: { name: 'Venezuelan Bolívar',       symbol: 'Bs',  decimals: 2, rate: 250 },
  GYD: { name: 'Guyanese Dollar',          symbol: 'G$',  decimals: 2, rate: 209 },
  SRD: { name: 'Surinamese Dollar',        symbol: '$',   decimals: 2, rate: 38 },
  GTQ: { name: 'Guatemalan Quetzal',       symbol: 'Q',   decimals: 2, rate: 7.75 },
  HNL: { name: 'Honduran Lempira',         symbol: 'L',   decimals: 2, rate: 25.5 },
  NIO: { name: 'Nicaraguan Córdoba',       symbol: 'C$',  decimals: 2, rate: 36.8 },
  CRC: { name: 'Costa Rican Colón',        symbol: '₡',   decimals: 2, rate: 505 },
  PAB: { name: 'Panamanian Balboa',        symbol: 'B/.', decimals: 2, rate: 1.00 },
  DOP: { name: 'Dominican Peso',           symbol: 'RD$', decimals: 2, rate: 60.5 },
  HTG: { name: 'Haitian Gourde',           symbol: 'G',   decimals: 2, rate: 132 },
  JMD: { name: 'Jamaican Dollar',          symbol: 'J$',  decimals: 2, rate: 158 },
  TTD: { name: 'Trinidad & Tobago Dollar', symbol: 'TT$', decimals: 2, rate: 6.80 },
  BBD: { name: 'Barbadian Dollar',         symbol: 'Bds$',decimals: 2, rate: 2.00 },
  BSD: { name: 'Bahamian Dollar',          symbol: 'B$',  decimals: 2, rate: 1.00 },
  BZD: { name: 'Belize Dollar',            symbol: 'BZ$', decimals: 2, rate: 2.00 },
  XCD: { name: 'East Caribbean Dollar',    symbol: 'EC$', decimals: 2, rate: 2.70 },

  // ─── Oceania (9 currencies) ──────────────────────────────────────────────
  AUD: { name: 'Australian Dollar',        symbol: 'A$',  decimals: 2, rate: 1.52 },
  NZD: { name: 'New Zealand Dollar',       symbol: 'NZ$', decimals: 2, rate: 1.65 },
  FJD: { name: 'Fijian Dollar',            symbol: 'FJ$', decimals: 2, rate: 2.27 },
  PGK: { name: 'Papua New Guinean Kina',   symbol: 'K',   decimals: 2, rate: 4.05 },
  WST: { name: 'Samoan Tālā',              symbol: 'WS$', decimals: 2, rate: 2.75 },
  TOP: { name: "Tongan Paʻanga",           symbol: 'T$',  decimals: 2, rate: 2.36 },
  VUV: { name: 'Vanuatu Vatu',             symbol: 'VT',  decimals: 0, rate: 119 },
  SBD: { name: 'Solomon Islands Dollar',   symbol: 'SI$', decimals: 2, rate: 8.45 },
  XPF: { name: 'CFP Franc',                symbol: '₣',   decimals: 0, rate: 110 }
}

// ── Helpers ──────────────────────────────────────────────────────────────

/**
 * Safe lookup — falls back to USD if a country's currencyCode somehow
 * doesn't match an entry here (shouldn't happen if countries.js stays in
 * sync with this list, but prevents a crash rather than a blank screen
 * if it ever drifts).
 */
export function getCurrency(code) {
  return CURRENCIES[code] || CURRENCIES[BASE_CURRENCY]
}

// Flat list of all supported codes — used by currencyConverter.js for
// validation and by any UI that needs to enumerate currencies (e.g. the
// "5 income streams, each in a different currency" picker).
export const CURRENCY_CODES = Object.keys(CURRENCIES)
