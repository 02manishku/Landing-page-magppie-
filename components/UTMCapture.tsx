'use client';

import { useEffect } from 'react';
import { captureUTMs } from '@/lib/utm';

/**
 * Runs captureUTMs() exactly once per full page load, as early as
 * possible on the client. Mounted in app/layout.tsx so it sits above
 * every page and persists UTMs into sessionStorage / localStorage
 * before the visitor has a chance to navigate away from the query
 * string.
 *
 * Renders nothing.
 */
export default function UTMCapture() {
  useEffect(() => {
    captureUTMs();
  }, []);

  return null;
}
