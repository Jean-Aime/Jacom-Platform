"use client";

import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/api-client";

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
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type ProductForm = {
  name: string;
  slug: string;
  category: string;
  price: string;
  description: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  stock: string;
  status: string;
  sortOrder: string;
};

const EMPTY_FORM: ProductForm = {
  name: "",
  slug: "",
  category: "Coffee & Beverages",
  price: "",
  description: "",
  image: "",
  featured: false,
  inStock: true,
  stock: "",
  status: "published",
  sortOrder: "0"
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductForm>(EMPTY_FORM);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiClient.getProducts({
        take: 100,
        status: statusFilter === "all" ? undefined : statusFilter
      });
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [statusFilter]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      );
    });
  }, [products, query]);

  const openCreateModal = () => {
    setEditId(null);
    setFormData(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (product: ProductRecord) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: String(product.price),
      description: product.description || "",
      image: product.image || "",
      featured: product.featured,
      inStock: product.inStock,
      stock: product.stock === null ? "" : String(product.stock),
      status: product.status || "published",
      sortOrder: String(product.sortOrder ?? 0)
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData(EMPTY_FORM);
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => {
      const previousAutoSlug = slugify(prev.name);
      const shouldSyncSlug = !editId || !prev.slug || prev.slug === previousAutoSlug;
      return {
        ...prev,
        name,
        slug: shouldSyncSlug ? slugify(name) : prev.slug
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const price = Number(formData.price);
    if (!formData.name.trim() || !formData.category.trim() || !Number.isFinite(price)) {
      setError("Name, category, and a valid price are required.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      category: formData.category.trim(),
      price,
      description: formData.description.trim() || null,
      image: formData.image.trim() || null,
      featured: formData.featured,
      inStock: formData.inStock,
      stock: formData.stock.trim() === "" ? null : Number(formData.stock),
      status: formData.status,
      sortOrder: Number(formData.sortOrder || "0")
    };

    setSaving(true);
    try {
      if (editId) {
        await apiClient.updateProduct(editId, payload);
      } else {
        await apiClient.createProduct(payload);
      }

      await fetchProducts();
      closeModal();
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setError("");

    try {
      await apiClient.deleteProduct(id);

      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Store Products</h2>
          <p className="text-gray-500">Manage ecommerce products shown on the Store page.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, slug, or category..."
          className="md:col-span-2 w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
          className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[920px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">/{product.slug}</p>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          product.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.featured ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      {product.inStock ? product.stock ?? "In stock" : "Out of stock"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editId ? "Edit Product" : "Add Product"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Name *</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Slug *</label>
                  <input
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    Category *
                  </label>
                  <input
                    required
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Price *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Image URL</label>
                <input
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900"
                    placeholder="leave empty for unlimited"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-8">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                      }
                    />
                    Featured product
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                      }
                    />
                    In stock
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Product"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border py-3 rounded-lg font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
