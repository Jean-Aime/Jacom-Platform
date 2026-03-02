"use client";
import { useState, useEffect } from "react";
import { Target, Users, Handshake, Award, TrendingUp, Star, Factory, Zap, Link2, Building2, Heart, Hotel, Laptop, DollarSign, MapPin, Play } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  challenge: string;
  industry: string;
  company: string;
  slug: string;
  image?: string;
}

interface Solution {
  id: string;
  name: string;
  description: string;
  slug: string;
  image?: string;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span>{count}{suffix}</span>;
}

export default function NewHomePage({ insights }: { insights: any[] }) {
  const [activeTab, setActiveTab] = useState("SmartFactory");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  const heroImages = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchSolutions() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend'}/solutions`);
        if (res.ok) {
          const data = await res.json();
          setSolutions(data);
        }
      } catch (error) {
        console.error('Failed to fetch solutions:', error);
      }
    }
    
    async function fetchCaseStudies() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend'}/case-studies`);
        if (res.ok) {
          const data = await res.json();
          setCaseStudies(data);
        }
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
      }
    }
    
    async function fetchPartners() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend'}/partners`);
        if (res.ok) {
          const data = await res.json();
          setPartners(data);
        }
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      }
    }
    
    fetchSolutions();
    fetchCaseStudies();
    fetchPartners();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SmartFactory': return Factory;
      case 'Financial': return DollarSign;
      case 'General': return Building2;
      default: return Building2;
    }
  };

  const categorizedSolutions = {
    SmartFactory: solutions.filter((sol: Solution) => 
      sol.name.toLowerCase().includes('manufacturing') || 
      sol.name.toLowerCase().includes('factory') || 
      sol.name.toLowerCase().includes('smart')
    ),
    Financial: solutions.filter((sol: Solution) => 
      sol.name.toLowerCase().includes('financial') || 
      sol.name.toLowerCase().includes('banking') || 
      sol.name.toLowerCase().includes('risk')
    ),
    General: solutions.filter((sol: Solution) => 
      !sol.name.toLowerCase().includes('manufacturing') && 
      !sol.name.toLowerCase().includes('factory') && 
      !sol.name.toLowerCase().includes('smart') &&
      !sol.name.toLowerCase().includes('financial') && 
      !sol.name.toLowerCase().includes('banking') && 
      !sol.name.toLowerCase().includes('risk')
    )
  };

  const currentSolutions = categorizedSolutions[activeTab as keyof typeof categorizedSolutions] || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: index === currentImageIndex ? 'scale(1.15)' : 'scale(1.0)',
              transition: 'transform 4s ease-out, opacity 1s ease-in-out'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in-up">
              Transform Your Business with <span className="text-red-400 animate-pulse">Innovative Consulting</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-6 sm:mb-8 animate-fade-in-up animation-delay-300">
              Empowering your growth through strategic insights and tailored solutions that drive measurable results
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-up animation-delay-600">
              <button className="bg-primary hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded font-semibold transition transform hover:scale-105 text-sm sm:text-base">
                Get Started Today
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-900 px-6 sm:px-8 py-3 rounded font-semibold transition flex items-center justify-center gap-2 transform hover:scale-105 text-sm sm:text-base">
                <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                Watch Overview
              </button>
            </div>
            <div className="hidden sm:grid bg-white/95 backdrop-blur rounded-lg shadow-xl p-6 grid-cols-4 gap-6 animate-fade-in-up animation-delay-900">
              {[
                { value: 3, label: "Years Experience", suffix: "+" },
                { value: 50, label: "Expert Consultants", suffix: "+" },
                { value: 15, label: "Industries Served", suffix: "+" },
                { value: 9, label: "Global Offices", suffix: "+" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000 + i * 200} />
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Logo Slider */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {partners.length > 0 ? (
                <>
                  {partners.map((partner, i) => (
                    <div key={i} className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                      <img src={partner.logo} alt={partner.name} className="h-20 w-auto object-contain opacity-60 hover:opacity-100" />
                    </div>
                  ))}
                  {partners.map((partner, i) => (
                    <div key={`dup-${i}`} className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                      <img src={partner.logo} alt={partner.name} className="h-20 w-auto object-contain opacity-60 hover:opacity-100" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { name: "Company 1", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+1" },
                    { name: "Company 2", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+2" },
                    { name: "Company 3", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+3" },
                    { name: "Company 4", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+4" },
                    { name: "Company 5", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+5" },
                    { name: "Company 6", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+6" }
                  ].map((partner, i) => (
                    <div key={i} className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                      <img src={partner.logo} alt={partner.name} className="h-20 w-auto object-contain opacity-60 hover:opacity-100" />
                    </div>
                  ))}
                  {[
                    { name: "Company 1", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+1" },
                    { name: "Company 2", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+2" },
                    { name: "Company 3", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+3" },
                    { name: "Company 4", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+4" },
                    { name: "Company 5", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+5" },
                    { name: "Company 6", logo: "https://via.placeholder.com/150x60/dc2626/ffffff?text=Partner+6" }
                  ].map((partner, i) => (
                    <div key={`dup-${i}`} className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                      <img src={partner.logo} alt={partner.name} className="h-20 w-auto object-contain opacity-60 hover:opacity-100" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Business Growth Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="African business team collaborating on innovation" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Energizing Business Growth Through Innovation
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Discover a world where JACOM is a dynamic growth consultancy that empowers businesses to unlock their full potential through innovative strategies and cutting-edge solutions.
            </p>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                "Full-Scale Startup Integration",
                "Comprehensive Financial Planning",
                "Strategic Market Positioning"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-2 sm:w-3 h-2 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="/services" className="text-primary font-semibold hover:underline inline-flex items-center gap-2 text-sm sm:text-base">
              Learn more about our services →
            </a>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-2 sm:mb-4">Our Core Values</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Guiding principles that drive our success</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { Icon: Target, title: "Innovation", desc: "We leverage cutting-edge technology and creative strategies to transform businesses and drive sustainable growth in emerging markets" },
              { Icon: Users, title: "Teamwork", desc: "Our multidisciplinary experts collaborate seamlessly across continents to deliver integrated solutions that address complex business challenges" },
              { Icon: Handshake, title: "Trust", desc: "We build long-term partnerships with clients through transparency, integrity, and consistent delivery of measurable results" },
              { Icon: Award, title: "Standards", desc: "We maintain the highest professional standards in consulting, ensuring every solution meets international best practices and compliance requirements" },
              { Icon: TrendingUp, title: "Results", desc: "We focus on tangible outcomes that improve operational efficiency, reduce costs, and accelerate revenue growth for our clients" },
              { Icon: Star, title: "Excellence", desc: "We continuously refine our methodologies and expand our expertise to provide world-class consulting services that exceed client expectations" }
            ].map((value, i) => (
              <div 
                key={i} 
                className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <value.Icon className="w-10 h-10 text-primary transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Industry-Leading Solutions</h2>
            <div className="flex gap-2 overflow-x-auto">
              {["SmartFactory", "Financial", "General"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentSolutions.length > 0 ? currentSolutions.slice(0, 3).map((solution: Solution) => {
              const IconComponent = getCategoryIcon(activeTab);
              return (
                <div key={solution.id} className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
                  {/* Blog-style image header */}
                  <div className="h-48 sm:h-52 bg-gray-100 overflow-hidden">
                    {solution.image ? (
                      <img 
                        src={solution.image} 
                        alt={solution.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-red-50 flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{solution.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{solution.description}</p>
                    <a href={`/solutions/${solution.slug}`} className="text-primary font-semibold hover:underline inline-flex items-center gap-1 text-sm sm:text-base">
                      Explore →
                    </a>
                  </div>
                </div>
              );
            }) : (
              // Fallback content when no solutions are available
              [
                { Icon: Factory, title: "SmartFactory", desc: "Revolutionize manufacturing with IoT and AI-driven automation solutions" },
                { Icon: Link2, title: "IoT Integration", desc: "Seamlessly connect devices and systems for real-time data insights" },
                { Icon: Zap, title: "Renewable Energy", desc: "Sustainable energy solutions for a greener future" }
              ].map((solution, i) => (
                <div key={i} className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
                  <div className="h-48 sm:h-52 bg-red-50 flex items-center justify-center">
                    <solution.Icon className="w-16 h-16 text-primary" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{solution.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{solution.desc}</p>
                    <a href="/solutions" className="text-primary font-semibold hover:underline inline-flex items-center gap-1 text-sm sm:text-base">
                      Explore →
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/90"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Sectors We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { Icon: Factory, label: "Manufacturing" },
              { Icon: Heart, label: "Healthcare" },
              { Icon: Hotel, label: "Hospitality" },
              { Icon: Laptop, label: "IT & Tech" },
              { Icon: DollarSign, label: "Finance" },
              { Icon: Zap, label: "Energy" }
            ].map((sector, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3 hover:bg-white/20 transition">
                  <sector.Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-white">{sector.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Featured Case Study */}
            <div className="space-y-6">
              {caseStudies.length > 0 ? (
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition h-64 sm:h-72 md:h-80">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    {caseStudies[0].image ? (
                      <img 
                        src={caseStudies[0].image} 
                        alt={caseStudies[0].title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200"></div>
                    )}
                  </div>
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/60"></div>
                  
                  {/* Content Over Image */}
                  <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-end text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{caseStudies[0].title}</h3>
                    <p className="text-gray-200 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">{caseStudies[0].challenge}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-xs sm:text-sm text-red-300 font-semibold">{caseStudies[0].industry}</span>
                      <a href={`/case-studies/${caseStudies[0].slug}`} className="text-white text-xs sm:text-sm font-semibold hover:underline bg-white/20 px-2 sm:px-3 py-1 rounded self-start">
                        Read Full Story →
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition">
                  <h3 className="font-bold text-gray-900 mb-2">Smart Factory Implementation</h3>
                  <p className="text-sm text-gray-600 mb-4">Transforming operations through strategic consulting</p>
                  <div className="h-32 bg-gradient-to-br from-red-100 to-red-200 rounded flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">60% Efficiency Gain</div>
                  </div>
                  <a href="#" className="text-primary text-sm font-semibold hover:underline">View Case Study →</a>
                </div>
              )}
            </div>
            
            {/* Right Side - Two Parallel Case Studies */}
            <div className="space-y-6">
              {caseStudies.length > 1 ? caseStudies.slice(1, 3).map((story: CaseStudy) => (
                <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="flex">
                    <div className="w-32 h-32 bg-gray-200 flex-shrink-0">
                      {story.image ? (
                        <img 
                          src={story.image} 
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{story.company.split(' ')[0]}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg line-clamp-2">{story.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{story.challenge}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary font-semibold">{story.industry}</span>
                        <a href={`/case-studies/${story.slug}`} className="text-primary text-xs font-semibold hover:underline">
                          Read More →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                // Fallback for right side
                [
                  { title: "Tax Management Enhancement", metric: "40% Cost Reduction" },
                  { title: "Renewable Energy Savings", metric: "50% Energy Saved" }
                ].map((story, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition">
                    <h3 className="font-bold text-gray-900 mb-2">{story.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">Strategic consulting solutions</p>
                    <div className="text-lg font-bold text-primary">{story.metric}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bridging Continents */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Bridging Continents</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              With offices across the globe, we bring local expertise and global perspective to every engagement
            </p>
            <div className="space-y-3">
              {[
                { location: "Tokyo, Japan", desc: "Asia Pacific Headquarters" },
                { location: "Dubai, UAE", desc: "Middle East Operations" },
                { location: "Kathmandu, Nepal", desc: "South Asia Hub" }
              ].map((office, i) => (
                <div key={i} className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{office.location}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{office.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[300px] sm:h-[400px] bg-transparent rounded-lg relative overflow-hidden">
            {/* Real World Map using actual world map image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')`,
                filter: 'brightness(0.9) contrast(1.1)'
              }}
            />
            
            {/* Location Markers */}
            <div className="absolute inset-0">
              {/* Tokyo, Japan - Far East Asia */}
              <div className="absolute" style={{left: '88%', top: '32%'}}>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-3 bg-red-500 rounded-full animate-ping opacity-60"></div>
                  <div className="relative bg-red-600 rounded-full p-3 shadow-xl border-4 border-white">
                    <MapPin className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <div className="absolute -top-16 -left-12 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <div className="text-white">Tokyo, Japan</div>
                      <div className="text-xs text-gray-300">Asia Pacific HQ</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Tokyo
                  </div>
                </div>
              </div>
              
              {/* Dubai, UAE - Arabian Peninsula */}
              <div className="absolute" style={{left: '54%', top: '48%'}}>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-3 bg-red-500 rounded-full animate-ping opacity-60"></div>
                  <div className="relative bg-red-600 rounded-full p-3 shadow-xl border-4 border-white">
                    <MapPin className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <div className="absolute -top-16 -left-10 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <div className="text-white">Dubai, UAE</div>
                      <div className="text-xs text-gray-300">Middle East Operations</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                  <div className="absolute -bottom-8 -left-6 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Dubai
                  </div>
                </div>
              </div>
              
              {/* Kathmandu, Nepal - Himalayan Region */}
              <div className="absolute" style={{left: '68%', top: '44%'}}>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-3 bg-red-500 rounded-full animate-ping opacity-60"></div>
                  <div className="relative bg-red-600 rounded-full p-3 shadow-xl border-4 border-white">
                    <MapPin className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <div className="absolute -top-16 -left-14 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <div className="text-white">Kathmandu, Nepal</div>
                      <div className="text-xs text-gray-300">South Asia Hub</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                  <div className="absolute -bottom-8 -left-10 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Kathmandu
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Tokyo to Dubai */}
              <path d="M 704 128 Q 620 160 432 192" stroke="url(#lineGradient)" strokeWidth="4" fill="none" strokeDasharray="10,5" opacity="0.9">
                <animate attributeName="stroke-dashoffset" values="0;15" dur="4s" repeatCount="indefinite" />
              </path>
              
              {/* Dubai to Kathmandu */}
              <path d="M 432 192 Q 500 170 544 176" stroke="url(#lineGradient)" strokeWidth="4" fill="none" strokeDasharray="10,5" opacity="0.9">
                <animate attributeName="stroke-dashoffset" values="0;15" dur="4s" repeatCount="indefinite" />
              </path>
              
              {/* Kathmandu to Tokyo */}
              <path d="M 544 176 Q 620 140 704 128" stroke="url(#lineGradient)" strokeWidth="4" fill="none" strokeDasharray="10,5" opacity="0.9">
                <animate attributeName="stroke-dashoffset" values="0;15" dur="4s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        </div>
      </section>

      {/* Academy Programs */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Upcoming Academy Programs</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Join our next training cohorts and advance your career with industry-leading programs</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { 
                title: "Full-Stack Web Development", 
                subtitle: "Master modern web technologies and frameworks", 
                description: "Comprehensive 16-week program covering React, Node.js, databases, and deployment. Build real-world projects and get job-ready skills.",
                startDate: "March 15, 2024",
                duration: "16 weeks",
                format: "Hybrid (Online + In-person)",
                price: "NPR 85,000",
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
                link: "/academy/full-stack",
                badge: "Early Bird 20% Off",
                spots: "12 spots left"
              },
              { 
                title: "Digital Marketing Mastery", 
                subtitle: "Complete digital marketing and social media strategy", 
                description: "Learn SEO, social media marketing, Google Ads, content strategy, and analytics. Perfect for entrepreneurs and marketing professionals.",
                startDate: "April 1, 2024",
                duration: "12 weeks",
                format: "Weekend Classes",
                price: "NPR 65,000",
                img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                link: "/academy/digital-marketing",
                badge: "New Program",
                spots: "8 spots left"
              }
            ].map((program, i) => (
              <div key={i} className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Background Image */}
                <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700" style={{
                  backgroundImage: `url(${program.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {program.badge}
                </div>
                
                {/* Spots Left */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                  {program.spots}
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{program.title}</h3>
                  <p className="text-gray-200 mb-3 sm:mb-4 text-sm sm:text-base">{program.subtitle}</p>
                  
                  {/* Program Details - Hidden by default, shown on hover */}
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{program.description}</p>
                    
                    {/* Program Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div>
                        <span className="text-red-300 font-semibold">Start Date:</span>
                        <div className="text-white">{program.startDate}</div>
                      </div>
                      <div>
                        <span className="text-red-300 font-semibold">Duration:</span>
                        <div className="text-white">{program.duration}</div>
                      </div>
                      <div>
                        <span className="text-red-300 font-semibold">Format:</span>
                        <div className="text-white">{program.format}</div>
                      </div>
                      <div>
                        <span className="text-red-300 font-semibold">Investment:</span>
                        <div className="text-white font-bold">{program.price}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <a href={program.link} className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base group-hover:scale-105 transform duration-300">
                    Enroll Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Academy Features */}
          <div className="mt-12 sm:mt-16 bg-gray-50 rounded-2xl p-6 sm:p-8">
            <div className="grid md:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Curriculum</h3>
                <p className="text-sm text-gray-600">Industry-designed courses with latest technologies</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Small Batches</h3>
                <p className="text-sm text-gray-600">Maximum 15 students per batch for personalized attention</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certification</h3>
                <p className="text-sm text-gray-600">Industry-recognized certificates upon completion</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8m0 0v-.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V6m-8 0h8" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Support</h3>
                <p className="text-sm text-gray-600">Career guidance and placement assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Latest Insights</h2>
              <p className="text-gray-600 mt-2">Stay informed with our latest thinking</p>
            </div>
            <a href="/insights" className="text-primary font-semibold hover:underline">
              View all Insights →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {insights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition">
                <div className="relative h-48 bg-gray-200">
                  {insight.image ? (
                    <div className="w-full h-full" style={{
                      backgroundImage: `url(${insight.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary font-semibold mb-2 uppercase">{insight.type}</div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{insight.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{insight.readTime} min read</span>
                    <span>{new Date(insight.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <a href={`/insights/${insight.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm transition-colors">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded ${
                  currentPage === page ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                } font-semibold transition`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
