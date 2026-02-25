"use client";

import React from "react";
import { useParams } from "next/navigation";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import ProductCard from "@/components/product-card";
import { getProductsByCategory, categories } from "@/lib/products";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const products = getProductsByCategory(categorySlug);
  const category = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <div className="bg-gradient-to-r from-[#001a66] to-[#003399] py-12 px-4 text-center">
        <div className="text-6xl mb-4">{category?.emoji || "🧴"}</div>
        <h1 className="text-[36px] font-bold text-white mb-2">{category?.name || "Products"}</h1>
        <p className="text-white/80 text-[15px]">{category?.description || ""}</p>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {products.length === 0 ? (
          <p className="text-center text-[#4d4d4d] text-[16px] py-12">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
