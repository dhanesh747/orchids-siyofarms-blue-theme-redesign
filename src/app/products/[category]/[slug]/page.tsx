"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, ChevronRight, Star, Shield, Truck, Leaf } from "lucide-react";
import ProductCard from "@/components/product-card";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#f4f7ff] border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-[12px] text-[#4d4d4d]">
          <Link href="/" className="hover:text-[#003399]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-[#003399]">Products</Link>
          <ChevronRight size={12} />
          <Link href={`/products/${product.categorySlug}`} className="hover:text-[#003399] capitalize">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1a1a1a] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-gradient-to-br from-[#f4f7ff] to-[#e8eeff] rounded-lg flex items-center justify-center relative">
              <span
                className="text-[150px] md:text-[180px] select-none"
                style={{ filter: "drop-shadow(0 16px 32px rgba(0,51,153,0.2))" }}
              >
                {product.emoji}
              </span>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      product.badge === "Sale" ? "bg-[#cc0000]" : "bg-[#003399]"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Shield size={16} />, text: "100% Pure & Natural" },
                { icon: <Truck size={16} />, text: "Free Morning Delivery" },
                { icon: <Leaf size={16} />, text: "No Preservatives" },
                { icon: <Star size={16} />, text: "Farm Fresh Daily" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 bg-[#f4f7ff] rounded-md px-3 py-2">
                  <span className="text-[#003399]">{b.icon}</span>
                  <span className="text-[12px] text-[#4d4d4d] font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <p className="text-[12px] font-semibold text-[#003399] uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-[28px] md:text-[34px] font-bold text-[#1a1a1a] mb-2 leading-tight">{product.name}</h1>
            <p className="text-[14px] text-[#4d4d4d] mb-4">{product.unit}</p>

            <div className="flex items-center gap-3 mb-5">
              {product.originalPrice && (
                <span className="text-[18px] text-[#999] line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-[32px] font-bold text-[#003399]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="bg-[#cc0000] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>

            <p className="text-[15px] text-[#4d4d4d] leading-relaxed mb-6">{product.longDescription}</p>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-[14px] font-semibold text-[#1a1a1a] mb-3 uppercase tracking-wider">Key Benefits</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-[13px] text-[#4d4d4d]">
                    <div className="w-5 h-5 rounded-full bg-[#003399] flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </div>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-[#e5e5e5] rounded-sm">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-11 flex items-center justify-center text-[#4d4d4d] hover:text-[#003399] text-[20px] font-light"
                >
                  −
                </button>
                <span className="w-12 text-center text-[15px] font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-11 flex items-center justify-center text-[#4d4d4d] hover:text-[#003399] text-[20px] font-light"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-sm text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-200 ${
                  added ? "bg-green-600" : "bg-[#003399] hover:bg-[#002b80] active:scale-[0.98]"
                }`}
              >
                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>

            <Link
              href="/cart"
              className="block w-full text-center py-3 px-6 rounded-sm border-2 border-[#003399] text-[#003399] text-[13px] font-bold uppercase tracking-widest hover:bg-[#003399] hover:text-white transition-colors duration-200"
            >
              View Cart & Checkout
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[11px] text-[#4d4d4d] bg-[#f4f7ff] px-3 py-1 rounded-full border border-[#e5e5e5]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-[24px] font-semibold text-[#1a1a1a] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
