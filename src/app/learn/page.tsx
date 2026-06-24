import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Learn About Stars & Astronomy | Your Name in Stars',
  description: 'Explore the science, history, and wonder of the cosmos. Read our articles on star naming, celestial coordinates, brightest stars, and the HYG database.',
  alternates: {
    canonical: 'https://your-name-in-stars.vercel.app/learn',
  },
};

export default function LearnIndexPage() {
  const articles = [
    {
      title: 'The History of Star Naming',
      description: 'Discover how stars got their names, from ancient civilizations to modern astronomical catalogs.',
      href: '/learn/history-of-star-naming',
    },
    {
      title: 'Understanding the HYG Stellar Database',
      description: 'Learn about the science and data behind the real stars used in our interactive celestial maps.',
      href: '/learn/hyg-stellar-database',
    },
    {
      title: 'A Guide to the Brightest Stars',
      description: 'Explore the most luminous stars in our night sky, including Sirius, Canopus, and Arcturus.',
      href: '/learn/brightest-stars',
    },
    {
      title: 'Understanding Celestial Coordinates',
      description: 'What are Right Ascension and Declination? A beginner\'s guide to navigating the night sky.',
      href: '/learn/understanding-coordinates',
    },
  ];

  return (
    <LegalPageLayout
      title="Learn About Stars"
      subtitle="Explore the science, history, and wonder of the cosmos"
    >
      <div className="space-y-6">
        {articles.map((article, index) => (
          <section key={index} className="legal-section !pb-6 !mb-6 border-b border-white/[0.04]">
            <Link href={article.href} className="group block no-underline hover:no-underline">
              <h2 className="text-amber-300 group-hover:text-amber-400 transition-colors mb-2 text-lg">
                {article.title}
              </h2>
              <p className="text-gray-400 font-cormorant leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                {article.description}
              </p>
              <span className="inline-block mt-3 text-xs font-cinzel tracking-widest text-amber-500/70 group-hover:text-amber-400 transition-colors">
                Read Article &rarr;
              </span>
            </Link>
          </section>
        ))}
      </div>
    </LegalPageLayout>
  );
}
