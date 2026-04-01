import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ThemeMode } from '../theme/theme'
import { ThemeModeContext } from './themeModeContext'

const STORAGE_KEY = 'villa-theme'

function readStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(readStoredMode)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${mode}`)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute(
        'content',
        mode === 'dark' ? '#0b0a09' : '#f6f2eb',
      )
    }
  }, [mode])

  const toggleTheme = useCallback(() => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(
    () => ({ mode, toggleTheme, setMode }),
    [mode, toggleTheme],
  )

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  )
}
