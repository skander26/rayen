import { useMemo, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AppProvider } from './context/AppProvider'
import { ThemeModeProvider } from './context/ThemeModeProvider'
import { useThemeMode } from './hooks/useThemeMode'
import { useHashScroll } from './hooks/useHashScroll'
import { GlobalStyles } from './styles/GlobalStyles'
import { getAppTheme } from './theme/theme'
import { Landing } from './pages/Landing'
// @ts-expect-error - explicitly requested as JS file
import i18n from './i18n/index.js'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))

    const handleLangChange = (lng: string) => {
      document.documentElement.lang = lng
      localStorage.setItem('villa_aurora_lang', lng)
      document.title = t('meta.title')
      document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
    }

    i18n.on('languageChanged', handleLangChange)
    return () => {
      i18n.off('languageChanged', handleLangChange)
    }
  }, [t])

  return (
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  )
}
