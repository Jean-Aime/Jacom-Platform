'use client';

interface SearchResultProps {
  item: any;
  query: string;
}

function highlightText(text: string, query: string) {
  if (!query || !text) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <mark key={i} className="bg-primary/20 text-primary font-semibold px-1 rounded">{part}</mark>
      : part
  );
}

export default function SearchResult({ item, query }: SearchResultProps) {
  const getUrl = () => {
    switch (item.type) {
      case 'industry': return `/industries/${item.slug}`;
      case 'service': return `/services/${item.slug}`;
      case 'insight': return `/insights/${item.slug}`;
      case 'expert': return `/experts/${item.slug}`;
      default: return '#';
    }
  };

  const getTitle = () => item.title || item.name;
  const getDescription = () => item.excerpt || item.description || item.bio || item.role;

  const getIcon = () => {
    switch (item.type) {
      case 'industry':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'service':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'insight':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'expert':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'industry': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'service': return 'bg-green-50 text-green-700 border-green-200';
      case 'insight': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'expert': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <a href={getUrl()} className="group block bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Icon or Image */}
        <div className="flex-shrink-0">
          {item.type === 'expert' && item.image ? (
            <img src={item.image} alt={getTitle()} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 group-hover:border-primary transition-all" />
          ) : (
            <div className={`w-16 h-16 rounded-xl ${getTypeColor()} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {getIcon()}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Type Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${getTypeColor()} border text-xs font-semibold rounded-full uppercase tracking-wide`}>
              {getIcon()}
              {item.type}
            </span>
            {item.type === 'insight' && item.contentType && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {item.contentType}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
            {highlightText(getTitle(), query)}
          </h3>
          
          {/* Description */}
          {getDescription() && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
              {highlightText(getDescription(), query)}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {item.type === 'insight' && item.readTime && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{item.readTime} min read</span>
              </div>
            )}
            {item.type === 'expert' && item.role && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{item.role}</span>
              </div>
            )}
            <div className="flex items-center gap-1 ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-medium">View Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
