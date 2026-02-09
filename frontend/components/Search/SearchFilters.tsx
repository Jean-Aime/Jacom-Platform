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
    <div className="bg-white border rounded-lg p-6 sticky top-32">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button onClick={onClear} className="text-sm text-primary hover:underline">
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Content Type Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Content Type</h4>
          <div className="space-y-2">
            {Object.entries(filters.types).map(([type, count]) => (
              count > 0 && (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={selected.type === type}
                    onChange={() => onChange({ ...selected, type: selected.type === type ? undefined : type })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm capitalize flex-1">{type}</span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              )
            ))}
          </div>
        </div>

        {/* Industry Filter */}
        {filters.industries.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Industry</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filters.industries.map((industry) => (
                <label key={industry.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="industry"
                    checked={selected.industry === industry.id}
                    onChange={() => onChange({ ...selected, industry: selected.industry === industry.id ? undefined : industry.id })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm">{industry.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Service Filter */}
        {filters.services.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Service</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filters.services.map((service) => (
                <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="service"
                    checked={selected.service === service.id}
                    onChange={() => onChange({ ...selected, service: selected.service === service.id ? undefined : service.id })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm">{service.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Insight Content Type Filter */}
        {Object.keys(filters.contentTypes).length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Insight Type</h4>
            <div className="space-y-2">
              {Object.entries(filters.contentTypes).map(([type, count]) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contentType"
                    checked={selected.contentType === type}
                    onChange={() => onChange({ ...selected, contentType: selected.contentType === type ? undefined : type })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm capitalize flex-1">{type}</span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Region Filter */}
        {filters.regions.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Region</h4>
            <div className="space-y-2">
              {filters.regions.map((region) => (
                <label key={region} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="region"
                    checked={selected.region === region}
                    onChange={() => onChange({ ...selected, region: selected.region === region ? undefined : region })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm">{region}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
