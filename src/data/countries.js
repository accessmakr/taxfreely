/**
 * src/data/countries.js
 *
 * Final assembly — all 196 sovereign states and jurisdictions across
 * five continents. Assembled from five continent files, each verified
 * against PwC Worldwide Tax Summaries 2025/2026 and official tax
 * authority sources.
 *
 * COUNT: Africa 54 + Asia 48 + Europe 45 + Americas 35 + Oceania 14 = 196
 * (Original plan was 195; 196 reflects inclusion of Kosovo as a separate
 * entry alongside all universally recognised sovereign states.)
 *
 * PENDING FIXES (apply in end-of-sequence patch):
 *   exchangeRates.js: add MRU (Mauritanian Ouguiya, rate: 39.5)
 *   exchangeRates.js: add BTN (Bhutanese Ngultrum, rate: 85.5 — pegged to INR)
 *   exchangeRates.js: add MVR (Maldivian Rufiyaa, rate: 15.4)
 *   countries_africa.js: South Africa — add {0, 95750, 0} first bracket
 *
 * USAGE:
 *   import { COUNTRIES, getCountry, searchCountries } from './countries'
 */

import { AFRICA }   from './countries_africa.js'
import { ASIA }     from './countries_asia.js'
import { EUROPE }   from './countries_europe.js'
import { AMERICAS } from './countries_americas.js'
import { OCEANIA }  from './countries_oceania.js'

// ── Master array (insertion order: Africa → Asia → Europe → Americas → Oceania)
export const COUNTRIES = [
  ...AFRICA,
  ...ASIA,
  ...EUROPE,
  ...AMERICAS,
  ...OCEANIA,
]

export const TOTAL_COUNTRIES = COUNTRIES.length   // 196

// ── O(1) lookup by ISO 3166-1 alpha-2 code
export const COUNTRIES_BY_CODE = Object.fromEntries(
  COUNTRIES.map(c => [c.code, c])
)

// ── Grouped by continent sub-region
export const COUNTRIES_BY_REGION = COUNTRIES.reduce((acc, c) => {
  const key = c.region
  if (!acc[key]) acc[key] = []
  acc[key].push(c)
  return acc
}, {})

// ── All unique region strings, alphabetically
export const REGIONS = [...new Set(COUNTRIES.map(c => c.region))].sort()

// ── All unique currency codes referenced by any country
export const USED_CURRENCY_CODES = [...new Set(COUNTRIES.map(c => c.currencyCode))]

// ────────────────────────────────────────────────────────────────────────────
// Helper functions
// ────────────────────────────────────────────────────────────────────────────

/**
 * Look up a country by ISO code. Returns null if not found.
 * @param {string} code — ISO 3166-1 alpha-2 (e.g. 'GB', 'NG', 'JP')
 * @returns {object|null}
 */
export function getCountry(code) {
  return COUNTRIES_BY_CODE[code] ?? null
}

/**
 * Search countries by name (case-insensitive partial match).
 * Used by CountrySelector.jsx autocomplete.
 * @param {string} query
 * @param {number} limit — max results to return (default 20)
 * @returns {Array}
 */
export function searchCountries(query, limit = 20) {
  if (!query || query.trim().length === 0) return COUNTRIES.slice(0, limit)
  const q = query.trim().toLowerCase()
  return COUNTRIES
    .filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q)
    .slice(0, limit)
}

/**
 * Get all countries in a given region.
 * @param {string} region — must match one of the REGIONS values
 * @returns {Array}
 */
export function getCountriesByRegion(region) {
  return COUNTRIES_BY_REGION[region] ?? []
}

/**
 * Returns true if the country has verifiable income tax bracket data.
 * Countries with empty brackets [] (no PIT, war zones, etc.) return false.
 * Used by the calculator to show a "data not available" state.
 * @param {object} country
 * @returns {boolean}
 */
export function hasTaxData(country) {
  return Array.isArray(country.incomeTaxBrackets) &&
         country.incomeTaxBrackets.length > 0
}

/**
 * Returns a safe country object for any component that received an
 * unrecognised code. Falls back to US so the UI never crashes.
 * @param {string} code
 * @returns {object}
 */
export function getCountrySafe(code) {
  return COUNTRIES_BY_CODE[code] ?? COUNTRIES_BY_CODE['US']
}
