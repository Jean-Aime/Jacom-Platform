import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  let caseStudy;
  
  try {
    caseStudy = await prisma.insight.findUnique({
      where: { 
        slug: params.slug,
        type: 'Case Study'
      },
      include: {
        author: true,
        industries: true,
        services: true
      }
    });
  } catch (error) {
    console.error('Database error:', error);
  }

  if (!caseStudy) {
    notFound();
  }

  const topics = JSON.parse(caseStudy.topics || '[]');
  const regions = JSON.parse(caseStudy.regions || '[]');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-6">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/insights?type=Case Study" className="text-primary hover:underline">Case Studies</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{caseStudy.title}</span>
          </nav>
          
          <div className="mb-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Case Study
            </span>
            <h1 className="text-4xl md:text-5xl font-light mb-4 leading-tight">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {caseStudy.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>By {caseStudy.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{caseStudy.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{new Date(caseStudy.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {caseStudy.image && (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: caseStudy.content
                    .replace(/\n/g, '<br>')
                    .replace(/#{3}\s(.+)/g, '<h3 class="text-2xl font-semibold mt-8 mb-4">$1</h3>')
                    .replace(/#{2}\s(.+)/g, '<h2 class="text-3xl font-semibold mt-10 mb-6">$1</h2>')
                    .replace(/#{1}\s(.+)/g, '<h1 class="text-4xl font-bold mt-12 mb-8">$1</h1>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/^•\s(.+)/gm, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-6">$1</ul>')
                }} 
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Topics */}
              {topics.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic: string) => (
                      <span 
                        key={topic}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Regions */}
              {regions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Regions</h3>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region: string) => (
                      <span 
                        key={region}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Industries */}
              {caseStudy.industries.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Related Industries</h3>
                  <div className="space-y-2">
                    {caseStudy.industries.map((industry: any) => (
                      <Link
                        key={industry.id}
                        href={`/industries/${industry.slug}`}
                        className="block text-primary hover:underline text-sm"
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Services */}
              {caseStudy.services.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Related Services</h3>
                  <div className="space-y-2">
                    {caseStudy.services.map((service: any) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="block text-primary hover:underline text-sm"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Interested in similar results?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Let's discuss how we can help transform your business.
                </p>
                <Link
                  href="/contact"
                  className="block w-full bg-primary text-white text-center py-2 px-4 rounded hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Case Studies */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-light mb-8">More Case Studies</h2>
          <div className="text-center">
            <Link
              href="/insights?type=Case Study"
              className="inline-block bg-primary text-white px-8 py-3 rounded hover:bg-primary/90 transition-colors font-medium"
            >
              View All Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}