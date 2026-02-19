import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

export const revalidate = 60;

async function getCaseStudies() {
  try {
    const res = await fetch(`${API_BASE_URL}/case-studies`, { 
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-blue-200 mb-3 uppercase tracking-widest font-medium">Success Stories</p>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Client <span className="text-blue-100">Success Stories</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-2xl">
            Discover how we've helped organizations across industries achieve extraordinary results through innovative solutions and strategic consulting.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {caseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((cs: any) => (
                <article key={cs.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group">
                  {cs.image && (
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {cs.industry || 'Case Study'}
                      </span>
                      {cs.featured && (
                        <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {cs.title}
                    </h2>
                    
                    <p className="text-sm text-gray-600 mb-1 font-semibold">{cs.company}</p>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {cs.challenge?.substring(0, 120)}...
                    </p>
                    
                    <a
                      href={`/case-studies/${cs.slug}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold inline-flex items-center gap-1"
                    >
                      Read Full Story
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">No Case Studies Available</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We're working on adding more client success stories. Check back soon!
              </p>
              <a
                href="/contact"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Discuss Your Project
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Let's discuss how our proven methodologies and innovative solutions can help transform your business and achieve extraordinary results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
            >
              Start Your Project
            </a>
            <a
              href="/insights"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
            >
              View All Insights
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}