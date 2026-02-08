import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await prisma.industry.findUnique({
    where: { slug },
    include: {
      services: true,
      insights: { take: 3, include: { author: true }, orderBy: { publishedAt: 'desc' } },
      experts: true
    }
  });

  if (!industry) {
    notFound();
  }

  const challenges = JSON.parse(industry.challenges || '[]');
  const trends = JSON.parse(industry.trends || '[]');

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="relative bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        {industry.image && (
          <div className="absolute inset-0 opacity-20">
            <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-6">{industry.name}</h1>
          <p className="text-xl text-gray-600">{industry.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Industry Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{industry.overview}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Challenges</h3>
                  <ul className="space-y-2">
                    {challenges.map((challenge: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">→</span>
                        <span className="text-gray-600">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Emerging Trends</h3>
                  <ul className="space-y-2">
                    {trends.map((trend: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">→</span>
                        <span className="text-gray-600">{trend}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              {industry.services.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Related Services</h3>
                  <div className="space-y-3">
                    {industry.services.map((service) => (
                      <a 
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="block p-3 bg-white rounded hover:shadow-md transition-all"
                      >
                        <span className="text-sm font-medium">{service.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {industry.experts.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Our Experts</h3>
                  <div className="space-y-3">
                    {industry.experts.slice(0, 3).map((expert) => (
                      <a 
                        key={expert.id}
                        href={`/experts/${expert.slug}`}
                        className="block p-3 bg-white rounded hover:shadow-md transition-all"
                      >
                        <div className="font-medium text-sm">{expert.name}</div>
                        <div className="text-xs text-gray-600">{expert.role}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {industry.insights.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Latest Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {industry.insights.map((insight) => (
                <a
                  key={insight.id}
                  href={`/insights/${insight.slug}`}
                  className="bg-white border rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                      {insight.type}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{insight.excerpt}</p>
                  <div className="text-xs text-gray-500">By {insight.author.name}</div>
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
