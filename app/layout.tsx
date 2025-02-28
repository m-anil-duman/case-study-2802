import { Providers } from './providers';
import { NuqsProvider } from './nuqs-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description: 'Explore characters from Rick and Morty series',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NuqsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </NuqsProvider>
        </Providers>
      </body>
    </html>
  );
}
