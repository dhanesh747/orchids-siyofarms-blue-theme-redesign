"use client";

import React, { useState } from "react";
import { X, MapPin } from "lucide-react";

const CITIES = [
  { name: "Mumbai", icon: "🏙️" },
  { name: "Pune", icon: "🏛️" },
  { name: "Hyderabad", icon: "🕌" },
  { name: "Jaipur", icon: "🏰" },
  { name: "Delhi NCR", icon: "🗼" },
];

interface CitySelectorProps {
  onClose: () => void;
}

export default function CitySelector({ onClose }: CitySelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (city: string) => {
    setSelected(city);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-md shadow-2xl w-[90vw] max-w-[480px] p-8 animate-fade-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4d4d4d] hover:text-[#1a1a1a] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#f4f7ff] flex items-center justify-center mb-4">
            <MapPin size={24} className="text-[#003399]" />
          </div>
          <h2 className="text-[22px] font-semibold text-[#1a1a1a] mb-2">
            Select Your City
          </h2>
          <p className="text-[14px] text-[#4d4d4d]">
            We currently deliver to these cities between 6:00 AM – 8:00 AM
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => handleSelect(city.name)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-sm border transition-all duration-200 ${
                selected === city.name
                  ? "border-[#003399] bg-[#003399] text-white"
                  : "border-[#e5e5e5] hover:border-[#003399] hover:bg-[#f4f7ff] text-[#1a1a1a]"
              }`}
            >
              <span className="text-2xl">{city.icon}</span>
              <span className="text-[13px] font-medium leading-tight text-center">
                {city.name}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-[12px] text-[#4d4d4d]">
          Don&apos;t see your city?{" "}
          <a href="#" className="text-[#003399] underline underline-offset-2 hover:opacity-80">
            Join our waitlist
          </a>
        </p>
      </div>
    </div>
  );
}
