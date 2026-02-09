"use client";

interface OfficeMapProps {
  address: string;
  coordinates: { lat: number; lng: number };
  officeName: string;
}

export default function OfficeMap({ address, coordinates, officeName }: OfficeMapProps) {
  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(address)}`;
  
  // Alternative: Use coordinates
  const mapUrlWithCoords = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed`;
  
  // Fallback: Direct Google Maps link
  const directMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
        {/* In production: Replace with actual Google Maps API key */}
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <p className="font-medium">{officeName}</p>
          <p>{address}</p>
        </div>
        <a
          href={directMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
        >
          Open in Google Maps
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <a
          href={directMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-primary mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span className="text-xs font-medium">Directions</span>
        </a>
        
        <a
          href={`tel:${coordinates.lat},${coordinates.lng}`}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-primary mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          <span className="text-xs font-medium">Call</span>
        </a>
        
        <button
          onClick={() => {
            navigator.clipboard.writeText(address);
            alert('Address copied to clipboard!');
          }}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-primary mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
          </svg>
          <span className="text-xs font-medium">Copy</span>
        </button>
      </div>
    </div>
  );
}