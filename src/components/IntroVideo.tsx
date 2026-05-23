'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroVideo() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if the intro has already played during this session
    const hasPlayed = sessionStorage.getItem('introPlayed');
    if (!hasPlayed) {
      setShowIntro(true);
    }
  }, []);

  useEffect(() => {
    if (showIntro === true && videoRef.current) {
      // Try to play the video
      videoRef.current.play().catch((err) => {
        console.error('Video autoplay failed:', err);
        handleComplete(); // Skip intro if autoplay is blocked by browser
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
        console.error('Failed to pause video during transition:', err);
      }
    }
    setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem('introPlayed', 'true');
    }, 1000); // 1 second for the fade-out animation
  };

  // If already played, render nothing
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
              preload="auto"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
