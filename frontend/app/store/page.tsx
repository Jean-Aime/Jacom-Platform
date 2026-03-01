import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import StoreCatalog from "@/components/Store/StoreCatalog";
import { ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default function StorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MegaMenuHeader />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2070&q=80"
            alt="Store hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="w-8 h-8 text-red-400" />
                <p className="text-sm uppercase tracking-[0.2em] text-red-200">JAS.COM Marketplace</p>
              </div>
              <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Premium Products for Your Business
              </h1>
              <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-200">
                Explore curated products across coffee, agriculture tech, equipment, and business essentials.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="rounded bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Shop Products
                </a>
                <a
                  href="/contact?type=bulk-order"
                  className="rounded border border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900"
                >
                  Request Bulk Order
                </a>
              </div>
            </div>
          </div>
        </section>

        <StoreCatalog />
      </main>

      <Footer />
    </div>
  );
}
