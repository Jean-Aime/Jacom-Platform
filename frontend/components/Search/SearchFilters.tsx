'use client';

interface SearchFiltersProps {
  filters: {
    types: { [key: string]: number };
    industries: { id: string; name: string }[];
    services: { id: string; name: string }[];
    contentTypes: { [key: string]: number };
    regions: string[];
  };
  selected: {
    type?: string;
    industry?: string;
    service?: string;
    region?: string;
    contentType?: string;
  };
  onChange: (filters: any) => void;
  onClear: () => void;
}

export default function SearchFilters({ filters, selected, onChange, onClear }: SearchFiltersProps) {
  const hasActiveFilters = Object.values(selected).some(v => v);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-32 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button onClick={onClear} className="text-sm text-primary hover:text-red-700 font-semibold flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Content Type Filter */}
        <div>
          <h4 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Content Type
          </h4>
          <div className="space-y-2">
            {Object.entries(filters.types).map(([type, count]) => (
              count > 0 && (
                <label key={type} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="type"
                    checked={selected.type === type}
                    onChange={() => onChange({ ...selected, type: selected.type === type ? undefined : type })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm capitalize flex-1 font-medium text-gray-700 group-hover:text-gray-900">{type}</span>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                </label>
              )
            ))}
          </div>
        </div>

        {/* Industry Filter */}
        {filters.industries.length > 0 && (
          <div className="border-t-2 border-gray-100 pt-6">
            <h4 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Industry
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.industries.map((industry) => (
                <label key={industry.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="industry"
                    checked={selected.industry === industry.id}
                    onChange={() => onChange({ ...selected, industry: selected.industry === industry.id ? undefined : industry.id })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{industry.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Service Filter */}
        {filters.services.length > 0 && (
          <div className="border-t-2 border-gray-100 pt-6">
            <h4 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Service
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.services.map((service) => (
                <label key={service.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="service"
                    checked={selected.service === service.id}
                    onChange={() => onChange({ ...selected, service: selected.service === service.id ? undefined : service.id })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{service.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Insight Content Type Filter */}
        {Object.keys(filters.contentTypes).length > 0 && (
          <div className="border-t-2 border-gray-100 pt-6">
            <h4 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Insight Type
            </h4>
            <div className="space-y-2">
              {Object.entries(filters.contentTypes).map(([type, count]) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="contentType"
                    checked={selected.contentType === type}
                    onChange={() => onChange({ ...selected, contentType: selected.contentType === type ? undefined : type })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm capitalize flex-1 font-medium text-gray-700 group-hover:text-gray-900">{type}</span>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Region Filter */}
        {filters.regions.length > 0 && (
          <div className="border-t-2 border-gray-100 pt-6">
            <h4 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Region
            </h4>
            <div className="space-y-2">
              {filters.regions.map((region) => (
                <label key={region} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="region"
                    checked={selected.region === region}
                    onChange={() => onChange({ ...selected, region: selected.region === region ? undefined : region })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{region}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
