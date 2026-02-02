"use client";
import Image from "next/image";

export default function LatestInsights({ content }: { content: any }) {
  const title = content?.insights_title || 'Our Latest Insights';
  const insights = content?.insights_items || [
    {
      title: "Five of the Most Insightful Podcast Episodes On AI",
      description: "A curated series what leaders across many about agentic systems, how with them, and becoming a critical AI moment in 2025.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    {
      title: "Reimagining Merchandising in the Era of Agentic AI",
      description: "The future of merchandising is not simply AI, but rather, agentic automation—and agents for AI that makes retail possible.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    }
  ];
  const buttonText = content?.insights_button || 'SEE ALL INSIGHTS';

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">{title}</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {insights.map((insight: any, i: number) => (
            <a 
              key={i} 
              href="/insights"
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer block"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light mb-3 group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                <span className="text-primary text-sm font-semibold inline-flex items-center gap-2 group">
                  Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/insights"
            className="border-2 border-primary text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block active:scale-95"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
