import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ToasterProvider } from '@/components/toaster-provider';
import { ModalProvider } from '@/components/modal-provider';
import { CrispProvider } from '@/components/crisp-provider';
import './globals.css';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Genius',
  description: 'Explore the power of AI-Conversation,Image Generation,Music Generation,Video Generation,Code Generation'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
          <meta property="og:type" content='website' />
          <meta property="og:url" content='https://genius-openai.vercel.app/' />
          <meta property="og:title" content='Genius' />
          <meta property="og:description"
           content='Explore the power of AI-Conversation,Image Generation,Music Generation,Video Generation,Code Generation' />
          <meta property="og:image" content='/preview.png' />
          <meta property="og:image:alt" content='Genius Dashboard' />
        </head>
        <CrispProvider />
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
