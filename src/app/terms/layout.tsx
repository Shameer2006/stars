import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Your Name in Stars — read the terms governing use of our free star name generator.',
  alternates: {
    canonical: 'https://stars-n.vercel.app/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
