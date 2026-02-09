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

  let topics: string[] = [];
  try {
    topics = JSON.parse(insight.topics || '[]');
  } catch {
    topics = insight.topics ? insight.topics.split(',').map(t => t.trim()) : [];
  }

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
      
      {/* Blue Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 py-16 pt-32 relative overflow-hidden">
        {/* Animated Decorative Circles */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 border-2 border-white/10 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border-2 border-white/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded uppercase font-medium">
              {insight.type}
            </span>
            <span className="text-sm text-white/80">{insight.readTime} min read</span>
            <span className="text-sm text-white/80">
              {new Date(insight.publishedAt).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-white">{insight.title}</h1>
          <p className="text-xl text-white/90 mb-6">{insight.excerpt}</p>
          
          <div className="flex items-center gap-4">
            {insight.author.image ? (
              <img src={insight.author.image} alt={insight.author.name} className="w-12 h-12 rounded-full border-2 border-white/30 object-cover" />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/30">
                {insight.author.name.charAt(0)}
              </div>
            )}
            <div>
              <a href={`/experts/${insight.author.slug}`} className="font-semibold text-white hover:text-yellow-400">
                {insight.author.name}
              </a>
              <p className="text-sm text-white/80">{insight.author.role}</p>
            </div>
          </div>
        </div>
      </section>
      
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">

          <div className="prose prose-lg max-w-none mb-12">
            {insight.image && (
              <img src={insight.image} alt={insight.title} className="w-full aspect-video object-cover rounded-lg mb-8" />
            )}
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{insight.content}</div>
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
