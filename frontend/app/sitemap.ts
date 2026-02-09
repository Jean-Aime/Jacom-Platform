import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jas.com';

  const [industries, services, insights, experts, offices, careers] = await Promise.all([
    prisma.industry.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.insight.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.expert.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.office.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.career.findMany({ select: { slug: true, updatedAt: true } })
  ]);

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/experts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/offices`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ...industries.map(i => ({ url: `${baseUrl}/industries/${i.slug}`, lastModified: i.updatedAt, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...services.map(s => ({ url: `${baseUrl}/services/${s.slug}`, lastModified: s.updatedAt, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...insights.map(i => ({ url: `${baseUrl}/insights/${i.slug}`, lastModified: i.updatedAt, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...experts.map(e => ({ url: `${baseUrl}/experts/${e.slug}`, lastModified: e.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...offices.map(o => ({ url: `${baseUrl}/offices/${o.slug}`, lastModified: o.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...careers.map(c => ({ url: `${baseUrl}/careers/${c.slug}`, lastModified: c.updatedAt, changeFrequency: 'daily' as const, priority: 0.7 }))
  ];
}
