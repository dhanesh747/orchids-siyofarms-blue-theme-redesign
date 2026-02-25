import React from 'react';
import Image from 'next/image';

/**
 * Nutrition Rich Milk Section
 * 
 * This component renders the 'Nutrition Rich Milk' section of Siyo Farms.
 * It features a 4-column responsive grid (on desktop) for dairy products
 * including A2 Cow Milk, Raw Cow Milk, Buffalo Milk, etc.
 * 
 * Theme: Light
 * Design: Minimalist grid, high-contrast blue themed pricing, image-centric focus.
 */

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  onSale?: boolean;
  link: string;
}

const products: Product[] = [
  {
    id: 'a2-cow-milk',
    title: 'A2 Cow Milk',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/A2_NON_HOMOGENISED_MILK_BOTTLE_93cf9ac8-94c8-42b4--15.png',
    price: 'Rs. 95.00',
    link: '#',
  },
  {
    id: 'homogenised-a2-cow-milk',
    title: 'Homogenised A2 Cow Milk',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/A2_HOMOGENISED_MILK_BOTTLE_3aa630ce-f638-4c3e-b354-16.png',
    price: 'Rs. 98.00',
    link: '#',
  },
  {
    id: 'homogenised-cow-milk',
    title: 'Homogenised Cow Milk',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/PHCOWMILK_BOTTLE_afe2fce8-9a7e-41a8-a037-47abe6dac-17.png',
    price: 'Rs. 82.00',
    link: '#',
  },
  {
    id: 'raw-cow-milk',
    title: 'Raw Cow Milk',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/RAW_COW_MILK_BOTTLE_18400540-21f4-405a-89f4-033892-18.png',
    price: 'Rs. 85.00',
    link: '#',
  },
  {
    id: 'pasteurized-buffalo-milk',
    title: 'Pasteurized Buffalo Milk',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/BUFFALO_MILK_BOTTLE_b099df91-7560-43a8-8259-d1d4cd-19.png',
    price: 'Rs. 105.00',
    link: '#',
  },
  {
    id: 'lactose-free-milk',
    title: 'Lactose Free Milk',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d7e60178-13e6-415c-840f-1b7ae89dba8d-provilac-in/assets/images/LACTOSE_FREE_MILK_BOTTLE_2173fce4-7549-434c-a611-9-20.png',
    price: 'Rs. 85.00',
    originalPrice: 'Rs. 95.00',
    onSale: true,
    link: '#',
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group flex flex-col items-center">
        <div className="relative w-full aspect-square overflow-hidden bg-white cursor-pointer mb-4">
          <a href={product.link} className="block relative w-full h-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain transition-opacity duration-300 group-hover:opacity-90"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {product.onSale && (
              <div className="absolute bottom-2 left-2 bg-[#CC0000] text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                Sale
              </div>
            )}
          </a>
        </div>
      <div className="text-center px-2">
        <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-2 leading-tight">
          <a href={product.link} className="hover:underline">
            {product.title}
          </a>
        </h3>
        <div className="flex items-center justify-center gap-2">
          {product.onSale && product.originalPrice && (
            <span className="text-[#4D4D4D] line-through text-[16px]">
              {product.originalPrice}
            </span>
          )}
          <span className="text-[#003399] font-semibold text-[18px]">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function NutritionMilkSection() {
  return (
    <section className="py-[60px] bg-white">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="mb-10 text-left border-b border-[#E5E5E5] pb-4">
          <h2 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight">
            Nutrition Rich Milk
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}