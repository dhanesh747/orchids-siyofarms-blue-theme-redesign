"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Milk", href: "/products/milk" },
  { label: "Ghee", href: "/products/ghee" },
  { label: "Paneer & Curd", href: "/products/paneer-curd" },
  { label: "Subscriptions", href: "/products/subscriptions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "border-b border-[#e5e5e5]"
      }`}
    >
      <div className="max-w-[1200px] mx-auto h-[70px] px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Left: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-[#4d4d4d] hover:text-[#003399] px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Center: Logo */}
        <div className="flex-shrink-0 flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#003399] flex items-center justify-center text-white text-sm font-bold">S</div>
            <div className="flex flex-col leading-none">
              <span className="text-[18px] font-bold text-[#003399] tracking-tight leading-none">SIYO FARMS</span>
              <span className="text-[9px] font-medium text-[#4d4d4d] uppercase tracking-[0.15em]">Pure &amp; Fresh Dairy</span>
            </div>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center justify-end gap-1 ml-auto lg:ml-0">
          <button
            className="p-2 text-[#4d4d4d] hover:text-[#003399] transition-colors hidden md:block"
            aria-label="Search"
          >
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <Link href="/account" className="p-2 text-[#4d4d4d] hover:text-[#003399] transition-colors" aria-label="Account">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </Link>

          <Link href="/cart" className="p-2 text-[#4d4d4d] hover:text-[#003399] transition-colors relative" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#003399] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          <button
            className="p-2 text-[#4d4d4d] hover:text-[#003399] transition-colors lg:hidden"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-[#e5e5e5] bg-white">
          <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[15px] font-medium text-[#1a1a1a] hover:text-[#003399] transition-colors py-2.5 border-b border-[#f4f7ff]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
