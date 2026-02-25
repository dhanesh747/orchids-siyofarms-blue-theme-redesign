"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders, Order } from "@/lib/orders";
import { products } from "@/lib/products";
import { ShoppingBag, CreditCard, Package, TrendingUp, CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const pending = orders.filter((o) => o.status === "payment_submitted").length;
  const verified = orders.filter((o) => o.status === "payment_verified").length;
  const totalRevenue = orders
    .filter((o) => ["payment_verified", "processing", "delivered"].includes(o.status))
    .reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: "Total Orders", value: orders.length, icon: <ShoppingBag size={22} />, color: "bg-[#003399]", link: "/admin/orders" },
    { label: "Pending Verification", value: pending, icon: <Clock size={22} />, color: "bg-[#ff8800]", link: "/admin/payments" },
    { label: "Verified Payments", value: verified, icon: <CheckCircle2 size={22} />, color: "bg-green-600", link: "/admin/payments" },
    { label: "Revenue (Verified)", value: `₹${totalRevenue.toLocaleString()}`, icon: <TrendingUp size={22} />, color: "bg-purple-600", link: "/admin/orders" },
    { label: "Total Products", value: products.length, icon: <Package size={22} />, color: "bg-[#0066cc]", link: "/admin/products" },
    { label: "Unverified Payments", value: orders.filter((o) => o.status === "pending_payment").length, icon: <AlertCircle size={22} />, color: "bg-[#cc0000]", link: "/admin/payments" },
  ];

  const recentOrders = orders.slice(0, 5);

  const statusColors: Record<string, string> = {
    pending_payment: "bg-gray-100 text-gray-700",
    payment_submitted: "bg-yellow-100 text-yellow-800",
    payment_verified: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusLabel: Record<string, string> = {
    pending_payment: "Pending",
    payment_submitted: "Awaiting Verification",
    payment_verified: "Payment Verified",
    processing: "Processing",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-[#1a1a1a]">Dashboard</h1>
        <p className="text-[#4d4d4d] text-[14px]">Welcome back! Here is what is happening with Siyo Farms today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.link} className="bg-white border border-[#e5e5e5] rounded-lg p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.color} text-white w-10 h-10 rounded-lg flex items-center justify-center`}>
                {stat.icon}
              </div>
              <ArrowRight size={14} className="text-[#ccc] group-hover:text-[#003399] transition-colors mt-1" />
            </div>
            <p className="text-[24px] font-bold text-[#1a1a1a]">{stat.value}</p>
            <p className="text-[12px] text-[#4d4d4d] mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-[16px] font-semibold text-[#1a1a1a]">Recent Orders</h2>
          <Link href="/admin/orders" className="text-[12px] text-[#003399] hover:underline font-medium">
            View All →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="py-16 text-center text-[#4d4d4d] text-[14px]">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e5e5]">
                  {["Order ID", "Customer", "Total", "Status", "Date"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-[#4d4d4d] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#f4f4f4] hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <Link href={`/admin/orders`} className="text-[13px] font-semibold text-[#003399] hover:underline">
                        #{order.id}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#1a1a1a]">{order.customer.name}</td>
                    <td className="px-5 py-4 text-[13px] font-semibold text-[#1a1a1a]">₹{order.total}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                        {statusLabel[order.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[12px] text-[#4d4d4d]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
