import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { clerkAppearance, clerkUrls } from '@/config/clerk';
import { themeConfig } from '@/config/theme';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'UNIZERO - AI Subscription Manager',
    template: '%s | UNIZERO',
  },
  description:
    'Discover, compare, and manage AI tool subscriptions in one place.',
  keywords: [
    'AI tools',
    'subscription manager',
    'AI discovery',
    'software tools',
  ],
  authors: [{ name: 'UNIZERO' }],
  creator: 'UNIZERO',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://unizero.ai',
    siteName: 'UNIZERO',
    title: 'UNIZERO - AI Subscription Manager',
    description:
      'Discover, compare, and manage AI tool subscriptions in one place.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNIZERO - AI Subscription Manager',
    description:
      'Discover, compare, and manage AI tool subscriptions in one place.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <ClerkProvider
          appearance={clerkAppearance}
          signInUrl={clerkUrls.signIn}
          signUpUrl={clerkUrls.signUp}
          afterSignInUrl={clerkUrls.afterSignIn}
          afterSignUpUrl={clerkUrls.afterSignUp}
        >
          <ThemeProvider
            attribute={themeConfig.provider.attribute}
            defaultTheme={themeConfig.defaultTheme}
            enableSystem={themeConfig.provider.enableSystem}
            disableTransitionOnChange={
              themeConfig.provider.disableTransitionOnChange
            }
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
