import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Your Name in Stars — Written in Real Stars from the Night Sky',
    short_name: 'Name in Stars',
    description:
      'Type your name and see it written across the night sky using 8,700+ real stars from the HYG Stellar Database. Every star is a real sun in our galaxy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#040412',
    theme_color: '#d4a856',
    icons: [
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
