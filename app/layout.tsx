import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#080400',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://stackd.vercel.app'),
  title: "Stack'd — Built Different. Premium Burgers.",
  description:
    'Every ingredient chosen with obsessive intent. 100% grass-fed. Always fresh. Never frozen.',
  openGraph: {
    title: "Stack'd — Built Different. Premium Burgers.",
    description:
      'Every ingredient chosen with obsessive intent. 100% grass-fed. Always fresh. Never frozen.',
    images: ['/frames/frame_0001.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${playfairDisplay.variable} ${inter.variable}`}
    >
      <body>
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
