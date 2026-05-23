import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import IntroVideo from '@/components/IntroVideo';
import JsonLd from '@/components/JsonLd';
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

const BASE_URL = 'https://stars-n.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Your Name in Stars — See Your Name Written in Real Stars from the Night Sky',
    template: '%s | Your Name in Stars',
  },

  description:
    'Type your name and watch it appear written across the night sky using real stars from the HYG Stellar Database. Each letter is traced by an actual star — a real sun in our galaxy. Free, beautiful, and shareable. Explore 8,700+ real stars, discover the Star of the Day, and share your name among the cosmos.',

  keywords: [
    'your name in stars',
    'name in stars',
    'write my name in stars',
    'see your name in stars',
    'name written in stars',
    'star name generator',
    'real stars',
    'stars with names',
    'night sky name',
    'astronomy',
    'HYG database',
    'constellation',
    'space',
    'galaxy',
    'star map',
    'starfield',
    'star of the day',
    'named stars',
    'star names',
    'personalized stars',
    'night sky',
    'celestial',
    'cosmos',
    'star visualization',
    'interactive star map',
    'stellar database',
    'star chart',
    'name a star',
    'find my star',
  ],

  authors: [{ name: 'Your Name in Stars' }],
  creator: 'Your Name in Stars',
  publisher: 'Your Name in Stars',

  applicationName: 'Your Name in Stars',
  category: 'Entertainment',

  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },

  openGraph: {
    title: 'Your Name in Stars ✨ — Written in Real Stars from the Night Sky',
    description:
      'Type your name and see it written across the night sky using 8,700+ real stars from the HYG Stellar Database. Every star is a real sun in our galaxy. Free & shareable.',
    url: BASE_URL,
    siteName: 'Your Name in Stars',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Name in Stars — see your name written across the night sky with real stars',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Your Name in Stars ✨ — Written in Real Stars',
    description:
      'Type your name and see it written across the night sky using real stars. Every letter traced by an actual star from our galaxy.',
    images: ['/og-image.png'],
    creator: '@stars_n',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  verification: {
    google: 'google28b6dbf4d718a7b0',
  },

  other: {
    'google-site-verification': 'google28b6dbf4d718a7b0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
      <head>
        {/* JSON-LD: WebApplication structured data for rich results */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Your Name in Stars',
            url: BASE_URL,
            description:
              'Type your name and see it written across the night sky using real stars from the HYG Stellar Database. Every star is a real sun in our galaxy.',
            applicationCategory: 'Entertainment',
            operatingSystem: 'Web',
            browserRequirements: 'Requires JavaScript',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            creator: {
              '@type': 'Organization',
              name: 'Your Name in Stars',
            },
            screenshot: `${BASE_URL}/og-image.png`,
          }}
        />

        {/* JSON-LD: Website with SearchAction for sitelinks search box */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Your Name in Stars',
            url: BASE_URL,
            description:
              'See your name written in real stars from the night sky. Explore named stars, constellations, and the Star of the Day.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/?name={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }}
        />

        {/* JSON-LD: FAQPage for common questions (boosts rich snippets) */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How does Your Name in Stars work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your Name in Stars uses the HYG Stellar Database containing 8,700+ real stars. When you type your name, each letter is mapped to a real star\'s position in the night sky, creating a unique celestial visualization of your name.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are these real stars?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Every star shown is a real star cataloged in the HYG Stellar Database. The database includes stars like Sirius, Vega, Polaris, and thousands more, with their actual positions, magnitudes, and distances from Earth.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I share my name in stars?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! After typing your name, you can share it via a unique link, download it as an image, or copy a QR code. The link will show your name written in the same stars to anyone who opens it.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the Star of the Day?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each day, we feature a different named star from our database with details about its constellation, distance, brightness, and Wikipedia information. There are hundreds of named stars to discover!',
                },
              },
            ],
          }}
        />
      </head>
      <body className="bg-[#040412] text-white min-h-screen antialiased overflow-x-hidden">
        <IntroVideo />
        {children}
      </body>
    </html>
  );
}
