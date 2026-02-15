import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
import Footer from "@/components/Footer/Footer";
import ServiceResults from "@/components/Services/ServiceResults";
import ServiceCTA from "@/components/Services/ServiceCTA";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { featured: 'desc' }
  });

  const coreServices = services.filter(s => ['digital-transformation', 'strategy-consulting', 'operations-excellence'].includes(s.slug));
  const advancedServices = services.filter(s => ['smart-factory', 'renewable-energy', 'smart-building'].includes(s.slug));
  const domainServices = services.filter(s => ['web-development-training', 'financial-advisory', 'pmo-services'].includes(s.slug));

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <PageHero 
        title="Services & Capabilities"
        description="We deliver transformative solutions across strategy, operations, technology, and innovation to help organizations achieve sustainable growth."
        illustrationContent={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md px-6 py-8">
              <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
                <div className="absolute" style={{ left: '150px', top: '150px', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white animate-pulse-glow">
                    <span className="text-white text-xs font-bold text-center">Services</span>
                  </div>
                </div>
                
                {[
                  { name: 'Digital', color: 'from-blue-500 to-blue-600', angle: 0 },
                  { name: 'IoT', color: 'from-green-500 to-green-600', angle: 72 },
                  { name: 'Consult', color: 'from-purple-500 to-purple-600', angle: 144 },
                  { name: 'Training', color: 'from-orange-500 to-orange-600', angle: 216 },
                  { name: 'Strategy', color: 'from-pink-500 to-pink-600', angle: 288 }
                ].map((service, i) => {
                  const radius = 115;
                  const angleRad = (service.angle - 90) * Math.PI / 180;
                  const x = 150 + radius * Math.cos(angleRad);
                  const y = 150 + radius * Math.sin(angleRad);
                  return (
                    <div key={i} className="absolute" style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center shadow-lg z-10 border-2 border-white`}></div>
                    </div>
                  );
                })}
                
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                  {[0, 72, 144, 216, 288].map((angle, i) => {
                    const radius = 115;
                    const angleRad = (angle - 90) * Math.PI / 180;
                    const x2 = 150 + radius * Math.cos(angleRad);
                    const y2 = 150 + radius * Math.sin(angleRad);
                    return <line key={i} x1="150" y1="150" x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />;
                  })}
                </svg>
              </div>
              
              <div className="mt-8 flex justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20">
                  <div className="text-xl font-bold text-white">{services.length}+</div>
                  <div className="text-[10px] text-blue-200">Services</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20">
                  <div className="text-xl font-bold text-white">100+</div>
                  <div className="text-[10px] text-blue-200">Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20">
                  <div className="text-xl font-bold text-white">98%</div>
                  <div className="text-[10px] text-blue-200">Success</div>
                </div>
              </div>
            </div>
          </div>
        }
      />
      
      {/* Core Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Capabilities</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Core Services</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              We provide specialized consulting across the entire value chain to ensure operational resilience and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {coreServices.map((service, idx) => (
              <div key={service.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                <div className={`relative h-40 ${
                  idx === 0 ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-black' :
                  idx === 1 ? 'bg-gradient-to-br from-teal-500 to-teal-600' :
                  'bg-gradient-to-br from-gray-800 to-gray-900'
                } overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {idx === 0 && <div className="w-20 h-20 bg-blue-500/30 rounded-full blur-2xl"></div>}
                    {idx === 1 && <div className="text-white/20 text-6xl font-bold">STRATEGY</div>}
                    {idx === 2 && (
                      <div className="text-white text-center px-6">
                        <div className="border-2 border-white/30 rounded-lg px-6 py-3 inline-block">
                          <div className="text-xl font-bold">OPERATIONS</div>
                          <div className="text-sm tracking-widest">EXCELLENCE</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.tagline || service.description}</p>
                  <a href={`/services/${service.slug}`} className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Next Gen Industry</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Advanced Solutions</h2>
          </div>

          {advancedServices[0] && (
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-teal-500"></div>
                <div className="absolute bottom-8 left-8 z-10 max-w-xl">
                  <h3 className="text-3xl font-bold text-white mb-3">{advancedServices[0].name}</h3>
                  <p className="text-white/90 text-sm mb-4 max-w-lg">{advancedServices[0].tagline || advancedServices[0].description}</p>
                  <a href={`/services/${advancedServices[0].slug}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    Discover More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {advancedServices.slice(1, 3).map((service, idx) => (
              <div key={service.id} className="relative rounded-2xl overflow-hidden shadow-xl h-[350px]">
                <div className={`absolute inset-0 ${idx === 0 ? 'bg-gradient-to-br from-green-900 via-green-800 to-green-950' : 'bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900'}`}></div>
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-white/90 text-sm mb-4 max-w-sm">{service.tagline || service.description}</p>
                  <a href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Specific Expertise */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Specialized Domain</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Domain Specific Expertise</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {domainServices.map((service, idx) => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.tagline || service.description}</p>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{85 - idx * 7}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${85 - idx * 7}%` }}></div>
                  </div>
                </div>
                <a href={`/services/${service.slug}`} className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceResults />
      <ServiceCTA />

      <Footer />
    </div>
  );
}
