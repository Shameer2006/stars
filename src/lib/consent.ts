/**
 * Consent Management – state persistence & Google Consent Mode v2
 *
 * Categories:
 *   • necessary  – always on (session, security)
 *   • analytics  – Google Analytics, Vercel Analytics
 *   • advertising – Google AdSense, personalized ads
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'advertising';

export interface ConsentState {
  necessary: boolean;   // always true – cannot be disabled
  analytics: boolean;
  advertising: boolean;
  timestamp: number;    // when consent was last updated
  version: number;      // consent version — bump when policy changes
}

const STORAGE_KEY = 'stars_cookie_consent';
const CONSENT_VERSION = 1;

/** Default state: only strictly-necessary cookies are allowed. */
export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  advertising: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

// ── Read / Write ──────────────────────────────────────

/** Read the stored consent. Returns `null` if the user hasn't chosen yet. */
export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: ConsentState = JSON.parse(raw);
    // If policy version changed, treat as un-consented so the banner reappears
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Persist consent choices and push them to Google Consent Mode v2. */
export function setConsent(state: Omit<ConsentState, 'necessary' | 'timestamp' | 'version'>): ConsentState {
  const full: ConsentState = {
    necessary: true,
    analytics: state.analytics,
    advertising: state.advertising,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  }
  pushToGoogleConsentMode(full);
  return full;
}

/** Accept everything. */
export function acceptAll(): ConsentState {
  return setConsent({ analytics: true, advertising: true });
}

/** Reject everything optional. */
export function rejectAll(): ConsentState {
  return setConsent({ analytics: false, advertising: false });
}

/** Check whether the user has already made a consent choice. */
export function hasConsented(): boolean {
  return getConsent() !== null;
}

// ── Google Consent Mode v2 integration ────────────────

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Push the current consent state to Google's Consent Mode v2.
 * This must be called AFTER the default-deny snippet in <head>.
 */
export function pushToGoogleConsentMode(state: ConsentState): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('consent', 'update', {
    ad_storage: state.advertising ? 'granted' : 'denied',
    ad_user_data: state.advertising ? 'granted' : 'denied',
    ad_personalization: state.advertising ? 'granted' : 'denied',
    analytics_storage: state.analytics ? 'granted' : 'denied',
  });
}

/**
 * Restore consent state on page load.
 * If the user previously consented, push those choices to Google Consent Mode
 * so that tags fire correctly on subsequent page views.
 */
export function restoreConsent(): void {
  const saved = getConsent();
  if (saved) {
    pushToGoogleConsentMode(saved);
  }
}
