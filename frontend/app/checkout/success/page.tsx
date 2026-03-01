import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MegaMenuHeader />
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your order. We'll contact you shortly to confirm the details and arrange delivery.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/store" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700">
            Continue Shopping
          </a>
          <a href="/" className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300">
            Go Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
