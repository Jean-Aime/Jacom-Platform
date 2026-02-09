"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IndustrySelector({ content }: { content: any }) {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  
  const title = content?.industry_title || 'We champion the bold to achieve the extraordinary.';
  const subtitle = content?.industry_subtitle || 'Around two questions we help our clients win: one on your challenges.';
  const image = content?.industry_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
  const industries = content?.industry_tags || [
    "Retail", "Private Equity", "Advanced Manufacturing & Services",
    "Technology", "Oil & Gas", "Healthcare & Life Sciences",
    "Chemicals", "Consumer Products", "Mining", "Financial Services"
  ];

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndustry(e.target.value);
  };

  const handleGoClick = () => {
    if (selectedIndustry) {
      const slug = selectedIndustry.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');
      router.push(`/industries/${slug}`);
    }
  };

  const handleTagClick = (industry: string) => {
    const slug = industry.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');
    router.push(`/industries/${slug}`);
  };

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
            <div className="flex gap-2">
              <select 
                value={selectedIndustry}
                onChange={handleIndustryChange}
                className="flex-1 border border-gray-300 px-4 py-3 rounded hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="">Select one</option>
                {industries.map((industry: string) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              <button
                onClick={handleGoClick}
                disabled={!selectedIndustry}
                className="px-6 py-3 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-scale"
              >
                GO
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {industries.map((industry: string) => (
              <button
                key={industry}
                onClick={() => handleTagClick(industry)}
                className="px-4 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
              >
                {industry}
              </button>
            ))}
          </div>
          
          <a 
            href="/industries" 
            className="text-primary text-sm font-semibold inline-flex items-center gap-2 group cursor-scale"
          >
            See all <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
