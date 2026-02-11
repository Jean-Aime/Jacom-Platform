"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
        required
      />
      <button
        type="submit"
        disabled={loading || success}
        className="px-6 py-2 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {success ? "✓" : loading ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
