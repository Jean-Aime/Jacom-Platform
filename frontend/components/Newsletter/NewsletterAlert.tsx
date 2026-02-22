"use client";
import { useState, useEffect } from "react";

export default function NewsletterAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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

    setLoading(true);
    setMessage("");
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage('Successfully subscribed! Check your email.');
        localStorage.setItem('newsletter-subscribed', 'true');
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setIsSuccess(false);
        setMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => setShowAlert(false), 300);
  };

  if (!showAlert) return null;

  return (
    <div className={`fixed right-6 bottom-6 z-40 transition-all duration-500 ${
      isMinimized ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    }`}>
      <div className="bg-white rounded-xl shadow-2xl w-96 overflow-hidden border-2 border-gray-100">
        <button
          onClick={handleMinimize}
          className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
        
        <div className="bg-gradient-to-r from-primary to-red-700 px-6 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-red-100 text-sm">
            Get exclusive insights and updates delivered to your inbox
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubscribe} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-primary focus:outline-none disabled:opacity-50 disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
          
          {message && (
            <div className={`mt-4 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              isSuccess 
                ? 'bg-green-50 border-2 border-green-200 text-green-700' 
                : 'bg-red-50 border-2 border-red-200 text-red-700'
            }`}>
              {isSuccess ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              )}
              <span>{message}</span>
            </div>
          )}
          
          <p className="text-xs text-gray-500 text-center mt-4">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
