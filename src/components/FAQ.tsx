'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How does Your Name in Stars work?',
    answer:
      'Your Name in Stars is a free star name generator that uses the HYG Stellar Database containing 8,700+ real stars. When you type your name, each letter is mapped to a real star\'s position in the night sky, creating a unique celestial visualization of your name.',
  },
  {
    question: 'Are these real stars from the night sky?',
    answer:
      'Yes! Every star shown is a real star cataloged in the HYG Stellar Database. The database includes famous named stars like Sirius, Vega, Polaris, Betelgeuse, and thousands more, with their actual right ascension, declination, magnitudes, and distances from Earth.',
  },
  {
    question: 'Is this like NASA Your Name tools?',
    answer:
      'While NASA\'s Your Name in Landsat writes your name using satellite imagery of Earth, Your Name in Stars writes your name using real stars from the night sky. Both are free tools that create personalized visualizations, but our tool uses stellar astronomy data from the HYG database to trace each letter with actual stars in space.',
  },
  {
    question: 'Can I share my name in stars?',
    answer:
      'Absolutely! After typing your name, you can share it via a unique link, download it as a high-resolution PNG image, or copy a QR code. The shared link will show your name written in the same real stars to anyone who opens it.',
  },
  {
    question: 'What is the Star of the Day?',
    answer:
      'Each day, we feature a different named star from our database — stars like Sirius, Vega, Polaris, Betelgeuse, Altair, and more — with details about its constellation, distance in light-years, brightness magnitude, and Wikipedia information. There are over 300 named stars to discover!',
  },
  {
    question: 'What stars can I explore?',
    answer:
      'You can explore over 8,700 real stars from the HYG Stellar Database, including 339 named stars such as Sirius (the brightest star), Polaris (the North Star), Vega, Betelgeuse, Rigel, Aldebaran, Antares, Deneb, and many more. Each named star has its own detail page with astronomical data.',
  },
];

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.08] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-1 text-left group transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-[13px] sm:text-sm font-cormorant tracking-wide text-gray-200 group-hover:text-amber-300 transition-colors duration-200 pr-4">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex-shrink-0 text-amber-400/60 group-hover:text-amber-400 transition-colors duration-200 text-lg leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-4 px-1 text-[12px] sm:text-[13px] text-gray-400 font-cormorant leading-relaxed tracking-wide">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-xl mx-auto px-6 py-8">
      {/* Section title */}
      <div className="text-center mb-6">
        <h2 className="text-sm sm:text-base font-cinzel tracking-[0.2em] uppercase text-amber-400/70 text-glow-subtle">
          Your Name in Stars FAQ
        </h2>
        <div className="mt-2 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </div>

      {/* Accordion */}
      <div className="bg-black/50 backdrop-blur-md rounded-xl border border-white/[0.08] px-4 sm:px-6">
        {faqData.map((item, i) => (
          <FAQAccordionItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
