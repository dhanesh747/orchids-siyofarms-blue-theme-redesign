"use client";

import React, { useState, useEffect } from "react";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import HeroSlideshow from "@/components/sections/hero-slideshow";
import SpecialityProducts from "@/components/sections/speciality-products";
import NutritionMilkSection from "@/components/sections/nutrition-milk";
import GheePaneerSection from "@/components/sections/ghee-paneer";
import SubscriptionSection from "@/components/sections/subscription";
import Newsletter from "@/components/sections/newsletter";
import Footer from "@/components/sections/footer";
import CitySelector from "@/components/sections/city-selector";

export default function Home() {
  const [showCitySelector, setShowCitySelector] = useState(false);

  useEffect(() => {
    // Show city selector after a short delay on first visit
    const timer = setTimeout(() => {
      const hasSelectedCity = sessionStorage.getItem("siyo_city");
      if (!hasSelectedCity) {
        setShowCitySelector(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCityClose = () => {
    sessionStorage.setItem("siyo_city", "selected");
    setShowCitySelector(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* City Selector Modal */}
      {showCitySelector && <CitySelector onClose={handleCityClose} />}

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Header */}
      <Header />

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Speciality Products */}
      <SpecialityProducts />

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="border-t border-[#e5e5e5]" />
      </div>

      {/* Nutrition Rich Milk */}
      <NutritionMilkSection />

      {/* Ghee & Exquisite Dairy */}
      <GheePaneerSection />

      {/* Subscription Section */}
      <SubscriptionSection />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}
