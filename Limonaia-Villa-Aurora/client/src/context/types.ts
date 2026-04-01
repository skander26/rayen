export type BookingStatus = 'idle' | 'checking' | 'available' | 'unavailable'

export type ContactFormValues = {
  name: string
  email: string
  phone: string
  message: string
}

export type AppContextValue = {
  selectedDate: Date | null
  setSelectedDate: (d: Date | null) => void
  checkIn: Date | null
  setCheckIn: (d: Date | null) => void
  checkOut: Date | null
  setCheckOut: (d: Date | null) => void
  bookingStatus: BookingStatus
  setBookingStatus: (s: BookingStatus) => void
  contactDraft: Partial<ContactFormValues>
  setContactDraft: (v: Partial<ContactFormValues>) => void
  resetBookingFlow: () => void
}
