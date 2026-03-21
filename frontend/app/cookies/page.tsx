"use client";
import { useState, useEffect } from "react";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CATEGORIES = {
  necessary: {
    title: 'Necessary Cookies',
    description: 'Essential cookies required for the website to function properly. These cannot be disabled.',
    required: true,
    cookies: [
      { name: 'session-token', purpose: 'Maintains your login session', duration: '30 days' },
      { name: 'cookie-consent', purpose: 'Stores your cookie preferences', duration: '1 year' }
    ]
  },
  analytics: {
    title: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    required: false,
    cookies: [
      { name: '_ga', purpose: 'Google Analytics - Distinguishes users', duration: '2 years' },
      { name: '_gid', purpose: 'Google Analytics - Distinguishes users', duration: '24 hours' },
      { name: '_gat', purpose: 'Google Analytics - Throttles request rate', duration: '1 minute' }
    ]
  },
  marketing: {
    title: 'Marketing Cookies',
    description: 'Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.',
    required: false,
    cookies: [
      { name: '_fbp', purpose: 'Facebook Pixel - Tracks conversions', duration: '3 months' },
      { name: 'fr', purpose: 'Facebook - Delivers advertisements', duration: '3 months' }
    ]
  },
  functional: {
    title: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization, such as videos and live chat.',
    required: false,
    cookies: [
      { name: 'theme', purpose: 'Remembers your theme preference', duration: '1 year' },
      { name: 'language', purpose: 'Remembers your language preference', duration: '1 year' }
    ]
  }
};

export default function CookiePolicyPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        // Invalid format
      }
    }
  }, []);

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        functionality_storage: preferences.functional ? 'granted' : 'denied'
      });
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <MegaMenuHeader />
      
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold">Cookie Policy & Preferences</h1>
            </div>
            <p className="text-xl text-gray-300">
              Manage your cookie preferences and learn about how we use cookies on our website.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Save Success Message */}
          {saved && (
            <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3 animate-fade-in">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Your cookie preferences have been saved successfully!</span>
            </div>
          )}

          {/* What Are Cookies */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and improving our services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We use different types of cookies for different purposes. You can control which cookies you accept using the preferences below.
            </p>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-6 mb-8">
            {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => (
              <div key={key} className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                      {category.required && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">Always Active</span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences[key as keyof CookiePreferences]}
                      onChange={() => togglePreference(key as keyof CookiePreferences)}
                      disabled={category.required}
                      className="sr-only peer"
                    />
                    <div className={`w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all ${
                      category.required ? 'peer-checked:bg-gray-400 cursor-not-allowed' : 'peer-checked:bg-primary'
                    }`}></div>
                  </label>
                </div>

                {/* Cookie Details Table */}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-bold text-gray-900">Cookie Name</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900">Purpose</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.cookies.map((cookie, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-xs text-primary">{cookie.name}</td>
                          <td className="py-3 px-4 text-gray-600">{cookie.purpose}</td>
                          <td className="py-3 px-4 text-gray-600">{cookie.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Manage Your Preferences</h3>
            <p className="text-gray-600 mb-6">
              Choose which cookies you want to accept. Your preferences will be saved and applied across the website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={savePreferences}
                className="flex-1 bg-primary hover:bg-red-700 text-white px-6 py-4 rounded-xl font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save My Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all hover:shadow-lg"
              >
                Accept All Cookies
              </button>
              <button
                onClick={rejectAll}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-xl font-bold transition-all hover:shadow-lg"
              >
                Reject All (Except Necessary)
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Need More Information?</h3>
                <p className="text-blue-800 mb-3">
                  For more details about how we collect, use, and protect your data, please review our full privacy policy.
                </p>
                <a href="/privacy" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Read Privacy Policy
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
