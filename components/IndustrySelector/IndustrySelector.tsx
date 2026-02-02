"use client";
import Image from "next/image";

export default function IndustrySelector({ content }: { content: any }) {
  const title = content?.industry_title || 'We champion the bold to achieve the extraordinary.';
  const subtitle = content?.industry_subtitle || 'Around two questions we help our clients win: one on your challenges.';
  const image = content?.industry_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
  const industries = content?.industry_tags || [
    "Retail", "Private Equity", "Advanced Manufacturing & Services",
    "Technology", "Oil & Gas", "Healthcare & Life Sciences",
    "Chemicals", "Consumer Products", "Mining", "Financial Services"
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
        <div className="relative h-96 rounded-lg shadow-xl overflow-hidden hover-scale">
          <Image
            src={image}
            alt="Business team collaboration"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-light mb-6 animate-fade-up">
            {title}
          </h2>
          <p className="text-gray-600 mb-6">{subtitle}</p>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              What is your industry? <span className="text-primary">*</span>
            </label>
            <select className="w-full border border-gray-300 px-4 py-3 rounded hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Select one</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {industries.map((industry: string) => (
              <a
                key={industry}
                href={`/industries/${industry.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="px-4 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg inline-block active:scale-95"
              >
                {industry}
              </a>
            ))}
          </div>
          
          <a 
            href="/industries" 
            className="text-primary text-sm font-semibold inline-flex items-center gap-2 group"
          >
            See all <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
