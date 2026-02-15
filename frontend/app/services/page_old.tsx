import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
import Footer from "@/components/Footer/Footer";
import { ServiceCardSkeleton } from "@/components/Skeletons/Skeletons";
import ServicesContent from "@/components/Services/ServicesContent";
import ServiceInfo from "@/components/Services/ServiceInfo";
import ServiceBanner from "@/components/Services/ServiceBanner";
import ServiceCapabilities from "@/components/Services/ServiceCapabilities";
import ServiceImage from "@/components/Services/ServiceImage";
import ServiceResults from "@/components/Services/ServiceResults";
import ServiceCTA from "@/components/Services/ServiceCTA";
import ServiceCommitment from "@/components/Services/ServiceCommitment";
import { getContent } from "@/lib/content";
import { Suspense } from "react";

async function ServicesList() {
  const services = await prisma.service.findMany({
    include: {
      subServices: true
    },
    orderBy: { featured: 'desc' }
  });

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service) => (
        <a
          key={service.id}
          href={`/services/${service.slug}`}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
          {service.tagline && (
            <p className="text-sm text-gray-600 mb-3">{service.tagline}</p>
          )}
          {service.overview && (
            <p className="text-sm text-gray-500 line-clamp-3">{service.overview}</p>
          )}
        </a>
      ))}
    </div>
  );
}

export default async function ServicesPage() {
  const content = await getContent('services');
  
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
                {/* Center Hub */}
                <div className="absolute" style={{ left: '150px', top: '150px', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white animate-pulse-glow">
                    <span className="text-white text-xs font-bold text-center">Services</span>
                  </div>
                </div>
                
                {/* Service Nodes */}
                {[
                  { name: 'Digital', color: 'from-blue-500 to-blue-600', angle: 0, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                  ) },
                  { name: 'IoT', color: 'from-green-500 to-green-600', angle: 72, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 7H7v6h6V7z"/>
                      <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd"/>
                    </svg>
                  ) },
                  { name: 'Consult', color: 'from-purple-500 to-purple-600', angle: 144, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                  ) },
                  { name: 'Training', color: 'from-orange-500 to-orange-600', angle: 216, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  ) },
                  { name: 'Strategy', color: 'from-pink-500 to-pink-600', angle: 288, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/>
                      <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"/>
                    </svg>
                  ) }
                ].map((service, i) => {
                  const radius = 115;
                  const angleRad = (service.angle - 90) * Math.PI / 180;
                  const x = 150 + radius * Math.cos(angleRad);
                  const y = 150 + radius * Math.sin(angleRad);
                  return (
                    <div key={i} className="absolute" style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center shadow-lg z-10 border-2 border-white diagram-node animate-bounce-in`} style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                        {service.icon}
                      </div>
                    </div>
                  );
                })}
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                  {[0, 72, 144, 216, 288].map((angle, i) => {
                    const radius = 115;
                    const angleRad = (angle - 90) * Math.PI / 180;
                    const x2 = 150 + radius * Math.cos(angleRad);
                    const y2 = 150 + radius * Math.sin(angleRad);
                    return <line key={i} x1="150" y1="150" x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" className="animate-draw-line" style={{animationDelay: `${0.2 + i * 0.05}s`}} />;
                  })}
                </svg>
              </div>
              
              {/* Stats Cards */}
              <div className="mt-8 flex justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20 animate-slide-up">
                  <div className="text-xl font-bold text-white">9+</div>
                  <div className="text-[10px] text-blue-200">Services</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20 animate-slide-up animation-delay-100">
                  <div className="text-xl font-bold text-white">100+</div>
                  <div className="text-[10px] text-blue-200">Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20 animate-slide-up animation-delay-200">
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
            {/* Digital Transformation */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="relative h-40 bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-500/30 rounded-full blur-2xl"></div>
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Transformation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Reimagine business models for the digital age through cloud migration, AI integration, and innovative tech stacks.
                </p>
                <a href="/services/digital-transformation" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Strategy Consulting */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="relative h-40 bg-gradient-to-br from-teal-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/20 text-6xl font-bold">STRATEGY<br/>CONSULTING</div>
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Strategy Consulting</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Expert guidance to navigate market shifts, identify new opportunities, and build sustainable competitive advantages.
                </p>
                <a href="/services/strategy-consulting" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Operations Excellence */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                <div className="text-white text-center px-6">
                  <div className="border-2 border-white/30 rounded-lg px-6 py-3 inline-block">
                    <div className="text-xl font-bold">OPERATIONS</div>
                    <div className="text-sm tracking-widest">EXCELLENCE</div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Operations Excellence</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Optimizing value chains and streamlining processes for maximum efficiency, agility, and scale.
                </p>
                <a href="/services/operations-excellence" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
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

          {/* Smart Factory */}
          <div className="mb-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-teal-500">
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30">
                  <div className="absolute bottom-0 right-20 w-32 h-48 bg-gray-400/50 rounded-t-lg"></div>
                  <div className="absolute bottom-0 right-40 w-24 h-32 bg-gray-500/50 rounded-t-lg"></div>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 z-10 max-w-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Smart Factory & Industry 4.0</h3>
                <p className="text-white/90 text-sm mb-4 max-w-lg">
                  Leveraging IoT, edge computing, and real-time data visualization to create self-optimizing manufacturing environments.
                </p>
                <a href="/services/smart-factory" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Discover Industry 4.0
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Renewable Energy */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[350px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-950">
                <div className="absolute inset-0 opacity-20">
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Renewable Energy Systems</h3>
                <p className="text-white/90 text-sm mb-4 max-w-sm">
                  Sustainable power infrastructure design and grid optimization for a renewable future.
                </p>
                <a href="/services/renewable-energy" className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                  View Energy Solutions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Smart Building */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[350px]">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Smart Building & Infrastructure</h3>
                <p className="text-white/90 text-sm mb-4 max-w-sm">
                  Intelligent infrastructure and IoT-enabled HVAC systems that cut costs and improve occupant experience.
                </p>
                <a href="/services/smart-building" className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
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
            <a href="/services" className="text-blue-600 font-semibold hover:gap-2 flex items-center gap-1 transition-all">
              Browse all specialties
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Web Development Training */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Web Development Training</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upskilling enabling in modern tech stacks, including React, Node.js, and cloud-native development.
              </p>
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <a href="/services/web-development-training" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Financial Advisory */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Financial Advisory & Investment</h3>
              <p className="text-sm text-gray-600 mb-4">
                Tailored investment strategies and tax-advantaged frameworks to secure your financial future.
              </p>
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <a href="/services/financial-advisory" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* PMO Establishment */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">PMO Establishment</h3>
              <p className="text-sm text-gray-600 mb-4">
                Designing and implementing high-performing project management offices for enterprise initiatives.
              </p>
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <a href="/services/pmo-establishment" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServiceResults />
      <ServiceCTA />

      <Footer />
    </div>
  );
}
