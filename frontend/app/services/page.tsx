import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@prisma/client";

export default async function ServicesPage() {
  // Fetch all non-training services from database
  const services = await prisma.service.findMany({
    where: {
      status: 'published',
      type: { not: ServiceType.TRAINING } // Exclude training (those go to Academy)
    },
    orderBy: { featured: 'desc' }
  });

  // Group services by type
  const consulting = services.filter(s => s.type === ServiceType.CONSULTING);
  const technical = services.filter(s => s.type === ServiceType.TECHNICAL);
  const financial = services.filter(s => s.type === ServiceType.FINANCIAL);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section with Mega Menu */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pt-32 pb-56 overflow-hidden min-h-[580px]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-900/30 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Our cross-functional teams deliver specialized vertical knowledge to solve your most complex industry challenges through tailored strategies and innovative execution.
            </h1>
            <div className="flex gap-4 mt-8">
              <a href="/contact" className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-md font-medium text-sm transition shadow-lg flex items-center gap-2">
                Explore Industries
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="/case-studies" className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-md font-medium text-sm transition">
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Industry Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Industry Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide tailored strategies across key sectors, focusing on sustainable growth and operational excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const icons = [
                <svg key="1" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
                <svg key="2" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                <svg key="3" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              ];
              const icon = icons[i % icons.length];
              
              return (
                <a
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center">
                      {icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-xs text-gray-500 font-semibold mb-4 uppercase tracking-wider">{service.type}</p>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <div className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                    Learn More →
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Industry Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Cross-Industry <span className="text-blue-600">Capabilities</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Beyond vertical expertise, our specialized service groups work horizontally across all sectors to ensure inclusive growth and economic resilience.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ),
                    title: "Economic Development",
                    desc: "Regional growth strategies"
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: "Equalities & Inclusion",
                    desc: "Diversity & equity programs"
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: "Communities",
                    desc: "Local impact initiatives"
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                    title: "Employment & Skills",
                    desc: "Workforce development"
                  }
                ].map((cap, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      {cap.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{cap.title}</h4>
                      <p className="text-xs text-gray-600">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-bg.jpg" 
                  alt="Team collaboration" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg">
                  <div className="text-3xl font-bold">12+</div>
                  <div className="text-sm font-medium">GLOBAL VERTICALS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Strategic Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Strategic Approach</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Deep Sector Knowledge",
                desc: "Expertise that goes beyond the surface to understand unique industry drivers."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                ),
                title: "Customized Solutions",
                desc: "We design, tailor strategies, we build solutions crafted for your specific needs."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: "Proven Track Record",
                desc: "Decades of experience delivering measurable results for global organizations."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "Collaborative Approach",
                desc: "We work as an extension of your team to ensure long-term sustainable success."
              }
            ].map((approach, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {approach.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{approach.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{approach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            Connect with our specialized vertical teams to see how we can drive efficiency and growth in your sector.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
              Schedule Industry Consultation
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Download Industry Insights
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
