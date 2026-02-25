import React from "react";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Our Products", href: "#products" },
  { label: "Subscriptions", href: "#subscriptions" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms & Conditions", href: "#terms" },
];

const PRODUCT_LINKS = [
  { label: "A2 Cow Milk", href: "#" },
  { label: "Buffalo Milk", href: "#" },
  { label: "High Protein Milk", href: "#" },
  { label: "Lactose Free Milk", href: "#" },
  { label: "A2 Gir Cow Ghee", href: "#" },
  { label: "Paneer", href: "#" },
  { label: "Dahi", href: "#" },
  { label: "Kharwas", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#ebebeb]">
      {/* Main Footer Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-[20px] font-bold text-[#003399]">SIYO</span>
              <span className="text-[20px] font-bold text-[#0066cc] ml-1">FARMS</span>
            </div>
            <p className="text-[13px] text-[#4d4d4d] leading-relaxed mb-5">
              Pure, fresh dairy delivered to your door every morning. From our
              farms to your family.
            </p>
            <div className="space-y-2">
              <a href="tel:+911234567890" className="flex items-center gap-2 text-[13px] text-[#4d4d4d] hover:text-[#003399] transition-colors">
                <Phone size={14} /> +91 12345 67890
              </a>
              <a href="mailto:hello@siyofarms.com" className="flex items-center gap-2 text-[13px] text-[#4d4d4d] hover:text-[#003399] transition-colors">
                <Mail size={14} /> hello@siyofarms.com
              </a>
              <div className="flex items-start gap-2 text-[13px] text-[#4d4d4d]">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" /> Mumbai, Pune, Hyderabad, Jaipur &amp; Delhi NCR
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#1a1a1a] uppercase tracking-[0.1em] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-[#4d4d4d] hover:text-[#003399] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#1a1a1a] uppercase tracking-[0.1em] mb-5">
              Our Products
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-[#4d4d4d] hover:text-[#003399] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Info */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#1a1a1a] uppercase tracking-[0.1em] mb-5">
              Delivery Info
            </h3>
            <div className="space-y-3 text-[13px] text-[#4d4d4d]">
              <p><span className="font-semibold text-[#1a1a1a]">Delivery Time:</span><br />6:00 AM – 8:00 AM</p>
              <p><span className="font-semibold text-[#1a1a1a]">Order Before:</span><br />10:00 PM previous night</p>
              <p><span className="font-semibold text-[#1a1a1a]">Packaging:</span><br />Eco-friendly glass bottles</p>
              <p><span className="font-semibold text-[#1a1a1a]">Payment:</span><br />UPI, Cards, Net Banking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#d8d8d8]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#4d4d4d]">
            © {new Date().getFullYear()} Siyo Farms. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4d4d4d] hover:text-[#003399] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={17} strokeWidth={1.8} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4d4d4d] hover:text-[#003399] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={17} strokeWidth={1.8} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4d4d4d] hover:text-[#003399] transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={17} strokeWidth={1.8} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4d4d4d] hover:text-[#003399] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
