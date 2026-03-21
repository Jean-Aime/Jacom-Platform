"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import SearchFilters from "@/components/Search/SearchFilters";
import SearchResult from "@/components/Search/SearchResult";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any>({ industries: [], services: [], insights: [], experts: [] });
  const [filters, setFilters] = useState<any>({ types: {}, industries: [], services: [], contentTypes: {}, regions: [] });
  const [selectedFilters, setSelectedFilters] = useState<any>({
    type: searchParams.get('type') || undefined,
    industry: searchParams.get('industry') || undefined,
    service: searchParams.get('service') || undefined,
    region: searchParams.get('region') || undefined,
    contentType: searchParams.get('contentType') || undefined
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      performSearch();
    }
  }, [query, selectedFilters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      if (selectedFilters.type) params.append('type', selectedFilters.type);
      if (selectedFilters.industry) params.append('industry', selectedFilters.industry);
      if (selectedFilters.service) params.append('service', selectedFilters.service);
      if (selectedFilters.region) params.append('region', selectedFilters.region);
      if (selectedFilters.contentType) params.append('contentType', selectedFilters.contentType);

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      setResults(data.results || { industries: [], services: [], insights: [], experts: [] });
      setFilters(data.filters || { types: {}, industries: [], services: [], contentTypes: {}, regions: [] });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setSelectedFilters(newFilters);
    const params = new URLSearchParams({ q: query });
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.append(key, value as string);
    });
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSelectedFilters({ type: undefined, industry: undefined, service: undefined, region: undefined, contentType: undefined });
    router.push(`/search?q=${query}`, { scroll: false });
  };

  const allResults = [
    ...results.industries,
    ...results.services,
    ...results.insights,
    ...results.experts
  ];

  const totalResults = allResults.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaMenuHeader />
      
      {/* Modern Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-24 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Our Knowledge Base
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
              Find What You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">Looking For</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of industries, services, insights, and expert profiles
            </p>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search industries, services, insights, experts..."
                className="w-full pl-16 pr-6 py-5 bg-white rounded-2xl text-lg shadow-2xl focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Quick Search Suggestions */}
            {!query && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-white/60 text-sm">Popular:</span>
                {['Digital Transformation', 'Cloud Services', 'AI Solutions', 'Cybersecurity'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Results Count */}
          {!loading && query.length >= 2 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>{totalResults}</strong> results found for <strong>"{query}"</strong></span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Searching our database...</p>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {!loading && query.length >= 2 && (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <SearchFilters
                  filters={filters}
                  selected={selectedFilters}
                  onChange={handleFilterChange}
                  onClear={clearFilters}
                />
              </div>

              {/* Results Column */}
              <div className="lg:col-span-3">
                {totalResults > 0 ? (
                  <>
                    {/* Active Filters Pills */}
                    {Object.entries(selectedFilters).some(([, v]) => v) && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                        {Object.entries(selectedFilters).map(([key, value]) => 
                          value && (
                            <span key={key} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                              {value}
                              <button
                                onClick={() => handleFilterChange({ ...selectedFilters, [key]: undefined })}
                                className="hover:bg-primary/20 rounded-full p-0.5"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </span>
                          )
                        )}
                      </div>
                    )}
                    
                    {/* Results List */}
                    <div className="space-y-4">
                      {allResults.map((item: any) => (
                        <SearchResult key={`${item.type}-${item.id}`} item={item} query={query} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h3>
                      <p className="text-gray-600 mb-6">
                        We couldn't find anything matching <strong>"{query}"</strong>. Try different keywords or adjust your filters.
                      </p>
                      <div className="space-y-2 text-left bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-900">Search Tips:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Try using different or more general keywords</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Check your spelling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Remove filters to broaden your search</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Empty State - No Query */}
          {!loading && query.length < 2 && (
            <div className="text-center py-20">
              <div className="max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Search</h3>
                <p className="text-gray-600 mb-8">
                  Enter at least 2 characters to search our comprehensive database of industries, services, insights, and experts.
                </p>
                
                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-4">
                  <a href="/industries" className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Industries</h4>
                    <p className="text-sm text-gray-600">Explore sectors we serve</p>
                  </a>
                  
                  <a href="/services" className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Services</h4>
                    <p className="text-sm text-gray-600">View our offerings</p>
                  </a>
                  
                  <a href="/insights" className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Insights</h4>
                    <p className="text-sm text-gray-600">Read our latest articles</p>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
