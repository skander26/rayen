import { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AppProvider } from './context/AppProvider'
import { ThemeModeProvider } from './context/ThemeModeProvider'
import { useThemeMode } from './hooks/useThemeMode'
import { useHashScroll } from './hooks/useHashScroll'
import { GlobalStyles } from './styles/GlobalStyles'
import { getAppTheme } from './theme/theme'
import { Landing } from './pages/Landing'

function ScrollBridge() {
  useHashScroll()
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  )
}

function ThemedApp() {
  const { mode } = useThemeMode()
  const theme = useMemo(() => getAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <BrowserRouter>
          <ScrollBridge />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  )
}
