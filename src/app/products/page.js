'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';


const products = [
  {
    name: 'Image Background Remover',
    image: 'https://onlinepngtools.com/images/png/illustrations/remove-icon-background.png',
    link: '/products/image-background-remover',
    category: 'ArcLine',
  },
  {
    name: 'PDF To Excel',
    image: 'https://onlinepngtools.com/images/png/illustrations/remove-icon-background.png',
    link: '/products/pdf-to-excel',
    category: 'ArcLine',
  },
  {
    name: 'PDF Editor',
    image: 'https://onlinepngtools.com/images/png/illustrations/remove-icon-background.png',
    link: '/products/pdf-editor',
    category: 'ArcLine',
  },
  {
    name: 'Add Watermark',
    image: 'https://onlinepngtools.com/images/png/illustrations/remove-icon-background.png',
    link: '/products/add-watermark',
    category: 'ArcLine',
  },
  
  {
    name: 'PDF to Word',
    image: 'https://onlinepngtools.com/images/png/illustrations/remove-icon-background.png',
    link: '/products/pdf-to-word',
    category: 'OrbitFlow',
  },
   
  {
    name: 'Image to Pdf',
    image: 'https://onlinepngtools.com/images/png/illustrations/remove-icon-background.png',
    link: '/products/image-to-pdf',
    category: 'OrbitFlow',
  },
  {
    name: 'Image Enhancer',
    image: 'https://onlinepngtools.com/images/png/illustrations/remove-icon-background.png',
    link: '/products/image-enhancer',
    category: 'ArcLine',
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTab, setSelectedTab] = useState('ArcLine');
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  const filteredProducts = products.filter(
    (product) =>
      product.category === selectedTab &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen  text-white font-sans px-4 py-6">
      {/* Filters and Search */}
      <section className="w-full flex justify-start mb-10 px-6">
        <div className="w-full sm:w-3/4 lg:w-1/2 flex flex-col sm:flex-row justify-between items-center gap-6 backdrop-blur-xl bg-white/10 border border-white/10 shadow-lg rounded-2xl px-4 py-1 transition-all duration-300">

          {/* Tabs */}
          <div className="flex space-x-3 px-4 py-2 rounded-xl text-sm">
            {['ArcLine', 'OrbitFlow'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={clsx(
                  'px-5 py-1.5 rounded-xl text-sm font-medium transition backdrop-blur-md',
                  selectedTab === tab
                    ? 'bg-white/20 text-white shadow-inner border border-white/20'
                    : 'hover:bg-white/10 text-white border border-transparent'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white/10 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-inner transition-all duration-300 focus-within:shadow-purple-500/30">
            <Search
              onClick={() => setShowSearch(!showSearch)}
              className="w-5 h-5 text-white cursor-pointer hover:text-purple-400 transition duration-200"
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={clsx(
                'bg-transparent text-white placeholder-white outline-none transition-all duration-300',
                showSearch ? 'w-56 opacity-100 ml-2' : 'w-0 opacity-0 ml-0'
              )}
            />
          </div>

        </div>
      </section>

      {/* Product Cards */}
      <main className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 px-5 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <Link
            key={product.name}
            href={product.link}
            className="bg-[#1a1a1a] rounded-2xl border border-white/10 hover:shadow-purple-500/30 transition-all p-4 group"
          >
            {/* macOS style top bar */}
            <div className="flex space-x-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div className="relative w-full h-36 mb-4 rounded-md overflow-hidden shadow-inner">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-center block text-sm font-medium text-white group-hover:text-purple-300 transition">
              {product.name}
            </span>
          </Link>
        ))}
      </main>
    </div>
  );
}
