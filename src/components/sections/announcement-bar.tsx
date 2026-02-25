"use client";

import React, { useEffect, useState } from "react";
import { getAdminSettings } from "@/lib/orders";

export default function AnnouncementBar() {
  const [text, setText] = useState("Free delivery on orders above ₹500 | Fresh dairy every morning 🥛");

  useEffect(() => {
    const settings = getAdminSettings();
    if (settings.announcement) setText(settings.announcement);
  }, []);

  return (
    <div
      className="w-full py-2.5 px-4 text-center text-white text-[13px] font-medium tracking-wide"
      style={{ background: "#003399" }}
    >
      <span>{text}</span>
    </div>
  );
}
