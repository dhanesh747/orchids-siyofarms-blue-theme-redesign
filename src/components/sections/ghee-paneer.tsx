import React from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  badge?: string;
}

const GHEE_PRODUCTS: Product[] = [
  {
    id: 'ghee-1',
    name: 'A2 Gir Cow Ghee',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/DESI_A2_GIR_COW_GHEE-21.png',
    price: 'Rs. 950.00',
    originalPrice: 'Rs. 1,100.00',
    badge: 'Sale',
  },
  {
    id: 'ghee-2',
    name: 'Buffalo Ghee',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/BUFFALO_GHEE_a19b5fa8-0dc3-411e-be85-696979fdae4e-22.png',
    price: 'Rs. 750.00',
    badge: 'Featured',
  },
  {
    id: 'ghee-3',
    name: 'Cultured Cow Ghee',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/CULTURED_COW_GHEE_a9a6aeb2-25d2-468a-92c5-0fda4797-23.png',
    price: 'Rs. 850.00',
    originalPrice: 'Rs. 950.00',
    badge: 'Sale',
  }
];

const DAIRY_PRODUCTS: Product[] = [
  {
    id: 'dairy-1',
    name: 'A2 Gir Cow Paneer',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/A2_PANEER-24.png',
    price: 'Rs. 150.00',
    badge: 'Fresh',
  },
  {
    id: 'dairy-2',
    name: 'Cow Milk Paneer',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/HF_COW_PANEER-25.png',
    price: 'Rs. 130.00',
  },
  {
    id: 'dairy-3',
    name: 'Dahi',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/DAHI-27.png',
    price: 'Rs. 60.00',
  },
  {
    id: 'dairy-4',
    name: 'Kharwas',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/KHARWAS-28.png',
    price: 'Rs. 90.00',
    badge: 'Popular',
  }
];

const ProductCard = ({ product }: { product: Product }) => (
  <div className="group flex flex-col items-start bg-white transition-all duration-300">
    <div className="relative aspect-square w-full overflow-hidden bg-[#F4F7FF] rounded-sm">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      {product.badge && (
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm ${
            product.badge === 'Sale' 
              ? 'bg-[#CC0000] text-white' 
              : 'bg-[#003399] text-white'
          }`}>
            {product.badge}
          </span>
        </div>
      )}
    </div>
    <div className="mt-4 w-full px-1">
      <h3 className="text-[15px] font-medium text-[#1A1A1A] leading-tight mb-2 group-hover:underline underline-offset-4 decoration-[#003399]">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-semibold text-[#003399]">
          {product.price}
        </span>
        {product.originalPrice && (
          <span className="text-[14px] text-[#4D4D4D] line-through">
            {product.originalPrice}
          </span>
        )}
      </div>
    </div>
    <button className="mt-4 w-full py-2.5 border border-[#003399] text-[#003399] text-[13px] font-bold uppercase tracking-widest rounded-sm bg-transparent hover:bg-[#003399] hover:text-white transition-colors duration-200">
      Add to cart
    </button>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1A1A1A] tracking-tight">
      {title}
    </h2>
    <a href="#" className="hidden md:block text-[14px] font-semibold text-[#003399] hover:opacity-80 transition-opacity uppercase tracking-wider">
      View All
    </a>
  </div>
);

export default function GheePaneerSection() {
  return (
    <div className="bg-white">
      {/* Danedar Ghee Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
          <SectionHeader title="Danedar Ghee" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {GHEE_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {/* CTA Card for empty slot in 4-col grid if needed */}
            <div className="hidden lg:flex flex-col items-center justify-center border-2 border-dashed border-[#F4F7FF] rounded-lg p-6 text-center">
              <p className="text-[14px] text-[#4D4D4D] italic">Explore our range of traditional stone-churned ghees</p>
              <a href="#" className="mt-4 text-[13px] font-bold text-[#003399] underline underline-offset-4 uppercase tracking-widest">Discover More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Exquisite Dairy Products Section */}
      <section className="py-12 md:py-16 border-t border-[#e5e5e5]">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
          <SectionHeader title="Exquisite Dairy Products" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {DAIRY_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 md:hidden text-center">
            <a href="#" className="inline-block text-[13px] font-bold text-[#003399] uppercase tracking-widest border-b-2 border-[#003399] pb-0.5">
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Info Badge Banner - Styled for Siyo Farms */}
      <div className="py-10 bg-[#f4f7ff]">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center italic">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-[18px] font-semibold text-[#003399]">No Preservatives</span>
              <p className="text-[13px] text-[#4D4D4D]">Straight from our farm to your doorstep</p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-y md:border-y-0 md:border-x border-[#e5e5e5] py-6 md:py-0">
              <span className="text-[18px] font-semibold text-[#003399]">Glass Packaging</span>
              <p className="text-[13px] text-[#4D4D4D]">Eco-friendly and maintains purity</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-[18px] font-semibold text-[#003399]">Subscription Benefit</span>
              <p className="text-[13px] text-[#4D4D4D]">Save up to 15% on daily deliveries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}