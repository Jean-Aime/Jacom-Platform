"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const isAdminPanel = window.location.pathname.startsWith('/admin');
    
    if (!consent && !isAdminPanel) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Simple Cookie Banner */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
          showBanner ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white border-t-2 border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Message */}
              <div className="flex items-center gap-4 flex-1">
                <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-primary to-red-700 rounded-xl items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-gray-900 font-medium text-sm sm:text-base">
                    We use cookies to improve your experience. 
                    <a href="/cookies" className="text-primary hover:underline ml-1">Learn more</a>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={rejectCookies}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm transition-all hover:shadow-md"
                >
                  Reject
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2.5 bg-primary hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all hover:shadow-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
