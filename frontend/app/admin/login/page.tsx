"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiClient.login(email, password);
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-red-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            J
          </div>
          <div>
            <div className="font-bold text-2xl">JACOM Admin</div>
            <div className="text-sm text-gray-500">Management Portal</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
              placeholder="admin@jacom.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm">
          <p className="font-semibold mb-1">Default Credentials:</p>
          <p className="text-gray-700">Email: admin@jacom.com</p>
          <p className="text-gray-700">Password: admin123</p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="/" className="text-primary hover:underline">← Back to website</a>
        </div>
      </div>
    </div>
  );
}
