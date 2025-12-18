
/**
 * Safely tracks an event to Google Analytics 4.
 * Checks if window.gtag exists (which means consent was given and GA loaded).
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  // @ts-ignore - gtag is added to window by the GA script in CookieConsent
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // @ts-ignore
    window.gtag('event', eventName, parameters);
    
    // Dev logging
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Tracked: ${eventName}`, parameters);
    }
  }
};
