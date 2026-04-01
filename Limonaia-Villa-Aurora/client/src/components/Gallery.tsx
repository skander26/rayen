import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type TouchEvent,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { gallerySlides } from '../constants/images'
import { ResponsiveImg } from './ResponsiveImg'

const AUTOPLAY_MS = 5200

export function Gallery() {
  const count = gallerySlides.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const close = useCallback(() => setActive(null), [])

  const go = useCallback(
    (next: number) => {
      const i = ((next % count) + count) % count
      setIndex(i)
    },
    [count],
  )

  useEffect(() => {
    if (paused || count < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, count])

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 48) return
    if (dx > 0) go(index - 1)
    else go(index + 1)
  }

  const slide = gallerySlides[index]

  return (
    <Section id="gallery">
      <Inner>
        <HeaderBlock>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
          >
            Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.06 }}
          >
            Swipe through moments of the villa — interiors, light, and the garden
            in quiet motion.
          </motion.p>
        </HeaderBlock>

        <Carousel
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Arrow
            type="button"
            aria-label="Previous image"
            onClick={() => go(index - 1)}
          >
            ‹
          </Arrow>

          <Viewport
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={() => setActive(index)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%' }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.45 }}
                >
                  <SlideCard>
                    <ResponsiveImg
                      src={slide.src}
                      fallback={slide.fallback}
                      alt={slide.alt}
                    />
                    <Dim />
                  </SlideCard>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Viewport>

          <Arrow
            type="button"
            aria-label="Next image"
            onClick={() => go(index + 1)}
          >
            ›
          </Arrow>
        </Carousel>

        <Dots role="tablist" aria-label="Gallery slides">
          {gallerySlides.map((_, i) => (
            <Dot
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              $active={i === index}
              onClick={() => go(i)}
            />
          ))}
        </Dots>
      </Inner>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.75rem',
              background: 'rgba(20, 18, 16, 0.72)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <LightboxPanel>
                <CloseBtn type="button" onClick={close} aria-label="Close">
                  ×
                </CloseBtn>
                <ResponsiveImg
                  src={gallerySlides[active].src}
                  fallback={gallerySlides[active].fallback}
                  alt={gallerySlides[active].alt}
                  loading="eager"
                />
              </LightboxPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

const Section = styled.section`
  padding: ${({ theme }) => theme.space.xl} 0
    calc(${({ theme }) => theme.space.xl} + 1rem);
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.bg} 0%,
    ${({ theme }) => theme.colors.bgDeep} 100%
  );
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
`

const HeaderBlock = styled.div`
  text-align: center;
  max-width: 34rem;
  margin: 0 auto ${({ theme }) => theme.space.lg};

  h2 {
    margin: 0 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 500;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.inkMuted};
    line-height: 1.7;
    font-weight: 300;
  }
`

const Carousel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  user-select: none;
`

const Arrow = styled.button`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.4;
  transition: opacity 0.25s ease, transform 0.25s ease;
  box-shadow: ${({ theme }) => theme.shadow.soft};

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`

const Viewport = styled.div`
  flex: 1;
  min-width: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.lg};
  touch-action: pan-y;
`

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: ${({ theme }) => theme.space.md};
`

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.ink};
  opacity: ${({ $active }) => ($active ? 1 : 0.2)};
  transition: opacity 0.25s ease, transform 0.25s ease;

  &:hover {
    opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  }
`

const SlideCard = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.lift};

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    transition: filter 0.45s ease;
  }

  &:hover img {
    filter: brightness(0.78);
  }
`

const LightboxPanel = styled.div`
  position: relative;
  max-width: min(1100px, 96vw);
  max-height: 90vh;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.lift};

  img {
    width: 100%;
    height: auto;
    max-height: 88vh;
    object-fit: contain;
    background: ${({ theme }) => theme.colors.ink};
  }
`

const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(20, 18, 16, 0.12);
  pointer-events: none;
  transition: background 0.45s ease;

  ${SlideCard}:hover & {
    background: rgba(20, 18, 16, 0.28);
  }
`

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 2;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(246, 242, 235, 0.92);
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
`
