import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { ExpertCardSkeleton } from "@/components/Skeletons/Skeletons";
import { Suspense } from "react";
import Image from "next/image";

async function ExpertsContent() {
  const experts = await prisma.expert.findMany({
    orderBy: { featured: 'desc' }
  });

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => {
            const expertise = typeof expert.expertise === 'string' ? expert.expertise.split(',').map(e => e.trim()).filter(Boolean) : [];
            return (
              <a
                key={expert.id}
                href={`/experts/${expert.slug}`}
                className="group bg-white border rounded-lg overflow-hidden card-hover cursor-scale focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="relative aspect-square">
                  {expert.image ? (
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover image-reveal"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-red-100"></div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {expert.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{expert.role}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{expert.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {expertise.slice(0, 2).map((skill: string) => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                    View Profile →
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default async function ExpertsPage() {
  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Our Experts</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Meet our global team of industry leaders, strategic thinkers, and transformation experts who drive innovation across every sector.
          </p>
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

      <Footer />
    </div>
  );
}
