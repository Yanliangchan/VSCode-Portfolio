import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { JetBrains_Mono, Source_Sans_3 } from 'next/font/google';

import Layout from '@/components/Layout';
import { SettingsProvider } from '@/lib/SettingsContext';

import '@/styles/globals.css';
import '@/styles/themes.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Chan Yanliang | Portfolio',
    template: 'Chan Yanliang | %s',
  },
  description:
    'Chan Yanliang is a cybersecurity enthusiast from Singapore working across offensive security, defensive security, software development, automation, and AI',
  keywords: [
    'chan yanliang',
    'yanliang',
    'yanliang chan',
    'cybersecurity portfolio',
    'yanliang cybersecurity',
    'yanliang developer',
    'digital forensics',
    'chan yanliang portfolio',
    'vscode-portfolio',
  ],
  openGraph: {
    title: "Chan Yanliang's Portfolio",
    description:
      'A cybersecurity enthusiast working across offensive security, defensive security, software development, automation, and AI.',
    images: ['https://imgur.com/4zi5KkQ.png'],
    url: 'https://yanliangchan.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    const fontSize = localStorage.getItem('settings.fontSize');
    if (fontSize) {
      document.documentElement.style.setProperty('--content-font-size', fontSize);
    }
    const reduceMotion = localStorage.getItem('settings.reduceMotion');
    if (reduceMotion) {
      document.documentElement.setAttribute('data-reduce-motion', reduceMotion);
    }
  })();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${jetbrainsMono.variable} ${sourceSans.variable}`}>
        <SettingsProvider>
          <Layout>{children}</Layout>
        </SettingsProvider>
      </body>
    </html>
  );
}
