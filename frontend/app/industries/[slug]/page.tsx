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

  // Fetch testimonials separately for now
  const testimonials = [];
  try {
    const allTestimonials = await prisma.testimonial.findMany({
      where: { featured: true },
      take: 3
    });
    testimonials.push(...allTestimonials);
  } catch {
    // Testimonials table doesn't exist yet
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

      {/* Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold mb-2">OUR CAPABILITIES</p>
            <h2 className="text-4xl font-bold text-gray-900">Capabilities Designed for Growth</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.services.slice(0, 4).map((service, i) => {
              const icons = [
                <svg key="1" className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                <svg key="2" className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>,
                <svg key="3" className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>,
                <svg key="4" className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
              ];
              return (
                <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="mb-4">{icons[i]}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              {industry.image ? (
                <img 
                  src={industry.image} 
                  alt={industry.name} 
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-4">{industry.name.charAt(0)}</div>
                    <div className="text-xl font-semibold">{industry.name}</div>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-sm text-primary font-semibold mb-2">THE PARTNERSHIP ADVANTAGE</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Leading Companies Partner With Us</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We deliver exceptional through a combination of deep industry expertise and relentless innovation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Deep Industry Expertise</h3>
                    <p className="text-sm text-gray-600">Our consultants bring deep industry and functional expertise across all major sectors.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Proven Scalability</h3>
                    <p className="text-sm text-gray-600">We provide a 360° fully integrated policy, delivering impact across the business and economy.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Scalable Solutions</h3>
                    <p className="text-sm text-gray-600">Our solutions are built to grow with your business and adapt to changing market conditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold mb-2">TESTIMONIALS</p>
            <h2 className="text-4xl font-bold text-gray-900">Success Stories from Our Clients</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-5 h-5 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "Working with this team transformed our digital strategy. We saw a 30% increase in efficiency within the first six months."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-600">CEO, Tech Solutions</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business Future?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of industry leaders who have already mastered innovation with our expert solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all">
              Talk to an Expert
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
              View Case Studies
            </button>
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
