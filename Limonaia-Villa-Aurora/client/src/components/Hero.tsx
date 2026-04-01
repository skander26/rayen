import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import styled from 'styled-components'
import { imagePaths, fallbacks } from '../constants/images'
import { ResponsiveImg } from './ResponsiveImg'

const MotionLink = motion.create(Link)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const smoothY = useSpring(y, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <Section ref={sectionRef} id="hero">
      <ParallaxBg style={{ y: smoothY, scale }}>
        <ResponsiveImg
          src={imagePaths.hero}
          fallback={fallbacks.hero}
          alt="Limonaia Villa Aurora — exterior at golden hour"
          loading="eager"
        />
        <Overlay />
      </ParallaxBg>

      <Content>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Eyebrow>Florence · Tuscany</Eyebrow>
          <Title>Limonaia Villa Aurora</Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            delay: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Subtitle>
            A private limonaia reborn as a serene retreat — light-filled rooms,
            gardens, and the quiet rhythm of the hills beyond the city.
          </Subtitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          <BookNow
            to="/#availability"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Now
          </BookNow>
        </motion.div>
      </Content>
    </Section>
  )
}

const Section = styled.section`
  position: relative;
  min-height: min(100dvh, 920px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`

const ParallaxBgShell = styled.div`
  position: absolute;
  inset: -12% 0 0 0;
  z-index: 0;

  img {
    width: 100%;
    height: 110%;
    object-fit: cover;
    transform-origin: center center;
  }
`

const ParallaxBg = motion.create(ParallaxBgShell)

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 18, 16, 0.15) 0%,
    rgba(20, 18, 16, 0.45) 55%,
    rgba(20, 18, 16, 0.72) 100%
  );
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md}
    calc(${({ theme }) => theme.space.xl} + env(safe-area-inset-bottom, 0));
  width: 100%;
  color: ${({ theme }) => theme.colors.onPhoto};
`

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.xs};
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.85;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 500;
  font-size: clamp(2.4rem, 7vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
`

const Subtitle = styled.p`
  margin: ${({ theme }) => theme.space.md} 0 ${({ theme }) => theme.space.lg};
  max-width: 32rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.65;
  color: rgba(255, 252, 247, 0.88);
`

const BookNow = styled(MotionLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 252, 247, 0.12);
  border: 1px solid rgba(255, 252, 247, 0.35);
  color: ${({ theme }) => theme.colors.onPhoto};
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 0 rgba(184, 149, 106, 0);
  transition: box-shadow 0.45s ${({ theme }) => theme.transition.smooth},
    border-color 0.35s ease;

  &:hover {
    box-shadow: 0 0 36px ${({ theme }) => theme.colors.goldSoft},
      0 0 0 1px rgba(255, 252, 247, 0.45) inset;
    border-color: rgba(255, 252, 247, 0.55);
  }
`
