import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
import Footer from "@/components/Footer/Footer";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await prisma.industry.findUnique({
    where: { slug },
    include: {
      services: true,
      insights: { take: 3, include: { author: true }, orderBy: { publishedAt: 'desc' } },
      experts: true
    }
  });

  if (!industry) {
    notFound();
  }

  let challenges: string[] = [];
  let trends: string[] = [];
  
  try {
    challenges = JSON.parse(industry.challenges || '[]');
  } catch {
    challenges = industry.challenges ? industry.challenges.split('\n').filter(c => c.trim()).map(c => c.replace(/^[•\-]\s*/, '').trim()) : [];
  }
  
  try {
    trends = JSON.parse(industry.trends || '[]');
  } catch {
    trends = industry.trends ? industry.trends.split('\n').filter(t => t.trim()).map(t => t.replace(/^[•\-]\s*/, '').trim()) : [];
  }

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <PageHero 
        title={industry.name}
        description={industry.description}
        backgroundImage={industry.image || undefined}
        illustrationContent={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md px-6 py-8">
              <div className="relative mx-auto" style={{ width: '280px', height: '280px' }}>
                <div className="absolute" style={{ left: '140px', top: '140px', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white animate-pulse-glow">
                    <span className="text-white text-xs font-bold text-center">{industry.name.split(' ')[0]}</span>
                  </div>
                </div>
                {challenges.slice(0, 4).map((challenge: string, i: number) => {
                  const angles = [0, 90, 180, 270];
                  const colors = ['from-red-500 to-red-600', 'from-orange-500 to-orange-600', 'from-yellow-500 to-yellow-600', 'from-pink-500 to-pink-600'];
                  const icons = [
                    <svg key="icon1" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>,
                    <svg key="icon2" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>,
                    <svg key="icon3" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"/></svg>,
                    <svg key="icon4" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  ];
                  const radius = 100;
                  const angleRad = (angles[i] - 90) * Math.PI / 180;
                  const x = 140 + radius * Math.cos(angleRad);
                  const y = 140 + radius * Math.sin(angleRad);
                  return (
                    <div key={i} className="absolute" style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}>
                      <div className={`w-14 h-14 bg-gradient-to-br ${colors[i]} rounded-lg flex items-center justify-center shadow-lg z-10 border-2 border-white diagram-node animate-bounce-in`} style={{ animationDelay: `${0.3 + i * 0.1}s` }} title={challenge}>
                        {icons[i]}
                      </div>
                    </div>
                  );
                })}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                  {[0, 90, 180, 270].map((angle, i) => {
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
                  <div className="text-base font-bold text-white">{challenges.length}</div>
                  <div className="text-[9px] text-blue-200">Challenges</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-3 py-2 rounded-lg border border-white/20 animate-slide-up animation-delay-100">
                  <div className="text-base font-bold text-white">{trends.length}</div>
                  <div className="text-[9px] text-blue-200">Trends</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm shadow-lg px-3 py-2 rounded-lg border border-white/20 animate-slide-up animation-delay-200">
                  <div className="text-base font-bold text-white">{industry.services.length}</div>
                  <div className="text-[9px] text-blue-200">Solutions</div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Image & Overview Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Image */}
            <div className="space-y-6">
              {industry.image ? (
                <div className="rounded-2xl overflow-hidden shadow-2xl sticky top-24">
                  <img 
                    src={industry.image} 
                    alt={industry.name}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 to-blue-800 h-[500px] flex items-center justify-center sticky top-24">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl font-bold mb-4">{industry.name.charAt(0)}</div>
                    <div className="text-xl font-semibold">{industry.name}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Overview & Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Industry Overview</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  {industry.overview.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-2">{challenges.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Key Challenges</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-2">{trends.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Emerging Trends</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-2">{industry.services.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Solutions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Challenges & Trends Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Key Challenges */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Key Challenges</h3>
              </div>
              <ul className="space-y-3">
                {challenges.map((challenge: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="text-primary mt-1 text-xl group-hover:scale-125 transition-transform">→</span>
                    <span className="text-gray-700 leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Emerging Trends */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Emerging Trends</h3>
              </div>
              <ul className="space-y-3">
                {trends.map((trend: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="text-primary mt-1 text-xl group-hover:scale-125 transition-transform">→</span>
                    <span className="text-gray-700 leading-relaxed">{trend}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Services & Experts */}
          <div className="grid lg:grid-cols-2 gap-8">
            {industry.services.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Related Services</h3>
                <div className="space-y-3">
                  {industry.services.map((service) => (
                    <a 
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all hover:translate-x-2 border border-transparent hover:border-primary"
                    >
                      <span className="font-medium text-gray-900">{service.name}</span>
                      <span className="text-primary ml-2">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {industry.experts.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Experts</h3>
                <div className="space-y-3">
                  {industry.experts.slice(0, 3).map((expert) => (
                    <a 
                      key={expert.id}
                      href={`/experts/${expert.slug}`}
                      className="block p-4 bg-white rounded-xl hover:shadow-lg transition-all hover:translate-x-2 border border-transparent hover:border-primary"
                    >
                      <div className="font-medium text-gray-900">{expert.name}</div>
                      <div className="text-sm text-gray-600">{expert.role}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {industry.insights.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Latest Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {industry.insights.map((insight) => (
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
                  <p className="text-sm text-gray-600 mb-3">{insight.excerpt}</p>
                  <div className="text-xs text-gray-500">By {insight.author.name}</div>
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
