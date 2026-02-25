import React from "react";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#001a66] to-[#003399] py-16 px-4 text-center">
        <h1 className="text-[36px] md:text-[48px] font-bold text-white mb-4">About Siyo Farms</h1>
        <p className="text-white/80 text-[16px] max-w-[600px] mx-auto">
          Bringing the purest dairy from our farm to your family's table since 2015.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-16">
        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-[28px] font-bold text-[#1a1a1a] mb-4">Our Story</h2>
            <p className="text-[15px] text-[#4d4d4d] leading-relaxed mb-4">
              Siyo Farms was founded with a simple mission: to bring pure, unadulterated dairy products directly from healthy, happy cows to families across India.
            </p>
            <p className="text-[15px] text-[#4d4d4d] leading-relaxed mb-4">
              We believe that real milk comes from cows that are raised with love, fed natural grass and organic feed, and never subjected to hormones or antibiotics. Our Gir cows roam freely on our farm, producing the finest A2 milk.
            </p>
            <p className="text-[15px] text-[#4d4d4d] leading-relaxed">
              Every product we make — from our bilona ghee to our fresh paneer — carries the same commitment to quality, purity, and tradition.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: "🐄", title: "Native Gir Cows", desc: "Ethically raised on natural grass" },
              { emoji: "🌿", title: "No Chemicals", desc: "Zero hormones, antibiotics, or preservatives" },
              { emoji: "🏡", title: "Family Farm", desc: "Run by farmers who care deeply" },
              { emoji: "🚚", title: "Daily Delivery", desc: "Fresh to your door every morning" },
            ].map((item) => (
              <div key={item.title} className="bg-[#f4f7ff] rounded-lg p-5 text-center border border-[#e8eeff]">
                <span className="text-4xl block mb-2">{item.emoji}</span>
                <p className="text-[13px] font-bold text-[#1a1a1a] mb-1">{item.title}</p>
                <p className="text-[11px] text-[#4d4d4d]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-[#001a66] to-[#003399] rounded-xl p-8 md:p-12 text-white mb-16">
          <h2 className="text-[28px] font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "💯", title: "Purity", desc: "We never compromise on quality. Every batch is tested to ensure it meets our high standards." },
              { emoji: "❤️", title: "Care", desc: "We care for our animals, our farmers, our customers, and our environment in equal measure." },
              { emoji: "🌱", title: "Sustainability", desc: "Our farming practices are designed to protect and nurture the land for future generations." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <span className="text-5xl block mb-3">{v.emoji}</span>
                <h3 className="text-[18px] font-bold mb-2">{v.title}</h3>
                <p className="text-white/75 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500+", label: "Happy Families" },
            { number: "50+", label: "Healthy Gir Cows" },
            { number: "8+", label: "Years of Excellence" },
            { number: "100%", label: "Natural Products" },
          ].map((stat) => (
            <div key={stat.label} className="text-center border border-[#e5e5e5] rounded-lg py-8 px-4">
              <p className="text-[36px] font-bold text-[#003399] mb-1">{stat.number}</p>
              <p className="text-[13px] text-[#4d4d4d] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-[#1a1a1a] mb-4">Ready to Experience Pure Dairy?</h2>
          <p className="text-[15px] text-[#4d4d4d] mb-6">
            Join hundreds of families who trust Siyo Farms for their daily dairy needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="bg-[#003399] text-white px-8 py-3 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors"
            >
              Shop Products
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#003399] text-[#003399] px-8 py-3 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#003399] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
