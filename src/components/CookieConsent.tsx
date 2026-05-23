'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  hasConsented,
  getConsent,
  setConsent,
  acceptAll,
  rejectAll,
  restoreConsent,
} from '@/lib/consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    // Restore any previously-saved consent to Google Consent Mode
    restoreConsent();

    // Show the banner only if the user hasn't chosen yet
    if (!hasConsented()) {
      // Small delay so the banner doesn't compete with the intro animation
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Pre-fill toggles from stored consent
      const saved = getConsent();
      if (saved) {
        setAnalytics(saved.analytics);
        setAdvertising(saved.advertising);
      }
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    rejectAll();
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    setConsent({ analytics, advertising });
    setVisible(false);
  }, [analytics, advertising]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Subtle backdrop overlay */}
          <motion.div
            key="consent-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Banner */}
          <motion.div
            key="consent-banner"
            role="dialog"
            aria-label="Cookie consent"
            aria-modal="true"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed bottom-0 inset-x-0 z-[9999] flex justify-center px-4 pb-4 sm:pb-6"
          >
            <div className="w-full max-w-xl rounded-2xl border border-white/[0.08] bg-[#0c0c24]/90 backdrop-blur-xl shadow-[0_-8px_40px_rgba(212,168,86,0.08)] overflow-hidden">
              {/* ── Main banner ─────────────────────────────── */}
              <div className="px-5 sm:px-7 pt-6 pb-5">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="mt-0.5 text-lg select-none" aria-hidden="true">✦</span>
                  <div>
                    <h2 className="text-sm sm:text-[15px] font-cinzel font-semibold tracking-wider bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      Cookie Preferences
                    </h2>
                    <p className="mt-1.5 text-[11px] sm:text-xs text-gray-400/80 font-cormorant tracking-wide leading-relaxed">
                      We use cookies to enhance your experience, serve personalized ads, and analyze
                      traffic. You can choose which categories to allow.{' '}
                      <Link
                        href="/privacy"
                        className="text-amber-400/70 underline underline-offset-2 decoration-amber-400/25 hover:text-amber-300 transition-colors"
                      >
                        Privacy&nbsp;Policy
                      </Link>
                    </p>
                  </div>
                </div>

                {/* ── Preference toggles (expandable) ──────── */}
                <AnimatePresence>
                  {showPreferences && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4 space-y-3 border-t border-white/[0.06] pt-4">
                        {/* Necessary – always on */}
                        <ToggleRow
                          label="Strictly Necessary"
                          description="Essential for the site to function. Always enabled."
                          checked={true}
                          disabled
                        />
                        {/* Analytics */}
                        <ToggleRow
                          label="Analytics"
                          description="Help us understand how visitors interact with the site."
                          checked={analytics}
                          onChange={setAnalytics}
                        />
                        {/* Advertising */}
                        <ToggleRow
                          label="Advertising"
                          description="Serve personalized ads via Google AdSense."
                          checked={advertising}
                          onChange={setAdvertising}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Buttons ──────────────────────────────── */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 min-w-[100px] px-4 py-2 rounded-lg text-[11px] sm:text-xs font-cinzel font-semibold tracking-wider
                               bg-gradient-to-r from-amber-500/90 via-yellow-500/90 to-amber-600/90 text-[#0c0c24]
                               hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500
                               shadow-[0_2px_12px_rgba(212,168,86,0.25)]
                               transition-all duration-200 active:scale-[0.98]"
                  >
                    Accept All
                  </button>

                  {showPreferences ? (
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 min-w-[100px] px-4 py-2 rounded-lg text-[11px] sm:text-xs font-cinzel font-semibold tracking-wider
                                 border border-amber-400/30 text-amber-300/90
                                 hover:bg-amber-400/10 hover:border-amber-400/50
                                 transition-all duration-200 active:scale-[0.98]"
                    >
                      Save Preferences
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="flex-1 min-w-[100px] px-4 py-2 rounded-lg text-[11px] sm:text-xs font-cinzel font-semibold tracking-wider
                                 border border-white/[0.1] text-gray-300/80
                                 hover:bg-white/[0.04] hover:border-white/[0.15] hover:text-gray-200
                                 transition-all duration-200 active:scale-[0.98]"
                    >
                      Customize
                    </button>
                  )}

                  <button
                    onClick={handleRejectAll}
                    className="flex-1 min-w-[100px] px-4 py-2 rounded-lg text-[11px] sm:text-xs font-cinzel font-semibold tracking-wider
                               text-gray-500 hover:text-gray-300
                               transition-all duration-200 active:scale-[0.98]"
                  >
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Toggle switch sub-component ─────────────────────── */
interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

function ToggleRow({ label, description, checked, disabled, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-[11px] sm:text-xs font-cinzel tracking-wider text-gray-200/90">
          {label}
          {disabled && (
            <span className="ml-2 text-[9px] sm:text-[10px] text-amber-400/50 font-cormorant tracking-wide uppercase">
              Always on
            </span>
          )}
        </p>
        <p className="text-[10px] sm:text-[11px] text-gray-500/70 font-cormorant tracking-wide leading-snug mt-0.5">
          {description}
        </p>
      </div>

      {/* iOS-style toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label} cookies`}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`
          relative shrink-0 w-9 h-5 rounded-full transition-colors duration-200 outline-none
          focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c24]
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${checked
            ? 'bg-gradient-to-r from-amber-500/80 to-yellow-500/80'
            : 'bg-white/10'
          }
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md
            transition-transform duration-200
            ${checked ? 'translate-x-4' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}
