/**
 * src/i18n/index.js
 *
 * Internationalisation setup for TaxFreely — 43 languages.
 * Built on react-i18next + i18next-browser-languagedetector.
 *
 * LANGUAGE FILES: src/i18n/locales/[code].json (messages 13-16)
 * RTL AUTO:       Arabic (ar), Hebrew (he), Persian (fa), Urdu (ur)
 * DETECTION:      localStorage → navigator.language → html[lang] → 'en'
 * FALLBACK:       English (en) for any missing translation key
 *
 * USAGE IN COMPONENTS:
 *   import { useTranslation } from 'react-i18next'
 *   const { t } = useTranslation()
 *   <p>{t('results.totalTax')}</p>
 *
 * CHANGING LANGUAGE:
 *   import { setLanguage } from '../i18n'
 *   await setLanguage('fr')   // persists to localStorage, applies RTL
 *
 * LAZY LOADING:
 *   Each locale JSON is a dynamic import so only the active language
 *   (+ English fallback) is included in the initial bundle. All others
 *   are fetched on demand (~2-8 KB per file over the wire).
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { STORAGE_KEYS } from '../config/appConfig.js'

// ────────────────────────────────────────────────────────────────────────────
// Language registry
// ────────────────────────────────────────────────────────────────────────────

/**
 * All 43 supported languages.
 * nativeName — shown in the language picker (always in that language's script)
 * rtl        — true triggers document direction + layout mirroring
 * region     — used to group languages in the picker UI
 */
export const SUPPORTED_LANGUAGES = [
  // ── Tier 1: Global high-traffic ──────────────────────────────────────────
  { code: 'en', nativeName: 'English',              rtl: false, region: 'Global' },
  { code: 'es', nativeName: 'Español',              rtl: false, region: 'Global' },
  { code: 'fr', nativeName: 'Français',             rtl: false, region: 'Global' },
  { code: 'de', nativeName: 'Deutsch',              rtl: false, region: 'Global' },
  { code: 'pt', nativeName: 'Português',            rtl: false, region: 'Global' },
  { code: 'zh', nativeName: '中文',                 rtl: false, region: 'Global' },
  { code: 'ar', nativeName: 'العربية',              rtl: true,  region: 'Global' },
  { code: 'hi', nativeName: 'हिन्दी',               rtl: false, region: 'Global' },
  { code: 'ru', nativeName: 'Русский',              rtl: false, region: 'Global' },
  // ── Tier 2: Major regional ────────────────────────────────────────────────
  { code: 'ja', nativeName: '日本語',               rtl: false, region: 'East Asia' },
  { code: 'ko', nativeName: '한국어',               rtl: false, region: 'East Asia' },
  { code: 'id', nativeName: 'Bahasa Indonesia',     rtl: false, region: 'Southeast Asia' },
  { code: 'ms', nativeName: 'Bahasa Melayu',        rtl: false, region: 'Southeast Asia' },
  { code: 'th', nativeName: 'ภาษาไทย',             rtl: false, region: 'Southeast Asia' },
  { code: 'vi', nativeName: 'Tiếng Việt',           rtl: false, region: 'Southeast Asia' },
  { code: 'tl', nativeName: 'Filipino',             rtl: false, region: 'Southeast Asia' },
  { code: 'bn', nativeName: 'বাংলা',               rtl: false, region: 'South Asia' },
  { code: 'ur', nativeName: 'اردو',                 rtl: true,  region: 'South Asia' },
  { code: 'fa', nativeName: 'فارسی',                rtl: true,  region: 'West Asia' },
  { code: 'he', nativeName: 'עברית',                rtl: true,  region: 'West Asia' },
  { code: 'tr', nativeName: 'Türkçe',              rtl: false, region: 'West Asia' },
  // ── Tier 3: European ──────────────────────────────────────────────────────
  { code: 'it', nativeName: 'Italiano',             rtl: false, region: 'Europe' },
  { code: 'nl', nativeName: 'Nederlands',           rtl: false, region: 'Europe' },
  { code: 'pl', nativeName: 'Polski',               rtl: false, region: 'Europe' },
  { code: 'sv', nativeName: 'Svenska',              rtl: false, region: 'Europe' },
  { code: 'no', nativeName: 'Norsk',                rtl: false, region: 'Europe' },
  { code: 'da', nativeName: 'Dansk',                rtl: false, region: 'Europe' },
  { code: 'fi', nativeName: 'Suomi',                rtl: false, region: 'Europe' },
  { code: 'el', nativeName: 'Ελληνικά',             rtl: false, region: 'Europe' },
  { code: 'cs', nativeName: 'Čeština',              rtl: false, region: 'Europe' },
  { code: 'ro', nativeName: 'Română',               rtl: false, region: 'Europe' },
  { code: 'hu', nativeName: 'Magyar',               rtl: false, region: 'Europe' },
  { code: 'bg', nativeName: 'Български',            rtl: false, region: 'Europe' },
  { code: 'uk', nativeName: 'Українська',           rtl: false, region: 'Europe' },
  { code: 'af', nativeName: 'Afrikaans',            rtl: false, region: 'Africa' },
  // ── Tier 4: African ───────────────────────────────────────────────────────
  { code: 'sw', nativeName: 'Kiswahili',            rtl: false, region: 'Africa' },
  { code: 'yo', nativeName: 'Yorùbá',               rtl: false, region: 'Africa' },
  { code: 'ha', nativeName: 'Hausa',                rtl: false, region: 'Africa' },
  { code: 'am', nativeName: 'አማርኛ',                rtl: false, region: 'Africa' },
  { code: 'ig', nativeName: 'Igbo',                 rtl: false, region: 'Africa' },
  { code: 'zu', nativeName: 'isiZulu',              rtl: false, region: 'Africa' },
  // ── Tier 5: South Asian scripts ───────────────────────────────────────────
  { code: 'ta', nativeName: 'தமிழ்',               rtl: false, region: 'South Asia' },
  { code: 'te', nativeName: 'తెలుగు',               rtl: false, region: 'South Asia' },
]

