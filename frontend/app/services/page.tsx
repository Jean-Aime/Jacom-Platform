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
  
  const featuredServices = services.filter(s => s.featured);

  return (
    <>
      {featuredServices.map((service, index) => (
        <section key={service.id} className="py-20 px-6 md:px-20 bg-gray-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {index % 2 === 0 ? (
              <>
                <div>
                  <h2 className="text-3xl font-light mb-6">{service.name}</h2>
                  <p className="text-gray-700 mb-8">{service.overview}</p>
                  <a href={`/services/${service.slug}`} className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg inline-block">
                    LEARN MORE
                  </a>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-3xl font-bold text-white leading-tight">
                      {service.name.toUpperCase()}
                    </h3>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-12 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-3xl font-bold text-white leading-tight">
                      {service.name.toUpperCase()}
                    </h3>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-light mb-6">{service.name}</h2>
                  <p className="text-gray-700 mb-8">{service.overview}</p>
                  <a href={`/services/${service.slug}`} className="bg-primary text-white px-8 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 hover:shadow-lg inline-block">
                    LEARN MORE
                  </a>
                </div>
              </>
            )}
          </div>
        </section>
      ))}
    </>
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
      
      <ServicesContent content={content} />
      <ServiceInfo content={content} />

      <Suspense fallback={
        <section className="py-20 px-6 md:px-20 bg-gray-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
          </div>
        </section>
      }>
        <ServicesList />
      </Suspense>

      <ServiceResults />
      <ServiceCTA />
      <ServiceCapabilities content={content} />

      <Footer />
    </div>
  );
}
