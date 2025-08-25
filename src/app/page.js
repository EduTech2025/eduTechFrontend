'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { TestimonialScroller, BrandLeadScroller } from '@/components/testimonial';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import GlassyProfileCard from '@/utils/glassy_profile_card';
import ServiceSection from '@/components/service_section';
import ProductCarousel from '@/utils/scrolling_product';

const team = [
  {
    name: 'Harsh Yadav',
    role: 'CEO / Founder',
    bio: 'Entrepreneur focused on startups, growth, and building impactful leadership strategies.',
    image: '/assets/home/harsh.jpeg',
    email: 'info@example.com',
    linkdin: 'https://linkedin.com/in/alicejohnson',
    instagram: 'https://instagram.com/alicejohnson',
  },
  {
    name: 'Wasif',
    role: 'CTO / Co-Founder',
    bio: 'Expert in AI, cybersecurity, and machine learning with strong tech leadership skills.',
    image: '/assets/home/wasif.jpeg',
    email: 'info@example.com',
    linkdin: 'https://linkedin.com/in/alicejohnson',
    instagram: 'https://instagram.com/alicejohnson',
  },
  {
    name: 'Himasnhu Swami',
    role: 'CTO / Co-Founder',
    bio: 'App, web, and AI developer with a passion for scalable tech solutions with leadership skills.',
    image: '/assets/home/himanshu.jpg',
    email: 'info@example.com',
    linkdin: 'https://linkedin.com/in/alicejohnson',
    instagram: 'https://instagram.com/alicejohnson',
  },
  {
    name: 'Karan Negi',
    role: 'CMO / Co-Founder',
    bio: 'DevOps and automation expert with TCS background and deployment experience.',
    image: '/assets/home/karan.jpeg',
    email: 'info@example.com',
    linkdin: 'https://linkedin.com/in/alicejohnson',
    instagram: 'https://instagram.com/alicejohnson',
  },
  {
    name: 'Sanjeev Kumar',
    role: 'CMO / Co-Founder',
    bio: 'Marketing and consulting strategist focused on business growth and partnerships.',
    image: '/assets/home/sanjeev.jpeg',
    email: 'info@example.com',
    linkdin: 'https://linkedin.com/in/alicejohnson',
    instagram: 'https://instagram.com/alicejohnson',
  },
];

export default function Home() {
  const [paused, setPaused] = useState(false);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 'auto',
      spacing: 15,
    },
  });

  

  return (
    <main className="text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen bg-black text-white relative overflow-hidden px-6 md:px-12 lg:px-20 md:py-20 flex flex-col-reverse md:flex-row items-center md:justify-between justify-end md:gap-10 gap-20">
        {/* Left Content */}
        <div className="z-10 w-full md:w-[60%]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            ONE STOP SOLUTION <br /> FOR ALL YOUR PROBLEMS
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
            We turn creative ambition into beautiful, functional user experiences.
            <br />
            Let’s build the future together.
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:from-pink-400 hover:to-purple-500 transition duration-300">
            Get Started
          </button>
        </div>

        {/* Right Illustration */}
        <div className="w-full md:w-[40%] max-w-[600px]">
          <img
            src="/assets/home/hero_section.png"
            alt="3D Figure"
            className="w-full object-contain"
          />
        </div>
      </section>

      {/* Brand, Services, Testimonials, Products */}
      <BrandLeadScroller />
      <ServiceSection />
      <TestimonialScroller />
      <ProductCarousel />

      {/* Team Section */}
      <section className="py-12 px-4 sm:px-6 md:px-10 lg:px-20 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Meet the Team</h2>

          {/* CEO Card */}
          <div className="flex justify-center mb-12">
            {team.slice(0, 1).map((member, index) => (
              <GlassyProfileCard
                key={index}
                name={member.name}
                bio={member.bio}
                designation={member.role}
                imageUrl={member.image}
                linkedinUrl={member.linkdin}
                instagramUrl={member.instagram}
                email={member.email}
              />
            ))}
          </div>

          {/* Other Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.slice(1).map((member, index) => (
              <GlassyProfileCard
                key={index + 1}
                name={member.name}
                bio={member.bio}
                designation={member.role}
                imageUrl={member.image}
                linkedinUrl={member.linkdin}
                instagramUrl={member.instagram}
                email={member.email}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
