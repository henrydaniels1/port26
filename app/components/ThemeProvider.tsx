'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  /** Set the theme and persist it. */
  setTheme: (t: Theme) => void;
  /** Flip between light and dark. */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  toggle: () => {},
});

function defaultTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const onDoc = document.documentElement.dataset.theme;
  if (onDoc === 'light' || onDoc === 'dark') return onDoc;
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}

/**
 * Wraps the app and mirrors the theme onto `<html data-theme>`. The value is
 * bootstrapped synchronously in `layout.tsx` (inline script), so this just
 * keeps React state in sync and exposes a `toggle`/`setTheme` API.
 *
 * The initial state is a fixed constant so the server and the client's first
 * render agree exactly (no hydration mismatch). The real theme is read from the
 * DOM in an effect right after hydration — the inline `<head>` script has
 * already applied it before first paint, so there is no visible flash.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Deterministic placeholder — matches `:root` (light) in globals.css and
  // whatever the server rendered. Corrected by the effect below.
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // Keep state in sync with whatever the inline <head> script decided.
    setThemeState(defaultTheme());

    // If the user never picked an explicit theme, follow their OS preference
    // live.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      let explicit: string | null = null;
      try {
        explicit = localStorage.getItem('theme');
      } catch {
        /* ignore */
      }
      if (!explicit) {
        const next: Theme = e.matches ? 'dark' : 'light';
        setThemeState(next);
        document.documentElement.dataset.theme = next;
      }
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const applyTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem('theme', t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => applyTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, applyTheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
