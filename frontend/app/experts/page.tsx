import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { ExpertCardSkeleton } from "@/components/Skeletons/Skeletons";
import { Suspense } from "react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

async function ExpertsContent() {
  const experts = await prisma.expert.findMany({
    orderBy: { featured: 'desc' }
  });

  const featuredExperts = experts.filter(e => e.featured);
  const otherExperts = experts.filter(e => !e.featured);

  return (
    <>
      {featuredExperts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Experts</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredExperts.map((expert) => {
                const expertise = typeof expert.expertise === 'string' ? expert.expertise.split(',').map(e => e.trim()).filter(Boolean) : [];
                return (
                  <a
                    key={expert.id}
                    href={`/experts/${expert.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-64 h-64 md:h-auto flex-shrink-0">
                        {expert.image ? (
                          <Image
                            src={expert.image}
                            alt={expert.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 256px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center">
                            <span className="text-white text-6xl font-bold">{expert.name.charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
                        </div>
                      </div>
                      <div className="p-8 flex-1">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {expert.name}
                        </h3>
                        <p className="text-primary font-semibold mb-4 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {expert.role}
                        </p>
                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{expert.bio}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {expertise.slice(0, 4).map((skill: string) => (
                            <span key={skill} className="px-3 py-1.5 bg-red-50 text-primary text-xs font-medium rounded-lg">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          <span>View Full Profile</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {featuredExperts.length > 0 && (
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-8 bg-gray-300"></div>
              <h2 className="text-3xl font-bold text-gray-900">All Experts</h2>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherExperts.map((expert) => {
              const expertise = typeof expert.expertise === 'string' ? expert.expertise.split(',').map(e => e.trim()).filter(Boolean) : [];
              return (
                <a
                  key={expert.id}
                  href={`/experts/${expert.slug}`}
                  className="group bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-72 overflow-hidden bg-gray-100">
                    {expert.image ? (
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-red-100 flex items-center justify-center">
                        <span className="text-primary text-5xl font-bold">{expert.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {expert.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-3">{expert.role}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{expert.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expertise.slice(0, 3).map((skill: string) => (
                        <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>View Profile</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function ExpertsPage() {
  return (
    <div className="min-h-screen bg-white">
      <MegaMenuHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-primary text-sm font-semibold">Meet Our Global Team</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              World-Class Experts<br />Driving Innovation
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">
              Our team of industry leaders, strategic thinkers, and transformation specialists brings decades of combined experience across technology, finance, and consulting to help your business thrive in the digital age.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-8 py-5">
                <div className="text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-gray-300 text-sm font-medium">Global Experts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-8 py-5">
                <div className="text-4xl font-bold text-white mb-1">15+</div>
                <div className="text-gray-300 text-sm font-medium">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-8 py-5">
                <div className="text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-300 text-sm font-medium">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ExpertCardSkeleton />
              <ExpertCardSkeleton />
              <ExpertCardSkeleton />
            </div>
          </div>
        </section>
      }>
        <ExpertsContent />
      </Suspense>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Expert Guidance?
          </h2>
          <p className="text-red-100 text-lg mb-8">
            Connect with our specialists to discuss your challenges and explore tailored solutions for your business.
          </p>
          <a href="/contact" className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
            Schedule a Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