// Fast lookups
export const LANGUAGE_BY_CODE = Object.fromEntries(
  SUPPORTED_LANGUAGES.map(l => [l.code, l])
)

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(l => l.code)

/** The four RTL language codes */
export const RTL_CODES = SUPPORTED_LANGUAGES
  .filter(l => l.rtl)
  .map(l => l.code)   // ['ar', 'he', 'fa', 'ur']

// ────────────────────────────────────────────────────────────────────────────
// Locale loader
// ────────────────────────────────────────────────────────────────────────────

/**
 * Dynamically imports a locale JSON file.
 * Returns an empty object on failure so i18next falls back to English.
 * @param {string} code — language code
 * @returns {Promise<object>}
 */
async function loadLocale(code) {
  try {
    const module = await import(`./locales/${code}.json`)
    return module.default ?? module
  } catch {
    if (import.meta.env.DEV && code !== 'en') {
      console.warn(`[i18n] Locale file missing: src/i18n/locales/${code}.json`)
    }
    return {}
  }
}

// ────────────────────────────────────────────────────────────────────────────
// i18next initialisation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Loads English immediately (always needed as fallback) and the
 * previously stored language if it differs from English.
 */
async function loadInitialResources() {
  const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
  const detected = stored ?? navigator.language?.split('-')[0] ?? 'en'
  const initial = SUPPORTED_LANGUAGE_CODES.includes(detected) ? detected : 'en'

  const [enTranslations, initialTranslations] = await Promise.all([
    loadLocale('en'),
    initial !== 'en' ? loadLocale(initial) : Promise.resolve({}),
  ])

  return { initial, enTranslations, initialTranslations }
}

const { initial, enTranslations, initialTranslations } =
  await loadInitialResources()

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initial,
    fallbackLng: 'en',

    resources: {
      en:      { translation: enTranslations },
      [initial]: { translation: initialTranslations },
    },

    interpolation: {
      // React already handles XSS escaping
      escapeValue: false,
      // Custom formatter for currency values: {{amount, currency}}
      format(value, format) {
        if (format === 'number') return Number(value).toLocaleString()
        return value
      },
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: STORAGE_KEYS.LANGUAGE,
      caches: ['localStorage'],
    },

    // Don't suspend render — use English until locale loads
    react: {
      useSuspense: false,
    },

    // Load languages on demand; don't preload all 43
    partialBundledLanguages: true,
  })

// ────────────────────────────────────────────────────────────────────────────
// RTL management
// ────────────────────────────────────────────────────────────────────────────

/**
 * Applies or removes RTL direction on the document root.
 * Called on init and every language change.
 * @param {string} code
 */
function applyDirection(code) {
  const isRtl = RTL_CODES.includes(code)
  document.documentElement.dir  = isRtl ? 'rtl' : 'ltr'
  document.documentElement.lang = code
  // Tailwind RTL utilities need this class on <html>
  document.documentElement.classList.toggle('rtl', isRtl)
}

// Apply direction for the initial language
applyDirection(initial)

// Re-apply whenever the language changes
i18n.on('languageChanged', (code) => {
  applyDirection(code)
})

// ────────────────────────────────────────────────────────────────────────────
// Public helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Change the active language. Lazy-loads the locale file if not yet cached,
 * persists the choice, and applies RTL direction.
 *
 * @param {string} code — must be a value from SUPPORTED_LANGUAGE_CODES
 * @returns {Promise<void>}
 */
export async function setLanguage(code) {
  if (!SUPPORTED_LANGUAGE_CODES.includes(code)) {
    console.warn(`[i18n] Unsupported language code: ${code}`)
    return
  }

  // Load locale if not already in i18next's resource store
  if (!i18n.hasResourceBundle(code, 'translation')) {
    const translations = await loadLocale(code)
    i18n.addResourceBundle(code, 'translation', translations, true, true)
  }

  await i18n.changeLanguage(code)
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, code)
}

/**
 * Returns the currently active language code.
 * @returns {string}
 */
export function getCurrentLanguage() {
  return i18n.language || 'en'
}

/**
 * Returns the currently active language object from SUPPORTED_LANGUAGES.
 * @returns {object}
 */
export function getCurrentLanguageInfo() {
  return LANGUAGE_BY_CODE[getCurrentLanguage()] ?? LANGUAGE_BY_CODE['en']
}

/**
 * Returns true if the current (or provided) language is RTL.
 * Used by layout components to mirror flex direction, text-align, etc.
 * @param {string} [code] — defaults to current language
 * @returns {boolean}
 */
export function isRTL(code) {
  return RTL_CODES.includes(code ?? getCurrentLanguage())
}

/**
 * Returns a human-readable label for a language code in the current UI language.
 * Falls back to the nativeName if no translation exists.
 * @param {string} code
 * @returns {string}
 */
export function getLanguageLabel(code) {
  const lang = LANGUAGE_BY_CODE[code]
  if (!lang) return code
  // Try translated name first (e.g. "Spanish" in an English UI)
  const key = `languages.${code}`
  const translated = i18n.t(key)
  return translated !== key ? translated : lang.nativeName
}

/**
 * Returns all supported languages grouped by region, for the
 * language picker's grouped list view.
 * @returns {Object.<string, Array>}
 */
export function getLanguagesByRegion() {
  return SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    if (!acc[lang.region]) acc[lang.region] = []
    acc[lang.region].push(lang)
    return acc
  }, {})
}

export default i18n
