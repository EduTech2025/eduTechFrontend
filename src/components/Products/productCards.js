import { useState } from 'react';
import { useRouter } from 'next/navigation';

const products = [
  {
    name: 'PDF Editor',
    icon: "/assets/home/pdf.png",
    category: 'pdf',
  },
  {
    name: 'Interview Simulator',
    icon: "/assets/home/inter-talk.png",
    category: 'image',
  },
];

export default function ProductCards({ openModalWithCategory }) {
  return (
    <main className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 px-5 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.name}
          onClick={() => openModalWithCategory(product.category)}
          className="cursor-pointer bg-[#1a1a1a] rounded-2xl border border-white/10 hover:shadow-purple-500/30 transition-all p-4 group"
        >
          <div className="relative w-full h-auto mb-4 flex items-center justify-center rounded-md overflow-hidden shadow-inner">
            <div className="transition-transform group-hover:scale-110">
              <img src={product.icon} alt="" />
            </div>
          </div>
          <span className="text-center block text-sm font-medium text-white group-hover:text-purple-300 transition">
            {product.name}
          </span>
        </div>
      ))}
    </main>
  );
}
