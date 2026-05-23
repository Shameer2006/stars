import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Your Name in Stars — learn how we handle your data when you use our free star name generator.',
  alternates: {
    canonical: 'https://stars-n.vercel.app/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
