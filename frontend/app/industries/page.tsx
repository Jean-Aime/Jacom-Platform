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
                <div className="absolute" style={{ left: '150px', top: '150px', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white animate-pulse-glow">
                    <span className="text-white text-sm font-bold">JACOM</span>
                  </div>
                </div>
              </div>
              
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
      
      {/* Core Industries */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Sectors</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Core Industries</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              We deploy cross-functional teams with deep vertical knowledge to drive the world's most complex challenges across 9 key sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {industries.slice(0, 3).map((industry, index) => {
              const designs = [
                { bg: 'from-gray-900 via-blue-900 to-black', iconBg: 'bg-blue-600', glow: 'bg-blue-500/30' },
                { bg: 'from-teal-500 to-teal-600', iconBg: 'bg-white/20', glow: 'bg-teal-300/30', textOverlay: true },
                { bg: 'from-gray-800 to-gray-900', iconBg: 'bg-blue-600', glow: 'bg-gray-600/30', bordered: true }
              ];
              const design = designs[index];

              return (
                <div key={industry.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                  <div className={`relative h-40 bg-gradient-to-br ${design.bg} overflow-hidden`}>
                    {design.textOverlay ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/20 text-4xl font-bold text-center px-4">{industry.name.toUpperCase()}</div>
                      </div>
                    ) : design.bordered ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-2 border-white/30 rounded-lg px-6 py-3">
                          <div className="text-lg font-bold text-white text-center">{industry.name.toUpperCase()}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-20 h-20 ${design.glow} rounded-full blur-2xl`}></div>
                      </div>
                    )}
                    <div className={`absolute top-4 left-4 w-8 h-8 ${design.iconBg} backdrop-blur-sm rounded-lg flex items-center justify-center`}>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {industry.description || 'Delivering innovative solutions and expertise across the sector.'}
                    </p>
                    <a href={`/industries/${industry.slug}`} className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Key Sectors</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Featured Industries</h2>
          </div>

          {/* Large Featured Industry */}
          {industries.slice(3, 4).map((industry) => (
            <div key={industry.id} className="mb-8">
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
                  <h3 className="text-3xl font-bold text-white mb-3">{industry.name}</h3>
                  <p className="text-white/90 text-sm mb-4 max-w-lg">
                    {industry.description || 'Leading innovation and transformation across the sector with cutting-edge solutions.'}
                  </p>
                  <a href={`/industries/${industry.slug}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    Explore {industry.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {industries.slice(4, 6).map((industry, index) => {
              const colors = [
                { bg: 'from-green-900 via-green-800 to-green-950', iconColor: 'text-green-600' },
                { bg: 'from-teal-800 via-teal-700 to-teal-900', iconColor: 'text-teal-700' }
              ];
              const color = colors[index];

              return (
                <div key={industry.id} className="relative rounded-2xl overflow-hidden shadow-xl h-[350px]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${color.bg}`}>
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 z-10">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                      <svg className={`w-5 h-5 ${color.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                    <p className="text-white/90 text-sm mb-4 max-w-sm">
                      {industry.description || 'Innovative solutions driving transformation and growth.'}
                    </p>
                    <a href={`/industries/${industry.slug}`} className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Industries */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Complete Portfolio</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">All Industries</h2>
            </div>
            <a href="/industries" className="text-blue-600 font-semibold hover:gap-2 flex items-center gap-1 transition-all">
              Browse all sectors
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {industries.slice(6).map((industry) => (
              <div key={industry.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {industry.description || 'Specialized expertise and innovative solutions for the sector.'}
                </p>
                <a href={`/industries/${industry.slug}`} className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Industry Insights & Expertise</h2>
            <p className="text-xl mb-8 opacity-90">
              Access our latest research, case studies, and thought leadership across all industries
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/insights" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                Browse Insights
              </a>
              <a href="/experts" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
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