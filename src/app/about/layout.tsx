import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Your Name in Stars — a free interactive tool that writes your name using real stars from the HYG Stellar Database.',
  alternates: {
    canonical: 'https://stars-n.vercel.app/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
