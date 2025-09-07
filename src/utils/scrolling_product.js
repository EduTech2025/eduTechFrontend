'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const productCategories = [
    {
        title: 'PDF Editor',
        link: '/products/?pdf=open',  
        icon: '/assets/home/pdf.png',
       badge: "available",
    },
    {
        title: 'Interview Simulator',
        link: '/products/?interview=open',
        icon: '/assets/home/inter-talk.png',
       badge: "comingSoon",
    },
    {
        title: 'Travel Planner',
        link: '/products/?travel',
        icon: '/assets/home/travel_planner.png',
       badge: "comingSoon",
    },
     {
        title: 'Agentic Query Bot',
        link: '/products/?travel',
        icon: '/assets/home/agentic_query_bot.png',
       badge: "comingSoon",
    },
    {
        title: 'CRM',
        link: '/contact?subject=Request for CRM Software',
        icon: '/assets/home/crm.png',
        badge: "onDemand",
    },
    {
        title: 'Website Ecommerce',
        link: '/contact?subject=Request for Creating Ecommerce Website',
        icon: '/assets/home/ecommerce.png',
        badge: "onDemand",
    },
    {
        title: 'Templates',
        link: '/contact?subject=Request for Making Templates',
        icon: '/assets/home/templates.png',
       badge: "onDemand",
    },
    // {
    //     title: 'Finance Tracker',
    //     link: '/products/website-ecommerce',
    //     icon: '/assets/home/finance.png',
    //     badge: "comingSoon",
    // },
];

export default function ProductCategoriesCarousel() {
    const scrollRef = useRef(null);
    const [centerIndex, setCenterIndex] = useState(0);

    const getScale = (i) => {
        const diff = Math.abs(centerIndex - i);
        if (diff === 0) return 1.1;
        if (diff === 1) return 0.95;
        if (diff === 2) return 0.85;
        return 0.75;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current) return;
            const children = Array.from(
                scrollRef.current.children[0].children
            );
            let closestIndex = 0;
            let closestDistance = Infinity;

            children.forEach((child, index) => {
                const rect = child.getBoundingClientRect();
                const centerX = window.innerWidth / 2;
                const cardCenterX = rect.left + rect.width / 2;
                const distance = Math.abs(centerX - cardCenterX);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setCenterIndex(closestIndex);
        };

        const scrollEl = scrollRef.current;
        scrollEl?.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => scrollEl?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-20 px-6 text-white">
            <div className="max-w-7xl mx-auto text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Explore Our Products</h2>
                <p className="text-gray-400 text-lg">
                    From PDFs to CRMs, we have tools for all your needs
                </p>
            </div>

            <div
                ref={scrollRef}
                className="overflow-x-auto -mx-4 px-4 py-5 no-scrollbar snap-x snap-mandatory"
            >
                <div className="flex gap-6 items-center w-max">
                    {productCategories.map((category, idx) => {
                        const scale = getScale(idx);
                        const isComingSoon = category.badge === 'comingSoon';
                        const onDemand = category.badge === 'onDemand';


                        return (
                            <div
                                key={category.title + '-' + idx}
                                className="snap-center flex-shrink-0"
                                style={{ width: '260px', marginRight: '1rem' }}
                            >
                                <motion.div
                                    className="w-full h-full"
                                    style={{
                                        transform: `scale(${scale})`,
                                        transition: 'transform 0.3s ease',
                                        zIndex: scale > 1 ? 10 : 1,
                                    }}
                                >
                                    {isComingSoon ? (
                                        <div className="relative group rounded-2xl overflow-hidden bg-gray-800/40 border border-white/10 shadow-md backdrop-blur-md p-6 h-full flex flex-col items-center justify-center text-center cursor-not-allowed">
                                            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-semibold px-2 py-0.5 rounded">
                                                Coming Soon
                                            </div>
                                            <img
                                                src={category.icon}
                                                alt={category.title}
                                                className="w-full h-24 mb-4 object-contain opacity-50"
                                            />
                                            <h3 className="text-lg font-semibold text-gray-300">
                                                {category.title}
                                            </h3>
                                        </div>
                                    ): onDemand? (
                                        <Link href={category.link} className="block h-full">
                                            <div className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-purple-500/30 backdrop-blur-md transition-all p-6 h-full flex flex-col items-center justify-center text-center hover:bg-purple-600/10">
                                             <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-semibold px-2 py-0.5 rounded">
                                                On Demand
                                            </div>
                                           
                                                <img
                                                    src={category.icon}
                                                    alt={category.title}
                                                    className="w-full h-24 mb-4 object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-200">
                                                    {category.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link href={category.link} className="block h-full">
                                            <div className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-purple-500/30 backdrop-blur-md transition-all p-6 h-full flex flex-col items-center justify-center text-center hover:bg-purple-600/10">
                                                <img
                                                    src={category.icon}
                                                    alt={category.title}
                                                    className="w-full h-24 mb-4 object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-200">
                                                    {category.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-10 text-center">
                <Link
                    href="/products"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-3 rounded-full transition duration-300 shadow-lg"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}
