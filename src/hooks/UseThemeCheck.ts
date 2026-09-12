'use client';
import { useEffect, useSyncExternalStore } from 'react';
const DARK = 'tp-theme-dark';
const LIGHT = 'tp-theme-light';
const eventName = 'reddystack-theme-change';
const subscribe = (notify: () => void) => {
  window.addEventListener(eventName, notify);
  return () => window.removeEventListener(eventName, notify);
};
const snapshot = () => document.documentElement.getAttribute('tp-theme') || DARK;
const apply = (theme: string) => {
  document.documentElement.setAttribute('tp-theme', theme);
  try { localStorage.setItem('tp_theme_scheme', theme); } catch { /* Theme still works when storage is unavailable. */ }
  window.dispatchEvent(new Event(eventName));
};
export default function UseThemeCheck() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => DARK);
  useEffect(() => {
    try { const saved = localStorage.getItem('tp_theme_scheme'); apply(saved === LIGHT ? LIGHT : DARK); } catch { apply(DARK); }
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'tp_theme_scheme') apply(event.newValue === LIGHT ? LIGHT : DARK);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return { active: theme === DARK, toggleTheme: () => apply(snapshot() === DARK ? LIGHT : DARK) };
}
