import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId:   'com.taxfreely.app',
  appName: 'TaxFreely',

  // Points to the MOBILE build output — NOT dist/
  // npm run build:mobile outputs to dist-mobile/
  // npm run build (website) outputs to dist/ — Capacitor never touches that
  webDir: 'dist-mobile',

  server: {
    // Use https scheme on Android for proper PWA API compatibility
    // (Web Crypto API, secure cookies, etc. require a secure context)
    androidScheme: 'https',
    cleartext: false
  },

  android: {
    buildOptions: {
      // These values are injected by the GitHub Actions signing step
      // Do not hard-code keys here — they come from repository secrets
      keystorePath:          undefined,
      keystorePassword:      undefined,
      keystoreAlias:         undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'AAB'
    }
  },

  plugins: {
    SplashScreen: {
      // Pure black matches OLED dark mode — no white flash on launch
      backgroundColor:           '#000000',
      launchShowDuration:        2000,
      launchAutoHide:            true,
      showSpinner:               false,
      splashFullScreen:          true,
      splashImmersive:           true,
      androidSplashResourceName: 'splash',
      androidScaleType:          'CENTER_CROP'
    },

    StatusBar: {
      // Dark style = white icons in the status bar (correct for black app)
      style:           'DARK',
      backgroundColor: '#000000',
      overlaysWebView: false
    },

    PushNotifications: {
      // Notifications appear as alerts with sound and badge count
      presentationOptions: ['badge', 'sound', 'alert']
    },

    AdMob: {
      // Replace with your real AdMob App ID from admob.google.com
      // Format: ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
      appId: {
        android: 'ca-app-pub-REPLACE_WITH_YOUR_ADMOB_APP_ID~XXXXXXXXXX'
      },
      // Set to true ONLY during development to avoid policy violations
      initializeForTesting: false
    },

    // Works without further config, but must be declared here so the
    // Capacitor runtime registers the plugin correctly on Android.
    // Used by IncomeModule.jsx (Calculate tab) and TaxResults.jsx for
    // tactile feedback on calculate / result-reveal / tap-to-copy.
    Haptics: {}
  }
}

export default config
