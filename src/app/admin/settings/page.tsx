"use client";

import React, { useState, useEffect } from "react";
import { getAdminSettings, saveAdminSettings, AdminSettings } from "@/lib/orders";
import { Save, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    upiId: "siyofarms@upi",
    upiQrUrl: "",
    payeeName: "Siyo Farms",
    businessName: "Siyo Farms",
    phone: "+91 98765 43210",
    email: "hello@siyofarms.com",
    deliveryTime: "6:00 AM – 8:00 AM",
    orderCutoff: "10:00 PM",
    announcement: "Free delivery on orders above ₹500 | Fresh dairy every morning 🥛",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getAdminSettings());
  }, []);

  const handleSave = () => {
    saveAdminSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ label, field, type = "text", placeholder = "" }: {
    label: string; field: keyof AdminSettings; type?: string; placeholder?: string;
  }) => (
    <div>
      <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">{label}</label>
      <input
        type={type}
        value={settings[field]}
        onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-[#e5e5e5] rounded-sm text-[14px] outline-none focus:border-[#003399] transition-colors"
      />
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[#1a1a1a]">Settings</h1>
        <p className="text-[13px] text-[#4d4d4d]">Manage your business settings and UPI payment details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* UPI Payment Settings */}
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-6">
          <h2 className="text-[17px] font-bold text-[#1a1a1a] mb-5 pb-4 border-b border-[#e5e5e5] flex items-center gap-2">
            💳 UPI Payment Settings
          </h2>
          <div className="space-y-4">
            <Field label="UPI ID (customers will see this)" field="upiId" placeholder="yourname@upi" />
            <Field label="Payee Name (shown in UPI app)" field="payeeName" placeholder="Your Name or Business Name" />
            <div>
              <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">UPI QR Code Image URL</label>
              <input
                type="url"
                value={settings.upiQrUrl}
                onChange={(e) => setSettings({ ...settings, upiQrUrl: e.target.value })}
                placeholder="https://your-qr-image-url.com/qr.png"
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-sm text-[14px] outline-none focus:border-[#003399] transition-colors"
              />
              <p className="text-[11px] text-[#4d4d4d] mt-1.5">
                Upload your UPI QR code image to an image host (e.g. Imgur, Cloudinary) and paste the URL here. This QR will be shown to customers during checkout.
              </p>
              {settings.upiQrUrl && (
                <div className="mt-3 flex items-center gap-3 p-3 bg-[#f4f7ff] rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={settings.upiQrUrl} alt="QR Preview" className="w-20 h-20 object-contain border rounded" />
                  <p className="text-[12px] text-green-700 font-semibold">✅ QR Code preview loaded</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-6">
          <h2 className="text-[17px] font-bold text-[#1a1a1a] mb-5 pb-4 border-b border-[#e5e5e5]">
            🏪 Business Settings
          </h2>
          <div className="space-y-4">
            <Field label="Business Name" field="businessName" placeholder="Siyo Farms" />
            <Field label="Contact Phone" field="phone" placeholder="+91 XXXXX XXXXX" />
            <Field label="Contact Email" field="email" placeholder="hello@yourbusiness.com" type="email" />
            <Field label="Delivery Time" field="deliveryTime" placeholder="6:00 AM – 8:00 AM" />
            <Field label="Order Cutoff Time" field="orderCutoff" placeholder="10:00 PM" />
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-6 lg:col-span-2">
          <h2 className="text-[17px] font-bold text-[#1a1a1a] mb-5 pb-4 border-b border-[#e5e5e5]">
            📢 Announcement Bar
          </h2>
          <div>
            <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Announcement Text</label>
            <input
              type="text"
              value={settings.announcement}
              onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-sm text-[14px] outline-none focus:border-[#003399]"
            />
            <div className="mt-3 bg-[#003399] text-white px-4 py-3 rounded-sm text-[13px] text-center">
              Preview: {settings.announcement}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-8 py-3 rounded-sm text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-200 ${
            saved ? "bg-green-600" : "bg-[#003399] hover:bg-[#002b80]"
          }`}
        >
          {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Settings</>}
        </button>
      </div>
    </div>
  );
}
