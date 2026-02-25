"use client";

import React, { useState, useEffect } from "react";
import { getOrders, updateOrder, Order } from "@/lib/orders";
import { Check, X as XIcon, RefreshCw, Clock, AlertCircle } from "lucide-react";

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | "payment_submitted" | "payment_verified">("payment_submitted");
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const load = () => setOrders(getOrders());
  useEffect(() => { load(); }, []);

  const filtered = orders.filter((o) =>
    filter === "all" ? ["payment_submitted", "payment_verified", "pending_payment"].includes(o.status) : o.status === filter
  );

  const handleVerify = (id: string) => {
    updateOrder(id, {
      status: "payment_verified",
      payment: { ...orders.find((o) => o.id === id)!.payment, verifiedAt: new Date().toISOString() },
    });
    load();
  };

  const handleReject = (id: string) => {
    const order = orders.find((o) => o.id === id)!;
    updateOrder(id, {
      status: "cancelled",
      payment: { ...order.payment, rejectedReason: rejectReason || "Payment not verified" },
    });
    setRejecting(null);
    setRejectReason("");
    load();
  };

  const pending = orders.filter((o) => o.status === "payment_submitted").length;
  const verified = orders.filter((o) => o.status === "payment_verified").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[#1a1a1a]">Payment Verification</h1>
        <p className="text-[13px] text-[#4d4d4d]">Verify UPI transactions submitted by customers</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Awaiting Verification", value: pending, color: "bg-yellow-500", icon: <Clock size={20} /> },
          { label: "Verified Today", value: verified, color: "bg-green-600", icon: <Check size={20} /> },
          { label: "Total Payments", value: orders.filter(o => ["payment_submitted","payment_verified"].includes(o.status)).length, color: "bg-[#003399]", icon: <AlertCircle size={20} /> },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e5e5e5] rounded-lg p-4 flex items-center gap-4">
            <div className={`${s.color} text-white w-10 h-10 rounded-lg flex items-center justify-center`}>{s.icon}</div>
            <div>
              <p className="text-[22px] font-bold text-[#1a1a1a]">{s.value}</p>
              <p className="text-[12px] text-[#4d4d4d]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "payment_submitted", label: "Awaiting Verification" },
          { key: "payment_verified", label: "Verified" },
          { key: "all", label: "All" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
              filter === tab.key ? "bg-[#003399] text-white" : "bg-white border border-[#e5e5e5] text-[#4d4d4d] hover:border-[#003399]"
            }`}
          >
            {tab.label}
            {tab.key === "payment_submitted" && pending > 0 && (
              <span className="ml-2 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pending}</span>
            )}
          </button>
        ))}
        <button onClick={load} className="ml-auto flex items-center gap-1.5 text-[13px] text-[#003399] hover:underline">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#e5e5e5] rounded-lg py-16 text-center text-[#4d4d4d]">
            No payments to show.
          </div>
        ) : (
          filtered.map((order) => (
            <div key={order.id} className={`bg-white border rounded-lg p-5 ${order.status === "payment_submitted" ? "border-yellow-300 bg-yellow-50/30" : "border-[#e5e5e5]"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-[16px] font-bold text-[#003399]">#{order.id}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      order.status === "payment_submitted" ? "bg-yellow-100 text-yellow-800" :
                      order.status === "payment_verified" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {order.status === "payment_submitted" ? "⏳ Awaiting Verification" :
                       order.status === "payment_verified" ? "✅ Verified" : order.status}
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold text-[#1a1a1a]">{order.customer.name}</p>
                  <p className="text-[13px] text-[#4d4d4d]">{order.customer.phone} · {order.customer.email}</p>
                  <p className="text-[13px] text-[#4d4d4d] mt-1">
                    {order.items.map(i => `${i.emoji} ${i.name} ×${i.quantity}`).join(", ")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[22px] font-bold text-[#003399]">₹{order.total}</p>
                  <p className="text-[12px] text-[#4d4d4d]">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              {/* Transaction ID */}
              {order.payment.transactionId && (
                <div className="mt-4 p-3 bg-[#f4f7ff] rounded-md border border-[#d0d9ff]">
                  <p className="text-[12px] text-[#4d4d4d] font-semibold mb-0.5">UPI Transaction ID submitted by customer:</p>
                  <p className="text-[16px] font-bold text-[#1a1a1a] font-mono tracking-wide">{order.payment.transactionId}</p>
                  {order.payment.verifiedAt && (
                    <p className="text-[11px] text-green-700 mt-1">
                      ✅ Verified on {new Date(order.payment.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              )}

              {/* Actions for pending */}
              {order.status === "payment_submitted" && (
                <div className="mt-4 flex gap-3 flex-wrap">
                  <button
                    onClick={() => handleVerify(order.id)}
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-sm text-[12px] font-bold uppercase tracking-wider hover:bg-green-700 transition-colors"
                  >
                    <Check size={14} /> Verify Payment
                  </button>
                  <button
                    onClick={() => setRejecting(order.id)}
                    className="flex items-center gap-2 border border-[#cc0000] text-[#cc0000] px-5 py-2.5 rounded-sm text-[12px] font-bold uppercase tracking-wider hover:bg-red-50 transition-colors"
                  >
                    <XIcon size={14} /> Reject
                  </button>
                </div>
              )}

              {/* Reject modal inline */}
              {rejecting === order.id && (
                <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-[13px] font-semibold text-[#cc0000] mb-2">Reason for rejection (optional):</p>
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="e.g. Transaction ID not found, amount mismatch..."
                    className="w-full px-3 py-2 border border-red-200 rounded-sm text-[13px] outline-none mb-3"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleReject(order.id)} className="bg-[#cc0000] text-white px-4 py-2 rounded-sm text-[12px] font-bold hover:bg-red-700 transition-colors">
                      Confirm Reject
                    </button>
                    <button onClick={() => setRejecting(null)} className="border border-[#e5e5e5] text-[#4d4d4d] px-4 py-2 rounded-sm text-[12px] font-bold hover:bg-white transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
