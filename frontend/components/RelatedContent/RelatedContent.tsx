interface RelatedItem {
  id: string;
  name?: string;
  title?: string;
  slug: string;
  description?: string;
  excerpt?: string;
  role?: string;
  type?: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
  type: 'services' | 'industries' | 'experts' | 'insights';
  title: string;
  maxItems?: number;
}

export default function RelatedContent({ items, type, title, maxItems = 6 }: RelatedContentProps) {
  if (!items || items.length === 0) return null;

  const displayItems = maxItems ? items.slice(0, maxItems) : items;
  const baseUrl = `/${type}`;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {displayItems.map((item) => (
          <a
            key={item.id}
            href={`${baseUrl}/${item.slug}`}
            className="block p-3 bg-white rounded hover:shadow-md transition-all"
          >
            {type === 'experts' ? (
              <>
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-gray-600">{item.role}</div>
              </>
            ) : type === 'insights' ? (
              <>
                {item.type && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase mb-2 inline-block">
                    {item.type}
                  </span>
                )}
                <div className="font-medium text-sm">{item.title}</div>
                {item.excerpt && <div className="text-xs text-gray-600 mt-1">{item.excerpt}</div>}
              </>
            ) : (
              <>
                <div className="font-medium text-sm">{item.name || item.title}</div>
                {(item.description || item.excerpt) && (
                  <div className="text-xs text-gray-600 mt-1">{item.description || item.excerpt}</div>
                )}
              </>
            )}
          </a>
        ))}
      </div>
      {items.length > maxItems && (
        <a href={baseUrl} className="text-primary text-sm hover:underline mt-3 inline-block">
          View all {items.length} {type} →
        </a>
      )}
    </div>
  );
}
