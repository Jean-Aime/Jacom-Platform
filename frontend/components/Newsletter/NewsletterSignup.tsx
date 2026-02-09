"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    // In production, integrate with email service (Mailchimp, ConvertKit, SendGrid)
    const subscriptionData = {
      email,
      timestamp: new Date(),
      source: 'newsletter_signup'
    };
    
    console.log("Newsletter signup:", subscriptionData);
    setSubscribed(true);
    setEmail("");
    
    // In production: Send to email marketing platform
    // Example: await fetch('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify(subscriptionData) });
  };

  if (subscribed) {
    return (
      <div className="bg-primary/5 p-6 rounded-lg text-center">
        <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
        <h3 className="font-semibold mb-2">Thank you for subscribing!</h3>
        <p className="text-sm text-gray-600">You'll receive our latest insights and updates.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary to-red-600 text-white p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Stay Informed</h3>
      <p className="mb-4 opacity-90">Get the latest insights and industry trends delivered to your inbox.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 rounded text-gray-900 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white text-primary px-6 py-2 rounded font-semibold hover:shadow-lg transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}