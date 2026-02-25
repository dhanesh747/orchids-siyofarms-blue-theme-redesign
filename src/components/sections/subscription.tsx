import React from "react";
import { Check } from "lucide-react";

const SUBSCRIPTION_FEATURES = [
  "Daily delivery between 6:00 AM – 8:00 AM",
  "Save up to 15% on all dairy products",
  "Pause or cancel anytime",
  "Free glass bottle deposits returned",
  "Priority customer support",
];

export default function SubscriptionSection() {
  return (
    <section className="py-[60px] md:py-[80px] bg-[#003399]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left Text Block */}
          <div className="flex-1 text-white">
            <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.15em] text-[#93b4ff] mb-4">
              Subscription Plans
            </span>
            <h2 className="text-[32px] md:text-[40px] font-semibold text-white mb-4 leading-tight tracking-tight">
              Never Run Out of
              <br />
              Fresh Dairy Again
            </h2>
            <p className="text-[#b8ceff] text-[16px] leading-relaxed mb-8 max-w-[420px]">
              Subscribe to Siyo Farms and enjoy fresh, pure dairy delivered to
              your doorstep every morning. Flexible plans to suit your family's
              needs.
            </p>
            <ul className="space-y-3 mb-8">
              {SUBSCRIPTION_FEATURES.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] text-[#dce9ff]">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-block py-3 px-8 bg-white text-[#003399] text-[14px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#f4f7ff] transition-colors duration-200"
            >
              Start Subscription
            </a>
          </div>

          {/* Right Plans Block */}
          <div className="flex-1 w-full max-w-[420px]">
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  label: "Monthly Plan",
                  desc: "30 days of daily delivery",
                  discount: "Save 10%",
                  popular: false,
                },
                {
                  label: "Quarterly Plan",
                  desc: "90 days of daily delivery",
                  discount: "Save 15%",
                  popular: true,
                },
                {
                  label: "Weekly Trial",
                  desc: "7 days, try us out",
                  discount: "Save 5%",
                  popular: false,
                },
              ].map((plan) => (
                <div
                  key={plan.label}
                  className={`relative flex items-center justify-between p-5 rounded-sm border transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? "border-white bg-white/15 shadow-lg"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-5 bg-white text-[#003399] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <p className="text-white font-semibold text-[16px]">
                      {plan.label}
                    </p>
                    <p className="text-[#b8ceff] text-[13px] mt-0.5">
                      {plan.desc}
                    </p>
                  </div>
                  <span className="bg-white/20 text-white text-[12px] font-bold px-3 py-1 rounded-full">
                    {plan.discount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
