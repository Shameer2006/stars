import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Your Name in Stars team — we\'d love to hear from you.',
  alternates: {
    canonical: 'https://your-name-in-stars.vercel.app/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
