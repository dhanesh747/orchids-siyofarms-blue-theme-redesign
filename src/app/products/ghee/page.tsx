"use client";

import React from "react";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import ProductCard from "@/components/product-card";
import { getProductsByCategory } from "@/lib/products";

export default function GheePage() {
  const products = getProductsByCategory("ghee");
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <div className="bg-gradient-to-r from-[#002244] to-[#004488] py-12 px-4 text-center">
        <div className="text-6xl mb-4">🫙</div>
        <h1 className="text-[36px] font-bold text-white mb-2">Ghee & Butter</h1>
        <p className="text-white/80 text-[15px]">Traditional Bilona Ghee, Buffalo Ghee & Pure Butter</p>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}
