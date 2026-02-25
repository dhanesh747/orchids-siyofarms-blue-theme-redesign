"use client";

import React from "react";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export default function SpecialityProducts() {
  const products = getFeaturedProducts();
  const { addToCart } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (product: ReturnType<typeof getFeaturedProducts>[0]) => {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section className="py-[60px] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#e5e5e5]">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1a1a1a] tracking-tight">
            Our Best Products
          </h2>
          <Link
            href="/products"
            className="hidden md:block text-[13px] font-semibold text-[#003399] uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Image / Emoji Card */}
              <Link href={`/products/${product.categorySlug}/${product.slug}`}>
                <div className="relative w-full aspect-square bg-gradient-to-br from-[#f4f7ff] to-[#e8eeff] mb-4 overflow-hidden rounded-md flex items-center justify-center hover:scale-[1.02] transition-transform duration-300">
                  <span className="text-[80px] md:text-[100px] select-none" style={{ filter: "drop-shadow(0 8px 16px rgba(0,51,153,0.15))" }}>
                    {product.emoji}
                  </span>
                  {product.badge && (
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          product.badge === "Sale" ? "bg-[#cc0000]" : "bg-[#003399]"
                        }`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex flex-col flex-1 text-center">
                <Link href={`/products/${product.categorySlug}/${product.slug}`}>
                  <h3 className="text-[14px] font-semibold text-[#1a1a1a] mb-1 leading-snug hover:text-[#003399] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-[11px] text-[#4d4d4d] mb-2">{product.unit}</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {product.originalPrice && (
                    <span className="text-[12px] text-[#999] line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="text-[16px] font-bold text-[#003399]">₹{product.price}</span>
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  className={`mt-auto w-full py-2.5 px-4 text-white text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    added === product.id
                      ? "bg-green-600"
                      : "bg-[#003399] hover:bg-[#002b80] active:scale-[0.98]"
                  }`}
                >
                  {added === product.id ? (
                    <><Check size={13} /> Added!</>
                  ) : (
                    <><ShoppingCart size={13} /> Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
