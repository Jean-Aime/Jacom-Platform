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

  const methodologies = JSON.parse(service.methodologies || '[]');
  const tools = JSON.parse(service.tools || '[]');

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
