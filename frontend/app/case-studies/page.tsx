import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export default async function CaseStudiesPage() {
  let caseStudies = [];
  
  try {
    caseStudies = await prisma.insight.findMany({
      where: {
        type: 'Case Study',
        OR: [
          { status: 'published' },
          { status: 'scheduled', scheduledAt: { lte: new Date() } }
        ]
      },
      include: {
        author: true,
        industries: true,
        services: true
      },
      orderBy: { publishedAt: 'desc' }
    });
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="mb-6">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Case Studies</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Client Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover how we've helped organizations across industries achieve extraordinary results through innovative solutions and strategic consulting.
          </p>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {caseStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy: any) => {
              const topics = JSON.parse(caseStudy.topics || '[]');
              
              return (
                <article key={caseStudy.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {caseStudy.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                        Case Study
                      </span>
                      <span className="text-gray-400 text-xs">
                        {caseStudy.readTime} min read
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/case-studies/${caseStudy.slug}`}>
                        {caseStudy.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {caseStudy.excerpt}
                    </p>
                    
                    {topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {topics.slice(0, 3).map((topic: string) => (
                          <span 
                            key={topic}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        By {caseStudy.author.name}
                      </div>
                      <Link
                        href={`/case-studies/${caseStudy.slug}`}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Read Story →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-light mb-4">No Case Studies Available</h2>
            <p className="text-gray-600 mb-8">
              We're working on adding more client success stories. Check back soon!
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-8 py-3 rounded hover:bg-primary/90 transition-colors font-medium"
            >
              Discuss Your Project
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how our proven methodologies and innovative solutions can help transform your business and achieve extraordinary results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white px-8 py-3 rounded hover:bg-primary/90 transition-colors font-medium"
            >
              Start Your Project
            </Link>
            <Link
              href="/insights"
              className="border border-primary text-primary px-8 py-3 rounded hover:bg-primary hover:text-white transition-colors font-medium"
            >
              View All Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}