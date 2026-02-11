"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/lib/data";
import { Industry, Service, Insight } from "@/lib/types";

export default function MegaMenuHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [featuredInsights, setFeaturedInsights] = useState<Insight[]>([]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.flatResults || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const timestamp = Date.now();
        const [industriesResponse, servicesResponse, insightsResponse] = await Promise.all([
          fetch(`/api/industries?t=${timestamp}`),
          fetch(`/api/services?t=${timestamp}`),
          fetch(`/api/insights?t=${timestamp}`)
        ]);
        
        const [industriesData, servicesData, insightsData] = await Promise.all([
          industriesResponse.json(),
          servicesResponse.json(),
          insightsResponse.json()
        ]);
        
        setIndustries(industriesData || []);
        setServices(servicesData || []);
        setFeaturedInsights((insightsData || []).filter((i: any) => i.featured).slice(0, 3));
      } catch (error) {
        console.error('Failed to load data:', error);
        // Fallback to mock data if API fails
        const [industriesData, servicesData, insightsData] = await Promise.all([
          DataService.getIndustries(),
          DataService.getServices(),
          DataService.getInsights()
        ]);
        setIndustries(industriesData);
        setServices(servicesData);
        setFeaturedInsights(insightsData.filter(i => i.featured).slice(0, 3));
      }
    };
    loadData();
  }, []);

  const industriesColumns = [
    industries.slice(0, Math.ceil(industries.length / 3)),
    industries.slice(Math.ceil(industries.length / 3), Math.ceil(industries.length * 2 / 3)),
    industries.slice(Math.ceil(industries.length * 2 / 3))
  ];

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-lg" : "bg-transparent"
      }`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`text-2xl transition-all hover:rotate-90 duration-300 lg:hidden ${
                scrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-yellow-400"
              }`}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
              <div className="relative">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg ${
                  scrolled ? "bg-primary text-white" : "bg-white text-primary"
                }`}>
                  J
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <span className={`text-base font-bold tracking-wider ${
                scrolled ? "text-gray-900" : "text-white"
              }`}>
                JACOM
              </span>
            </div>
            
            {/* Desktop Mega Navigation - HIDDEN */}
            {/* Navigation moved to overlay menu */}
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              className={`text-sm transition-all hover:scale-105 flex items-center gap-1 ${
                scrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-yellow-400"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
              Search
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className={`text-sm transition-all hover:scale-105 flex items-center gap-2 ${
                scrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-yellow-400"
              }`}
            >
              {menuOpen ? (
                <>
                  Close
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </>
              ) : (
                <>
                  Menu
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 px-6" onClick={() => setSearchOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Search</h3>
                <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form action="/search" method="GET" onSubmit={(e) => { if (!searchQuery) e.preventDefault(); }}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="q"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for insights, services, industries..."
                    autoFocus
                    className="w-full px-5 py-3 pr-24 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90">
                    Search
                  </button>
                </div>
              </form>

              {/* Live Search Results */}
              {searchResults.length > 0 && (
                <div className="max-h-96 overflow-y-auto border-t pt-4 space-y-2">
                  {searchResults.map((result, index) => (
                    <a
                      key={index}
                      href={result.url}
                      className="block p-3 hover:bg-gray-50 rounded-lg transition-all"
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                          {result.type}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{result.title}</h4>
                          {result.excerpt && (
                            <p className="text-xs text-gray-600 line-clamp-2">{result.excerpt}</p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No results found for "{searchQuery}"
                </div>
              )}

              {/* Popular Searches */}
              {searchQuery.length < 2 && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                  <span className="text-sm text-gray-500">Popular:</span>
                  <a href="/search?q=digital+transformation" className="text-sm text-primary hover:underline">Digital Transformation</a>
                  <span className="text-gray-300">•</span>
                  <a href="/search?q=consulting" className="text-sm text-primary hover:underline">Consulting</a>
                  <span className="text-gray-300">•</span>
                  <a href="/search?q=AI" className="text-sm text-primary hover:underline">AI</a>
                  <span className="text-gray-300">•</span>
                  <a href="/search?q=IoT" className="text-sm text-primary hover:underline">IoT</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Full Screen Overlay Menu */}
      <div className={`fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 z-[100] overflow-y-auto transition-all duration-500 ${
        menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
        {/* Close Button */}
        <button 
          onClick={() => setMenuOpen(false)}
          className="fixed top-6 right-6 text-white text-sm hover:scale-110 transition-all flex items-center gap-2 z-[101]"
        >
          Close
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="min-h-screen px-12 py-16 flex items-center">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column - Main Navigation */}
              <div className="lg:col-span-5 space-y-8">
                <nav className="space-y-4">
                  {/* Industries with Click Dropdown */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <a
                        href="/industries"
                        className="text-4xl lg:text-5xl font-light text-white hover:text-yellow-400 transition-all duration-300"
                      >
                        Industries
                      </a>
                      <button
                        onClick={() => toggleDropdown("industries")}
                        className="text-white hover:text-yellow-400 transition-all duration-300"
                      >
                        <svg className={`w-8 h-8 transition-transform duration-300 ${activeDropdown === "industries" ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    {activeDropdown === "industries" && (
                      <div className="pl-6 space-y-2 animate-fade-in">
                        {industries.length > 0 ? (
                          <>
                            {industries.slice(0, 8).map((industry) => (
                              <a 
                                key={industry.id}
                                href={`/industries/${industry.slug}`}
                                className="block text-base text-white/80 hover:text-yellow-400 hover:translate-x-2 transition-all duration-300"
                              >
                                → {industry.name}
                              </a>
                            ))}
                            <a href="/industries" className="block text-base text-yellow-400 hover:translate-x-2 transition-all duration-300 pt-2">
                              View All Industries →
                            </a>
                          </>
                        ) : (
                          <div className="text-base text-white/60 italic">
                            Loading industries...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Services with Click Dropdown */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <a
                        href="/services"
                        className="text-4xl lg:text-5xl font-light text-white hover:text-yellow-400 transition-all duration-300"
                      >
                        Services
                      </a>
                      <button
                        onClick={() => toggleDropdown("services")}
                        className="text-white hover:text-yellow-400 transition-all duration-300"
                      >
                        <svg className={`w-8 h-8 transition-transform duration-300 ${activeDropdown === "services" ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    {activeDropdown === "services" && (
                      <div className="pl-6 space-y-2 animate-fade-in">
                        {services.length > 0 ? (
                          <>
                            {services.slice(0, 6).map((service) => (
                              <a 
                                key={service.id}
                                href={`/services/${service.slug}`}
                                className="block text-base text-white/80 hover:text-yellow-400 hover:translate-x-2 transition-all duration-300"
                              >
                                → {service.name}
                              </a>
                            ))}
                            <a href="/services" className="block text-base text-yellow-400 hover:translate-x-2 transition-all duration-300 pt-2">
                              View All Services →
                            </a>
                          </>
                        ) : (
                          <div className="text-base text-white/60 italic">
                            Loading services...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Other Links */}
                  {[
                    { title: "Digital & AI", href: "/digital" },
                    { title: "Insights", href: "/insights" },
                    { title: "About", href: "/about" }
                  ].map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="block text-4xl lg:text-5xl font-light text-white hover:text-yellow-400 transition-all duration-300"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Social Icons */}
                <div className="flex items-center gap-6 pt-12">
                  {['instagram', 'facebook', 'twitter', 'linkedin', 'youtube'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-white hover:text-yellow-400 hover:scale-125 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column - Secondary Menu & Contact */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="space-y-4">
                {[
                  { title: "Offices", href: "/offices" },
                  { title: "Media Center", href: "/media" },
                  { title: "Careers", href: "/careers" },
                  { title: "Press Room", href: "#" },
                  { title: "Sustainability", href: "/social-impact" }
                ].map((item, i) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block text-white text-sm hover:translate-x-2 transition-all duration-300"
                    style={{ 
                      animation: menuOpen ? `slideInRight 0.5s ease-out ${i * 0.1}s both` : 'none'
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <a href="/insights" className="block text-white text-sm hover:translate-x-2 transition-all">Subscribe</a>
                <a href="#" className="block text-white text-sm hover:translate-x-2 transition-all">Global | English ▼</a>
                
                {/* Contact Info */}
                <div className="pt-8 space-y-3">
                  <a href="mailto:info@jacom.com" className="block text-white text-sm hover:translate-x-2 transition-all">
                    E. info@jacom.com
                  </a>
                  <a href="tel:+1234567890" className="block text-white text-sm hover:translate-x-2 transition-all">
                    T. +1 (234) 567-890
                  </a>
                  <a href="/contact" className="block text-white text-sm hover:translate-x-2 transition-all pt-2">
                    View all contact information →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-gradient-to-br from-white to-gray-50 z-40 overflow-y-auto pt-20 transition-all duration-500 lg:hidden ${
        menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}>
        <nav className="px-6 py-8">
          <ul className="space-y-6">
            {["Industries", "Services", "Digital & AI", "Insights", "About", "Careers", "Offices", "Contact"].map((item, i) => (
              <li 
                key={item}
                className="text-sm font-semibold hover:text-primary transition-all hover:translate-x-4 duration-300 cursor-pointer animate-slide-in-left"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => {
                  if (item === "About") window.location.href = "/about";
                  else if (item === "Industries") window.location.href = "/industries";
                  else if (item === "Services") window.location.href = "/services";
                  else if (item === "Digital & AI") window.location.href = "/digital";
                  else if (item === "Insights") window.location.href = "/insights";
                  else if (item === "Careers") window.location.href = "/careers";
                  else if (item === "Offices") window.location.href = "/offices";
                  else if (item === "Contact") window.location.href = "/contact";
                }}
              >
                → {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}