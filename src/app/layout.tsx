import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/AuthProvider';
import ClientWrapper from './ClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'get Adviced',
  description: 'get real advice from real peoples.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <ClientWrapper>{children}</ClientWrapper>
        </body>
      </AuthProvider>
    </html>
  );
}
