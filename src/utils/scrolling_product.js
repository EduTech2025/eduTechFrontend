'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const productCategories = [
    {
        title: 'PDF Editor',
        link: '/products/pdf-editor',
        icon: '/illustrations/pdf-editor.svg',
    },
    {
        title: 'Interview Preparation',
        link: '/products/interview-preparation',
        icon: '/illustrations/interview.svg',
    },
    {
        title: 'CRM',
        link: '/products/crm',
        icon: '/illustrations/crm.svg',
    },
    {
        title: 'Website Ecommerce',
        link: '/products/website-ecommerce',
        icon: '/illustrations/ecommerce.svg',
    },
    {
        title: 'Templates',
        link: '/products/templates',
        icon: '/illustrations/templates.svg',
    },
    {
        title: 'Templates',
        link: '/products/templates',
        icon: '/illustrations/templates.svg',
    },
    {
        title: 'Templates',
        link: '/products/templates',
        icon: '/illustrations/templates.svg',
    },
];

export default function ProductCategoriesCarousel() {
    const scrollRef = useRef(null);
    const [centerIndex, setCenterIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(null);

    const getScale = (i) => {
        // if (hoverIndex === i) return 0.9;
        // if (hoverIndex !== null) return 0.85; // all others shrink slightly when one is hovered

        const diff = Math.abs(centerIndex - i);
        if (diff === 0) return 1.1;
        if (diff === 1) return 0.95;
        if (diff === 2) return 0.85;
        return 0.75;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current) return;
            const children = Array.from(scrollRef.current.children[0].children);
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
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Explore Our Product Categories</h2>
                <p className="text-gray-400 text-lg">
                    From PDFs to CRMs, we have tools for all your needs
                </p>
            </div>

            <div
                ref={scrollRef}
                className="overflow-x-auto -mx-4 px-4 pb-6 no-scrollbar snap-x snap-mandatory"
            >
                <div className="flex gap-6 items-center w-max">
                    {productCategories.map((category, idx) => {
                        const scale = getScale(idx);

                        return (
                            <div
                                key={category.title + '-' + idx}
                                className="snap-center flex-shrink-0"
                                style={{
                                    width: '260px', // Fixed layout width
                                    marginRight: '1rem',
                                }}
                            >
                                <motion.div
                                    className="w-full h-full"
                                    style={{
                                        transform: `scale(${scale})`,
                                        transition: 'transform 0.3s ease',
                                        zIndex: scale > 1 ? 10 : 1,
                                    }}
                                >
                                    <Link href={category.link} className="block h-full">
                                        <div className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-purple-500/30 backdrop-blur-md transition-all p-6 h-full flex flex-col items-center justify-center text-center hover:bg-purple-600/10">
                                            <img
                                                src={category.icon}
                                                alt={category.title}
                                                className="w-16 h-16 mb-4 object-contain transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <h3 className="text-lg font-semibold text-white group-hover:text-purple-200">
                                                {category.title}
                                            </h3>
                                        </div>
                                    </Link>
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
