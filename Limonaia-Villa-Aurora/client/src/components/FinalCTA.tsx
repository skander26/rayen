import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

const MotionLink = motion.create(Link)

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.45, once: false })

  return (
    <Section ref={ref} id="cta">
      <Inner>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75 }}
        >
          Your Florence chapter begins here
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.06 }}
        >
          Reserve Limonaia Villa Aurora — private gardens, curated interiors, and the
          city’s art within reach.
        </motion.p>
        <CtaWrap>
          <CtaButton
            to="/#availability"
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0.35, scale: 0.96, y: 10 }
            }
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Check availability
          </CtaButton>
        </CtaWrap>
      </Inner>
    </Section>
  )
}

const Section = styled.section`
  padding: calc(${({ theme }) => theme.space.xl} + 1rem) 0
    calc(${({ theme }) => theme.space.xl} + env(safe-area-inset-bottom, 0));
  background: radial-gradient(
      circle at 20% 20%,
      ${({ theme }) => theme.colors.goldSoft},
      transparent 45%
    ),
    ${({ theme }) => theme.colors.inverseBg};
  color: ${({ theme }) => theme.colors.inverseFg};
  text-align: center;
`

const Inner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};

  h2 {
    margin: 0 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0 auto ${({ theme }) => theme.space.lg};
    max-width: 34rem;
    color: ${({ theme }) => theme.colors.inverseFgMuted};
    line-height: 1.75;
    font-weight: 300;
  }
`

const CtaWrap = styled.div`
  display: flex;
  justify-content: center;
`

const CtaButton = styled(MotionLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 252, 247, 0.1);
  border: 1px solid rgba(255, 252, 247, 0.35);
  color: ${({ theme }) => theme.colors.inverseFg};
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(184, 149, 106, 0);
  transition: box-shadow 0.45s ${({ theme }) => theme.transition.smooth};

  &:hover {
    box-shadow: 0 0 40px ${({ theme }) => theme.colors.goldSoft},
      0 0 0 1px rgba(255, 252, 247, 0.45) inset;
  }
`
