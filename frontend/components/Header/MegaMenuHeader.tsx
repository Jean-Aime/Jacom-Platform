"use client";
import { useState, useEffect } from "react";
import { Industry, Service } from "@/lib/types";

export default function MegaMenuHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [industriesRes, servicesRes] = await Promise.all([
          fetch(`/api/industries?t=${Date.now()}`),
          fetch(`/api/services?t=${Date.now()}`)
        ]);
        setIndustries(await industriesRes.json() || []);
        setServices(await servicesRes.json() || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

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

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-all shadow-lg">
                J
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <span className={`text-base font-bold tracking-wider transition-colors ${
              scrolled ? "text-gray-900" : "text-white"
            }`}>
              JACOM
            </span>
          </a>
          
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("industries")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a 
                href="/industries" 
                className={`text-sm font-medium transition-all flex items-center gap-1 ${
                  scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                }`}
              >
                Industries
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border transition-all duration-200 ${
                activeDropdown === "industries" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {industries.length > 0 ? industries.slice(0, 12).map((industry) => (
                      <a 
                        key={industry.id}
                        href={`/industries/${industry.slug}`}
                        className="block p-3 rounded-lg hover:bg-blue-50 transition-all text-sm text-gray-700 hover:text-blue-600"
                      >
                        {industry.name}
                      </a>
                    )) : (
                      <div className="col-span-2 text-center text-gray-400 py-4">Loading...</div>
                    )}
                  </div>
                  {industries.length > 12 && (
                    <a href="/industries" className="block mt-4 pt-4 border-t text-sm text-blue-600 hover:text-blue-700 text-center">
                      View All Industries →
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a 
                href="/services" 
                className={`text-sm font-medium transition-all flex items-center gap-1 ${
                  scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                }`}
              >
                Services
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border transition-all duration-200 ${
                activeDropdown === "services" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {services.length > 0 ? services.slice(0, 8).map((service) => (
                      <a 
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="block p-3 rounded-lg hover:bg-blue-50 transition-all"
                      >
                        <h4 className="text-sm text-gray-900 hover:text-blue-600">{service.name}</h4>
                      </a>
                    )) : (
                      <div className="col-span-2 text-center text-gray-400 py-4">Loading...</div>
                    )}
                  </div>
                  {services.length > 8 && (
                    <a href="/services" className="block mt-4 pt-4 border-t text-sm text-blue-600 hover:text-blue-700 text-center">
                      View All Services →
                    </a>
                  )}
                </div>
              </div>
            </div>

            <a href="/digital" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>Digital & AI</a>
            
            <a href="/insights" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>Insights</a>
            
            <a href="/about" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>About</a>
          </nav>

          <button
            onClick={() => setSearchOpen(true)}
            className={`transition-all flex items-center gap-2 ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium">Search</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 px-6" onClick={() => setSearchOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Search</h3>
                <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form action="/search" method="GET">
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="q"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for insights, services, industries..."
                    autoFocus
                    className="w-full px-5 py-3 pr-24 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                    Search
                  </button>
                </div>
              </form>

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
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded uppercase">
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

              {searchQuery.length < 2 && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                  <span className="text-sm text-gray-500">Popular:</span>
                  <a href="/search?q=digital+transformation" className="text-sm text-blue-600 hover:underline">Digital Transformation</a>
                  <span className="text-gray-300">•</span>
                  <a href="/search?q=consulting" className="text-sm text-blue-600 hover:underline">Consulting</a>
                  <span className="text-gray-300">•</span>
                  <a href="/search?q=AI" className="text-sm text-blue-600 hover:underline">AI</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
