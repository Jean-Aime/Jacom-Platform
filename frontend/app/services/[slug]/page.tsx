import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
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

  let methodologies: string[] = [];
  let tools: string[] = [];
  
  try {
    methodologies = JSON.parse(service.methodologies || '[]');
  } catch {
    methodologies = service.methodologies ? service.methodologies.split('\n').filter(m => m.trim()).map(m => m.replace(/^[•\-]\s*/, '').trim()) : [];
  }
  
  try {
    tools = JSON.parse(service.tools || '[]');
  } catch {
    tools = service.tools ? service.tools.split('\n').filter(t => t.trim()).map(t => t.replace(/^[•\-]\s*/, '').trim()) : [];
  }

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <PageHero 
        title={service.name}
        description={service.description}
        illustrationContent={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md px-6 py-8">
              <div className="relative mx-auto" style={{ width: '280px', height: '280px' }}>
                <div className="absolute" style={{ left: '140px', top: '140px', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white animate-pulse-glow">
                    <span className="text-white text-xs font-bold text-center leading-tight">{service.name.split(' ').slice(0,2).join(' ')}</span>
                  </div>
                </div>
                {service.subServices.slice(0, 4).map((sub, i) => {
                  const angles = [0, 90, 180, 270];
                  const colors = ['from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600', 'from-orange-500 to-orange-600'];
                  const icons = [
                    <svg key="icon1" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>,
                    <svg key="icon2" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>,
                    <svg key="icon3" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
                    <svg key="icon4" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>
                  ];
                  const radius = 100;
                  const angleRad = (angles[i] - 90) * Math.PI / 180;
                  const x = 140 + radius * Math.cos(angleRad);
                  const y = 140 + radius * Math.sin(angleRad);
                  return (
                    <div key={sub.id} className="absolute" style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}>
                      <div className={`w-14 h-14 bg-gradient-to-br ${colors[i]} rounded-lg flex items-center justify-center shadow-lg z-10 border-2 border-white diagram-node animate-bounce-in`} style={{ animationDelay: `${0.3 + i * 0.1}s` }} title={sub.name}>
                        {icons[i]}
                      </div>
                    </div>
                  );
                })}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                  {[0, 90, 180, 270].slice(0, service.subServices.length).map((angle, i) => {
                    const radius = 100;
                    const angleRad = (angle - 90) * Math.PI / 180;
                    const x2 = 140 + radius * Math.cos(angleRad);
                    const y2 = 140 + radius * Math.sin(angleRad);
                    return <line key={i} x1="140" y1="140" x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" className="animate-draw-line" style={{animationDelay: `${0.2 + i * 0.05}s`}} />;
                  })}
                </svg>
              </div>
              <div className="mt-6 flex justify-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-3 py-2 rounded-lg border border-white/20 animate-slide-up">
                  <div className="text-base font-bold text-white">{service.subServices.length}</div>
                  <div className="text-[9px] text-blue-200">Key Areas</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-3 py-2 rounded-lg border border-white/20 animate-slide-up animation-delay-100">
                  <div className="text-base font-bold text-white">{service.industries.length}</div>
                  <div className="text-[9px] text-blue-200">Industries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-3 py-2 rounded-lg border border-white/20 animate-slide-up animation-delay-200">
                  <div className="text-base font-bold text-white">{service.experts.length}</div>
                  <div className="text-[9px] text-blue-200">Experts</div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* Service Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Service Overview</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{service.overview}</p>
          </div>
        </div>
      </section>

      {/* Key Areas Section */}
      {service.subServices.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Key Service Areas</h2>
              <p className="text-xl text-gray-600">Comprehensive solutions across multiple domains</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.subServices.map((sub, i) => (
                <div key={sub.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{sub.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{sub.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Methodologies & Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {methodologies.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Our Methodologies</h2>
                <div className="space-y-4">
                  {methodologies.map((method: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{method}</h3>
                        <p className="text-sm text-gray-600">Proven approach for optimal results</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {tools.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Tools & Technologies</h2>
                <div className="grid grid-cols-1 gap-4">
                  {tools.map((tool: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-900">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Industries & Experts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {service.industries.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Related Industries</h2>
                <div className="grid gap-4">
                  {service.industries.map((industry) => (
                    <a 
                      key={industry.id}
                      href={`/industries/${industry.slug}`}
                      className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{industry.name}</h3>
                          <p className="text-sm text-gray-600">Specialized solutions</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {service.experts.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Our Experts</h2>
                <div className="space-y-4">
                  {service.experts.slice(0, 4).map((expert) => (
                    <a 
                      key={expert.id}
                      href={`/experts/${expert.slug}`}
                      className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{expert.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-bold">{expert.name}</h3>
                          <p className="text-sm text-gray-600">{expert.role}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let's discuss how {service.name.toLowerCase()} can drive innovation and growth for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all duration-300 inline-block"
            >
              Get Started Today
            </a>
            <a 
              href="/insights"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Related Insights Section */}
      {service.insights.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Related Insights</h2>
              <p className="text-xl text-gray-600">Stay informed with our latest thinking</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {service.insights.map((insight) => (
                <a
                  key={insight.id}
                  href={`/insights/${insight.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full uppercase">
                      {insight.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{insight.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{insight.excerpt}</p>
                  <div className="mt-6 flex items-center text-blue-600 font-semibold">
                    <span>Read More</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
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
