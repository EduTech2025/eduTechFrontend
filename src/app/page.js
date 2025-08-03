'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {TestimonialScroller,BrandLeadScroller} from '@/components/testimonial';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import GlassyProfileCard from '@/utils/glassy_profile_card';


import ServiceSection from '@/components/service_section';
import ProductCarousel from "@/utils/scrolling_product";

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
    image: '/assets/home/harsh.jpeg',
    email: 'info@example.com',
    linkdin: 'https://linkedin.com/in/alicejohnson',
    instagram: 'https://instagram.com/alicejohnson',
  },
  {
    name: 'Karan Negi',
    role: 'CMO / Co-Founder',
    bio: 'DevOps and automation expert with TCS background and deployment experience.',
    image: '/assets/home/harsh.jpeg',
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

const services = [
  {
    image: "/assets/service/app-development.png",
    tech: ["Next.js", "Tailwind CSS"],
    title: "Web Development",
    description: "Custom websites built for performance, responsiveness, and scalability.",
    link: "/services/web-development",
  },
  {
    image: "/assets/service/app-development.png",
    tech: ["Flutter", "React Native"],
    title: "App Development",
    description: "Cross-platform mobile apps with sleek UI and native-like performance.",
    link: "/services/app-development",
  },
  {
    image: "/assets/service/app-development.png",
    tech: ["Shopify", "Liquid"],
    title: "Shopify Website",
    description: "Elegant Shopify stores optimized for sales and SEO.",
    link: "/services/shopify",
  },
  {
    image: "/assets/service/app-development.png",
    tech: ["Figma", "Adobe XD"],
    title: "UI/UX Design",
    description: "Beautiful, user-friendly designs tailored to your brand.",
    link: "/services/uiux-design",
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
    <main className=" text-gray-800 overflow-x-hidden">
    <section className="min-h-screen bg-black text-white relative overflow-hidden px-20 md:px-30 py-20 flex items-center justify-between">
            {/* Left Content */}
            <div className="z-10 w-[60%]">
              <h1 className="text-2xl md:text-6xl font-extrabold leading-tight mb-6">
                ONE STOP SOLUTION <br /> FOR ALL YOUR PROBLEMS
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-10">
                We turn creative ambition into beautiful, functional user experiences.
                <br />
                Let’s build the future together.
              </p>

              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:from-pink-400 hover:to-purple-500 transition duration-300">
                Get Started
              </button>
            </div>

            {/* Right Side Illustration */}
            <div className="hidden md:block absolute right-0 top-0 w-[50%] max-w-[600px] z-0">
              <img
                src="/assets/home/hero_section.png"
                alt="3D Figure"
                className="w-full object-contain"
              />
            </div>

            
          </section>

    <BrandLeadScroller />
    <ServiceSection />
  
    <TestimonialScroller />
  
    <ProductCarousel />
  

      <section className="pt-4 px-6 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl text-white font-bold mb-12">Meet the Team</h2>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center w-full max-w-2xl ">
              {team.slice(0, 1).map((member, index) => (
                  <GlassyProfileCard
                      key={index}
                      name={member.name}
                      bio={member.bio}
                      designation={member.role}
                      imageUrl={member.image}
                      linkedinUrl="https://linkedin.com"
                      instagramUrl="https://instagram.com"
                      email="info@example.com"
                  />
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-4 md:grid-cols-4 gap-8 w-full">
              {team.slice(1).map((member, index) => (
                  <GlassyProfileCard
                      key={index + 1}
                      name={member.name}
                      bio={member.bio}
                      designation={member.role}
                      imageUrl={member.image}
                      linkedinUrl="https://linkedin.com"
                      instagramUrl="https://instagram.com"
                      email="info@example.com"
                  />
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}