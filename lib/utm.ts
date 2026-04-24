/**
 * UTM capture & persistence.
 *
 * Why this exists
 * ───────────────
 * The landing page was losing UTM attribution whenever a visitor clicked
 * any in-page link (anchor or internal nav) and then submitted the form
 * later, because the submit handler only read `window.location.search`
 * at submit time.
 *
 * This module captures UTMs ONCE on initial page load and persists them:
 *   - sessionStorage — current visit, available to the form even after
 *     query params have been scrubbed from the URL.
 *   - localStorage  — first-touch attribution, written once and never
 *     overwritten so returning visitors' original campaign is preserved.
 *
 * Storage keys match Zoho's Lead-module API names EXACTLY, including
 * the capital C in `utm_Campaignid`. URL params are matched
 * case-insensitively so Google Ads tracking templates using either
 * `utm_campaignid` or `utm_Campaignid` both resolve correctly.
 *
 * All functions are SSR-safe — they no-op when `window` is undefined.
 * Empty values are never stored; getters always return '' (never null,
 * never the literal string 'NA').
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_Campaignid', // Zoho API name uses capital C
  'utm_adgroupid',
  'utm_keyword',
  'utm_placement',
  'utm_term',
  'utm_content'
] as const;

export type UTMKey = (typeof UTM_KEYS)[number];
export type UTMMap = Record<UTMKey, string>;

const FIRST_TOUCH_PREFIX = 'first_';

function readParam(params: URLSearchParams, key: UTMKey): string {
  // Try the exact (case-sensitive) key first, then a lowercased fallback.
  // This lets Google Ads templates using either `utm_Campaignid` or
  // `utm_campaignid` both land in our canonical `utm_Campaignid` slot.
  const exact = params.get(key);
  if (exact !== null) return exact;
  const lower = key.toLowerCase();
  if (lower !== key) {
    const alt = params.get(lower);
    if (alt !== null) return alt;
  }
  return '';
}

/**
 * Read UTM params from the current URL, persist non-empty values into
 * sessionStorage, and write first-touch values into localStorage.
 * Safe to call multiple times; safe to call during SSR (no-op).
 */
export function captureUTMs(): void {
  if (typeof window === 'undefined') return;

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return;
  }

  UTM_KEYS.forEach((key) => {
    const value = readParam(params, key).trim();
    if (!value) return;

    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Storage may be unavailable (private mode, iframe) — continue silently
    }

    try {
      const firstKey = `${FIRST_TOUCH_PREFIX}${key}`;
      if (!localStorage.getItem(firstKey)) {
        localStorage.setItem(firstKey, value);
      }
    } catch {
      // Same — silently skip
    }
  });
}

/** Return the persisted UTM for a key, or '' if missing/unavailable. */
export function getUTM(key: UTMKey): string {
  if (typeof window === 'undefined') return '';
  try {
    return sessionStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

/** Return all 9 UTMs as an object keyed by Zoho API name. Missing values are ''. */
export function getAllUTMs(): UTMMap {
  const out = {} as UTMMap;
  UTM_KEYS.forEach((key) => {
    out[key] = getUTM(key);
  });
  return out;
}
