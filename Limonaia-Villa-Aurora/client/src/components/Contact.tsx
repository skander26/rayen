import { useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import { useAppContext } from '../hooks/useAppContext'

const FormShell = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`

const MotionForm = motion.create(FormShell)

const schema = yup.object({
  name: yup.string().trim().required('Please add your name'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  phone: yup.string().trim().default(''),
  message: yup
    .string()
    .trim()
    .min(12, 'A few more words help us prepare')
    .required('Tell us how we can help'),
})

type FormValues = {
  name: string
  email: string
  phone: string
  message: string
}

export function Contact() {
  const { setContactDraft } = useAppContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues: { name: '', email: '', phone: '', message: '' },
  })

  const onSubmit = (data: FormValues) => {
    setContactDraft(data)
    reset()
  }

  return (
    <Section id="contact">
      <Inner>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <h2>Contact</h2>
          <p>
            Share your dates and wishes — our concierge replies with a tailored
            proposal, quietly and without hurry.
          </p>
        </motion.div>

        <MotionForm
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.05 }}
        >
          <Field>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              $invalid={!!errors.name}
              {...register('name')}
              autoComplete="name"
            />
            {errors.name && <Err>{errors.name.message}</Err>}
          </Field>
          <Field>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              $invalid={!!errors.email}
              {...register('email')}
              autoComplete="email"
            />
            {errors.email && <Err>{errors.email.message}</Err>}
          </Field>
          <Field>
            <label htmlFor="phone">Phone (optional)</label>
            <Input
              id="phone"
              type="tel"
              $invalid={!!errors.phone}
              {...register('phone')}
              autoComplete="tel"
            />
            {errors.phone && <Err>{errors.phone.message}</Err>}
          </Field>
          <Field>
            <label htmlFor="message">Message</label>
            <TextArea
              id="message"
              rows={5}
              $invalid={!!errors.message}
              {...register('message')}
            />
            {errors.message && <Err>{errors.message.message}</Err>}
          </Field>

          <SubmitRow>
            <Submit type="submit">Send inquiry</Submit>
            {isSubmitSuccessful && (
              <Thanks role="status">Received — we’ll be in touch shortly.</Thanks>
            )}
          </SubmitRow>
        </MotionForm>
      </Inner>
    </Section>
  )
}

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(184, 149, 106, 0.35); }
  50% { box-shadow: 0 0 0 10px rgba(184, 149, 106, 0); }
`

const Section = styled.section`
  padding: ${({ theme }) => theme.space.xl} 0;
  background: ${({ theme }) => theme.colors.bg};
`

const Inner = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};

  h2 {
    margin: 0 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 500;
  }

  > div > p {
    margin: 0 0 ${({ theme }) => theme.space.lg};
    color: ${({ theme }) => theme.colors.inkMuted};
    line-height: 1.75;
    font-weight: 300;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: ${({ theme }) => theme.space.md};

  label {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.55;
  }
`

const Input = styled.input<{ $invalid?: boolean }>`
  border: none;
  border-bottom: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? 'rgba(160, 60, 60, 0.5)' : theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.sm} ${({ theme }) => theme.radius.sm} 0 0;
  padding: 0.65rem 0.25rem;
  font-size: 1rem;
  background: transparent;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 12px 28px rgba(20, 18, 16, 0.06);
  }
`

const TextArea = styled.textarea<{ $invalid?: boolean }>`
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? 'rgba(160, 60, 60, 0.45)' : theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 0.85rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 140px;
  background: ${({ theme }) => theme.colors.bg};
  transition: border-color 0.35s ease, box-shadow 0.35s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: ${({ theme }) => theme.shadow.soft};
  }
`

const Err = styled.span`
  font-size: 0.8rem;
  color: #8a3b3b;
`

const SubmitRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space.sm};
`

const Submit = styled.button`
  padding: 0.9rem 1.75rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.inverseBg};
  color: ${({ theme }) => theme.colors.inverseFg};
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.25s ${({ theme }) => theme.transition.smooth};

  &:hover {
    animation: ${pulse} 1.6s ease-in-out infinite;
    transform: translateY(-1px);
  }
`

const Thanks = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.available};
`
