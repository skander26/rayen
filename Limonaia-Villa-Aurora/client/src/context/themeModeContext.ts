import { createContext } from 'react'
import type { ThemeMode } from '../theme/theme'

export type ThemeModeContextValue = {
  mode: ThemeMode
  toggleTheme: () => void
  setMode: (m: ThemeMode) => void
}

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(
  null,
)
