import React from "react";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <div className="bg-gradient-to-r from-[#001a66] to-[#003399] py-14 px-4 text-center">
        <h1 className="text-[36px] md:text-[44px] font-bold text-white mb-3">Contact Us</h1>
        <p className="text-white/80 text-[15px]">We are here to help. Reach out to us anytime.</p>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-6">Get in Touch</h2>
            <p className="text-[15px] text-[#4d4d4d] mb-8 leading-relaxed">
              Have questions about our products, delivery, or subscriptions? Our team is happy to help you.
            </p>

            <div className="space-y-5">
              {[
                { icon: <Phone size={20} className="text-[#003399]" />, label: "Phone / WhatsApp", value: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: <Mail size={20} className="text-[#003399]" />, label: "Email", value: "hello@siyofarms.com", href: "mailto:hello@siyofarms.com" },
                { icon: <MapPin size={20} className="text-[#003399]" />, label: "Farm Address", value: "Siyo Farms, Village Road, Maharashtra - 411001", href: null },
                { icon: <Clock size={20} className="text-[#003399]" />, label: "Delivery Hours", value: "6:00 AM – 8:00 AM daily", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 border border-[#e5e5e5] rounded-lg hover:border-[#003399]/30 transition-colors">
                  <div className="w-10 h-10 bg-[#f4f7ff] rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[12px] text-[#4d4d4d] mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[15px] font-semibold text-[#003399] hover:underline">{item.value}</a>
                    ) : (
                      <p className="text-[15px] font-semibold text-[#1a1a1a]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-6">Send a Message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent! We will get back to you within 24 hours.");
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-sm text-[14px] outline-none focus:border-[#003399] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Phone / Email</label>
                <input
                  type="text"
                  required
                  placeholder="Mobile number or email"
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-sm text-[14px] outline-none focus:border-[#003399] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Subject</label>
                <select className="w-full px-4 py-3 border border-[#e5e5e5] rounded-sm text-[14px] outline-none focus:border-[#003399] transition-colors">
                  <option>Order Enquiry</option>
                  <option>Product Query</option>
                  <option>Subscription Help</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-sm text-[14px] outline-none focus:border-[#003399] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#003399] text-white py-4 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
