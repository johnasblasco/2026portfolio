import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationDock from "./components/global/NavigationDock";
import ClickSpark from './components/global/ClickSpark'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Johnas - Software Developer",
  description: "I'm a passionate software developer with over 10 years of experience creating beautiful and functional digital experiences.",
  keywords: ["Software Development", "Web Development", "Mobile Development", "Brand Identity", "Portfolio"],
  authors: [{ name: "Johnas" }],
  openGraph: {
    title: "Johnas - Software Developer Portfolio",
    description: "Creating beautiful digital experiences",
    url: "https://Johnas-portfolio.com",
    siteName: "Johnas Portfolio",
    images: [
      {
        url: "/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Johnas - Software Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnas - Software Developer Portfolio",
    description: "Creating beautiful digital experiences",
    images: ["/hero.jpeg"],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ClickSpark
          sparkColor="#212121"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={600}
        >
          <NavigationDock />

          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
