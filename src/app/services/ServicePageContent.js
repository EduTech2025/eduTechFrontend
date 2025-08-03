'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- Projects & Tech Logos ---

const webTechLogos = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-plain-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain.svg'
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
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/shopify/shopify-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain.svg'
];

const uiuxTechTags = ['Design Systems', 'Micro-Interactions', 'Dark Mode', 'Mobile-first', 'Accessibility'];

const tabContent = {
  web: {
    title: 'Web Development',
    icon: <Code size={32} className="text-purple-400" />,
    description:
      'We create fast, scalable, and visually stunning websites using modern technologies like Next.js, Tailwind, and headless CMS.',
    cta: 'Get in Touch',
    logos: webTechLogos
  },
  app: {
    title: 'App Development',
    icon: <Smartphone size={32} className="text-purple-400" />,
    description:
      'From scalable cross-platform apps to native experiences, we build engaging mobile applications tailored to your business needs.',
    cta: 'Start Your App',
    logos: appTechLogos
  },
  shopify: {
    title: 'Shopify Development',
    icon: <Palette size={32} className="text-purple-400" />,
    description:
      'We build high-converting Shopify stores, custom themes, and subscription apps using Liquid, GraphQL, and Tailwind CSS.',
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
    if (['web', 'app', 'uiux', 'shopify'].includes(tabParam || '')) {
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
    { key: 'uiux', label: 'UI/UX Design', icon: <Palette size={20} /> },
    { key: 'shopify', label: 'Shopify', icon: <Palette size={20} /> }
  ];

  return (
    <main className="min-h-screen text-white px-6 py-6 font-sans">
      {/* Tabs */}
      <div className="flex justify-center mb-8 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm transition duration-300 ${
              activeTab === tab.key
                ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30'
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="border border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 bg-white/5">
        {activeTab === 'uiux' ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
              <Image
                src="/assets/service/ui.png"
                alt="UIUX"
                width={500}
                height={400}
                className="rounded-xl p-4 border border-purple-600 shadow-lg"
              />
              <div>
                <h2 className="text-3xl font-bold mb-4">We Design Emotions</h2>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  Our design isn't about buttons—it’s about experiences that guide and delight. Powered by deep research and user empathy.
                </p>
                <div className="flex flex-wrap gap-2">
                  {uiuxTechTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/10 text-white border border-purple-600 px-3 py-1 rounded-full backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto text-center py-10">
              <h3 className="text-3xl font-semibold mb-4">Design That Thinks Ahead</h3>
              <p className="text-gray-300 text-base mb-8">
                We craft intuitive flows using layout psychology, animation, and simplicity—anticipating user actions before they happen.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 text-left">
                <div className="p-6 bg-white/10 border border-purple-600 rounded-xl backdrop-blur-md">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">User Journey Mapping</h4>
                  <p className="text-sm text-gray-200">Track and optimize user steps to enhance usability and delight.</p>
                </div>
                <div className="p-6 bg-white/10 border border-purple-600 rounded-xl backdrop-blur-md">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">Interactive Prototypes</h4>
                  <p className="text-sm text-gray-200">Clickable, testable mockups—experience before development begins.</p>
                </div>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold">UX That Amplifies Your Brand</h3>
              <p className="text-sm text-gray-300 mt-3">
                Whether it’s a fresh idea or a redesign, we turn functionality into elegant, thoughtful experiences.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-6 px-6 py-2 bg-white/10 text-white text-sm border border-purple-600 rounded-full hover:bg-purple-600 transition backdrop-blur"
              >
                Let’s Talk Design
              </Link>
            </div>
          </motion.section>
        ) : (
          <div className="text-center flex p-4 gap-10 justify-between flex-row items-center">
            <motion.section
              key={activeTab}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-center gap-3">
                  {tabContent[activeTab].icon}
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tabContent[activeTab].title}</h1>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">{tabContent[activeTab].description}</p>
                <Link
                  href="/contact"
                  className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition"
                >
                  {tabContent[activeTab].cta}
                </Link>
              </div>
            </motion.section>

            <motion.section
              key={`${activeTab}-logos`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 py-10"
            >
              {tabContent[activeTab].logos.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl shadow-md hover:shadow-purple-500/30 transition"
                >
                  <Image
                    src={src}
                    alt={`Tech ${idx}`}
                    width={50}
                    height={50}
                    className="transition-transform duration-300"
                  />
                </div>
              ))}
            </motion.section>
          </div>
        )}
      </div>
    </main>
  );
}
