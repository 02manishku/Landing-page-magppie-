import type { Metadata } from 'next';
import './globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import UTMCapture from '@/components/UTMCapture';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: 'Magppie:Wellness Kitchens built in patented Silverstone™',
  description:
    'The world’s first 100% stone Wellness Kitchen. Zero formaldehyde, zero termites, zero mould. 25-year unconditional guarantee. Book a free consultation.',
  metadataBase: new URL('https://www.magppie.com'),
  openGraph: {
    title: 'Magppie:Wellness Kitchens built in Silverstone™',
    description:
      'The world’s first 100% stone Wellness Kitchen. 25-year unconditional guarantee. Book a free consultation.',
    images: ['/images/hero.jpg']
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <UTMCapture />
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
