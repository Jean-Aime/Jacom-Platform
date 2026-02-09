"use client";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  type: string;
  readTime: number;
  author: {
    name: string;
    slug: string;
  };
}

export default function LatestInsights({ insights }: { insights: Insight[] }) {
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();
  const ref3 = useScrollAnimation();

  if (!insights || insights.length === 0) {
    return (
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Latest Insights</h2>
          <p className="text-gray-600">Check back soon for our latest thought leadership and insights.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div ref={ref1} className="animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Latest Insights</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {insights.map((insight, i) => (
            <div key={insight.id} ref={i === 0 ? ref2 : ref3} className={`animate-on-scroll stagger-${i + 1}`}>
              <a 
                href={`/insights/${insight.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover cursor-scale group block focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label={`Read article: ${insight.title}`}
              >
                <div className="relative h-64 overflow-hidden">
                  {insight.image ? (
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 image-reveal"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-red-100" role="img" aria-label="Placeholder image"></div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                      {insight.type}
                    </span>
                    <span className="text-sm text-gray-500">{insight.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{insight.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {insight.author.name}</span>
                    <span className="text-primary text-sm font-semibold inline-flex items-center gap-2">
                      Read more <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/insights"
            className="btn-primary cursor-scale border-2 border-primary text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 inline-block"
            aria-label="View all insights articles"
          >
            SEE ALL INSIGHTS
          </a>
        </div>
      </div>
    </section>
  );
}
