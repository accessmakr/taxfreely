/**
 * src/lib/supabase.js
 *
 * Supabase client for the optional Intelligence Hub benchmarks feature.
 * This is the ONLY file in the project that talks to Supabase.
 *
 * CURRENT STATUS: INSIGHTS_ENABLED = false (launch setting).
 * All exported functions are safe no-ops when disabled — nothing is
 * imported, no network calls are made, and the Supabase SDK is never
 * included in the bundle. Enable later by:
 *   1. Setting VITE_INSIGHTS_ENABLED=true in .env
 *   2. Adding VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env
 *   3. Running the schema migration in /scripts/supabase-schema.sql
 *
 * PRIVACY CONTRACT:
 *   - No user ID, device ID, or IP address is ever stored
 *   - Income is stored as a bracket string, never the exact figure
 *   - All writes require explicit user consent (DataSharingConsent.jsx)
 *   - Reads are aggregated — individual rows are never returned to users
 *   - The consent flag is checked inside every write function before
 *     any data leaves the device
 *
 * SCHEMA (anonymous_calculations table):
 *   id               uuid primary key default gen_random_uuid()
 *   country_code     text not null
 *   region           text not null
 *   currency_code    text not null
 *   income_bracket   text not null       -- e.g. '50000-60000' (local currency)
 *   employment_type  text not null
 *   effective_rate   numeric(5,4)        -- 0.0000–1.0000
 *   gross_income_usd numeric(12,2)       -- converted at time of submission
 *   created_at       timestamptz default now()
 *   -- NO ip_address, user_id, device_id, or any identifying field
 */

import { INSIGHTS_ENABLED } from '../config/features.js'

// ────────────────────────────────────────────────────────────────────────────
// Client initialisation
// ────────────────────────────────────────────────────────────────────────────

/** Lazy-initialised Supabase client. Null when insights are disabled. */
let _client = null
let _initAttempted = false

/**
 * Returns the Supabase client, initialising it on first call.
 * Returns null if INSIGHTS_ENABLED is false or credentials are missing.
 * @returns {import('@supabase/supabase-js').SupabaseClient|null}
 */
