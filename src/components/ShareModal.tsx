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
  const [mounted, setMounted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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

              {/* Share Actions */}
              <div className="w-full flex flex-col gap-2.5">
                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Look at my name written in real stars! ✨ ${shareUrl}`)}`, '_blank')}
                    className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>
                  <button 
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: 'Your Name in Stars',
                            text: 'Look at my name written in real stars! ✨',
                            url: shareUrl,
                          });
                        } catch (e) {
                          console.log('Share canceled or failed', e);
                        }
                      } else {
                        handleCopy(); // fallback to copy if native share unsupported
                      }
                    }}
                    className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    More Apps
                  </button>
                </div>

                {/* URL copy row */}
                <div className="w-full flex items-stretch rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    className="flex-1 min-w-0 px-3 py-2.5 text-[11px] text-gray-500 bg-transparent outline-none font-mono truncate"
                  />
                  <button
                    onClick={handleCopy}
                    className={`flex-shrink-0 px-4 py-2.5 text-xs font-semibold transition-all duration-200 border-l border-gray-200 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {copied ? (
                      <span className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied
                      </span>
                    ) : (
                      'Copy Link'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}


