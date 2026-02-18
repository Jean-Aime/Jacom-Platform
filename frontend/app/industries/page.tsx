import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export const revalidate = 3600;

export default async function IndustriesPage() {
  const industries = await prisma.industry.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      featured: true,
    },
    orderBy: { featured: 'desc' },
    take: 50
  });

  return (
    <>
      <MegaMenuHeader />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pt-32 pb-56 min-h-[580px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="text-blue-300 text-sm font-semibold mb-4 uppercase tracking-wider">INDUSTRIES WE SERVE</div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Deep Expertise Across <span className="text-blue-300">Key Sectors</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Driving global impact across 9+ specialized sectors with cutting-edge technical innovation and strategic consulting prowess. We don't just advise; we transform.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                  Explore Industries
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Download Capabilities
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Sector Solutions */}
        <section className="py-20 bg-white -mt-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Specialized Sector Solutions</h2>
                <p className="text-gray-600">
                  Discover how JACOM empowers industry leaders with technical innovation and strategic consulting for sustainable, industry-changing outcomes.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Manufacturing */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-48 bg-gray-100">
                  <img src="/api/placeholder/400/300" alt="Manufacturing" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    2024 | 45+ new clients
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900">Manufacturing</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Smart factory solutions, IoT integration, and supply chain optimization for the future of production.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>AI-Powered Manufacturing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Sustainable Operations</span>
                    </div>
                  </div>
                  <a href="/industries/manufacturing" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                    Learn More →
                  </a>
                </div>
              </div>

              {/* Healthcare */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-48 bg-teal-500">
                  <img src="/api/placeholder/400/300" alt="Healthcare" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700">
                    Featured Sector
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900">Healthcare</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Digital health transformation and patient-centric solutions with AI and data security.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Telemedicine Platforms</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Healthcare →</span>
                    </div>
                  </div>
                  <a href="/industries/healthcare" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                    Learn More →
                  </a>
                </div>
              </div>

              {/* IT & Tech */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-48 bg-gray-900">
                  <img src="/api/placeholder/400/300" alt="IT & Tech" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold">
                    High Growth
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900">IT & Tech</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Cloud infrastructure, cybersecurity, and enterprise software solutions for tech leaders.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Multi-cloud Migration</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Zero-trust Security</span>
                    </div>
                  </div>
                  <a href="/industries/it-tech" className="text-blue-600 text-sm font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="text-blue-600 font-semibold hover:gap-2 flex items-center gap-1 transition-all mx-auto">
                View All 9+ Sectors
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Capabilities That Span All Industries */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Capabilities That Span All Industries</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our horizontal expertise provides the foundation for success, regardless of the vertical sector.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Economic Development</h3>
                <p className="text-sm text-gray-600">
                  Strategic growth and market expansion across emerging economies.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business Enterprise</h3>
<p className="text-sm text-gray-600">
                  Scaling operations and optimizing enterprise architecture.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Employment & Skills</h3>
                <p className="text-sm text-gray-600">
                  Workforce development and talent transformation programs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Sectors</h3>
                <p className="text-sm text-gray-600">
                  Identifying and capitalizing on emerging market opportunities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Solutions & Inclusion</h3>
                <p className="text-sm text-gray-600">
                  Inclusive innovation and equitable access to technology.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Governance</h3>
                <p className="text-sm text-gray-600">
                  Corporate governance and regulatory compliance frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Deliver Industry-Specific Value */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  How We Deliver <span className="text-blue-600">Industry-Specific Value</span>
                </h2>
                <div className="space-y-6 mt-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Deep Sector Knowledge</h3>
                      <p className="text-gray-600">
                        Our consultants average 14+ years of experience within their respective industries.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Customized Solutions</h3>
                      <p className="text-gray-600">
                        We don't believe in one-size-fits-all. Every solution is built from the ground up for your context.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Track Record</h3>
                      <p className="text-gray-600">
                        We've delivered over 240 successful PE-backed exits in the last decade.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Collaborative Approach</h3>
                      <p className="text-gray-600">
                        We integrate with your team to ensure knowledge transfer and sustainable long-term value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <img src="/api/placeholder/600/500" alt="Team collaboration" className="w-full h-96 object-cover" />
                  <div className="absolute bottom-6 right-6 bg-blue-600 text-white rounded-xl p-6 shadow-2xl">
                    <div className="text-5xl font-bold mb-2">98%</div>
                    <div className="text-sm">CLIENT RETENTION RATE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Insights & Resources */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold">Related Insights & Resources</h2>
              <a href="/insights" className="text-blue-300 font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                Explore Our Knowledge Hub →
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-blue-400 text-xs font-semibold mb-3 uppercase">WHITEPAPER</div>
                <h3 className="text-xl font-bold mb-3">The Future of AI in Energy Management 2025</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Comprehensive analysis of AI adoption trends across energy sectors.
                </p>
                <div className="text-xs text-gray-400">Jan 15, 2025</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-blue-400 text-xs font-semibold mb-3 uppercase">CASE STUDY</div>
                <h3 className="text-xl font-bold mb-3">Hospitality Reimagined: Digital Guest Journeys</h3>
                <p className="text-gray-300 text-sm mb-4">
                  How we helped a leading hotel chain transform their customer experience.
                </p>
                <div className="text-xs text-gray-400">Dec 28, 2024</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-blue-400 text-xs font-semibold mb-3 uppercase">REPORT SUMMARY</div>
                <h3 className="text-xl font-bold mb-3">Global Fintech Regulations: Navigating the New Era</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Key insights on compliance frameworks across 40+ countries.
                </p>
                <div className="text-xs text-gray-400">Jan 08, 2025</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join the ranks of leading enterprises who trust JACOM to navigate complexity and deliver tangible business solutions.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Schedule Industry Consultation
              </button>
              <button className="px-8 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                Download Insights
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
