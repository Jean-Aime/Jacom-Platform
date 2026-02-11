"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Industry {
  id: string;
  name: string;
  slug: string;
}

export default function DynamicIndustrySelector({ content }: { content: any }) {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  
  const title = content?.industry_title || 'We champion the bold to achieve the extraordinary.';
  const subtitle = content?.industry_subtitle || 'Around two questions we help our clients win: one on your challenges.';
  const image = content?.industry_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await fetch('/api/industries');
      if (response.ok) {
        const data = await response.json();
        setIndustries(data);
      } else {
        // Use fallback industries
        setIndustries([
          { id: '1', name: 'Management Consulting', slug: 'management-consulting' },
          { id: '2', name: 'Technology & IoT Solutions', slug: 'technology-iot-solutions' },
          { id: '3', name: 'Hospitality & Tourism', slug: 'hospitality-tourism' },
          { id: '4', name: 'IT Services & Software Development', slug: 'it-services-software-development' },
          { id: '5', name: 'Manufacturing & Industry 4.0', slug: 'manufacturing-industry-4' },
          { id: '6', name: 'Education & Training', slug: 'education-training' },
          { id: '7', name: 'Energy & Utilities', slug: 'energy-utilities' },
          { id: '8', name: 'Real Estate & Infrastructure', slug: 'real-estate-infrastructure' },
          { id: '9', name: 'Financial Services', slug: 'financial-services' },
          { id: '10', name: 'Healthcare & Life Sciences', slug: 'healthcare-life-sciences' }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch industries:', error);
      // Use fallback industries
      setIndustries([
        { id: '1', name: 'Management Consulting', slug: 'management-consulting' },
        { id: '2', name: 'Technology & IoT Solutions', slug: 'technology-iot-solutions' },
        { id: '3', name: 'Hospitality & Tourism', slug: 'hospitality-tourism' },
        { id: '4', name: 'IT Services & Software Development', slug: 'it-services-software-development' },
        { id: '5', name: 'Manufacturing & Industry 4.0', slug: 'manufacturing-industry-4' },
        { id: '6', name: 'Education & Training', slug: 'education-training' },
        { id: '7', name: 'Energy & Utilities', slug: 'energy-utilities' },
        { id: '8', name: 'Real Estate & Infrastructure', slug: 'real-estate-infrastructure' },
        { id: '9', name: 'Financial Services', slug: 'financial-services' },
        { id: '10', name: 'Healthcare & Life Sciences', slug: 'healthcare-life-sciences' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndustry(e.target.value);
  };

  const handleGoClick = () => {
    if (selectedIndustry) {
      const industry = industries.find(ind => ind.name === selectedIndustry);
      const slug = industry ? industry.slug : selectedIndustry.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');
      router.push(`/industries/${slug}`);
    }
  };

  const handleTagClick = (industry: Industry) => {
    router.push(`/industries/${industry.slug}`);
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
                disabled={loading}
                className="flex-1 border border-gray-300 px-4 py-3 rounded hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer disabled:opacity-50"
              >
                <option value="">{loading ? 'Loading...' : 'Select one'}</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.name}>{industry.name}</option>
                ))}
              </select>
              <button
                onClick={handleGoClick}
                disabled={!selectedIndustry || loading}
                className="px-6 py-3 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-scale"
              >
                GO
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => handleTagClick(industry)}
                className="px-4 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
              >
                {industry.name}
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