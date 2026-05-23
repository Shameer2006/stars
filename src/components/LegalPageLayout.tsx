'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import Footer from '@/components/Footer';

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, subtitle, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className="relative min-h-screen flex flex-col">
      <StarBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Back navigation */}
        <nav className="pt-6 px-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400/80 font-cormorant tracking-wider uppercase hover:text-amber-300 transition-colors duration-300 group"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Stars
          </Link>
        </nav>

        {/* Header */}
        <header className="pt-10 pb-6 sm:pt-16 sm:pb-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-semibold tracking-wider text-glow-gold">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            {subtitle && (
              <p className="mt-3 text-xs sm:text-sm text-gray-400 font-cormorant tracking-wide max-w-lg mx-auto leading-relaxed text-glow-subtle">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="mt-2 text-[10px] sm:text-[11px] text-gray-500/70 font-cormorant tracking-wider uppercase">
                Last updated: {lastUpdated}
              </p>
            )}
          </motion.div>

          {/* Decorative divider */}
          <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </header>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 pb-16"
        >
          <div className="legal-content bg-black/30 backdrop-blur-sm rounded-2xl border border-white/[0.06] px-6 sm:px-10 py-8 sm:py-10">
            {children}
          </div>
        </motion.article>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
