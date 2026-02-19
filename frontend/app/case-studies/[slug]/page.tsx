import { notFound } from 'next/navigation';
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

export const revalidate = 60;

async function getCaseStudy(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/case-studies/${slug}`, { 
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="mb-6 text-sm">
            <a href="/" className="text-blue-200 hover:text-white">Home</a>
            <span className="mx-2 text-blue-300">/</span>
            <a href="/case-studies" className="text-blue-200 hover:text-white">Case Studies</a>
            <span className="mx-2 text-blue-300">/</span>
            <span className="text-white">{caseStudy.title}</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-semibold">
              {caseStudy.industry || 'Case Study'}
            </span>
            {caseStudy.featured && (
              <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
            {caseStudy.title}
          </h1>
          
          <p className="text-blue-100 text-xl mb-8 max-w-3xl">
            {caseStudy.company}
          </p>
        </div>
      </section>

      {/* Image */}
      {caseStudy.image && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenge</h2>
              <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Solution</h2>
              <p className="text-gray-700 leading-relaxed">{caseStudy.solution}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
              <p className="text-gray-700 leading-relaxed">{caseStudy.results}</p>
            </div>
          </div>

          {caseStudy.quote && (
            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 mb-16">
              <p className="text-xl text-gray-800 italic mb-4">"{caseStudy.quote}"</p>
              {caseStudy.author && (
                <p className="text-gray-600 font-semibold">
                  — {caseStudy.author}
                  {caseStudy.authorRole && <span className="text-gray-500">, {caseStudy.authorRole}</span>}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready for Similar Results?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Let's discuss how we can help transform your business.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
            >
              Get in Touch
            </a>
            <a
              href="/case-studies"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
            >
              More Case Studies
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}