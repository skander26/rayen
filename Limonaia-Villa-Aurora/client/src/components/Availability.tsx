import { useMemo, useRef, useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useAppContext } from '../hooks/useAppContext'

import { useTranslation } from 'react-i18next'

/** Demo availability: odd days of month available (replace with API). */
function isAvailableDate(d: Date) {
  return d.getDate() % 2 === 1
}

export function Availability() {
  const { t } = useTranslation()
  const { selectedDate, setSelectedDate } = useAppContext()
  const [viewMonth, setViewMonth] = useState(() => new Date())
  const sectionRef = useRef<HTMLElement>(null)


  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(viewMonth), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [viewMonth])

  return (
    <Section ref={sectionRef} id="availability">
      <Inner>
        <Split>
          <Copy>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
            >
              {t('availability.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              {t('availability.body')}
            </motion.p>

          </Copy>

          <CalendarPanel
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <CalHeader>
              <IconButton
                type="button"
                aria-label={t('common.previousMonth')}
                onClick={() => setViewMonth((m) => addMonths(m, -1))}
              >
                ‹
              </IconButton>
              <MonthLabel>{format(viewMonth, 'MMMM yyyy')}</MonthLabel>
              <IconButton
                type="button"
                aria-label={t('common.nextMonth')}
                onClick={() => setViewMonth((m) => addMonths(m, 1))}
              >
                ›
              </IconButton>
            </CalHeader>
            <WeekRow>
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
                <Weekday key={d}>{d}</Weekday>
              ))}
            </WeekRow>
            <DayGrid>
              {days.map((day) => {
                const inMonth = isSameMonth(day, viewMonth)
                const available = isAvailableDate(day)
                const selected = selectedDate && isSameDay(day, selectedDate)
                return (
                  <DayCell
                    key={day.toISOString()}
                    type="button"
                    $inMonth={inMonth}
                    $available={available}
                    $selected={!!selected}
                    disabled={!inMonth || !available}
                    onClick={() => inMonth && available && setSelectedDate(day)}
                    layout
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                  >
                    {format(day, 'd')}
                  </DayCell>
                )
              })}
            </DayGrid>
            <Legend>
              <span>
                <i /> {t('availability.legendAvailable')}
              </span>
            </Legend>
          </CalendarPanel>
        </Split>
      </Inner>
    </Section>
  )
}

const Section = styled.section`
  padding: ${({ theme }) => theme.space.xl} 0;
  background: ${({ theme }) => theme.colors.surface};
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
`

const Split = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`

const Copy = styled.div`
  h2 {
    margin: 0 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 500;
  }

  p {
    margin: 0 0 ${({ theme }) => theme.space.md};
    color: ${({ theme }) => theme.colors.inkMuted};
    line-height: 1.75;
    font-weight: 300;
    max-width: 36rem;
  }
`



const CalendarPanelShell = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`

const CalendarPanel = motion.create(CalendarPanelShell)

const CalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const MonthLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  letter-spacing: 0.02em;
`

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.soft};
  }
`

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: ${({ theme }) => theme.space.xs};
`

const Weekday = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.45;
`

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`

const DayCellBase = styled.button<{
  $inMonth: boolean
  $available: boolean
  $selected: boolean
}>`
  position: relative;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  font-size: 0.85rem;
  cursor: pointer;
  background: ${({ theme, $selected, $available, $inMonth }) =>
    !$inMonth
      ? 'transparent'
      : $selected
        ? theme.colors.ink
        : $available
          ? theme.colors.surface
          : 'rgba(20, 18, 16, 0.04)'};
  color: ${({ theme, $selected, $inMonth, $available }) =>
    !$inMonth
      ? 'transparent'
      : $selected
        ? theme.colors.surface
        : $available
          ? theme.colors.ink
          : 'rgba(20, 18, 16, 0.28)'};
  opacity: ${({ $inMonth }) => ($inMonth ? 1 : 0.22)};
  pointer-events: ${({ $inMonth }) => ($inMonth ? 'auto' : 'none')};
  transition: box-shadow 0.35s ${({ theme }) => theme.transition.smooth},
    border-color 0.35s ease, transform 0.2s ease;

  ${({ $available, $inMonth, $selected, theme }) =>
    $inMonth && $available && !$selected
      ? `
    box-shadow: 0 0 0 1px rgba(45, 106, 79, 0.2), 0 0 18px ${theme.colors.availableGlow};
  `
      : ''}

  ${({ $selected, theme }) =>
    $selected
      ? `
    box-shadow: 0 12px 28px rgba(20, 18, 16, 0.18);
    border-color: ${theme.colors.gold};
  `
      : ''}

  &:disabled {
    cursor: default;
    box-shadow: none;
  }
`

const DayCell = motion.create(DayCellBase)

const Legend = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.available};
    box-shadow: 0 0 12px ${({ theme }) => theme.colors.availableGlow};
  }
`
