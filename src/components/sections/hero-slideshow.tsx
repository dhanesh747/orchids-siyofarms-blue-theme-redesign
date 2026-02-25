"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    bg: "from-[#001a66] via-[#003399] to-[#0055cc]",
    tag: "100% Pure & Natural",
    heading: "Farm Fresh\nA2 Cow Milk",
    sub: "Sourced from healthy Gir cows, rich in nutrients and natural goodness. Delivered fresh every morning to your doorstep.",
    cta: "Shop Now",
    ctaLink: "/products/milk",
    badge: "No Preservatives",
    image: "🐄",
    accent: "#ffd700",
  },
  {
    bg: "from-[#002244] via-[#004488] to-[#0066bb]",
    tag: "Handcrafted Daily",
    heading: "Pure Desi\nGhee & Butter",
    sub: "Traditional bilona method ghee made from A2 cow milk. Rich aroma, golden colour, and unmatched taste.",
    cta: "Explore Ghee",
    ctaLink: "/products/ghee",
    badge: "Traditional Bilona Method",
    image: "🫙",
    accent: "#ffaa00",
  },
  {
    bg: "from-[#001133] via-[#002266] to-[#003399]",
    tag: "High Protein",
    heading: "Fresh Paneer\n& Dahi",
    sub: "Soft, fresh paneer and creamy dahi made daily. Perfect for your family's everyday cooking needs.",
    cta: "Order Paneer",
    ctaLink: "/products/paneer",
    badge: "Made Fresh Daily",
    image: "🧀",
    accent: "#88ccff",
  },
  {
    bg: "from-[#003366] via-[#0044aa] to-[#0066dd]",
    tag: "Subscribe & Save",
    heading: "Daily Milk\nSubscription",
    sub: "Never run out of fresh milk. Subscribe daily, weekly or monthly and save up to 20% on every order.",
    cta: "Subscribe Now",
    ctaLink: "/subscription",
    badge: "Save up to 20%",
    image: "🥛",
    accent: "#aaddff",
  },
  {
    bg: "from-[#001155] via-[#0033aa] to-[#0055cc]",
    tag: "Special Range",
    heading: "Buffalo Milk &\nLactose Free",
    sub: "Thick, creamy buffalo milk for richer taste. And our special lactose-free variants for sensitive stomachs.",
    cta: "View All Products",
    ctaLink: "/products",
    badge: "For Every Need",
    image: "🍶",
    accent: "#cceeff",
  },
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(nextSlide, 4000);
    return () => clearInterval(id);
  }, [isPlaying, nextSlide]);

  const slide = slides[currentIndex];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(340px, 45vw, 520px)" }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className={`w-full h-full bg-gradient-to-r ${s.bg} flex items-center`}>
            <div className="max-w-[1200px] mx-auto px-8 md:px-16 w-full flex items-center justify-between">
              {/* Text Content */}
              <div className="flex-1 max-w-[560px]">
                <span
                  className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-4"
                  style={{ background: "rgba(255,255,255,0.15)", color: s.accent }}
                >
                  {s.tag}
                </span>
                <h1
                  className="text-white font-bold leading-[1.1] mb-4 whitespace-pre-line"
                  style={{ fontSize: "clamp(28px, 4vw, 54px)" }}
                >
                  {s.heading}
                </h1>
                <p
                  className="text-white/80 mb-6 leading-relaxed"
                  style={{ fontSize: "clamp(13px, 1.4vw, 16px)", maxWidth: 420 }}
                >
                  {s.sub}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href={s.ctaLink}
                    className="inline-block px-7 py-3 rounded-sm font-bold text-[13px] uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: s.accent, color: "#001133" }}
                  >
                    {s.cta}
                  </Link>
                  <span
                    className="text-[12px] font-semibold px-3 py-1.5 rounded-sm"
                    style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    ✓ {s.badge}
                  </span>
                </div>
              </div>
              {/* Emoji / Icon */}
              <div
                className="hidden md:flex items-center justify-center flex-shrink-0 ml-8"
                style={{
                  fontSize: "clamp(100px, 14vw, 200px)",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                {s.image}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls Overlay */}
      <div className="absolute bottom-5 left-0 w-full flex items-center justify-center gap-3 z-20">
        <button
          onClick={prevSlide}
          className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === currentIndex ? "bg-white w-7" : "bg-white/40 w-2 hover:bg-white/70"
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
