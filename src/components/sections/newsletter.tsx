import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Newsletter section component for Siyo Farms.
 * Cloned based on the design instructions with "Join the Siyo Farms Family!" heading,
 * email input, description text, and blue theme accents.
 */
const Newsletter = () => {
  return (
    <section 
      className="w-full py-[60px] md:py-[80px] bg-white border-t border-[#e5e5e5]"
      aria-labelledby="newsletter-heading"
    >
      <div className="container mx-auto max-w-[1200px] px-8 md:px-4">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          {/* Section Heading */}
          <h2 
            id="newsletter-heading"
            className="text-[#1a1a1a] text-[32px] md:text-[36px] font-semibold mb-4 leading-tight tracking-tight font-display"
          >
            Join the Siyo Farms Family!
          </h2>

          {/* Description Text */}
          <p className="text-[#4d4d4d] text-base md:text-[16px] leading-[1.6] mb-8 max-w-[650px]">
            Subscribe for <span className="font-semibold text-[#1a1a1a]">exclusive offers, new launches,</span> and <span className="font-semibold text-[#1a1a1a]">health tips</span> from Siyo Farms. Never miss the goodness of pure, high-protein milk!
          </p>

          {/* Email Subscription Form */}
          <form 
            className="w-full max-w-[440px] relative group"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full h-[48px] px-4 py-2 border border-[#1a1a1a] rounded-sm bg-transparent text-[#1a1a1a] placeholder:text-[#4d4d4d] focus:outline-none focus:ring-1 focus:ring-[#003399] focus:border-[#003399] transition-all duration-200"
                name="contact[email]"
                id="NewsletterForm--footer"
                aria-required="true"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="email"
              />
              <button
                type="submit"
                className="absolute right-[2px] h-[44px] w-[44px] flex items-center justify-center text-[#1a1a1a] hover:text-[#003399] transition-colors focus-visible:outline-none"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;