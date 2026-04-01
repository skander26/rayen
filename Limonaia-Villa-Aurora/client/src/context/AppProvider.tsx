import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AppContext } from './appContext'
import type { BookingStatus, ContactFormValues } from './types'

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('idle')
  const [contactDraft, setContactDraft] = useState<Partial<ContactFormValues>>({})

  const resetBookingFlow = useCallback(() => {
    setSelectedDate(null)
    setCheckIn(null)
    setCheckOut(null)
    setBookingStatus('idle')
  }, [])

  const value = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      checkIn,
      setCheckIn,
      checkOut,
      setCheckOut,
      bookingStatus,
      setBookingStatus,
      contactDraft,
      setContactDraft,
      resetBookingFlow,
    }),
    [
      selectedDate,
      checkIn,
      checkOut,
      bookingStatus,
      contactDraft,
      resetBookingFlow,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
