import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'
import { imagePaths, fallbacks } from '../constants/images'
import { ResponsiveImg } from './ResponsiveImg'

const cards = [
  {
    title: 'Light & volume',
    body: 'Tall windows frame the garden; plaster walls breathe with the day.',
    src: imagePaths.about[0],
    fallback: fallbacks.about1,
  },
  {
    title: 'Crafted calm',
    body: 'Materials chosen for touch — stone, oak, linen, and still air.',
    src: imagePaths.about[1],
    fallback: fallbacks.about2,
  },
] as const

const icons = [
  { label: 'Private pool', src: imagePaths.amenities[0], fb: fallbacks.amenity1 },
  { label: 'Chef’s kitchen', src: imagePaths.amenities[1], fb: fallbacks.amenity2 },
  { label: 'Garden limonaia', src: imagePaths.amenities[2], fb: fallbacks.amenity3 },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.25'],
  })
  const leftX = useTransform(scrollYProgress, [0, 1], ['-4%', '0%'])
  const rightX = useTransform(scrollYProgress, [0, 1], ['4%', '0%'])
  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -12])

  return (
    <Section ref={ref} id="about">
      <Inner>
        <Intro>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            A residence, not a hotel
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Every corner is composed for slow mornings and unhurried evenings — a
            private world minutes from Florence, anchored in Tuscan craft and modern
            ease.
          </motion.p>
        </Intro>

        <TwoCol>
          <Col style={{ x: leftX, y: parallaxY }}>
            {cards.map((c, i) => (
              <Card
                key={c.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.1 * i }}
              >
                <Thumb whileHover={{ scale: 1.02 }} transition={{ duration: 0.45 }}>
                  <ResponsiveImg src={c.src} fallback={c.fallback} alt={c.title} />
                </Thumb>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Card>
            ))}
          </Col>
          <Col style={{ x: rightX }}>
            <SideBlock
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
            >
              <SideTitle>Amenities</SideTitle>
              <IconGrid>
                {icons.map((ic) => (
                  <IconTile
                    key={ic.label}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  >
                    <IconImg>
                      <ResponsiveImg src={ic.src} fallback={ic.fb} alt={ic.label} />
                    </IconImg>
                    <span>{ic.label}</span>
                  </IconTile>
                ))}
              </IconGrid>
            </SideBlock>
          </Col>
        </TwoCol>
      </Inner>
    </Section>
  )
}

const Section = styled.section`
  padding: ${({ theme }) => theme.space.xl} 0;
  background: ${({ theme }) => theme.colors.bg};
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
`

const Intro = styled.div`
  max-width: 38rem;
  margin-bottom: ${({ theme }) => theme.space.lg};

  h2 {
    margin: 0 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(2rem, 4.5vw, 2.75rem);
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.inkMuted};
    line-height: 1.75;
    font-weight: 300;
  }
`

const TwoCol = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
`

const ColShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

const Col = motion.create(ColShell)

const CardShell = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space.sm};
  box-shadow: ${({ theme }) => theme.shadow.soft};

  h3 {
    margin: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xs} 0;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.35rem;
    font-weight: 500;
  }

  p {
    margin: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.xs}
      ${({ theme }) => theme.space.sm};
    color: ${({ theme }) => theme.colors.inkMuted};
    line-height: 1.65;
    font-weight: 300;
  }
`

const Card = motion.create(CardShell)

const ThumbShell = styled.div`
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }
`

const Thumb = motion.create(ThumbShell)

const SideBlockShell = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space.md};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`

const SideBlock = motion.create(SideBlockShell)

const SideTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space.md};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 500;
`

const IconGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`

const IconTileShell = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
  padding: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.line};
  cursor: default;

  span {
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }
`

const IconTile = motion.create(IconTileShell)

const IconImg = styled.div`
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`
