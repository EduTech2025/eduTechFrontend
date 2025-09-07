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
  {
    name: 'Agentic Query Chatbot',
    icon: "/assets/home/agentic_query_bot.png",
    category: 'image',
  },
  {
    name: 'Travel Planner',
    icon: "/assets/home/travel_planner.png",
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
          className="cursor-pointer relative rounded-2xl border border-white/10 
                    overflow-hidden bg-[#1a1a1a] 
                    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] 
                    transition-all group"
        >
       {/* Image centered and contained inside card */}
        <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 flex items-center justify-center">
          <img
            src={product.icon}
            alt={product.name}
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>


          {/* Text overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/100 py-3 text-center">
            <span className="block text-sm sm:text-base font-medium text-white 
                            group-hover:text-purple-300 transition">
              {product.name}
            </span>
          </div>
        </div>
      ))}
    </main>

  );
}
