'use client';

import { motion } from 'framer-motion';
import { WikiSummary } from '@/lib/wikipedia';

interface StarDetailClientProps {
  wikiData: WikiSummary | null;
  decodedName: string;
}

export default function StarDetailClient({ wikiData, decodedName }: StarDetailClientProps) {
  if (!wikiData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="text-4xl mb-4 text-amber-400/50">★</div>
        <h1 className="text-2xl font-cinzel text-white mb-2">Star Not Found</h1>
        <p className="text-gray-400 font-cormorant text-lg">
          We couldn&apos;t find detailed information for {decodedName}.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center text-center"
    >
      <span className="text-sm sm:text-base uppercase tracking-[0.3em] text-amber-400/80 mb-4 font-sans font-medium">
        Star of the Day
      </span>

      {/* High-res Image */}
      {wikiData.originalimage || wikiData.thumbnail ? (
        <div className="relative w-48 h-48 sm:w-72 sm:h-72 mb-8 rounded-full overflow-hidden shadow-[0_0_60px_rgba(212,168,86,0.15)] border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wikiData.originalimage?.source || wikiData.thumbnail?.source}
            alt={wikiData.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-48 h-48 sm:w-72 sm:h-72 mb-8 rounded-full border border-white/10 flex items-center justify-center text-amber-400/20 text-6xl">
          ★
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl font-cinzel font-semibold mb-6 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
        {wikiData.title}
      </h1>

      {/* Description Extract */}
      <div 
        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 mt-2 mb-6 w-full"
      >
        <div 
          className="prose prose-invert prose-lg md:prose-xl font-cormorant font-medium tracking-wide text-gray-100 leading-relaxed text-center"
          dangerouslySetInnerHTML={{ __html: wikiData.extract_html }}
        />
      </div>

      <a
        href={wikiData.content_urls.desktop.page}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-widest font-semibold font-sans"
      >
        Read more on Wikipedia
      </a>
    </motion.div>
  );
}
