import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const isIT = i18n.language === 'it'

  const toggle = () => {
    const next = isIT ? 'en' : 'it'
    i18n.changeLanguage(next)
  }

  return (
    <Toggle
      type="button"
      className={className}
      onClick={toggle}
      aria-label={isIT ? "Switch to English" : "Passa all'italiano"}
      title={isIT ? 'English' : 'Italiano'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i18n.language}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <span>{isIT ? '🇬🇧' : '🇮🇹'}</span>
          <span>{isIT ? 'EN' : 'IT'}</span>
        </motion.span>
      </AnimatePresence>
    </Toggle>
  )
}

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.35s ${({ theme }) => theme.transition.smooth},
    border-color 0.35s ease, color 0.35s ease, transform 0.2s ease,
    box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.soft};
    border-color: ${({ theme }) => theme.colors.gold};
  }
`
