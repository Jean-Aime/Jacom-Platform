import type { Metadata } from "next";
import "./globals.css";
import "./animations.css";
import { Roboto } from "next/font/google";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import NewsletterAlert from "@/components/Newsletter/NewsletterAlert";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: "JAS.COM Consulting | Global Management Consulting Firm",
  description: "Leading global management consulting firm specializing in digital transformation, strategy, and operations excellence.",
  keywords: ["management consulting", "digital transformation", "strategy consulting", "business consulting"],
  metadataBase: new URL('https://jas.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jas.com',
    siteName: 'JAS.COM Consulting'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={roboto.className}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="page-transition">
          {children}
        </div>
        <CookieConsent />
        <NewsletterAlert />
      </body>
    </html>
  );
}
