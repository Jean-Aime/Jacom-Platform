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
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Blue Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 py-20 pt-32 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 border-2 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border-2 border-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/5 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl font-bold mb-8 text-white">Search</h1>
          
          <div className="mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search industries, services, insights, experts..."
              className="w-full p-4 border rounded-lg text-lg focus:border-primary focus:outline-none"
            />
          </div>
          
          {!loading && query.length >= 2 && (
            <div className="text-white text-sm">
              Found {totalResults} results for "{query}"
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {loading && <div className="text-center py-8">Searching...</div>}

          {!loading && query.length >= 2 && (
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <SearchFilters
                  filters={filters}
                  selected={selectedFilters}
                  onChange={handleFilterChange}
                  onClear={clearFilters}
                />
              </div>

              <div className="lg:col-span-3">
                {totalResults > 0 ? (
                  <div className="space-y-4">
                    {allResults.map((item: any) => (
                      <SearchResult key={`${item.type}-${item.id}`} item={item} query={query} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-600">
                    No results found for "{query}". Try different keywords or adjust filters.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
