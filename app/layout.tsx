import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: 'swap'
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
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
