import type { Metadata } from 'next';

import Layout from '@/components/Layout';

import '@/styles/globals.css';
import '@/styles/themes.css';

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
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
