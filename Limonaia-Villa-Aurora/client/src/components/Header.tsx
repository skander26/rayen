import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

const MotionLink = motion.create(Link)

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'availability', label: 'Stay' },
  { id: 'contact', label: 'Contact' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Bar $elevated={scrolled}>
      <Inner>
        <Brand as={Link} to="/#hero">
          <span>Limonaia</span>
          <em>Villa Aurora</em>
        </Brand>

        <DesktopNav aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.id} to={`/#${item.id}`}>
              {item.label}
            </NavLink>
          ))}
          <CtaLink to="/#availability">Book</CtaLink>
        </DesktopNav>

        <HeaderActions>
          <ThemeToggle />
          <MenuButton
            type="button"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </MenuButton>
        </HeaderActions>
      </Inner>

      <AnimatePresence>
        {open && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <Drawer
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              <DrawerInner>
                {navItems.map((item, i) => (
                  <DrawerLink
                    key={item.id}
                    to={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                  >
                    {item.label}
                  </DrawerLink>
                ))}
                <DrawerCta to="/#availability" onClick={() => setOpen(false)}>
                  Reserve your dates
                </DrawerCta>
              </DrawerInner>
            </Drawer>
          </>
        )}
      </AnimatePresence>
    </Bar>
  )
}

const Bar = styled.header<{ $elevated: boolean }>`
  position: sticky;
  top: 0;
  z-index: 40;
  transition: background 0.35s ${({ theme }) => theme.transition.smooth},
    box-shadow 0.35s ${({ theme }) => theme.transition.smooth},
    backdrop-filter 0.35s ease;

  ${({ $elevated, theme }) =>
    $elevated
      ? css`
          background: ${theme.colors.barElevated};
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 1px 0 ${theme.colors.line};
        `
      : css`
          background: transparent;
        `}

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ $elevated, theme }) =>
      $elevated &&
      css`
        background: ${theme.colors.barElevatedMd};
      `}
  }
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  flex-shrink: 0;
`

const Brand = styled(Link)`
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 500;

  span {
    font-family: ${({ theme }) => theme.fonts.body};
    opacity: 0.55;
  }
  em {
    font-style: normal;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.15rem;
    font-weight: 500;
  }
`

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

const NavLink = styled(Link)`
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.72;
  transition: opacity 0.25s ease;

  &:hover {
    opacity: 1;
  }
`

const CtaLink = styled(Link)`
  margin-left: ${({ theme }) => theme.space.sm};
  padding: 0.55rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.line};
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: transform 0.25s ${({ theme }) => theme.transition.smooth},
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.soft};
  }
`

const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  span {
    display: block;
    height: 2px;
    width: 22px;
    background: ${({ theme }) => theme.colors.ink};
    border-radius: 2px;
    transition: transform 0.25s ease;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const BackdropBase = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 18, 16, 0.35);
  z-index: 45;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const Backdrop = motion.create(BackdropBase)

const DrawerBase = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(86vw, 320px);
  z-index: 50;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.lift};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const Drawer = motion.create(DrawerBase)

const DrawerInner = styled.div`
  padding: calc(72px + env(safe-area-inset-top, 0)) ${({ theme }) => theme.space.md}
    ${({ theme }) => theme.space.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

const DrawerLink = styled(MotionLink)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  letter-spacing: 0.02em;
`

const DrawerCta = styled(Link)`
  margin-top: ${({ theme }) => theme.space.sm};
  padding: 0.85rem 1rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.inverseBg};
  color: ${({ theme }) => theme.colors.inverseFg};
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`
