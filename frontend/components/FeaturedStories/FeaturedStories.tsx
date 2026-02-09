"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function FeaturedStories({ content }: { content: any }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const stories = [
    {
      heading: "Bold steps forward.",
      subheading: "Featured client success story",
      title: "Banca Investis Transforms Customer Dialogue with AI",
      impact: "The impact",
      stat1Value: "500+",
      stat1Text: "internal employees using the tool",
      stat2Value: "7",
      stat2Text: "months from ideation to launch",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      logo: "M BANCA INVESTIS"
    },
    {
      heading: "Transforming communities.",
      subheading: "Global impact showcase",
      title: "Social Innovation & Economic Development Across Asia & Africa",
      impact: "Our reach",
      stat1Value: "3+",
      stat1Text: "years delivering research & consultancy",
      stat2Value: "2",
      stat2Text: "continents served",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      logo: "JACOME CONSULTING"
    },
    {
      heading: "Innovation at scale.",
      subheading: "Technology excellence",
      title: "Digital Transformation Solutions for Smart Technology",
      impact: "Innovation delivered",
      stat1Value: "100+",
      stat1Text: "IoT & AI projects completed",
      stat2Value: "5",
      stat2Text: "countries with active operations",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      logo: "JACOME IOT"
    },
    {
      heading: "Building tomorrow's leaders.",
      subheading: "Education & empowerment",
      title: "Empowering Communities Through Training & Development",
      impact: "Skills transformation",
      stat1Value: "1000+",
      stat1Text: "professionals trained globally",
      stat2Value: "15+",
      stat2Text: "specialized training programs",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
      logo: "JACOME ACADEMY"
    }
  ];

  const currentStory = stories[activeSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % stories.length);
        setIsTransitioning(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [stories.length]);

  const handleSlideChange = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-3xl md:text-4xl font-light mb-2">{currentStory.heading}</h2>
          <p className="text-sm text-gray-600 mb-12">{currentStory.subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-[600ms] ease-in-out ${isTransitioning ? 'opacity-0 translate-x-[-100%]' : 'opacity-100 translate-x-0'}`}>
            <h3 className="text-2xl font-light mb-4 hover:text-primary transition-colors cursor-pointer">
              {currentStory.title}
            </h3>
            <p className="text-sm text-gray-600 mb-6">{currentStory.impact}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl font-light mb-2 text-primary">{currentStory.stat1Value}</div>
                <p className="text-sm text-gray-600">{currentStory.stat1Text}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl font-light mb-2 text-primary">{currentStory.stat2Value}</div>
                <p className="text-sm text-gray-600">{currentStory.stat2Text}</p>
              </div>
            </div>

            <a href="#" className="text-primary font-semibold text-sm inline-flex items-center gap-2 group">
              Read story <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="relative h-96 rounded-lg shadow-2xl overflow-hidden group hover-scale">
            <Image
              src={currentStory.image}
              alt={currentStory.title}
              fill
              loading="lazy"
              className={`object-cover transition-all duration-[600ms] ease-in-out ${isTransitioning ? 'opacity-0 translate-x-[100%]' : 'opacity-100 translate-x-0'}`}
            />
            <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-light tracking-widest transition-all duration-[600ms] ease-in-out ${isTransitioning ? 'opacity-0 translate-x-[100%]' : 'opacity-100 translate-x-0'}`}>
              {currentStory.logo}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSlideChange(i)}
              className={`w-2 h-2 rounded-full transition-all hover:scale-125 active:scale-90 ${
                activeSlide === i ? "bg-primary w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="border-2 border-primary text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
            SEE ALL CLIENT RESULTS
          </button>
        </div>
      </div>
    </section>
  );
}
