"use client";
import { useState, useEffect } from "react";

const heroContent = {
  "Digital Transformation": {
    title: "Digital Transformation Consulting",
    subtitle: "Accelerating Innovation Through Technology",
    description: "We help organizations navigate digital transformation, implementing AI, IoT, and cloud solutions to drive competitive advantage and operational excellence."
  },
  "Recruitment Services": {
    title: "Global Talent Recruitment",
    subtitle: "Connecting Top Talent with Opportunities",
    description: "Specialized recruitment services for hospitality and IT professionals, with comprehensive training programs and visa sponsorship support for international placements."
  },
  "IoT Platform Solutions": {
    title: "JACOME IoT Platform",
    subtitle: "Smart System Integration Services",
    description: "Comprehensive IoT platform infrastructure providing low-cost system integration, standardized products, and engineering consulting for smart device manufacturers and consumers."
  },
  "Business Consulting": {
    title: "Strategic Business Consulting",
    subtitle: "Driving Growth and Excellence",
    description: "Expert consulting in growth strategies, operational excellence, ESG initiatives, and market expansion with data-driven insights and proven methodologies."
  }
};

export default function Hero({ content }: { content: any }) {
  const tabs = Object.keys(heroContent);
  const bgImage = content?.home_hero_bg || '/images/hero-bg.jpg';
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentContent = heroContent[activeTab as keyof typeof heroContent];

  return (
    <section className="relative h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-black pt-20 overflow-hidden texture-overlay">
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center will-change-transform"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      ></div>
      
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center px-6 md:px-20 animate-fade-in">
          <div className="max-w-3xl">
            <div className="transition-all duration-500">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                {currentContent.title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block animate-slide-in-left" style={{animationDelay: `${i * 0.1}s`}}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <h2 className="text-2xl md:text-3xl text-blue-200 font-light mb-6 animate-fade-in">
                {currentContent.subtitle}
              </h2>
              <p className="text-lg text-gray-200 mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
                {currentContent.description}
              </p>
              <a 
                href="/services"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold bg-primary px-8 py-3 rounded hover:bg-primary/90 transition-all duration-300 cursor-scale"
              >
                EXPLORE SERVICES <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="glass-effect animate-slide-in-up">
          <div className="flex overflow-x-auto px-6 md:px-20">
            {tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm whitespace-nowrap transition-all duration-300 hover:scale-105 cursor-scale ${
                  activeTab === tab ? "text-white border-b-2 border-primary" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
