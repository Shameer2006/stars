'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-auto">
      {/* Top divider — subtle nebula gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Brand + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block group">
            <span className="text-lg sm:text-xl font-cinzel tracking-[0.15em] bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:via-yellow-100 group-hover:to-amber-300 transition-all duration-300">
              Your Name in Stars
            </span>
          </Link>
          <p className="mt-2 text-[11px] sm:text-xs text-gray-500 font-cormorant tracking-wider leading-relaxed max-w-md mx-auto">
            A free star name generator — every letter traced by a real star from the HYG Stellar Database
          </p>
        </motion.div>

        {/* Navigation links */}
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8"
          aria-label="Footer navigation"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[11px] sm:text-xs text-gray-400/80 font-cormorant tracking-wider uppercase hover:text-amber-300 transition-colors duration-300 py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400/50 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </motion.nav>

        {/* Divider */}
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-2"
        >
          <p className="text-[10px] sm:text-[11px] text-gray-400/70 font-cormorant tracking-wide text-glow-subtle">
            Star positions from the{' '}
            <a
              href="https://www.astronexus.com/projects/hyg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/50 hover:text-amber-400 transition-colors underline underline-offset-2"
            >
              HYG Stellar Database
            </a>{' '}
            · CC BY-SA 4.0
          </p>
          <p className="text-[10px] sm:text-[11px] text-gray-500/50 font-cormorant tracking-wide text-glow-subtle">
            © {currentYear} Your Name in Stars. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
    </footer>
  );
}
