/**
 * features.js — single import point for every feature flag in the app.
 *
 * This file does not OWN any flag's logic — each flag is defined in the
 * file that actually implements the feature (premium.js, supabase.js,
 * aiRateLimit.js), since those files need the flag for their own internal
 * logic regardless of this file's existence.
 *
 * What this file provides is ONE place for any component to import ALL
 * flags from, instead of remembering which of four different utils files
 * a given flag lives in. It is pure re-export — zero logic, zero state.
 *
 * NOTE: the imports below reference files generated in later messages
 * (premium.js → msg 21, supabase.js → msg 11, aiRateLimit.js → msg 24).
 * This file's exports will resolve correctly once those files exist;
 * until then it is inert (nothing imports it yet).
 */

export {
  isPlus,
  AI_DAILY_FREE_LIMIT,
  PLUS_PRICE_USD,
  PLUS_BILLING_PERIOD
} from '@utils/premium'

export {
  INSIGHTS_ENABLED
} from '@lib/supabase'

export {
  getRemainingAIActions,
  canUseAI
} from '@utils/aiRateLimit'

/**
 * Flags that belong here directly because they don't have a natural
 * "owning" file of their own — purely presentational/behavioural toggles
 * that don't carry business logic.
 */

// Show the Play Store review prompt after N successful calculations.
// Set to 0 to disable entirely during development.
export const REVIEW_PROMPT_AFTER_CALCULATIONS = 3

// Master switch for local quarterly-deadline push notifications.
// Independent of the OS-level permission — this is the app's own
// "do you want these" preference, surfaced in Settings.
export const NOTIFICATIONS_DEFAULT_ENABLED = true

// Master switch for the entire sharing suite (WhatsApp, email, social
// card, share-app). Single flag in case any platform policy ever requires
// disabling sharing temporarily without touching every component.
export const SHARING_ENABLED = true

// AdMob / AdSense master switch. isPlus() already suppresses ads for
// subscribers — this is the GLOBAL kill switch (e.g. while a new ad
// unit ID is being configured and the old one would 404).
export const ADS_ENABLED = true
