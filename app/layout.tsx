import type { Metadata } from "next";
import type { Viewport } from 'next'
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignedOut,
  SignInButton,
  SignedIn,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Toaster } from 'sonner'
import Analytics from "../components/analytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: '#D95F76',
}

export const metadata: Metadata = {
  title: "is-a.dev Registrar",
  description: "Check if a domain is available for registration",

  "twitter": {
    card: 'summary_large_image',
    title: "Satindar's Registration Site",
    description: 'This shit is really bad btw',
    creator: '@satindar31',
    images: ['http://zipline.satindar-is.me/u/qE9n2f.png'],
 },
  
  openGraph: {
    "title": "Satindar's Registration Site",
    "description": "I was bored okay?",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="en">
        <body className={`${geistSans.className} dark min-h-screen`}>
          <Toaster richColors />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            {children}
          </SignedIn>
        </body>
        <Analytics />
      </html>
    </ClerkProvider>
  );
}
