'use client';

import { useEffect, useState } from 'react';

import type { AppSettings } from '@/types/database';
import { getBrowserClient } from './supabase/client';
import { DEFAULT_SETTINGS, getSettings } from './settings';

/**
 * Client-side settings, fetched once on mount from the public browser client
 * with the seed values as the initial fallback. Used by site chrome (footer)
 * that renders inside the static shell, where a server read would force the
 * whole shell dynamic.
 */
export function useSettings(): AppSettings {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const client = getBrowserClient();
    if (!client) return;
    let cancelled = false;
    getSettings(client).then((next) => {
      if (!cancelled && next) setSettings(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
