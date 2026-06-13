/**
 * version.js — the single version constant used throughout the app.
 *
 * Read by:
 *  - Changelog.jsx (msg 48): compares APP_VERSION against the value
 *    stored in localStorage under STORAGE_KEYS.lastSeenVersion. If they
 *    differ, the "what's new" modal shows once, then localStorage updates
 *    to match APP_VERSION so it never shows again for this version.
 *  - Settings.jsx (msg 48): displays "Version X.Y.Z" in the about section.
 *  - analytics.js (msg 22): attaches app_version to every logged event,
 *    so crash reports and analytics can be filtered by release.
 *
 * Bump this manually with each release. package.json's "version" field
 * is the npm/build-tooling concern; this is the user-facing concern.
 * They often match but are not required to — e.g. you might ship two
 * builds at npm version 1.0.1 and 1.0.2 that are the same user-facing
 * "1.0" release with no changelog-worthy changes.
 */

export const APP_VERSION = '1.0.0'

/**
 * Changelog entries — newest first. Changelog.jsx renders this array
 * directly. Each entry's `version` should correspond to a point where
 * APP_VERSION was bumped and you want the modal to appear.
 *
 * Keep entries short — 2 to 4 lines. This is a "what's new" glance,
 * not release notes.
 */
export const CHANGELOG = [
  {
    version: '1.0.0',
    date: '2026-06-15',
    title: 'TaxFreely launches',
    items: [
      'Tax calculations for all 195 countries',
      'AI Tax Assistant, Deduction Advisor, and Receipt Scanner',
      'Available in 43 languages with full offline support',
      'Country comparison and freelance rate calculator'
    ]
  }
]
