"use client";

import React, { useState } from "react";
import { products as initialProducts, Product } from "@/lib/products";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  const emptyProduct: Omit<Product, "id"> = {
    slug: "", name: "", category: "Milk", categorySlug: "milk",
    price: 0, unit: "500ml", description: "", longDescription: "",
    inStock: true, featured: false, emoji: "🥛", tags: [], benefits: [],
  };

  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setProductList((prev) => prev.map((p) => p.id === editing.id ? { ...editing, ...form, slug: form.name.toLowerCase().replace(/\s+/g, "-") } : p));
    } else {
      const newProd: Product = {
        ...form,
        id: "custom-" + Date.now(),
        slug: form.name.toLowerCase().replace(/\s+/g, "-"),
      };
      setProductList((prev) => [...prev, newProd]);
    }
    setEditing(null);
    setAdding(false);
    setForm(emptyProduct);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setAdding(false);
    setForm({ ...p });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddNew = () => {
    setAdding(true);
    setEditing(null);
    setForm(emptyProduct);
  };

  const handleCancel = () => {
    setAdding(false);
    setEditing(null);
    setForm(emptyProduct);
  };

  const CATEGORIES = [
    { name: "Milk", slug: "milk" },
    { name: "Ghee", slug: "ghee" },
    { name: "Paneer & Curd", slug: "paneer-curd" },
    { name: "Subscriptions", slug: "subscriptions" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">Products</h1>
          <p className="text-[13px] text-[#4d4d4d]">{productList.length} products</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#003399] text-white px-5 py-2.5 rounded-sm text-[13px] font-bold uppercase tracking-wider hover:bg-[#002b80] transition-colors"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Product Table */}
        <div className="xl:col-span-2 bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e5e5]">
                  {["", "Product", "Category", "Price", "Stock", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-[#4d4d4d] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productList.map((p) => (
                  <tr key={p.id} className={`border-b border-[#f4f4f4] hover:bg-[#fafafa] transition-colors ${editing?.id === p.id ? "bg-[#f4f7ff]" : ""}`}>
                    <td className="px-4 py-3 text-2xl">{p.emoji}</td>
                    <td className="px-4 py-3">
                      <p className="text-[13px] font-semibold text-[#1a1a1a]">{p.name}</p>
                      <p className="text-[11px] text-[#4d4d4d]">{p.unit}</p>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[#4d4d4d]">{p.category}</td>
                    <td className="px-4 py-3">
                      <span className="text-[14px] font-bold text-[#003399]">₹{p.price}</span>
                      {p.originalPrice && <span className="text-[11px] text-[#999] line-through ml-1">₹{p.originalPrice}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {p.inStock ? "In Stock" : "Out"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(p)} className="p-1.5 text-[#003399] hover:bg-[#f4f7ff] rounded transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-[#cc0000] hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(adding || editing) && (
          <div className="xl:col-span-1 bg-white border border-[#e5e5e5] rounded-lg p-5 sticky top-20 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-bold text-[#1a1a1a]">{editing ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={handleCancel} className="text-[#4d4d4d] hover:text-[#cc0000]">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Emoji Icon</label>
                <input type="text" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                  className="w-20 px-3 py-2 border border-[#e5e5e5] rounded-sm text-[20px] outline-none focus:border-[#003399]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Product Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm text-[13px] outline-none focus:border-[#003399]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Category</label>
                <select value={form.categorySlug} onChange={(e) => {
                  const cat = CATEGORIES.find(c => c.slug === e.target.value);
                  setForm({ ...form, categorySlug: e.target.value, category: cat?.name || "" });
                }} className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm text-[13px] outline-none focus:border-[#003399]">
                  {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Price (₹) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm text-[13px] outline-none focus:border-[#003399]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Original Price</label>
                  <input type="number" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm text-[13px] outline-none focus:border-[#003399]" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Unit</label>
                <input type="text" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  placeholder="500ml, 200g, 1L..."
                  className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm text-[13px] outline-none focus:border-[#003399]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Badge</label>
                <input type="text" value={form.badge || ""} onChange={(e) => setForm({ ...form, badge: e.target.value || undefined })}
                  placeholder="Sale, New, Popular..."
                  className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm text-[13px] outline-none focus:border-[#003399]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">Short Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2} className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm text-[13px] outline-none focus:border-[#003399] resize-none" />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                  <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="w-4 h-4 accent-[#003399]" />
                  In Stock
                </label>
                <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-[#003399]" />
                  Featured
                </label>
              </div>
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 bg-[#003399] text-white py-3 rounded-sm text-[13px] font-bold uppercase tracking-wider hover:bg-[#002b80] transition-colors"
              >
                <Check size={16} /> {editing ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        )}

        {!adding && !editing && (
          <div className="xl:col-span-1 bg-white border border-[#e5e5e5] rounded-lg p-8 text-center text-[#4d4d4d]">
            <Package size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-[14px] mb-3">Click "Add Product" to add a new product or click edit on a product to modify it.</p>
            <button onClick={handleAddNew} className="text-[#003399] text-[13px] font-semibold hover:underline">
              + Add New Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Need this import
function Package({ size, className }: { size: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7" />
    </svg>
  );
}
