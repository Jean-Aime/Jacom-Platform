import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import PageHero from "@/components/Hero/PageHero";
import Footer from "@/components/Footer/Footer";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      serviceCapabilities: { orderBy: { order: 'asc' } },
      serviceProcessSteps: { orderBy: { order: 'asc' } },
      serviceMetrics: { orderBy: { order: 'asc' } },
      subServices: true,
      industries: true,
      insights: {
        take: 3,
        orderBy: { publishedAt: 'desc' }
      },
      experts: true
    }
  });

  if (!service) {
    notFound();
  }

  const capabilities = service.serviceCapabilities;
  const processSteps = service.serviceProcessSteps;
  const metrics = service.serviceMetrics;
  
  const impactMetrics = metrics.length > 0 ? {
    title: service.impactMetricsTitle || "Performance Metrics",
    metrics: metrics
  } : null;
  
  const caseStudy = service.caseStudyTitle ? {
    label: service.caseStudyLabel,
    title: service.caseStudyTitle,
    description: service.caseStudyDescription,
    image: service.caseStudyImage,
    metrics: [
      { label: service.caseStudyMetric1Label, value: service.caseStudyMetric1Value },
      { label: service.caseStudyMetric2Label, value: service.caseStudyMetric2Value }
    ].filter(m => m.label && m.value),
    ctaText: service.caseStudyCtaText,
    ctaLink: service.caseStudyCtaLink
  } : null;

  const iconMap: Record<string, JSX.Element> = {
    integration: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7H7v6h6V7z"/><path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd"/></svg>,
    predictive: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
    robotics: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/></svg>,
    twins: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaMenuHeader />
      
      <PageHero 
        title={service.name}
        description={service.tagline || service.description}
        illustrationContent={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-6xl font-bold">🚀</div>
          </div>
        }
      />

      {/* Core Capabilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Capabilities</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Core Capabilities</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Our specialized expertise enables organizations to transform into fully autonomous, data-driven operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  {iconMap[cap.icon] || iconMap.integration}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-600">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">The Implementation Process</h2>
            <p className="text-gray-600 mt-3">
              Our proven methodology rapidly operationalizes IoT initiatives, from concept to smart factories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact */}
      {impactMetrics && impactMetrics.metrics && (
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-4">Quantifiable Business Impact</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Our Industry 4.0 implementations deliver immediate and measurable value to the bottom line, unified across multiple industrial sectors.
                </p>
                <div className="grid grid-cols-3 gap-6 mt-8">
                  {impactMetrics.metrics.map((metric: any, index: number) => (
                    <div key={index}>
                      <div className="text-3xl font-bold">{metric.value}</div>
                      <div className="text-sm text-blue-200 uppercase tracking-wider mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{impactMetrics.title}</span>
                </div>
                {impactMetrics.metrics.map((metric: any, index: number) => (
                  <div key={index} className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{metric.label}</span>
                      <span className="text-sm font-bold text-green-600">{metric.change}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${parseInt(metric.value)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Study */}
      {caseStudy && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                {caseStudy.image ? (
                  <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">{caseStudy.label}</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{caseStudy.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed italic">"{caseStudy.description}"</p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {caseStudy.metrics.map((metric: any, index: number) => (
                    <div key={index}>
                      <div className="text-3xl font-bold text-blue-600">{metric.value}</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wider mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <a href={caseStudy.ctaLink} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                  {caseStudy.ctaText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to transform your operations?</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Schedule a consultation with our Industry 4.0 experts today and discover how our solutions can scale your production to new heights.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Complimentary infrastructure audit</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>ROI projection dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Custom solution architecture</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input type="text" placeholder="John" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email</label>
                  <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input type="text" placeholder="Acme Manufacturing" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea rows={3} placeholder="How can we help you?" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Schedule My Consultation
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
