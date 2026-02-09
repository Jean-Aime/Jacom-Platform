import { Metadata } from 'next';

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}): Metadata {
  const siteName = 'JAS.COM Consulting';
  const fullTitle = `${title} | ${siteName}`;
  const defaultImage = '/images/og-image.jpg';

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      url: url || 'https://jas.com',
      siteName,
      images: [{ url: image || defaultImage }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image || defaultImage]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
