import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import PageHero from "@/components/Hero/PageHero";

export const revalidate = 3600;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaMenuHeader />
      
      <PageHero 
        title="Industries"
        description="We serve clients across diverse industries, bringing deep sector expertise and innovative solutions to drive transformation and growth."
        illustrationContent={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md px-6 py-8">
              <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
                {/* Center Hub */}
                <div className="absolute" style={{ left: '150px', top: '150px', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white animate-pulse-glow">
                    <span className="text-white text-sm font-bold">JACOM</span>
                  </div>
                </div>
                
                {/* Industry Nodes */}
                {[
                  { name: 'Tech', color: 'from-blue-500 to-blue-600', angle: 0, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
                    </svg>
                  ) },
                  { name: 'Energy', color: 'from-green-500 to-green-600', angle: 60, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                  ) },
                  { name: 'Mfg', color: 'from-purple-500 to-purple-600', angle: 120, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd"/>
                    </svg>
                  ) },
                  { name: 'Finance', color: 'from-orange-500 to-orange-600', angle: 180, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  ) },
                  { name: 'Edu', color: 'from-pink-500 to-pink-600', angle: 240, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  ) },
                  { name: 'Hotel', color: 'from-teal-500 to-teal-600', angle: 300, icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                  ) }
                ].map((industry, i) => {
                  const radius = 115;
                  const angleRad = (industry.angle - 90) * Math.PI / 180;
                  const x = 150 + radius * Math.cos(angleRad);
                  const y = 150 + radius * Math.sin(angleRad);
                  return (
                    <div key={i} className="absolute" style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-lg flex items-center justify-center shadow-lg z-10 border-2 border-white diagram-node animate-bounce-in`} style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                        {industry.icon}
                      </div>
                    </div>
                  );
                })}
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
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
                  <div className="text-[10px] text-blue-200">Industries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20 animate-slide-up animation-delay-100">
                  <div className="text-xl font-bold text-white">50+</div>
                  <div className="text-[10px] text-blue-200">Projects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-4 py-2.5 rounded-lg border border-white/20 animate-slide-up animation-delay-200">
                  <div className="text-xl font-bold text-white">15+</div>
                  <div className="text-[10px] text-blue-200">Countries</div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Our Industry Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="flex items-start gap-4">
                <div className="text-orange-500 text-3xl">📊</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-2">In-depth Analytics</h3>
                  <p className="text-gray-600 leading-relaxed">
                    With a single click, you will get in-depth traffic and engagement stats, including monthly visits trend, time on the site, page-views and bounce rate.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop" 
                    alt="Analytics Dashboard"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop" 
                    alt="Traffic Sources"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-start gap-4">
                <div className="text-blue-500 text-3xl">📈</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-2">Traffic Sources</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the sources that generate traffic to any website - you'll see a bar graph outlining the site's direct, referrals, search, social, mail, and display traffic sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">All Industries</h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="flex items-start gap-4">
                <div className="text-orange-500 text-3xl">📊</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-2">In-depth Analytics</h3>
                  <p className="text-gray-600 leading-relaxed">
                    With a single click, you will get in-depth traffic and engagement stats, including monthly visits trend, time on the site, page-views and bounce rate.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop" 
                    alt="Analytics Dashboard"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop" 
                    alt="Traffic Sources"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-start gap-4">
                <div className="text-blue-500 text-3xl">📈</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-500 mb-2">Traffic Sources</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the sources that generate traffic to any website - you'll see a bar graph outlining the site's direct, referrals, search, social, mail, and display traffic sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary to-red-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Industry Insights & Expertise</h2>
            <p className="text-xl mb-8 opacity-90">
              Access our latest research, case studies, and thought leadership across all industries
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/insights" className="btn-primary cursor-scale bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                Browse Insights
              </a>
              <a href="/experts" className="cursor-scale border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-white/50">
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