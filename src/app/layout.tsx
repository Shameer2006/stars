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
    default: 'Your Name in Stars — Write Your Name in Real Stars | Free Star Name Generator',
    template: '%s | Your Name in Stars',
  },

  description:
    'Find your name written in stars using real stars from the HYG Stellar Database. This free interactive star name generator lets you see your name in the galaxy, traced by actual stars like Sirius, Vega, and Polaris. Explore the night sky star map, discover named stars with our daily Star of the Day, and visualize stellar astronomy online. Perfect for space lovers and astronomy fans.',

  keywords: [
    'your name in stars',
    'name in stars',
    'NASA name in stars',
    'write name in stars',
    'write my name in stars',
    'see your name in stars',
    'name written in stars',
    'star name generator',
    'name in the galaxy',
    'name in constellations',
    'name in the night sky',
    'real stars',
    'HYG Stellar Database',
    'HYG database',
    'night sky star map',
    'interactive star map',
    'star map online',
    'star visualization',
    'visualize stars online',
    'stellar astronomy',
    'star of the day',
    'Sirius',
    'Vega',
    'Polaris',
    'Betelgeuse',
    'named stars',
    'star names',
    'stars with names',
    'find my star',
    'name a star free',
    'personalized stars',
    'star chart',
    'astronomy online',
    'space lover',
    'cosmos',
    'night sky',
    'constellation',
    'galaxy',
    'celestial',
    'free star tool',
    'what star is named after me',
    'stars named after people',
    'which star has my name',
    'can a star have my name',
    'name in the universe',
    'my name in outer space',
    'see my name in the cosmos',
    'name in astronomy',
    'star letter generator',
    'name to stars converter',
    'name spelled in stars',
    'star alphabet',
    'stars spelling my name',
    'free space name tool',
    'name generator space',
    'online star finder',
    'star search by name',
    'type name see stars',
    'HYG star catalog',
    'real star coordinates',
    'star catalog online',
    'stellar database explorer',
    'star brightness magnitude',
    'hipparcos catalog stars',
    'star distance light years',
    'astronomy data visualization',
    'open source star data',
    'star spectral type',
    'daily astronomy fact',
    'star fact of the day',
    'interesting star facts',
    'famous stars in the night sky',
    'brightest stars in the sky',
    'Sirius star information',
    'Vega star information',
    'Polaris north star facts',
    'Betelgeuse supergiant facts',
    'Rigel star facts',
    'Aldebaran star facts',
    'Antares red supergiant',
    'Procyon star facts',
    'Canopus star facts',
    'Arcturus star facts',
    'name in stars gift',
    'personalized star map gift',
    'star map with name',
    'custom star chart',
    'name in stars birthday',
    'romantic star name',
    'star name for loved one',
    'unique space gift idea',
    'name in stars free no signup',
    'astronomy for kids',
    'star map for beginners',
    'learn about stars online',
    'fun astronomy website',
    'interactive space for kids',
    'space education tool',
    'kids star name activity',
    'school astronomy project',
    'NASA star map',
    'NASA star finder',
    'NASA night sky tool',
    'space.com star finder',
    'ESA star database',
    'stellarium alternative',
    'star walk alternative',
    'skymap alternative',
    'free stellarium online',
    'NASA landsat name',
    'name a star alternative free',
    'nameastarregistry alternative',
    'international star registry free',
    'free alternative to name a star',
    'name a star without paying'
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
    title: 'Your Name in Stars ✨ — Write Your Name in Real Stars from the Night Sky',
    description:
      'Free star name generator — type your name and see it written across the night sky using 8,700+ real stars from the HYG Stellar Database. Explore named stars like Sirius, Vega, and Polaris.',
    url: BASE_URL,
    siteName: 'Your Name in Stars',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Name in Stars — write your name across the night sky with real stars from the HYG Stellar Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Your Name in Stars ✨ — Free Star Name Generator',
    description:
      'Write your name in real stars from the HYG Stellar Database. Explore named stars like Sirius, Vega, and Polaris. Free interactive night sky star map.',
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1006713173738488"
          crossOrigin="anonymous"
        />
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
                  text: 'Your Name in Stars is a free star name generator that uses the HYG Stellar Database containing 8,700+ real stars. When you type your name, each letter is mapped to a real star\'s position in the night sky, creating a unique celestial visualization. Unlike naming a star, this tool traces your name using actual stars from our galaxy — similar to NASA\'s Your Name tools but using real stellar positions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are these real stars from the night sky?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Every star shown is a real star cataloged in the HYG Stellar Database. The database includes famous named stars like Sirius, Vega, Polaris, Betelgeuse, and thousands more, with their actual right ascension, declination, magnitudes, and distances from Earth. You can explore each star\'s properties and constellation.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is this like NASA Your Name in Landsat?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'While NASA\'s Your Name in Landsat writes your name using satellite imagery of Earth, Your Name in Stars writes your name using real stars from the night sky. Both are free tools that create personalized visualizations, but our tool uses stellar astronomy data from the HYG database to trace each letter with actual stars in space.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I share my name in stars?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! After typing your name, you can share it via a unique link, download it as a high-resolution PNG image, or copy a QR code. The shared link will show your name written in the same real stars to anyone who opens it.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the Star of the Day?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each day, we feature a different named star from our database — stars like Sirius, Vega, Polaris, Betelgeuse, Altair, and more — with details about its constellation, distance in light-years, brightness magnitude, and Wikipedia information. There are over 300 named stars to discover!',
                },
              },
              {
                '@type': 'Question',
                name: 'What stars can I explore on this site?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can explore over 8,700 real stars from the HYG Stellar Database, including 339 named stars such as Sirius (the brightest star), Polaris (the North Star), Vega, Betelgeuse, Rigel, Aldebaran, Antares, Deneb, and many more. Each named star has its own detail page with astronomical data and Wikipedia information.',
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
