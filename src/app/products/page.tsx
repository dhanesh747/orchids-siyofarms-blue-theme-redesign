"use client";

import React, { useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import ProductCard from "@/components/product-card";
import { products, categories } from "@/lib/products";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.categorySlug === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#001a66] to-[#003399] py-12 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[32px] md:text-[42px] font-bold text-white mb-3">Our Products</h1>
          <p className="text-white/80 text-[15px] mb-6">Fresh from our farm to your doorstep every morning</p>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-[400px] px-5 py-3 rounded-full text-[14px] border-0 outline-none bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/20 focus:bg-white/20"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-[#e5e5e5] sticky top-[70px] z-40">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex gap-1 py-3 whitespace-nowrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                activeCategory === "all"
                  ? "bg-[#003399] text-white"
                  : "text-[#4d4d4d] hover:bg-[#f4f7ff] hover:text-[#003399]"
              }`}
            >
              All Products
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-colors flex items-center gap-2 ${
                  activeCategory === c.slug
                    ? "bg-[#003399] text-white"
                    : "text-[#4d4d4d] hover:bg-[#f4f7ff] hover:text-[#003399]"
                }`}
              >
                <span>{c.emoji}</span> {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[18px] text-[#4d4d4d]">No products found.</p>
          </div>
        ) : (
          <>
            <p className="text-[13px] text-[#4d4d4d] mb-6">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
