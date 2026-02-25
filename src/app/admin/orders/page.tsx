"use client";

import React, { useState, useEffect } from "react";
import { getOrders, updateOrder, Order } from "@/lib/orders";
import { Search, Filter, Eye, Check, X as XIcon, RefreshCw } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "bg-gray-100 text-gray-700",
  payment_submitted: "bg-yellow-100 text-yellow-800",
  payment_verified: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Pending",
  payment_submitted: "Awaiting Verification",
  payment_verified: "Verified",
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState<Order | null>(null);

  const load = () => setOrders(getOrders());
  useEffect(() => { load(); }, []);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.includes(search) || o.customer.name.toLowerCase().includes(search.toLowerCase()) || o.customer.phone.includes(search);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    updateOrder(orderId, { status: newStatus });
    load();
    if (selected?.id === orderId) setSelected({ ...selected, status: newStatus });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">Orders</h1>
          <p className="text-[13px] text-[#4d4d4d]">{orders.length} total orders</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-[13px] text-[#003399] hover:underline">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#e5e5e5] rounded-lg p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-[#e5e5e5] rounded-md px-3 py-2">
          <Search size={15} className="text-[#4d4d4d]" />
          <input
            type="text"
            placeholder="Search by order ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-[13px] outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-[#4d4d4d]" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-[13px] border border-[#e5e5e5] rounded-md px-3 py-2 outline-none"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className="xl:col-span-2 bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[#4d4d4d]">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#e5e5e5]">
                    {["Order", "Customer", "Total", "Status", "Date", "Action"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-[#4d4d4d] uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className={`border-b border-[#f4f4f4] transition-colors cursor-pointer ${selected?.id === order.id ? "bg-[#f4f7ff]" : "hover:bg-[#fafafa]"}`}
                      onClick={() => setSelected(order)}
                    >
                      <td className="px-4 py-3 text-[13px] font-semibold text-[#003399]">#{order.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-medium text-[#1a1a1a]">{order.customer.name}</p>
                        <p className="text-[11px] text-[#4d4d4d]">{order.customer.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-[13px] font-semibold">₹{order.total}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>
                          {STATUS_LABEL[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-[#4d4d4d] whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(order)} className="text-[#003399] hover:opacity-70">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Detail Panel */}
        <div className="xl:col-span-1">
          {selected ? (
            <div className="bg-white border border-[#e5e5e5] rounded-lg p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[16px] font-bold text-[#1a1a1a]">#{selected.id}</h2>
                <button onClick={() => setSelected(null)} className="text-[#4d4d4d] hover:text-[#cc0000]">
                  <XIcon size={16} />
                </button>
              </div>

              <div className="space-y-3 text-[13px] mb-4">
                <div>
                  <p className="font-semibold text-[#1a1a1a]">{selected.customer.name}</p>
                  <p className="text-[#4d4d4d]">{selected.customer.phone} · {selected.customer.email}</p>
                  <p className="text-[#4d4d4d]">{selected.customer.address}, {selected.customer.city} - {selected.customer.pincode}</p>
                </div>
                <div className="border-t border-[#e5e5e5] pt-3">
                  <p className="font-semibold text-[#1a1a1a] mb-2">Items</p>
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="flex-1 text-[#4d4d4d]">{item.name}</span>
                      <span className="text-[#4d4d4d]">×{item.quantity}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#e5e5e5] mt-2 pt-2 flex justify-between font-bold text-[#003399]">
                    <span>Total</span><span>₹{selected.total}</span>
                  </div>
                </div>
                <div className="border-t border-[#e5e5e5] pt-3">
                  <p className="font-semibold text-[#1a1a1a] mb-1">Payment</p>
                  <p className="text-[#4d4d4d]">Method: UPI</p>
                  {selected.payment.transactionId && (
                    <p className="text-[#4d4d4d] font-mono">Txn ID: {selected.payment.transactionId}</p>
                  )}
                  <span className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[selected.status]}`}>
                    {STATUS_LABEL[selected.status]}
                  </span>
                </div>
              </div>

              {/* Status Change */}
              <div className="border-t border-[#e5e5e5] pt-4">
                <p className="text-[12px] font-semibold text-[#4d4d4d] mb-2 uppercase tracking-wider">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { status: "payment_verified" as const, label: "Verify Payment", icon: <Check size={13} />, cls: "bg-green-600 hover:bg-green-700" },
                    { status: "processing" as const, label: "Processing", icon: <RefreshCw size={13} />, cls: "bg-[#003399] hover:bg-[#002b80]" },
                    { status: "delivered" as const, label: "Delivered", icon: <Check size={13} />, cls: "bg-emerald-600 hover:bg-emerald-700" },
                    { status: "cancelled" as const, label: "Cancel", icon: <XIcon size={13} />, cls: "bg-[#cc0000] hover:bg-red-700" },
                  ].map((btn) => (
                    <button
                      key={btn.status}
                      onClick={() => handleStatusChange(selected.id, btn.status)}
                      disabled={selected.status === btn.status}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-sm text-white text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${btn.cls}`}
                    >
                      {btn.icon} {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#e5e5e5] rounded-lg p-8 text-center text-[#4d4d4d]">
              <Eye size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-[14px]">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
