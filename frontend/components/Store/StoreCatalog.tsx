"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingCart, Search, Filter, Star, Package, TrendingUp, X, Plus, Minus, Check, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  price: number;
  image: string | null;
  featured: boolean;
  inStock: boolean;
  stock: number | null;
  status: string;
};

const categoryDescriptions: Record<string, string> = {
  "Coffee & Beverages": "Premium beans, espresso packs, and ready-to-brew blends.",
  "Agriculture Tech": "Smart sensors, irrigation kits, and farm monitoring tools.",
  "Industrial Equipment": "Reliable hardware and support tools for operations teams.",
  "Office & Staff Essentials": "Daily-use supplies, branded kits, and productivity tools."
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(value);
}

export default function StoreCatalog() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const { addToCart, items, removeFromCart, updateQuantity: updateCartQuantity, total, itemCount } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost/Jacom-Platform/backend";
        const response = await fetch(`${API_BASE}/products?status=published&take=60`, {
          cache: "no-store",
          credentials: "include"
        });

        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Could not load products right now.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return cats.map((name) => ({
      name,
      count: products.filter((p) => p.category === name).length,
      description: categoryDescriptions[name] || "Quality products and supplies."
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    else filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      setSelectedProduct(null);
      setQuantity(1);
      setShowCart(true);
    }
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 z-30 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="flex items-center justify-center mb-2">
              <Package className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold">{products.length}+</div>
            <div className="text-xs text-red-100">Products Available</div>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <Filter className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold">{categories.length}</div>
            <div className="text-xs text-red-100">Categories</div>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold">{featuredProducts.length}</div>
            <div className="text-xs text-red-100">Featured Items</div>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold">100%</div>
            <div className="text-xs text-red-100">Quality Assured</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-sm sm:text-base text-gray-600">Handpicked selections for your business needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-64 bg-gray-100">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setQuantity(1);
                          }}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-900 p-2.5 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            addToCart(product, 1);
                            setShowCart(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-sm sm:text-base text-gray-600">Explore our curated collections</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 border-2 border-gray-200 hover:border-red-600 rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-3xl font-bold text-red-600 mb-2">{category.count}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-low">Sort: Price Low to High</option>
                <option value="price-high">Sort: Price High to Low</option>
                <option value="name">Sort: Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setQuantity(1);
                          }}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-900 p-2 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            addToCart(product, 1);
                            setShowCart(true);
                          }}
                          className="bg-gray-900 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 text-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need Custom Solutions?</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-6">
            Our team can help you find the perfect products for your business needs or create custom packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact?type=consultation"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition"
            >
              Request Consultation
            </a>
            <a
              href="/contact?type=bulk-order"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-bold transition"
            >
              Bulk Order Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image || "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80"}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">{selectedProduct.category}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-6">{formatPrice(selectedProduct.price)}</div>
                  
                  {selectedProduct.inStock ? (
                    <div className="flex items-center gap-2 text-green-600 mb-6">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">In Stock</span>
                    </div>
                  ) : (
                    <div className="text-red-600 font-semibold mb-6">Out of Stock</div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center border border-gray-300 rounded-lg px-4 py-2 font-semibold"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedProduct.inStock}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart - {formatPrice(selectedProduct.price * quantity)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center" onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart ({itemCount})</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b pb-4">
                        <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 border rounded hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 border rounded hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-600 hover:text-red-700 text-sm font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <a
                    href="/checkout"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg text-center transition"
                  >
                    Proceed to Checkout
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
