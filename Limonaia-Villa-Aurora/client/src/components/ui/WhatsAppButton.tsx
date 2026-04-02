import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CONTACT } from '../../config/contact';
import { useTranslation } from 'react-i18next';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  // Respect user's OS motion preference
  const reduceMotion = useReducedMotion?.() ?? false;

  // ── Language-aware pre-filled message ─────────────────────
  const { t } = useTranslation();

  const message = t('whatsapp.message');

  // ── WhatsApp deep-link ─────────────────────────────────────
  // wa.me requires digits only — normalizeWhatsAppDigits already
  // ran at import time, so CONTACT.whatsappNumber is clean.
  const whatsappUrl =
    `https://wa.me/${CONTACT.whatsappNumber}` +
    (message ? `?text=${encodeURIComponent(message)}` : '');

  // ── Tooltip label ──────────────────────────────────────────
  const tooltipText = t('whatsapp.tooltip');
  const ariaLabel   = t('whatsapp.ariaLabel');

  return (
    /*
      OUTER WRAPPER — fixed position anchor.
      whileHover / whileTap live HERE so both the pulse layer
      AND the <a> scale together, preventing any drift.
    */
    <motion.div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', // pill grows leftward
      }}
      initial={reduceMotion
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 80, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reduceMotion
        ? { duration: 0 }
        : { delay: 2, duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={reduceMotion ? {} : { scale: 1.1 }}
      whileTap={reduceMotion ? {} : { scale: 0.93 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >

      {/* ── TOOLTIP (desktop hover, left of button) ───────── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="wa-tooltip"
            role="tooltip"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
            style={{
              /* Match existing site card style exactly */
              marginRight: '12px',
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'white',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              color: '#1A2B40',
              /* Arrow pointing right — pure CSS */
              position: 'relative',
            }}
          >
            {tooltipText}
            {/* Right-pointing arrow */}
            <span style={{
              position: 'absolute',
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '6px solid white',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BUTTON CORE (pulse layer + link, same stacking) ── */}
      <div style={{ position: 'relative' }}>

        {/* PULSE RING — sits BEHIND the link via z-index.
            Container uses inset:0 + flex centering so the ring
            stays centered whether button is circle OR pill. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0,           // behind the <a> (z-index: 1)
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(37, 211, 102, 0.35)',
            animation: reduceMotion
              ? 'none'
              : 'wa-pulse 2.2s ease-out infinite',
          }} />
        </div>

        {/* MAIN LINK — pill expands on hover (desktop only) */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          role="link"
          animate={{
            width: hovered ? 'auto' : '60px',
            paddingLeft: hovered ? '18px' : '0px',
            paddingRight: hovered ? '18px' : '0px',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="wa-link"
          style={{
            position: 'relative',
            zIndex: 1,              // above the pulse ring
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '60px',
            minWidth: '60px',
            borderRadius: '50px',   // pill-safe on any width
            background: 'linear-gradient(145deg, #25D366, #1DA851)',
            boxShadow: [
              '0 1px 0 1px rgba(255,255,255,0.3) inset',
              '0 -2px 0 2px rgba(0,0,0,0.08) inset',
              '0 8px 32px rgba(37,211,102,0.45)',
              '0 4px 12px rgba(0,0,0,0.15)',
            ].join(', '),
            cursor: 'pointer',
            textDecoration: 'none',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            // Focus ring for keyboard nav
            outline: 'none',
          }}
          // Focus-visible styling via className or onFocus styles:
          onFocus={e => e.currentTarget.style.boxShadow =
            '0 0 0 3px rgba(37,211,102,0.6), 0 8px 32px rgba(37,211,102,0.45)'}
          onBlur={e => e.currentTarget.style.boxShadow = [
            '0 1px 0 1px rgba(255,255,255,0.3) inset',
            '0 -2px 0 2px rgba(0,0,0,0.08) inset',
            '0 8px 32px rgba(37,211,102,0.45)',
            '0 4px 12px rgba(0,0,0,0.15)',
          ].join(', ')}
        >
          {/* WhatsApp SVG — inline, display:block prevents baseline
              shift; flex centering on the parent handles alignment */}
          <svg
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '28px', height: '28px',
              display: 'block', flexShrink: 0
            }}
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967
              -.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164
              -.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475
              -.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13
              -.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497
              .099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207
              -.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01
              -.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479
              0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077
              4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871
              .118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289
              .173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116
              1.524 5.849L.057 23.617a.75.75 0 00.92.919l5.919-1.55
              A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627
              0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.373-.217
              -3.867 1.013 1.013-3.773-.233-.387A9.944 9.944 0 012
              12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>

          {/* Label — only visible when pill is expanded on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                key="wa-label"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.02em',
                  overflow: 'hidden',
                }}
              >
                WhatsApp
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </motion.div>
  );
}
