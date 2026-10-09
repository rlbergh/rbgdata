import type { Metadata } from 'next';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'RBG Data - Data Stories & Visualization Insights',
  description: 'Exploring data stories, visualization tips, and accessibility in data design.',
  openGraph: {
    title: 'RBG Data',
    description: 'Exploring data stories, visualization tips, and accessibility in data design.',
    url: 'https://rbgdata.com',
    siteName: 'RBG Data',
    images: [
      {
        url: 'https://rbgdata.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RBG Data',
    description: 'Exploring data stories, visualization tips, and accessibility in data design.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
