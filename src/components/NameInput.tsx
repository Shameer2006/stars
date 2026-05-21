'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LetterResult } from '@/types/star';
import { renderDownloadImage } from '@/lib/canvas';
import ShareModal from './ShareModal';

interface NameInputProps {
  onSubmit: (name: string) => void;
  results: LetterResult[];
  tileWidth: number;
  tileHeight: number;
  isLoading: boolean;
}

export default function NameInput({
  onSubmit,
  results,
  tileWidth,
  tileHeight,
  isLoading,
}: NameInputProps) {
  const [name, setName] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasResults = results.length > 0;
  const displayedName = hasResults ? results.map((r) => r.letter).join('') : '';

  // Sync the input value with the displayed results (e.g. if preloaded from query param or Star of the Day)
  useEffect(() => {
    if (results.length > 0) {
      const currentName = results.map((r) => r.letter).join('');
      setName(currentName);
    }
  }, [results]);

  const handleSubmit = useCallback(() => {
    const trimmed = name.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
    }
  }, [name, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleDownload = useCallback(async () => {
    if (results.length === 0) return;
    const safeName = (displayedName || name).trim().replace(/\s+/g, '_') || 'stars';
    setIsDownloading(true);

    try {
      await Promise.allSettled([
        document.fonts.load('bold 24px "Cinzel"'),
        document.fonts.load('10px "Cormorant Garamond"'),
      ]);

      // Small timeout so fonts settle
      await new Promise((r) => setTimeout(r, 50));

      const canvas = renderDownloadImage(results, safeName, tileWidth, tileHeight);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${safeName}_in_stars.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } finally {
      setIsDownloading(false);
    }
  }, [results, name, displayedName, tileWidth, tileHeight]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-lg mx-auto px-3 sm:px-4"
      >
        <div
          className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-xl border w-full bg-white/5 backdrop-blur-md shadow-lg"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a name"
            maxLength={16}
            className="flex-1 bg-transparent text-gray-200 text-sm sm:text-base px-2.5 sm:px-4 py-1.5 sm:py-2 outline-none placeholder-gray-500 font-sans tracking-wide min-w-0"
            autoFocus
          />

          {/* Enter button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || name.trim().length === 0}
            className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-white/10 hover:bg-white/20 text-gray-200 shadow-sm"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
            ) : (
              'Enter'
            )}
          </button>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={!hasResults || isDownloading}
            className="p-1.5 sm:p-2.5 rounded-lg transition-all duration-300 disabled:opacity-30 text-gray-400 hover:text-white hover:bg-white/10"
            title="Download PNG"
          >
            {isDownloading ? (
              <span className="inline-block w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            )}
          </button>

          {/* QR / Share button */}
          <button
            onClick={() => setShareOpen(true)}
            disabled={!hasResults}
            className="p-1.5 sm:p-2.5 rounded-lg transition-all duration-300 disabled:opacity-30 text-gray-400 hover:text-white hover:bg-white/10"
            title="Share"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>

        <p className="text-center text-gray-500 text-[10px] sm:text-xs mt-2 sm:mt-3 font-sans tracking-wide">
          Press Enter to see your name written in real stars
        </p>
      </motion.div>

      {/* Share Modal */}
      <ShareModal
        name={displayedName || name}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        results={results}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
      />
    </>
  );
}