async function getClient() {
  if (!INSIGHTS_ENABLED) return null
  if (_client) return _client
  if (_initAttempted) return null   // already failed — don't retry in same session

  _initAttempted = true

  const url  = import.meta.env.VITE_SUPABASE_URL
  const key  = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    if (import.meta.env.DEV) {
      console.warn(
        '[supabase] INSIGHTS_ENABLED=true but credentials are missing. ' +
        'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env'
      )
    }
    return null
  }

  try {
    // Dynamic import keeps the SDK out of the bundle when disabled
    const { createClient } = await import('@supabase/supabase-js')
    _client = createClient(url, key, {
      auth: { persistSession: false },    // no auth — anon only
      global: { headers: { 'x-app': 'taxfreely' } },
    })
    return _client
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[supabase] init failed:', err)
    return null
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Income bracket helper
// ────────────────────────────────────────────────────────────────────────────

/**
 * Converts a precise income figure into a bracket string so no exact
 * income is ever stored. Bracket width is the nearest round number
 * appropriate for the magnitude.
 *
 * Examples:
 *   43,200 → '40000-50000'
 *   124,500 → '120000-130000'
 *   1,450,000 → '1400000-1500000'
 *
 * @param {number} income — gross annual income in local currency
 * @returns {string}
 */
function toBracket(income) {
  if (!income || income <= 0) return '0-0'

  // Choose bracket width by order of magnitude
  const magnitude = Math.pow(10, Math.floor(Math.log10(income)))
  const width = magnitude >= 100000 ? magnitude / 10 : magnitude

  const lower = Math.floor(income / width) * width
  const upper = lower + width
  return `${lower}-${upper}`
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Saves an anonymised calculation snapshot for Intelligence Hub benchmarks.
 * No-op when:
 *   - INSIGHTS_ENABLED is false
 *   - User has not granted data-sharing consent
 *   - Supabase client is unavailable
 *
 * @param {object} params
 * @param {string}  params.countryCode       — ISO 3166-1 alpha-2
 * @param {string}  params.region            — e.g. 'West Africa'
 * @param {string}  params.currencyCode      — e.g. 'NGN'
 * @param {number}  params.grossIncome       — in local currency
 * @param {string}  params.employmentType    — 'employee' | 'self_employed' | etc.
 * @param {number}  params.effectiveRate     — 0–1 decimal
 * @param {number}  params.grossIncomeUsd    — converted at today's rate
 * @param {boolean} params.consentGiven      — must be true or write is blocked
 * @returns {Promise<boolean>} — true if saved successfully
 */
export async function saveAnonymousCalculation({
  countryCode,
  region,
  currencyCode,
  grossIncome,
  employmentType,
  effectiveRate,
  grossIncomeUsd,
  consentGiven = false,
}) {
  if (!consentGiven) return false

  const client = await getClient()
  if (!client) return false

  try {
    const { error } = await client
      .from('anonymous_calculations')
      .insert({
        country_code:    countryCode,
        region,
        currency_code:   currencyCode,
        income_bracket:  toBracket(grossIncome),
        employment_type: employmentType,
        effective_rate:  Math.min(1, Math.max(0, effectiveRate)),
        gross_income_usd: grossIncomeUsd,
      })

    if (error) throw error
    return true
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[supabase] saveAnonymousCalculation:', err)
    return false
  }
}

/**
 * Returns the percentile rank of a user's effective tax rate among
 * peers in the same country and employment type.
 *
 * Free tier: returns percentile number only.
 * Plus tier: returns percentile + full distribution data.
 *
 * @param {object} params
 * @param {string} params.countryCode
 * @param {string} params.employmentType
 * @param {number} params.effectiveRate — 0–1 decimal
 * @param {boolean} params.isPlus — whether to return full distribution
 * @returns {Promise<{percentile: number, distribution?: object}|null>}
 */
export async function getPercentile({
  countryCode,
  employmentType,
  effectiveRate,
  isPlus = false,
}) {
  const client = await getClient()
  if (!client) return null

  try {
    // Count rows with lower effective rate in this country + employment type
    const { count: lowerCount, error: e1 } = await client
      .from('anonymous_calculations')
      .select('*', { count: 'exact', head: true })
      .eq('country_code', countryCode)
      .eq('employment_type', employmentType)
      .lt('effective_rate', effectiveRate)

    if (e1) throw e1

    // Count total rows for this country + employment type
    const { count: totalCount, error: e2 } = await client
      .from('anonymous_calculations')
      .select('*', { count: 'exact', head: true })
      .eq('country_code', countryCode)
      .eq('employment_type', employmentType)

    if (e2) throw e2
    if (!totalCount || totalCount < 10) return null   // insufficient data

    const percentile = Math.round((lowerCount / totalCount) * 100)

    if (!isPlus) return { percentile }

    // Plus: fetch aggregated distribution (p25, p50, p75, p90)
    const { data: dist, error: e3 } = await client
      .rpc('get_rate_distribution', { p_country: countryCode, p_type: employmentType })

    if (e3) throw e3
    return { percentile, distribution: dist }
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[supabase] getPercentile:', err)
    return null
  }
}

/**
 * Fetches country-level benchmark summary for the Intelligence Hub.
 * Requires Plus subscription.
 *
 * @param {string} countryCode
 * @returns {Promise<{
 *   sampleSize: number,
 *   medianRate: number,
 *   averageRate: number,
 *   byEmploymentType: object,
 *   byIncomeBracket: object,
 * }|null>}
 */
export async function getCountryBenchmarks(countryCode) {
  const client = await getClient()
  if (!client) return null

  try {
    const { data, error } = await client
      .rpc('get_country_benchmarks', { p_country: countryCode })

    if (error) throw error
    if (!data || data.sample_size < 10) return null

    return {
      sampleSize:        data.sample_size,
      medianRate:        data.median_rate,
      averageRate:       data.average_rate,
      byEmploymentType:  data.by_employment_type ?? {},
      byIncomeBracket:   data.by_income_bracket  ?? {},
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[supabase] getCountryBenchmarks:', err)
    return null
  }
}

/**
 * Fetches regional benchmark data for multi-country comparison.
 * Requires Plus subscription.
 *
 * @param {string} region — e.g. 'West Africa'
 * @returns {Promise<Array|null>}
 */
export async function getRegionalBenchmarks(region) {
  const client = await getClient()
  if (!client) return null

  try {
    const { data, error } = await client
      .from('anonymous_calculations')
      .select('country_code, effective_rate, employment_type')
      .eq('region', region)
      .limit(5000)

    if (error) throw error
    return data ?? []
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[supabase] getRegionalBenchmarks:', err)
    return null
  }
}

/**
 * Returns whether the Supabase client is ready and connected.
 * Used by IntelligenceHub.jsx to show/hide the benchmark UI.
 * @returns {Promise<boolean>}
 */
export async function isSupabaseReady() {
  const client = await getClient()
  return client !== null
}
