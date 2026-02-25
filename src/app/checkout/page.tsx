"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnnouncementBar from "@/components/sections/announcement-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { useCart } from "@/lib/cart-context";
import { createOrder, getAdminSettings } from "@/lib/orders";
import { CheckCircle2, Copy, AlertCircle, ChevronRight } from "lucide-react";

type Step = "details" | "payment" | "confirm";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const deliveryFee = totalPrice > 500 ? 0 : 30;
  const grandTotal = totalPrice + deliveryFee;

  const [step, setStep] = useState<Step>("details");
  const [upiId, setUpiId] = useState("siyofarms@upi");
  const [qrUrl, setQrUrl] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [txError, setTxError] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", pincode: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const settings = getAdminSettings();
    setUpiId(settings.upiId);
    setQrUrl(settings.upiQrUrl);
  }, []);

  useEffect(() => {
    if (items.length === 0 && step === "details") {
      router.push("/cart");
    }
  }, [items, step, router]);

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Valid 10-digit mobile number required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = "Valid 6-digit pincode required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDetailsNext = () => {
    if (validateDetails()) setStep("payment");
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = () => {
    if (!transactionId.trim() || transactionId.trim().length < 6) {
      setTxError("Please enter a valid UPI transaction ID (minimum 6 characters)");
      return;
    }
    setTxError("");
    setSubmitting(true);

    const order = createOrder({
      status: "payment_submitted",
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        emoji: i.product.emoji,
      })),
      subtotal: totalPrice,
      deliveryFee,
      total: grandTotal,
      customer: form,
      payment: {
        method: "upi",
        upiId,
        transactionId: transactionId.trim(),
      },
    });

    setOrderId(order.id);
    clearCart();
    setTimeout(() => {
      setSubmitting(false);
      setStep("confirm");
    }, 1200);
  };

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-white">
        <AnnouncementBar />
        <Header />
        <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-3">Order Placed!</h1>
          <p className="text-[15px] text-[#4d4d4d] mb-2">Your order <strong className="text-[#003399]">#{orderId}</strong> has been received.</p>
          <p className="text-[14px] text-[#4d4d4d] mb-8">
            Your payment is being verified. You will receive a confirmation once it is approved by our team.
          </p>
          <div className="bg-[#fff8e6] border border-[#ffe58a] rounded-md p-4 mb-8 text-left">
            <p className="text-[13px] font-semibold text-[#b8860b] mb-1">⏳ Payment Verification Pending</p>
            <p className="text-[12px] text-[#4d4d4d]">Transaction ID submitted: <strong>{transactionId}</strong></p>
            <p className="text-[12px] text-[#4d4d4d] mt-1">Our team will verify your payment within 1–2 hours. You will be notified via SMS/WhatsApp.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="/"
              className="block bg-[#003399] text-white py-3 px-8 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors"
            >
              Continue Shopping
            </a>
            <a href={`/account`} className="text-[#003399] text-[13px] hover:underline">
              View My Orders
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <AnnouncementBar />
      <Header />

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-10">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {(["details", "payment"] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                step === s ? "bg-[#003399] text-white" : (
                  (s === "details" && step === "payment") ? "bg-green-100 text-green-700" : "bg-white text-[#4d4d4d] border border-[#e5e5e5]"
                )
              }`}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-white/20">
                  {(s === "details" && step === "payment") ? "✓" : i + 1}
                </span>
                {s === "details" ? "Delivery Details" : "Payment"}
              </div>
              {i < 1 && <ChevronRight size={16} className="text-[#ccc] mx-1" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form / Payment */}
          <div className="lg:col-span-2">
            {step === "details" && (
              <div className="bg-white border border-[#e5e5e5] rounded-md p-6">
                <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-6">Delivery Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Enter your full name", type: "text" },
                    { key: "phone", label: "Mobile Number", placeholder: "10-digit mobile number", type: "tel" },
                    { key: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
                    { key: "address", label: "Delivery Address", placeholder: "House/Flat no, Street, Area", type: "text" },
                    { key: "city", label: "City", placeholder: "Mumbai, Pune, etc.", type: "text" },
                    { key: "pincode", label: "PIN Code", placeholder: "6-digit PIN code", type: "text" },
                  ].map((field) => (
                    <div key={field.key} className={field.key === "address" ? "md:col-span-2" : ""}>
                      <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-sm text-[14px] outline-none transition-colors ${
                          errors[field.key] ? "border-[#cc0000] bg-red-50" : "border-[#e5e5e5] focus:border-[#003399]"
                        }`}
                      />
                      {errors[field.key] && (
                        <p className="text-[11px] text-[#cc0000] mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors[field.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleDetailsNext}
                  className="mt-6 w-full bg-[#003399] text-white py-4 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white border border-[#e5e5e5] rounded-md p-6">
                <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-2">Pay via UPI</h2>
                <p className="text-[13px] text-[#4d4d4d] mb-6">
                  Pay <strong className="text-[#003399] text-[16px]">₹{grandTotal}</strong> using any UPI app (GPay, PhonePe, Paytm, BHIM, etc.)
                </p>

                {/* QR Code Section */}
                <div className="flex flex-col md:flex-row gap-6 items-start mb-6 p-5 bg-[#f4f7ff] rounded-lg border border-[#d0d9ff]">
                  {/* QR */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-48 h-48 bg-white border-2 border-[#003399] rounded-lg flex items-center justify-center overflow-hidden">
                      {qrUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={qrUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-center p-4">
                          <div className="grid grid-cols-3 gap-1 mb-2 opacity-30">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div key={i} className={`w-8 h-8 rounded-sm ${[0, 2, 6, 8].includes(i) ? "bg-[#003399]" : i === 4 ? "bg-[#003399]/40" : "bg-[#e5e5e5]"}`} />
                            ))}
                          </div>
                          <p className="text-[10px] text-[#4d4d4d]">QR Code</p>
                          <p className="text-[9px] text-[#4d4d4d]">(Set by Admin)</p>
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#4d4d4d] mt-2 text-center">Scan with any UPI app</p>
                  </div>

                  {/* UPI ID */}
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Or pay to this UPI ID:</p>
                    <div className="flex items-center gap-2 bg-white border border-[#003399] rounded-md px-4 py-3 mb-4">
                      <span className="text-[15px] font-bold text-[#003399] flex-1">{upiId}</span>
                      <button onClick={handleCopyUpi} className="text-[#003399] hover:opacity-70 transition-opacity">
                        {copied ? <CheckCircle2 size={18} className="text-green-600" /> : <Copy size={18} />}
                      </button>
                    </div>
                    <div className="space-y-2 text-[12px] text-[#4d4d4d]">
                      <p>1. Open GPay / PhonePe / Paytm / BHIM</p>
                      <p>2. Scan QR code or enter UPI ID</p>
                      <p>3. Enter amount <strong>₹{grandTotal}</strong></p>
                      <p>4. Complete payment & copy the <strong>Transaction ID</strong></p>
                      <p>5. Paste Transaction ID below and submit</p>
                    </div>
                  </div>
                </div>

                {/* Transaction ID Input */}
                <div className="mb-5">
                  <label className="block text-[14px] font-semibold text-[#1a1a1a] mb-2">
                    Enter UPI Transaction ID <span className="text-[#cc0000]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 413548679234 or T2024XXXXXXXX"
                    value={transactionId}
                    onChange={(e) => { setTransactionId(e.target.value); setTxError(""); }}
                    className={`w-full px-4 py-3 border rounded-sm text-[14px] outline-none transition-colors font-mono ${
                      txError ? "border-[#cc0000] bg-red-50" : "border-[#e5e5e5] focus:border-[#003399]"
                    }`}
                  />
                  {txError && (
                    <p className="text-[12px] text-[#cc0000] mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {txError}
                    </p>
                  )}
                  <p className="text-[11px] text-[#4d4d4d] mt-1.5">
                    You can find the Transaction ID in your UPI app payment history.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("details")}
                    className="flex-1 py-3 border border-[#003399] text-[#003399] rounded-sm font-bold text-[12px] uppercase tracking-wider hover:bg-[#f4f7ff] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={submitting}
                    className="flex-[2] py-3 bg-[#003399] text-white rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-[#002b80] transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Placing Order..." : "Confirm Order & Submit"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#e5e5e5] rounded-md p-5 sticky top-[90px]">
              <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-4 pb-3 border-b border-[#e5e5e5]">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <span className="text-2xl">{product.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#1a1a1a] truncate">{product.name}</p>
                      <p className="text-[11px] text-[#4d4d4d]">×{quantity}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-[#1a1a1a]">₹{product.price * quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e5e5e5] pt-4 space-y-2">
                <div className="flex justify-between text-[13px] text-[#4d4d4d]">
                  <span>Subtotal</span><span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#4d4d4d]">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-[16px] font-bold text-[#003399] pt-2 border-t border-[#e5e5e5]">
                  <span>Total</span><span>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
