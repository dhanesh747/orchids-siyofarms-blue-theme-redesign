"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col bg-white border border-[#e5e5e5] rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.categorySlug}/${product.slug}`}>
        <div className="w-full aspect-square bg-gradient-to-br from-[#f4f7ff] to-[#e8eeff] flex items-center justify-center relative">
          <span
            className="text-[90px] select-none group-hover:scale-110 transition-transform duration-300"
            style={{ filter: "drop-shadow(0 8px 16px rgba(0,51,153,0.15))" }}
          >
            {product.emoji}
          </span>
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span
                className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  product.badge === "Sale" ? "bg-[#cc0000]" : "bg-[#003399]"
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-[13px] font-bold text-[#4d4d4d] bg-white px-3 py-1 rounded-full border">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.categorySlug}/${product.slug}`}>
          <h3 className="text-[14px] font-semibold text-[#1a1a1a] mb-1 hover:text-[#003399] transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-[#4d4d4d] mb-1">{product.unit}</p>
        <p className="text-[12px] text-[#666] mb-3 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-[12px] text-[#999] line-through">₹{product.originalPrice}</span>
            )}
            <span className="text-[18px] font-bold text-[#003399]">₹{product.price}</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-200 ${
              added
                ? "bg-green-600"
                : product.inStock
                ? "bg-[#003399] hover:bg-[#002b80] active:scale-95"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {added ? <Check size={12} /> : <ShoppingCart size={12} />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
