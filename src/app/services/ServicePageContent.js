'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- Tech Logos ---
const webTechLogos = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-plain-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'
];

const appTechLogos = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'
];

const shopifyTechLogos = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-plain-wordmark.svg'
];

const wordpressTechLogos = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg'
];

const tabContent = {
  web: {
    title: 'Web Development',
    icon: <Code size={32} className="text-purple-400" />,
    description: (
      <>
        <p>
          We build modern, responsive websites with clean architecture and blazing-fast performance using React, Next.js, and Tailwind CSS. From landing pages to complex dashboards, we deliver robust, scalable, and SEO-friendly solutions.
        </p>
        <p className="mt-2 text-gray-400 text-sm sm:text-base">
          Our Web Development Services include:
        </p>
        <ul className="list-disc pl-5 text-gray-400 text-sm sm:text-base leading-relaxed">
          <li>Pixel-perfect UI/UX Implementation</li>
          <li>Next.js Static + SSR Development</li>
          <li>CMS / Headless CMS Integration (Strapi, Sanity)</li>
          <li>SEO Optimization & Schema Markup</li>
          <li>Custom Admin Dashboards</li>
        </ul>
      </>
    ),
    cta: 'Get in Touch',
    logos: webTechLogos
  },
  app: {
    title: 'App Development',
    icon: <Smartphone size={32} className="text-purple-400" />,
    description: (
      <>
        <p>
          We craft high-performance mobile and cross-platform apps using Flutter and React Native. Our apps offer seamless user experiences and fast load times, designed to scale with your business.
        </p>
        <p className="mt-2 text-gray-400 text-sm sm:text-base">
          We specialize in:
        </p>
        <ul className="list-disc pl-5 text-gray-400 text-sm sm:text-base leading-relaxed">
          <li>Flutter & React Native Cross-platform Apps</li>
          <li>API Integration & Firebase Backend</li>
          <li>Offline Support & Real-time Features</li>
          <li>Custom UI Animations</li>
          <li>Deployment to Play Store & App Store</li>
        </ul>
      </>
    ),
    cta: 'Start Your App',
    logos: appTechLogos
  },
  wordpress: {
    title: 'WordPress',
    icon: <Palette size={32} className="text-purple-400" />,
    description: (
      <>
        <p>
          We design and develop custom WordPress websites that are fast, functional, and tailored to your goals. From blogs to eCommerce solutions, we deliver high-performance, SEO-optimized WordPress sites.
        </p>
        <p className="mt-2 text-gray-400 text-sm sm:text-base">
          Services we offer:
        </p>
        <ul className="list-disc pl-5 text-gray-400 text-sm sm:text-base leading-relaxed">
          <li>Custom WordPress Themes</li>
          <li>Plugin Development & Integration</li>
          <li>WooCommerce Setup & Store Optimization</li>
          <li>Speed & Security Enhancements</li>
          <li>Migration & Maintenance</li>
        </ul>
      </>
    ),
    cta: 'Build with WordPress',
    logos: wordpressTechLogos
  },
  shopify: {
    title: 'Shopify',
    icon: <ShoppingBag size={32} className="text-purple-400" />,
    description: (
      <>
        <p>
          We create beautiful and conversion-driven Shopify stores that are tailored for scalability and performance. From custom storefronts to checkout optimization, we ensure a seamless shopping experience.
        </p>
        <p className="mt-2 text-gray-400 text-sm sm:text-base">
          Our Shopify capabilities include:
        </p>
        <ul className="list-disc pl-5 text-gray-400 text-sm sm:text-base leading-relaxed">
          <li>Custom Theme Development</li>
          <li>Third-party App Integration</li>
          <li>Product Setup & SEO Optimization</li>
          <li>Checkout Flow Enhancements</li>
          <li>Store Speed Optimization</li>
        </ul>
      </>
    ),
    cta: 'Launch Your Store',
    logos: shopifyTechLogos
  }
};

// --- Component ---
export default function ServicesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('web');

  useEffect(() => {
    if (['web', 'app', 'wordpress', 'shopify'].includes(tabParam || '')) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/services?tab=${tab}`);
  };

  const tabs = [
    { key: 'web', label: 'Web Development', icon: <Code size={20} /> },
    { key: 'app', label: 'App Development', icon: <Smartphone size={20} /> },
    { key: 'wordpress', label: 'WordPress', icon: <Palette size={20} /> },
    { key: 'shopify', label: 'Shopify', icon: <ShoppingBag size={20} /> }
  ];

  return (
    <main className="min-h-screen text-white px-4 py-2 font-sans">
      {/* Tabs */}
<div className="flex gap-3 px-2 py-2 mb-8 overflow-x-auto md:justify-center md:flex-wrap no-scrollbar">
  {tabs.map((tab) => (
    <button
      key={tab.key}
      onClick={() => handleTabChange(tab.key)}
      className={`flex items-center justify-center gap-2 
      whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium
      transition duration-300 flex-shrink-0
      ${activeTab === tab.key
        ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30"
        : "border-white/20 text-white hover:bg-white/10"
      }`}
    >
      <span className="flex items-center gap-2">
        {tab.icon}
        <span>{tab.label}</span>
      </span>
    </button>
  ))}
</div>

  
      {/* Content Section */}
      <div className="border border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-10 bg-white/5 max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Description */}
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-4"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {tabContent[activeTab].icon}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                {tabContent[activeTab].title}
              </h1>
            </div>
            <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-3">
              {tabContent[activeTab].description}
            </div>
            <Link
              href="/contact"
              className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition"
            >
              {tabContent[activeTab].cta}
            </Link>
          </motion.section>
  
          {/* Tech Logos */}
          <motion.section
            key={`${activeTab}-logos`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 grid grid-cols-3 sm:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
          >
            {tabContent[activeTab].logos.map((src, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/10 shadow-md hover:shadow-purple-500/30 transition transform hover:scale-105"
              >
                <Image
                  src={src}
                  alt={`Tech ${idx}`}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </motion.section>
        </div>
      </div>
    </main>
  );
  
}
