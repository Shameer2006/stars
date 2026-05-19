import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import IntroVideo from '@/components/IntroVideo';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Your Name in Stars — Written in Real Stars from the Night Sky',
  description:
    'Type your name and see it written across the night sky using real stars from the HYG Stellar Database. Every star is a real sun in our galaxy. Free, beautiful, shareable.',
  keywords: ['stars', 'name in stars', 'astronomy', 'HYG database', 'constellation', 'space'],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Your Name in Stars',
    description: 'See your name written in real stars from the night sky ✨',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body className="bg-[#040412] text-white min-h-screen antialiased overflow-x-hidden">
        <IntroVideo />
        {children}
      </body>
    </html>
  );
}
