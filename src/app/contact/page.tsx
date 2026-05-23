'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LegalPageLayout from '@/components/LegalPageLayout';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire this to an API endpoint (e.g., /api/contact) or a service like Formspree
    setSubmitted(true);
  };

  return (
    <LegalPageLayout
      title="Contact Us"
      subtitle="Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you."
    >
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="text-lg font-cinzel tracking-wider text-amber-300 mb-3">Message Sent!</h2>
          <p className="text-sm text-gray-400 font-cormorant tracking-wide leading-relaxed max-w-sm mx-auto">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible — usually within 24–48 hours.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-cormorant tracking-wider uppercase text-gray-400 mb-2">
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-gray-200 font-cormorant tracking-wide placeholder:text-gray-600 focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-xs font-cormorant tracking-wider uppercase text-gray-400 mb-2">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-gray-200 font-cormorant tracking-wide placeholder:text-gray-600 focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-all duration-300"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="contact-subject" className="block text-xs font-cormorant tracking-wider uppercase text-gray-400 mb-2">
              Subject
            </label>
            <select
              id="contact-subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-gray-200 font-cormorant tracking-wide focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-all duration-300 appearance-none"
            >
              <option value="" disabled className="bg-[#0a0a2e] text-gray-400">
                Select a topic
              </option>
              <option value="general" className="bg-[#0a0a2e]">General Inquiry</option>
              <option value="feedback" className="bg-[#0a0a2e]">Feedback &amp; Suggestions</option>
              <option value="bug" className="bg-[#0a0a2e]">Bug Report</option>
              <option value="partnership" className="bg-[#0a0a2e]">Partnership / Collaboration</option>
              <option value="other" className="bg-[#0a0a2e]">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-cormorant tracking-wider uppercase text-gray-400 mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell us what's on your mind..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-gray-200 font-cormorant tracking-wide placeholder:text-gray-600 focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-all duration-300 resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-lg text-sm font-cinzel tracking-wider uppercase bg-gradient-to-r from-amber-400/20 via-amber-300/25 to-amber-400/20 border border-amber-400/30 text-amber-300 hover:border-amber-400/50 hover:from-amber-400/30 hover:via-amber-300/35 hover:to-amber-400/30 transition-all duration-300 text-glow-subtle"
          >
            Send Message
          </motion.button>

          <p className="text-[10px] text-gray-500/60 font-cormorant tracking-wide text-center">
            We typically respond within 24–48 hours.
          </p>
        </form>
      )}
    </LegalPageLayout>
  );
}
