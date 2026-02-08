import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export const revalidate = 3600; // Cache for 1 hour

export default async function IndustriesPage() {
  const industries = await prisma.industry.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      featured: true,
      trends: true,
      image: true
    },
    orderBy: { featured: 'desc' },
    take: 50
  });
  const featuredIndustries = industries.filter(i => i.featured);
  const allIndustries = industries.filter(i => !i.featured);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Industries Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Industries</h1>
            <p className="text-xl text-gray-600 mb-8">
              We serve clients across diverse industries, bringing deep sector expertise and innovative solutions to drive transformation and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      {featuredIndustries.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">Featured Industries</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredIndustries.map((industry) => (
                <a
                  key={industry.id}
                  href={`/industries/${industry.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-100 relative overflow-hidden">
                    {industry.image && (
                      <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{industry.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{industry.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {JSON.parse(industry.trends || '[]').slice(0, 2).map((region: string) => (
                        <span key={region} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                          {region}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                      Learn More →
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Industries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">All Industries</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allIndustries.map((industry) => (
              <a
                key={industry.id}
                href={`/industries/${industry.slug}`}
                className="bg-white p-6 rounded-lg hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{industry.description}</p>
                <div className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Explore →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Insights CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary to-red-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Industry Insights & Expertise</h2>
            <p className="text-xl mb-8 opacity-90">
              Access our latest research, case studies, and thought leadership across all industries
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/insights" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                Browse Insights
              </a>
              <a href="/experts" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
                Meet Our Experts
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}