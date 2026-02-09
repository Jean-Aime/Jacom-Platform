import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import SocialShare from "@/components/SocialShare/SocialShare";
import GatedContent from "@/components/GatedContent/GatedContent";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await prisma.insight.findFirst({
    where: { 
      slug,
      OR: [
        { status: 'published' },
        { status: 'scheduled', scheduledAt: { lte: new Date() } }
      ]
    },
    include: {
      author: true,
      industries: true,
      services: true
    }
  });

  if (!insight) {
    notFound();
  }

  const topics = JSON.parse(insight.topics || '[]');

  // Get related insights based on shared industries or services
  const relatedInsights = await prisma.insight.findMany({
    where: {
      AND: [
        { id: { not: insight.id } },
        {
          OR: [
            { industries: { some: { id: { in: insight.industries.map(i => i.id) } } } },
            { services: { some: { id: { in: insight.services.map(s => s.id) } } } }
          ]
        }
      ]
    },
    take: 3,
    orderBy: { publishedAt: 'desc' }
  });

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <article className="py-20 pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded uppercase font-medium">
                {insight.type}
              </span>
              <span className="text-sm text-gray-500">{insight.readTime} min read</span>
              <span className="text-sm text-gray-500">
                {new Date(insight.publishedAt).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{insight.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{insight.excerpt}</p>
            
            <div className="flex items-center gap-4 pb-6 border-b">
              {insight.author.image ? (
                <img src={insight.author.image} alt={insight.author.name} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-red-100 rounded-full"></div>
              )}
              <div>
                <a href={`/experts/${insight.author.slug}`} className="font-semibold hover:text-primary">
                  {insight.author.name}
                </a>
                <p className="text-sm text-gray-600">{insight.author.role}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-12">
            {insight.image && (
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-100 rounded-lg mb-8"></div>
            )}
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">{insight.content}</div>
          </div>

          {insight.gated && insight.downloadUrl && (
            <div className="mb-12">
              <GatedContent
                insightTitle={insight.title}
                downloadUrl={insight.downloadUrl}
              />
            </div>
          )}

          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {topics.map((topic: string) => (
                <span key={topic} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                  {topic}
                </span>
              ))}
            </div>
          )}

          {insight.industries.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Related Industries:</h3>
              <div className="flex flex-wrap gap-2">
                {insight.industries.map((industry) => (
                  <a
                    key={industry.id}
                    href={`/industries/${industry.slug}`}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary hover:text-white transition-colors"
                  >
                    {industry.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {insight.services.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Related Services:</h3>
              <div className="flex flex-wrap gap-2">
                {insight.services.map((service) => (
                  <a
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary hover:text-white transition-colors"
                  >
                    {service.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-6 border-t border-b">
            <SocialShare url={`/insights/${insight.slug}`} title={insight.title} />
            <a href={`/experts/${insight.author.slug}`} className="text-primary hover:underline">
              More from {insight.author.name} →
            </a>
          </div>
        </div>
      </article>

      {relatedInsights.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Related Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedInsights.map((related) => (
                <a
                  key={related.id}
                  href={`/insights/${related.slug}`}
                  className="bg-white border rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                      {related.type}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <p className="text-sm text-gray-600">{related.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
