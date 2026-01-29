import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      subServices: true,
      industries: true,
      insights: {
        take: 3,
        orderBy: { publishedAt: 'desc' }
      },
      experts: true
    }
  });

  if (!service) {
    notFound();
  }

  const methodologies = JSON.parse(service.methodologies || '[]');
  const tools = JSON.parse(service.tools || '[]');

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">{service.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">{service.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Service Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{service.overview}</p>
              
              {service.subServices.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Key Areas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.subServices.map((sub) => (
                      <div key={sub.id} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{sub.name}</h4>
                        <p className="text-sm text-gray-600">{sub.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {methodologies.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Methodologies</h3>
                    <ul className="space-y-2">
                      {methodologies.map((method: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>
                          <span className="text-gray-600">{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {tools.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Tools & Accelerators</h3>
                    <ul className="space-y-2">
                      {tools.map((tool: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>
                          <span className="text-gray-600">{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div>
              {service.industries.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Related Industries</h3>
                  <div className="space-y-3">
                    {service.industries.map((industry) => (
                      <a 
                        key={industry.id}
                        href={`/industries/${industry.slug}`}
                        className="block p-3 bg-white rounded hover:shadow-md transition-all"
                      >
                        <span className="text-sm font-medium">{industry.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {service.experts.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Our Experts</h3>
                  <div className="space-y-3">
                    {service.experts.slice(0, 3).map((expert) => (
                      <a 
                        key={expert.id}
                        href={`/experts/${expert.slug}`}
                        className="block p-3 bg-white rounded hover:shadow-md transition-all"
                      >
                        <div className="font-medium">{expert.name}</div>
                        <div className="text-xs text-gray-600">{expert.role}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                <p className="mb-4 opacity-90">Let's discuss how this service can transform your business.</p>
                <a 
                  href="/contact"
                  className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.insights.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Related Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {service.insights.map((insight) => (
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
                  <p className="text-sm text-gray-600">{insight.excerpt}</p>
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
