import { Suspense, lazy } from 'react'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { useTranslation } from 'react-i18next'

const Hero = lazy(async () => {
  const m = await import('../components/Hero')
  return { default: m.Hero }
})
const About = lazy(async () => {
  const m = await import('../components/About')
  return { default: m.About }
})
const Gallery = lazy(async () => {
  const m = await import('../components/Gallery')
  return { default: m.Gallery }
})
const Availability = lazy(async () => {
  const m = await import('../components/Availability')
  return { default: m.Availability }
})
const Contact = lazy(async () => {
  const m = await import('../components/Contact')
  return { default: m.Contact }
})
const FinalCTA = lazy(async () => {
  const m = await import('../components/FinalCTA')
  return { default: m.FinalCTA }
})

export function Landing() {
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <Suspense fallback={<PageFallback role="status" aria-live="polite" data-loading={t('common.loading')} />}>
        <Hero />
        <About />
        <Gallery />
        <Availability />
        <Contact />
        <FinalCTA />
      </Suspense>
      <Footer>
        <span>{t('footer.tagline')}</span>
        <small>{t('footer.subTagline')}</small>
      </Footer>
    </>
  )
}

const PageFallback = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.65rem;
  opacity: 0.4;

  &::before {
    content: attr(data-loading);
  }

  &::after {
    content: '';
    width: 120px;
    height: 1px;
    background: currentColor;
    opacity: 0.25;
    animation: pulse 1.2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scaleX(0.6);
      opacity: 0.2;
    }
    50% {
      transform: scaleX(1);
      opacity: 0.45;
    }
  }
`

const Footer = styled.footer`
  padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.md}
    calc(${({ theme }) => theme.space.lg} + env(safe-area-inset-bottom, 0));
  text-align: center;
  background: ${({ theme }) => theme.colors.inverseBg};
  color: ${({ theme }) => theme.colors.inverseFgMuted};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  small {
    font-size: 0.65rem;
    opacity: 0.65;
    letter-spacing: 0.18em;
  }
`
