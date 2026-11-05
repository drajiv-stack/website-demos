import type { Metadata } from 'next';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LabProvider } from '@/context/LabContext';
import { LabHud } from '@/components/hud/LabHud';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Scroll Lab — Benchmarking Scroll-Storytelling Patterns',
  description: 'Interactive laboratory comparing the 7 core scroll patterns built twice: the correct way and the common broken way.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#1A1714] text-[#F5EDE0] antialiased selection:bg-[#D9911A] selection:text-[#1A1714]">
        <LabProvider>
          {children}
          <LabHud />
        </LabProvider>
      </body>
    </html>
  );
}
