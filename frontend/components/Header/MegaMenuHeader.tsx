"use client";
import { useState, useEffect } from "react";
import { Industry, Service } from "@/lib/types";

// Icon mapping for services and solutions
const getServiceIcon = (slug: string) => {
  const icons: Record<string, JSX.Element> = {
    'digital-transformation': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
      </svg>
    ),
    'iot-platform': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
      </svg>
    ),
    'recruitment-training': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
      </svg>
    ),
    'smart-factory': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
      </svg>
    ),
    'renewable-energy': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
      </svg>
    ),
    'smart-building': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
      </svg>
    ),
    'web-development-training': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    ),
    'financial-advisory': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    ),
    'pmo-services': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  };
  return icons[slug] || (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
    </svg>
  );
};

const getSolutionIcon = (slug: string) => {
  const icons: Record<string, JSX.Element> = {
    'manufacturing-digital-transformation': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
      </svg>
    ),
    'healthcare-system-integration': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
      </svg>
    ),
    'financial-services-modernization': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
      </svg>
    ),
    'smart-factory-implementation': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
      </svg>
    ),
    'enterprise-risk-management': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    )
  };
  return icons[slug] || (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
    </svg>
  );
};

export default function MegaMenuHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [communityCategories, setCommunityCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
    
    Promise.all([
      fetch(`${API_BASE}/industries`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE}/services`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE}/solutions`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE}/community-categories?status=published`).then(r => r.json()).catch(() => [])
    ]).then(([industriesData, servicesData, solutionsData, categoriesData]) => {
      setIndustries(Array.isArray(industriesData) ? industriesData : []);
      setServices(Array.isArray(servicesData) ? servicesData : []);
      setSolutions(Array.isArray(solutionsData) ? solutionsData : []);
      setCommunityCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setIsLoading(false);
    });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    // Debounce search requests
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        setSearchResults(data.flatResults || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src="/jascomelogo.png" 
              alt="JACOM Logo" 
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-12" : "h-16"
              }`}
            />
          </a>
          
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="/solutions" className={`text-sm font-medium transition-all flex items-center gap-1 ${
                scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
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
                        <a key={sol.id} href={`/solutions/${sol.slug}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary group">
                          <span className="text-primary group-hover:text-red-700">{getSolutionIcon(sol.slug)}</span>
                          {sol.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">All Solutions</h4>
                    <div className="space-y-2">
                      {solutions.filter((s: any) => !s.featured).map((sol: any) => (
                        <a key={sol.id} href={`/solutions/${sol.slug}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary group">
                          <span className="text-primary group-hover:text-red-700">{getSolutionIcon(sol.slug)}</span>
                          {sol.name}
                        </a>
                      ))}
                      <a href="/solutions" className="block text-xs text-primary hover:text-red-700 font-semibold pt-2">View All Solutions →</a>
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
                scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
              }`}>
                Services
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border transition-all duration-200 ${
                activeDropdown === "services" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}>
                <div className="p-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Consultancy Services</h4>
                    <div className="space-y-2">
                      {services.slice(0, 3).map((svc: any) => (
                        <a key={svc.id} href={`/services/${svc.slug}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary group">
                          <span className="text-primary group-hover:text-red-700">{getServiceIcon(svc.slug)}</span>
                          {svc.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Advisory Services</h4>
                    <div className="space-y-2">
                      {services.slice(3, 6).map((svc: any) => (
                        <a key={svc.id} href={`/services/${svc.slug}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary group">
                          <span className="text-primary group-hover:text-red-700">{getServiceIcon(svc.slug)}</span>
                          {svc.name}
                        </a>
                      ))}
                      <a href="/services" className="block text-xs text-primary hover:text-red-700 font-semibold pt-2">View All Services →</a>
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
                scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
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
                      <a href="/community" className="text-primary hover:underline text-sm">Visit Community Page</a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-6">
                      {communityCategories.map((category: any) => (
                        <div key={category.id}>
                          <a href={`/community/${category.slug}`} className="block mb-3">
                            <h4 className="font-bold text-gray-900 text-sm hover:text-primary transition">{category.name}</h4>
                          </a>
                          <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                          <a href={`/community/${category.slug}`} className="text-xs text-primary hover:text-red-700 font-semibold">Explore →</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <a href="/training" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
            }`}>Training</a>

            <a href="/store" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
            }`}>Store</a>
            
            <a href="/about" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
            }`}>About Us</a>
            
            <a href="/contact" className={`text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
            }`}>Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden transition-all ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <a href="/login" className={`hidden md:block text-sm font-medium transition-all ${
              scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
            }`}>Login</a>
            
            <button
              onClick={() => setSearchOpen(true)}
              className={`hidden md:block transition-all ${
                scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-red-200"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
            </button>
            
            <a href="/contact?type=consultation" className="hidden md:block bg-primary hover:bg-red-700 text-white px-6 py-2 rounded font-semibold text-sm transition">
              Book Consultation
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-gray-900">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-2">
                <div>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-primary font-medium py-3">
                    <span>Solutions</span>
                    <svg className={`w-4 h-4 transition-transform ${activeDropdown === "solutions" ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {activeDropdown === "solutions" && (
                    <div className="pl-4 pb-2 space-y-1">
                      {solutions.map((sol: any) => (
                        <a key={sol.id} href={`/solutions/${sol.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary py-1 group">
                          <span className="text-primary group-hover:text-red-700">{getSolutionIcon(sol.slug)}</span>
                          {sol.name}
                        </a>
                      ))}
                      <a href="/solutions" className="block text-sm text-primary font-semibold py-1">View All →</a>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-primary font-medium py-3">
                    <span>Services</span>
                    <svg className={`w-4 h-4 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {activeDropdown === "services" && (
                    <div className="pl-4 pb-2 space-y-1">
                      {services.slice(0, 10).map((svc: any) => (
                        <a key={svc.id} href={`/services/${svc.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary py-1 group">
                          <span className="text-primary group-hover:text-red-700">{getServiceIcon(svc.slug)}</span>
                          {svc.name}
                        </a>
                      ))}
                      <a href="/services" className="block text-sm text-primary font-semibold py-1">View All →</a>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === "community" ? null : "community")}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-primary font-medium py-3">
                    <span>Community</span>
                    <svg className={`w-4 h-4 transition-transform ${activeDropdown === "community" ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {activeDropdown === "community" && (
                    <div className="pl-4 pb-2 space-y-1">
                      {communityCategories.map((cat: any) => (
                        <a key={cat.id} href={`/community/${cat.slug}`} className="block text-sm text-gray-600 hover:text-primary py-1">{cat.name}</a>
                      ))}
                      <a href="/community" className="block text-sm text-primary font-semibold py-1">View All →</a>
                    </div>
                  )}
                </div>

                <a href="/training" className="block text-gray-700 hover:text-primary font-medium py-3">Training</a>
                <a href="/store" className="block text-gray-700 hover:text-primary font-medium py-3">Store</a>
                <a href="/about" className="block text-gray-700 hover:text-primary font-medium py-3">About Us</a>
                <a href="/contact" className="block text-gray-700 hover:text-primary font-medium py-3">Contact</a>
                <hr className="my-4" />
                <a href="/login" className="block text-gray-700 hover:text-primary font-medium py-3">Login</a>
                <a href="/contact?type=consultation" className="block bg-primary hover:bg-red-700 text-white px-6 py-3 rounded font-semibold text-center mt-4">
                  Book Consultation
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}

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
                    placeholder="Search for insights, services, industries, products..."
                    autoFocus
                    className="w-full px-5 py-3 pr-24 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-red-700">
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
                        <span className="px-2 py-1 bg-red-50 text-primary text-xs rounded uppercase">
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
                  <a href="/search?q=digital+transformation" className="text-sm text-primary hover:underline">Digital Transformation</a>
                  <span className="text-gray-300">•</span>
                  <a href="/search?q=consulting" className="text-sm text-primary hover:underline">Consulting</a>
                  <span className="text-gray-300">•</span>
                  <a href="/search?q=AI" className="text-sm text-primary hover:underline">AI</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
