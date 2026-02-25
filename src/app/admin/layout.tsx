"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingBag, CreditCard,
  Settings, LogOut, Menu, X, ChevronRight, Bell
} from "lucide-react";

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/admin" },
  { icon: <Package size={18} />, label: "Products", href: "/admin/products" },
  { icon: <ShoppingBag size={18} />, label: "Orders", href: "/admin/orders" },
  { icon: <CreditCard size={18} />, label: "Payments", href: "/admin/payments" },
  { icon: <Settings size={18} />, label: "Settings", href: "/admin/settings" },
];

const ADMIN_PASS = "siyo2024";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ok = sessionStorage.getItem("siyo_admin_auth");
    if (ok === "1") setAuthed(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      sessionStorage.setItem("siyo_admin_auth", "1");
      setAuthed(true);
    } else {
      setError("Incorrect password. Try: siyo2024");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("siyo_admin_auth");
    setAuthed(false);
    router.push("/admin");
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001a66] to-[#003399] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-[380px]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#003399] flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <h1 className="text-[22px] font-bold text-[#1a1a1a]">Admin Panel</h1>
            <p className="text-[13px] text-[#4d4d4d] mt-1">Siyo Farms Dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-md text-[14px] outline-none focus:border-[#003399] mb-3"
              autoFocus
            />
            {error && <p className="text-[12px] text-[#cc0000] mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#003399] text-white py-3 rounded-md font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-center text-[11px] text-[#999] mt-4">Default password: siyo2024</p>
          <div className="mt-4 text-center">
            <Link href="/" className="text-[12px] text-[#003399] hover:underline">← Back to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#001a66] flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white text-[18px] font-bold">SIYO FARMS</span>
              <p className="text-white/50 text-[11px] uppercase tracking-wider">Admin Panel</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white lg:hidden">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-[14px] font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white border-r-2 border-[#66aaff]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white text-[13px] mb-3 transition-colors">
            <Package size={15} /> View Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/60 hover:text-white text-[13px] transition-colors w-full"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#e5e5e5] px-4 md:px-8 h-14 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-[#4d4d4d] hover:text-[#003399]"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block text-[14px] font-semibold text-[#1a1a1a]">
            {NAV_ITEMS.find((n) => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label || "Dashboard"}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="p-2 text-[#4d4d4d] hover:text-[#003399] relative">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#003399] flex items-center justify-center text-white text-[12px] font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
