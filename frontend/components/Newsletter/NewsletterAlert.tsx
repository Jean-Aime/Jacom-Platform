"use client";
import { useState, useEffect } from "react";

export default function NewsletterAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    const newsletterSubscribed = localStorage.getItem('newsletter-subscribed');
    const isAdminPanel = window.location.pathname.startsWith('/admin');
    
    if (cookieConsent && !newsletterSubscribed && !isAdminPanel) {
      setTimeout(() => setShowAlert(true), 2000);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        localStorage.setItem('newsletter-subscribed', 'true');
        setShowAlert(false);
      }
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => setShowAlert(false), 300);
  };

  if (!showAlert) return null;

  return (
    <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ${
      isMinimized ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-80 overflow-hidden border">
        <button
          onClick={handleMinimize}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
        
        <div className="flex">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </div>
          
          <div className="flex-1 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get exclusive insights and updates delivered to your inbox
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}