import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

interface ExpertPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExpertPage({ params }: ExpertPageProps) {
  const { slug } = await params;
  const expert = await prisma.expert.findUnique({
    where: { slug },
    include: {
      industries: true,
      services: true,
      insights: {
        orderBy: { publishedAt: 'desc' },
        take: 5
      }
    }
  });

  if (!expert) {
    notFound();
  }

  const expertise = JSON.parse(expert.expertise || '[]');
  const locations = JSON.parse(expert.locations || '[]');

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{expert.name}</h1>
              <p className="text-xl text-primary font-semibold mb-6">{expert.role}</p>
              <div className="prose max-w-none mb-8">
                <p className="text-gray-600 leading-relaxed">{expert.bio}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {expertise.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {expertise.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {expert.industries.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Industries</h3>
                    <div className="space-y-2">
                      {expert.industries.map((industry) => (
                        <a key={industry.id} href={`/industries/${industry.slug}`} className="block text-sm text-gray-600 hover:text-primary">
                          → {industry.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {expert.services.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.services.map((service) => (
                      <a
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-primary hover:text-white transition-colors"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {expert.insights.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Latest Insights</h3>
                  <div className="space-y-4">
                    {expert.insights.map((insight) => (
                      <a
                        key={insight.id}
                        href={`/insights/${insight.slug}`}
                        className="block bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                            {insight.type}
                          </span>
                          <span className="text-xs text-gray-500">{insight.readTime} min read</span>
                        </div>
                        <h4 className="font-semibold mb-2">{insight.title}</h4>
                        <p className="text-gray-600 text-sm">{insight.excerpt}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
                {expert.image ? (
                  <img src={expert.image} alt={expert.name} className="aspect-square object-cover rounded-lg mb-6" />
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-red-100 rounded-lg mb-6"></div>
                )}
                
                <div className="space-y-4">
                  {locations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Locations</h4>
                      <div className="space-y-1">
                        {locations.map((location: string) => (
                          <div key={location} className="text-sm text-gray-600">{location}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {expert.email && (
                    <a 
                      href={`mailto:${expert.email}`}
                      className="flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      Email
                    </a>
                  )}

                  {expert.linkedin && (
                    <a 
                      href={expert.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                      </svg>
                      LinkedIn Profile
                    </a>
                  )}

                  <a 
                    href="/contact"
                    className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                  >
                    Contact {expert.name.split(' ')[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
