'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import { LetterResult } from '@/types/star';
import { renderDownloadImage } from '@/lib/canvas';

interface ShareModalProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  results?: LetterResult[];
  tileWidth?: number;
  tileHeight?: number;
}

export default function ShareModal({
  name,
  isOpen,
  onClose,
  results,
  tileWidth = 220,
  tileHeight = 300,
}: ShareModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  // Build the shareable URL
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}`
      : '';

  // Generate preview image
  useEffect(() => {
    if (isOpen && results && results.length > 0) {
      setTimeout(() => {
        try {
          const canvas = renderDownloadImage(results, name, tileWidth, tileHeight);
          setPreviewUrl(canvas.toDataURL('image/jpeg', 0.85));
        } catch {
          setPreviewUrl('');
        }
      }, 50);
    } else {
      setPreviewUrl('');
    }
  }, [isOpen, results, name, tileWidth, tileHeight]);

  // Draw QR code — wait a tick so the canvas is mounted
  useEffect(() => {
    if (!isOpen || !qrRef.current) return;
    const timer = setTimeout(() => {
      if (!qrRef.current) return;
      QRCode.toCanvas(qrRef.current, shareUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#111111',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      });
    }, 80);
    return () => clearTimeout(timer);
  }, [isOpen, shareUrl]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the text
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        /* Full-screen fixed flex container — centers the card */
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Backdrop — click to close */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal card — sits on top of backdrop, centered by parent flex */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '400px',
              maxWidth: '92vw',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
              overflow: 'hidden',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 transition-colors z-10 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Preview Strip */}
            {previewUrl && (
              <div className="w-full bg-gray-950 flex items-center justify-center overflow-hidden border-b border-gray-100" style={{ height: 96 }}>
                <img
                  src={previewUrl}
                  alt={`${name} in Stars`}
                  className="h-full w-auto object-contain"
                />
              </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col items-center px-8 pt-6 pb-7 gap-4">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Share your image!
              </h2>

              {/* QR Code */}
              <div className="flex justify-center w-full">
                <div className="border border-gray-200 rounded-xl p-2.5 bg-white shadow-sm">
                  <canvas ref={qrRef} style={{ display: 'block' }} />
                </div>
              </div>

              {/* Caption */}
              <p className="text-xs text-gray-500 text-center leading-relaxed max-w-[260px]">
                Scan this QR code with your mobile device to open the link externally.
              </p>

              {/* URL copy row */}
              <div className="w-full flex items-stretch rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="flex-1 min-w-0 px-3 py-2.5 text-xs text-gray-500 bg-transparent outline-none font-mono truncate"
                />
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 px-4 py-2.5 text-sm font-semibold transition-all duration-200 border-l border-gray-200 ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {copied ? (
                    <span className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied
                    </span>
                  ) : (
                    'Copy'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}


