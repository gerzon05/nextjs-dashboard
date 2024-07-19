import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  twitter: {
    title: 'Next.js Learn Dashboard',
    images: 'https://next-learn-starter.vercel.app/images/og-image.png',
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es-ES',
    },
  },
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: '/og-image.png',
  },
  authors: {
    name: 'Next.js Team',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
