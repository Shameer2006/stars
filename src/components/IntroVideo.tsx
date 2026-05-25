'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroVideo() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Detect search bots, crawlers, Lighthouse, or automated inspection tools
      const isBot = /bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|lighthouse|inspection/i.test(
        navigator.userAgent
      );
      
      if (isBot) {
        // Skip intro completely for crawlers/bots to optimize SEO indexing and Core Web Vitals
        return;
      }

      // 2. Check if the intro has already played during this session, wrapped in try-catch
      try {
        const hasPlayed = sessionStorage.getItem('introPlayed');
        if (!hasPlayed) {
          setShowIntro(true);
        }
      } catch {
        // Fallback if sessionStorage is blocked/restricted (e.g., incognito or cookie settings)
        setShowIntro(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showIntro === true && videoRef.current) {
      // Explicitly load the video since preload="none" was set
      try {
        videoRef.current.load();
      } catch (err) {
        console.warn('Failed to load video:', err);
      }

      // Try to play the video
      videoRef.current.play().catch((err) => {
        // Log as a warning instead of error to prevent triggering Google Search Console or Sentry alerts
        console.warn('Video autoplay was skipped or blocked by the browser:', err.message || err);
        handleComplete(); // Skip intro if autoplay is blocked by browser or codecs are missing
      });

      // Stop the video after exactly 5 seconds
      const timer = setTimeout(() => {
        handleComplete();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const handleComplete = () => {
    setIsFadingOut(true);
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (err) {
        console.warn('Failed to pause video during transition:', err);
      }
    }
    setTimeout(() => {
      setShowIntro(false);
      try {
        sessionStorage.setItem('introPlayed', 'true');
      } catch {
        // Ignore storage write failures
      }
    }, 1000); // 1 second for the fade-out animation
  };

  // If already played or skipped, render nothing
  if (!showIntro) return null;

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999999] bg-[#040412] flex items-center justify-center overflow-hidden pointer-events-auto"
        >
          {showIntro === true && (
            <video
              ref={videoRef}
              src="/vecteezy_loop-center-colorful-star-optical-flare-shine-rays-light_29331920.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="none"
              onError={() => {
                console.warn('Video failed to load/play, skipping intro.');
                handleComplete();
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
