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
      ? <mark key={i} className="bg-yellow-200 font-medium">{part}</mark>
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

  return (
    <a href={getUrl()} className="block bg-white border rounded-lg p-4 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        {item.type === 'expert' && (
          <div className="flex-shrink-0">
            {item.image ? (
              <img src={item.image} alt={getTitle()} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-red-100 rounded-full"></div>
            )}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded uppercase">
              {item.type}
            </span>
            {item.type === 'insight' && item.type && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                {item.type}
              </span>
            )}
          </div>
          
          <h3 className="font-semibold mb-1 text-gray-900">
            {highlightText(getTitle(), query)}
          </h3>
          
          {getDescription() && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {highlightText(getDescription(), query)}
            </p>
          )}

          {item.type === 'insight' && item.readTime && (
            <div className="mt-2 text-xs text-gray-500">
              {item.readTime} min read
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
