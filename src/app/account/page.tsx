"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { getOrders, Order } from "@/lib/orders";
import { ShoppingBag, Clock, CheckCircle2, Truck, XCircle, Package } from "lucide-react";

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Pending Payment",
  payment_submitted: "Payment Submitted – Awaiting Verification",
  payment_verified: "Payment Verified",
  processing: "Order Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  pending_payment: <Clock size={16} className="text-gray-500" />,
  payment_submitted: <Clock size={16} className="text-yellow-600" />,
  payment_verified: <CheckCircle2 size={16} className="text-green-600" />,
  processing: <Package size={16} className="text-blue-600" />,
  delivered: <Truck size={16} className="text-emerald-600" />,
  cancelled: <XCircle size={16} className="text-red-600" />,
};

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "bg-gray-100 text-gray-700",
  payment_submitted: "bg-yellow-100 text-yellow-800",
  payment_verified: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <AnnouncementBar />
      <Header />

      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-12">
        <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-2">My Orders</h1>
        <p className="text-[14px] text-[#4d4d4d] mb-8">
          Track your orders and check payment status. Orders are stored on this device.
        </p>

        {orders.length === 0 ? (
          <div className="bg-white border border-[#e5e5e5] rounded-lg py-20 text-center">
            <ShoppingBag size={56} className="text-[#e5e5e5] mx-auto mb-5" />
            <h2 className="text-[20px] font-semibold text-[#1a1a1a] mb-3">No orders yet</h2>
            <p className="text-[#4d4d4d] text-[14px] mb-6">Start shopping to see your orders here.</p>
            <Link
              href="/products"
              className="inline-block bg-[#003399] text-white px-8 py-3 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
                {/* Order Header */}
                <div
                  className="px-5 py-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-[#fafafa] transition-colors"
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[15px] font-bold text-[#003399]">#{order.id}</p>
                      <p className="text-[12px] text-[#4d4d4d]">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "long", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <span className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                      {STATUS_ICON[order.status]}
                      {STATUS_LABEL[order.status]}
                    </span>
                    <span className="text-[17px] font-bold text-[#1a1a1a]">₹{order.total}</span>
                    <span className="text-[13px] text-[#4d4d4d]">{expanded === order.id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* Expanded Detail */}
                {expanded === order.id && (
                  <div className="border-t border-[#e5e5e5] px-5 py-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Items */}
                      <div>
                        <h3 className="text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">Items Ordered</h3>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[13px]">
                              <span className="text-xl">{item.emoji}</span>
                              <span className="flex-1 text-[#4d4d4d]">{item.name}</span>
                              <span className="text-[#4d4d4d]">×{item.quantity}</span>
                              <span className="font-semibold text-[#1a1a1a]">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#e5e5e5] space-y-1 text-[13px]">
                          <div className="flex justify-between text-[#4d4d4d]">
                            <span>Subtotal</span><span>₹{order.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-[#4d4d4d]">
                            <span>Delivery</span><span>{order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}</span>
                          </div>
                          <div className="flex justify-between font-bold text-[#003399] text-[15px] pt-1">
                            <span>Total</span><span>₹{order.total}</span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery & Payment */}
                      <div>
                        <h3 className="text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">Delivery Address</h3>
                        <p className="text-[13px] text-[#4d4d4d] leading-relaxed mb-4">
                          {order.customer.name}<br />
                          {order.customer.phone}<br />
                          {order.customer.address}<br />
                          {order.customer.city} – {order.customer.pincode}
                        </p>
                        <h3 className="text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-2">Payment</h3>
                        <p className="text-[13px] text-[#4d4d4d]">Method: UPI</p>
                        {order.payment.transactionId && (
                          <p className="text-[13px] text-[#4d4d4d] mt-1 font-mono">
                            Txn ID: <span className="font-semibold">{order.payment.transactionId}</span>
                          </p>
                        )}
                        {order.status === "payment_submitted" && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-[12px] text-yellow-800">
                            ⏳ Your payment is being verified by our team. Usually takes 1–2 hours.
                          </div>
                        )}
                        {order.status === "payment_verified" && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md text-[12px] text-green-800">
                            ✅ Payment verified! Your order is being processed.
                          </div>
                        )}
                        {order.status === "cancelled" && order.payment.rejectedReason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md text-[12px] text-red-800">
                            ❌ Rejected: {order.payment.rejectedReason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
