import { Inter } from 'next/font/google';
import {ReactNode} from 'react'
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'HabitForge',
  description: 'A powerful habit tracker for growth',
  manifest: '/manifest.json',
  themeColor: '#4F46E5',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HabitForge',
  },
};

interface RootLayoutProps{
  children:ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
