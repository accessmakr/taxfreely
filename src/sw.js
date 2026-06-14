/**
 * src/sw.js — custom service worker source.
 *
 * vite-plugin-pwa's `injectManifest` strategy (configured in vite.config.js)
 * takes THIS file, injects the precache manifest at the
 * `self.__WB_MANIFEST` placeholder below, and outputs the result as
 * dist/sw.js. The output is what the browser actually registers.
 *
 * This file is WEB BUILD ONLY. The mobile build (VITE_PLATFORM=mobile)
 * skips the VitePWA plugin entirely (see vite.config.js), so this file
 * is never processed for — and never shipped inside — the Android app.
 * The Capacitor app has its own native offline handling via the WebView
 * cache of the bundled dist-mobile/ assets.
 */

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// ── Precache everything Vite's build produces ──────────────────────────────
// self.__WB_MANIFEST is replaced at build time with the full list of
// hashed asset URLs (JS chunks, CSS, i18n JSON files, icons, etc.) —
// see globPatterns in vite.config.js for exactly what's included.
precacheAndRoute(self.__WB_MANIFEST)

// Remove caches from previous service worker versions on activation —
// prevents unbounded cache growth across app updates.
cleanupOutdatedCaches()

// ── Navigation requests (the SPA shell) ─────────────────────────────────────
// Every route in the app — /, /guides/uk, /guides/topics/vat — needs to
// resolve to the cached index.html when offline, so the React app can
// mount and its own router can take over. NetworkFirst means: if online,
// always fetch the latest index.html (so a deployed update is picked up
// immediately); if offline, fall back to whatever was precached.
registerRoute(
  new NavigationRoute(
    new NetworkFirst({
      cacheName: 'tf-pages',
      networkTimeoutSeconds: 3,
      plugins: [
        new ExpirationPlugin({ maxEntries: 50 })
      ]
    })
  )
)

// ── i18n language files ─────────────────────────────────────────────────────
// 43 language JSON files. CacheFirst because translation strings change
// rarely — no point re-fetching on every load. A new app version (which
// changes the precache manifest hash) will still pick up updated
// translations via the normal SW update cycle.
registerRoute(
  ({ url }) => url.pathname.startsWith('/i18n/') && url.pathname.endsWith('.json'),
  new CacheFirst({
    cacheName: 'tf-i18n',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
    ]
  })
)

// ── Static assets — hashed JS/CSS chunks, icons, fonts ─────────────────────
// These are already in the precache manifest above, but this route also
// catches anything that slips through (e.g. a chunk requested dynamically
// that wasn't in the initial manifest scan). Filenames are content-hashed
// by Vite, so CacheFirst with a long expiry is safe — a changed file gets
// a new filename automatically.
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font',
  new CacheFirst({
    cacheName: 'tf-assets',
    plugins: [
      new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 60 })
    ]
  })
)

// ── Exchange rates / remote data, if ever fetched from a CDN ────────────────
// Currently exchangeRates.js is bundled (no runtime fetch), so this route
// is dormant. It's defined now so that if a future version fetches live
// rates from an endpoint, the caching strategy is already correct:
// try the network for fresh rates, fall back to the last-known-good
// cached response when offline.
registerRoute(
  ({ url }) => url.pathname.startsWith('/rates/'),
  new StaleWhileRevalidate({
    cacheName: 'tf-rates'
  })
)

// ── AI / receipt-scan API calls — NEVER cached ──────────────────────────────
// /api/* is proxied to Netlify Functions (see netlify.toml redirects).
// These are dynamic, user-specific, and sometimes carry image payloads —
// caching any part of this would be both useless and a privacy concern.
// No registerRoute is added for /api/* — Workbox's default behaviour for
// unmatched requests is to pass them straight to the network, which is
// exactly correct here.

// ── Push notification handling ──────────────────────────────────────────────
// Quarterly tax deadline reminders. The actual *scheduling* of these
// notifications happens in src/utils/notifications.js (message 19) using
// the Notifications API with showTrigger where supported, or a
// foreground-checked fallback. This listener handles the user TAPPING
// a notification that's already been shown.
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const targetUrl = event.notification.data?.url || '/?tab=calculate'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // If the app is already open in a tab, focus it and navigate
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl)
          return client.focus()
        }
      }
      // Otherwise open a new window
      return self.clients.openWindow(targetUrl)
    })
  )
})

// ── Skip waiting on message from the client ─────────────────────────────────
// Paired with vite-plugin-pwa's registerType: 'autoUpdate' — when a new
// version is detected, the client can post this message to activate the
// new service worker immediately rather than waiting for all tabs to close.
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
