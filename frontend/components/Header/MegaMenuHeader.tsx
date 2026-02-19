"use client";
import { useState, useEffect } from "react";
import { Industry, Service } from "@/lib/types";
import { apiClient } from "@/lib/api-client";

export default function MegaMenuHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [communityCategories, setCommunityCategories] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch industries and services
    apiClient.getIndustries().then((data: any) => setIndustries(data || [])).catch(err => {
      console.error('Failed to load industries:', err);
      setIndustries([]);
    });
    apiClient.getServices().then((data: any) => setServices(data || [])).catch(err => {
      console.error('Failed to load services:', err);
      setServices([]);
    });
    apiClient.getSolutions().then((data: any) => setSolutions(data || [])).catch(err => {
      console.error('Failed to load solutions:', err);
      setSolutions([]);
    });
    apiClient.getCommunityCategories().then((data: any) => {
      console.log('Community categories loaded:', data);
      setCommunityCategories(Array.isArray(data) ? data : []);
    }).catch(err => {
      console.error('Failed to load community categories:', err);
      setCommunityCategories([]);
    });
    
    return () => window.removeEventListener("scroll", handleScroll);
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
              JAS.COME
            </span>
          </a>
          
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="/solutions" className={`text-sm font-medium transition-all flex items-center gap-1 ${
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
              }`}>
                Solutions
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border transition-all duration-200 ${
                activeDropdown === "solutions" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}>
                <div className="p-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Featured Solutions</h4>
                    <div className="space-y-2">
                      {solutions.filter((s: any) => s.featured).map((sol: any) => (
                        <a key={sol.id} href={`/solutions/${sol.slug}`} className="block text-xs text-gray-600 hover:text-blue-600">{sol.name}</a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">All Solutions</h4>
                    <div className="space-y-2">
                      {solutions.filter((s: any) => !s.featured).map((sol: any) => (
                        <a key={sol.id} href={`/solutions/${sol.slug}`} className="block text-xs text-gray-600 hover:text-blue-600">{sol.name}</a>
                      ))}
                      <a href="/solutions" className="block text-xs text-blue-600 hover:text-blue-700 font-semibold pt-2">View All Solutions →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="/services" className={`text-sm font-medium transition-all flex items-center gap-1 ${
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
              }`}>
                Services
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border transition-all duration-200 ${
                activeDropdown === "services" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}>
                <div className="p-6 grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Industries We Serve</h4>
                    <div className="space-y-2">
                      {industries.slice(0, 10).map((ind: any) => (
                        <a key={ind.id} href={`/industries/${ind.slug}`} className="block text-xs text-gray-600 hover:text-blue-600">{ind.name}</a>
                      ))}
                      {industries.length > 10 && (
                        <a href="/industries" className="block text-xs text-blue-600 hover:text-blue-700 font-semibold pt-2">View All Industries →</a>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Our Services</h4>
                    <div className="space-y-2">
                      {services.slice(0, 10).map((svc: any) => (
                        <a key={svc.id} href={`/services/${svc.slug}`} className="block text-xs text-gray-600 hover:text-blue-600">{svc.name}</a>
                      ))}
                      {services.length > 10 && (
                        <a href="/services" className="block text-xs text-blue-600 hover:text-blue-700 font-semibold pt-2">View All Services →</a>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Featured Work</h4>
                    <div className="space-y-2">
                      <a href="/case-studies" className="block text-xs text-gray-600 hover:text-blue-600">Case Studies</a>
                      <a href="/case-studies#success" className="block text-xs text-gray-600 hover:text-blue-600">Success Stories</a>
                      <a href="/case-studies#testimonials" className="block text-xs text-gray-600 hover:text-blue-600">Client Testimonials</a>
                      <a href="/insights" className="block text-xs text-gray-600 hover:text-blue-600">Insights & Research</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("community")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="/community" className={`text-sm font-medium transition-all flex items-center gap-1 ${
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
              }`}>
                Community
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border transition-all duration-200 ${
                activeDropdown === "community" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}>
                <div className="p-6">
                  {communityCategories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="mb-2">No community categories available yet.</p>
                      <a href="/community" className="text-blue-600 hover:underline text-sm">Visit Community Page</a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-6">
                      {communityCategories.map((category: any) => (
                        <div key={category.id}>
                          <a href={`/community/${category.slug}`} className="block mb-3">
                            <h4 className="font-bold text-gray-900 text-sm hover:text-blue-600 transition">{category.name}</h4>
                          </a>
                          <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                          <a href={`/community/${category.slug}`} className="text-xs text-blue-600 hover:text-blue-700 font-semibold">Explore →</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <a href="/academy" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>Academy</a>
            
            <a href="/about" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>About Us</a>
            
            <a href="/contact" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="/admin/login" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>Login</a>
            
            <button
              onClick={() => setSearchOpen(true)}
              className={`transition-all ${
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
            </button>
            
            <a href="/contact?type=consultation" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm transition">
              Book Consultation
            </a>
          </div>
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
