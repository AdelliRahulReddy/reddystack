'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
const DARK = 'tp-theme-dark';
const LIGHT = 'tp-theme-light';
const eventName = 'reddystack-theme-change';
const subscribe = (notify: () => void) => {
  window.addEventListener(eventName, notify);
  return () => window.removeEventListener(eventName, notify);
};
const snapshot = () => document.documentElement.getAttribute('tp-theme') || DARK;
const apply = (theme: string, storageKey: string) => {
  document.documentElement.setAttribute('tp-theme', theme);
  try { localStorage.setItem(storageKey, theme); } catch { /* Theme still works when storage is unavailable. */ }
  window.dispatchEvent(new Event(eventName));
};
export default function UseThemeCheck() {
  const isPrototype = usePathname() === '/prototype';
  // Keep preview preferences separate from the main site.
  const storageKey = isPrototype ? 'tp_prototype_cream_theme_scheme' : 'tp_theme_scheme';
  const defaultTheme = DARK;
  const theme = useSyncExternalStore(subscribe, snapshot, () => defaultTheme);
  useEffect(() => {
    const sync = (saved: string | null) => apply(saved === LIGHT || saved === DARK ? saved : defaultTheme, storageKey);
    try { sync(localStorage.getItem(storageKey)); } catch { apply(defaultTheme, storageKey); }
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) sync(event.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey, defaultTheme]);
  return { active: theme === DARK, toggleTheme: () => apply(snapshot() === DARK ? LIGHT : DARK, storageKey) };
}
