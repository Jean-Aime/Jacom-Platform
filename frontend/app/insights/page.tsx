import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";
import InsightsClient from "./InsightsClient";

export const revalidate = 1800; // Cache for 30 minutes

export default async function InsightsPage() {
  const insights = await prisma.insight.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      excerpt: true,
      featured: true,
      trending: true,
      readTime: true,
      publishedAt: true,
      topics: true,
      regions: true,
      image: true,
      author: {
        select: {
          id: true,
          name: true,
          role: true,
          image: true
        }
      },
      industries: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      services: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    },
    orderBy: { publishedAt: 'desc' }
  });

  const insightsWithParsedData = insights.map(insight => ({
    ...insight,
    topics: typeof insight.topics === 'string' ? JSON.parse(insight.topics || '[]') : insight.topics || [],
    regions: typeof insight.regions === 'string' ? JSON.parse(insight.regions || '[]') : insight.regions || []
  }));

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-blue-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Insights & Thought Leadership</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our latest research, industry perspectives, and innovative solutions shaping the future of business.
            </p>
          </div>
        </div>
      </section>

      <InsightsClient insights={insightsWithParsedData} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
