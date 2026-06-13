import { Capacitor } from '@capacitor/core'

/**
 * platform.js — single source of truth for "where am I running".
 *
 * Two completely different mechanisms, both needed, both live here:
 *
 * 1. BUILD-TIME (import.meta.env.VITE_PLATFORM)
 *    Decided by which npm script ran:
 *      npm run build          → VITE_PLATFORM unset  → web build  → dist/
 *      npm run build:mobile   → VITE_PLATFORM=mobile  → app build  → dist-mobile/
 *    Used for IMPORT-LEVEL separation in App.jsx — e.g.
 *      {IS_WEB_BUILD && <SiteHeader />}
 *    Rollup tree-shakes the unused branch entirely. The Android bundle
 *    contains zero bytes of SiteHeader/ContentSections/AdSense code,
 *    and the web bundle contains zero bytes of BottomTabBar/AdMob code.
 *    This is a COMPILE-TIME constant — it can never change at runtime.
 *
 * 2. RUNTIME (Capacitor.isNativePlatform())
 *    The tool/ layer ships IDENTICAL code to both builds. Some of those
 *    shared components want to behave differently depending on whether
 *    they are actually executing inside the native Android shell or
 *    inside a regular browser — e.g. firing a haptic buzz on Calculate,
 *    which only makes sense on a physical device.
 *    This is a RUNTIME check — same code, different environment.
 *
 * Components should almost always use IS_WEB_BUILD / IS_MOBILE_BUILD for
 * "should this component exist at all" decisions (App.jsx shell), and
 * isNativeRuntime / platform.isApp for "should this specific behaviour
 * fire right now" decisions inside shared components.
 */

// ── Build-time constants ──────────────────────────────────────────────────
export const IS_MOBILE_BUILD = import.meta.env.VITE_PLATFORM === 'mobile'
export const IS_WEB_BUILD    = !IS_MOBILE_BUILD

// ── Runtime constant ────────────────────────────────────────────────────────
// Capacitor.isNativePlatform() returns true only when running inside the
// actual compiled Android (or future iOS) shell — false in any browser,
// including when testing the mobile build's output locally via
// `npm run preview` in Chrome.
export const isNativeRuntime = Capacitor.isNativePlatform()

// Returns 'android' | 'ios' | 'web'
export const nativePlatformName = Capacitor.getPlatform()

/**
 * Convenience object — the shape most components actually want.
 *
 * platform.isApp  → true only on a real device running the Capacitor build
 * platform.isWeb  → true in any browser (Netlify site, or previewing
 *                   the mobile build locally)
 * platform.shell  → which App.jsx shell class to apply ('app-shell' | 'web-shell')
 */
export const platform = {
  isApp:  isNativeRuntime,
  isWeb:  !isNativeRuntime,
  shell:  isNativeRuntime ? 'app-shell' : 'web-shell',
  name:   nativePlatformName
}

/**
 * Guard for any Capacitor-plugin call that would throw or no-op in a
 * plain browser. Usage:
 *
 *   import { runNative } from '@utils/platform'
 *   import { Haptics, ImpactStyle } from '@capacitor/haptics'
 *
 *   runNative(() => Haptics.impact({ style: ImpactStyle.Light }))
 *
 * In a browser this is a silent no-op. On-device it runs normally.
 * Errors from the native call itself are still thrown — this only
 * guards against calling a native-only API in a non-native context.
 */
export function runNative(fn) {
  if (!isNativeRuntime) return undefined
  return fn()
}
