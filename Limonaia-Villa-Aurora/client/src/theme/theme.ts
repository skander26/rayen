const fonts = {
  display: '"Cormorant Garamond", "Times New Roman", serif',
  body: '"Outfit", system-ui, sans-serif',
} as const

const space = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.75rem',
  lg: '3rem',
  xl: '5rem',
} as const

const radius = {
  sm: '6px',
  md: '12px',
  lg: '20px',
  pill: '999px',
} as const

const breakpoints = {
  md: '768px',
  lg: '1100px',
} as const

const transition = {
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

export type ThemeMode = 'light' | 'dark'

export type AppTheme = {
  colors: {
    bg: string
    bgDeep: string
    surface: string
    ink: string
    inkMuted: string
    gold: string
    goldSoft: string
    line: string
    available: string
    availableGlow: string
    white: string
    /** Dark bands: footer, CTA strip, primary buttons */
    inverseBg: string
    inverseFg: string
    inverseFgMuted: string
    /** Sticky header scrim */
    barElevated: string
    barElevatedMd: string
    /** Text on hero / imagery */
    onPhoto: string
  }
  fonts: typeof fonts
  space: typeof space
  radius: typeof radius
  shadow: { soft: string; lift: string }
  transition: typeof transition
  breakpoints: typeof breakpoints
}

const shared = {
  fonts,
  space,
  radius,
  breakpoints,
  transition,
} as const

export const lightTheme: AppTheme = {
  ...shared,
  colors: {
    bg: '#f6f2eb',
    bgDeep: '#ebe4d8',
    surface: '#fffcf7',
    ink: '#141210',
    inkMuted: 'rgba(20, 18, 16, 0.62)',
    gold: '#b8956a',
    goldSoft: 'rgba(184, 149, 106, 0.35)',
    line: 'rgba(20, 18, 16, 0.08)',
    available: '#2d6a4f',
    availableGlow: 'rgba(45, 106, 79, 0.45)',
    white: '#ffffff',
    inverseBg: '#141210',
    inverseFg: '#fffcf7',
    inverseFgMuted: 'rgba(255, 252, 247, 0.72)',
    barElevated: 'rgba(246, 242, 235, 0.72)',
    barElevatedMd: 'rgba(255, 252, 247, 0.82)',
    onPhoto: '#fffcf7',
  },
  shadow: {
    soft: '0 18px 50px rgba(20, 18, 16, 0.08)',
    lift: '0 24px 60px rgba(20, 18, 16, 0.12)',
  },
}

export const darkTheme: AppTheme = {
  ...shared,
  colors: {
    bg: '#0b0a09',
    bgDeep: '#12100e',
    surface: '#171513',
    ink: '#f0ebe7',
    inkMuted: 'rgba(240, 235, 231, 0.58)',
    gold: '#c9a66b',
    goldSoft: 'rgba(201, 166, 107, 0.28)',
    line: 'rgba(255, 255, 255, 0.09)',
    available: '#4a9d7a',
    availableGlow: 'rgba(74, 157, 122, 0.35)',
    white: '#ffffff',
    inverseBg: '#050504',
    inverseFg: '#f5f0eb',
    inverseFgMuted: 'rgba(245, 240, 235, 0.68)',
    barElevated: 'rgba(14, 12, 10, 0.82)',
    barElevatedMd: 'rgba(18, 16, 14, 0.9)',
    onPhoto: '#f7f2ec',
  },
  shadow: {
    soft: '0 18px 50px rgba(0, 0, 0, 0.45)',
    lift: '0 24px 60px rgba(0, 0, 0, 0.55)',
  },
}

export function getAppTheme(mode: ThemeMode): AppTheme {
  return mode === 'dark' ? darkTheme : lightTheme
}

/** @deprecated use getAppTheme(mode) */
export const theme = lightTheme
