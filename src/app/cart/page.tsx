"use client";

import React from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { useCart } from "@/lib/cart-context";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const deliveryFee = totalPrice > 500 ? 0 : 30;
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <AnnouncementBar />
        <Header />
        <div className="max-w-[600px] mx-auto px-4 py-24 text-center">
          <ShoppingBag size={64} className="text-[#e5e5e5] mx-auto mb-6" />
          <h2 className="text-[24px] font-semibold text-[#1a1a1a] mb-3">Your cart is empty</h2>
          <p className="text-[#4d4d4d] mb-8">Add some fresh dairy products to get started!</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#003399] text-white px-8 py-3 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors"
          >
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <AnnouncementBar />
      <Header />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">
        <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-8">
          Shopping Cart <span className="text-[#4d4d4d] font-normal text-[18px]">({totalItems} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white border border-[#e5e5e5] rounded-md p-4 flex items-center gap-4">
                {/* Emoji */}
                <div className="w-20 h-20 bg-[#f4f7ff] rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">{product.emoji}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${product.categorySlug}/${product.slug}`} className="text-[15px] font-semibold text-[#1a1a1a] hover:text-[#003399] transition-colors line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-[12px] text-[#4d4d4d] mb-2">{product.unit}</p>
                  <span className="text-[16px] font-bold text-[#003399]">₹{product.price}</span>
                </div>

                {/* Qty */}
                <div className="flex items-center border border-[#e5e5e5] rounded-sm">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#4d4d4d] hover:text-[#003399] text-lg"
                  >−</button>
                  <span className="w-10 text-center text-[14px] font-semibold">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#4d4d4d] hover:text-[#003399] text-lg"
                  >+</button>
                </div>

                {/* Subtotal */}
                <div className="text-right hidden sm:block w-24">
                  <p className="text-[16px] font-bold text-[#1a1a1a]">₹{product.price * quantity}</p>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-[#999] hover:text-[#cc0000] transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#e5e5e5] rounded-md p-6 sticky top-[90px]">
              <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-5 pb-4 border-b border-[#e5e5e5]">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-[14px] text-[#4d4d4d]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-[#1a1a1a]">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-[14px] text-[#4d4d4d]">
                  <span>Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? "text-green-600" : "text-[#1a1a1a]"}`}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[11px] text-[#4d4d4d] bg-[#fff8e6] px-3 py-2 rounded-sm border border-[#ffe58a]">
                    Add ₹{500 - totalPrice} more for free delivery
                  </p>
                )}
              </div>

              <div className="flex justify-between text-[16px] font-bold text-[#1a1a1a] py-4 border-t border-[#e5e5e5] mb-5">
                <span>Total</span>
                <span className="text-[#003399]">₹{grandTotal}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center bg-[#003399] text-white py-4 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors mb-3"
              >
                Proceed to Checkout →
              </Link>
              <Link
                href="/products"
                className="block w-full text-center text-[#003399] py-3 text-[13px] font-medium hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
