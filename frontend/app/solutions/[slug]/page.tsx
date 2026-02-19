import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { notFound } from "next/navigation";

async function getSolution(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/solutions/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  
  if (!solution) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <a href="/solutions" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-4 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Solutions
            </a>
            {solution.tagline && (
              <p className="text-xs text-blue-200 mb-3 uppercase tracking-widest font-medium">{solution.tagline}</p>
            )}
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">{solution.name}</h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">{solution.description}</p>
            <div className="flex gap-4">
              <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                Request Consultation
              </a>
              <a href="#approach" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge-Approach-Outcomes */}
      <section id="approach" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {solution.challenge && (
              <div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
                <p className="text-gray-600 leading-relaxed">{solution.challenge}</p>
              </div>
            )}
            {solution.approach && (
              <div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
                <p className="text-gray-600 leading-relaxed">{solution.approach}</p>
              </div>
            )}
            {solution.outcomes && (
              <div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Outcomes</h2>
                <p className="text-gray-600 leading-relaxed">{solution.outcomes}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose This Solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our consulting expertise delivers measurable business value</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {solution.benefits && solution.benefits.length > 0 ? solution.benefits.map((benefit: any, i: number) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {benefit.icon === 'zap' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                  {benefit.icon === 'target' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  {benefit.icon === 'bar-chart' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                  {benefit.icon === 'users' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                  {benefit.icon === 'shield' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                  {benefit.icon === 'trending-up' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                  {benefit.icon === 'clock' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  {benefit.icon === 'award' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
                  {benefit.icon === 'globe' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  {benefit.icon === 'lightbulb' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                  {benefit.icon === 'dollar-sign' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  {benefit.icon === 'briefcase' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            )) : (
              <div className="col-span-4 text-center text-gray-500">No benefits configured</div>
            )}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Consulting Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A proven methodology to ensure successful delivery</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {solution.implementationSteps && solution.implementationSteps.length > 0 ? solution.implementationSteps.map((step: any, i: number) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-blue-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                {i < (solution.implementationSteps.length - 1) && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-100 -ml-4"></div>
                )}
              </div>
            )) : (
              <div className="col-span-4 text-center text-gray-500">No implementation steps configured</div>
            )}
          </div>
        </div>
      </section>

      {/* Related Industries & Services */}
      {(solution.industries?.length > 0 || solution.services?.length > 0) && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Expertise</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {solution.industries && solution.industries.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Industries We Serve
                  </h3>
                  <div className="space-y-3">
                    {solution.industries.map((industry: any) => (
                      <a key={industry.id} href={`/industries/${industry.slug}`} className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition group">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{industry.name}</h4>
                        {industry.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{industry.description}</p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {solution.services && solution.services.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Related Services
                  </h3>
                  <div className="space-y-3">
                    {solution.services.map((service: any) => (
                      <a key={service.id} href={`/services/${service.slug}`} className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition group">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{service.name}</h4>
                        {service.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real results from clients who transformed their business with this solution</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                company: "Global Manufacturing Corp",
                industry: "Manufacturing",
                challenge: "Struggling with outdated systems and manual processes causing 30% productivity loss",
                solution: "Implemented digital transformation strategy with IoT integration and automation",
                results: "40% increase in efficiency, 60% reduction in downtime, ROI achieved in 8 months",
                quote: "JACOM's consulting expertise transformed our operations. The results exceeded our expectations.",
                author: "John Smith, CEO"
              },
              {
                company: "Healthcare Systems Inc",
                industry: "Healthcare",
                challenge: "Fragmented patient data across multiple systems leading to compliance risks",
                solution: "Deployed integrated healthcare management system with HIPAA-compliant architecture",
                results: "50% faster patient processing, 100% compliance achieved, improved patient satisfaction by 35%",
                quote: "The implementation was seamless. Our staff adapted quickly and patients noticed the difference immediately.",
                author: "Dr. Sarah Johnson, Director"
              }
            ].map((story, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.company}</h3>
                    <p className="text-sm text-blue-600 font-medium">{story.industry}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Success</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Challenge</h4>
                    <p className="text-sm text-gray-600">{story.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Solution</h4>
                    <p className="text-sm text-gray-600">{story.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Results</h4>
                    <p className="text-sm text-green-700 font-medium">{story.results}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-gray-700 italic mb-2">"{story.quote}"</p>
                  <p className="text-sm text-gray-500">— {story.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Let's discuss how {solution.name} can help achieve your business objectives.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-base inline-block">
              Schedule Consultation
            </a>
            <a href="/solutions" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-base inline-block">
              View All Solutions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
