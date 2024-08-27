import { type Metadata } from 'next';

import '@/styles/globals.css';

import { TopNav } from '@/components/layouts/TopNav';

export const metadata: Metadata = {
  title: 'Aquathon App',
  description: 'Race Time Tracker',
  icons: [{ rel: 'icon', url: '/assets/icons/ic_logo.svg' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <TopNav />
        <main className='pt-20'>{children}</main>
      </body>
    </html>
  );
}