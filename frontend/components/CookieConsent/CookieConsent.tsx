"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const isAdminPanel = window.location.pathname.startsWith('/admin');
    
    if (!consent && !isAdminPanel) {
      // Small delay to ensure smooth animation
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const openSettings = () => {
    // For now, just accept - can be expanded later
    acceptCookies();
  };

  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      showBanner ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-6 p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About cookies on this site</h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">
            We use cookies to collect and analyse information on site performance and usage, to 
            provide social media features and to enhance and customise content and 
            advertisements.
          </p>
          <a href="/privacy" className="text-primary hover:text-primary/80 transition-colors text-sm">
            View full privacy policy
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
          >
            Allow all cookies
          </button>
          <button
            onClick={openSettings}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors text-sm"
          >
            Cookie settings
          </button>
        </div>
      </div>
    </div>
  );
}