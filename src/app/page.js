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
    name: 'Alice Johnson',
    role: 'Lead Instructor',
    bio: '10+ years in tech education and software engineering.',
    image: 'https://cdn.pixabay.com/photo/2024/02/20/08/40/cartoon-8584938_1280.jpg',
    linkdin: 'https://linkedin.com/in/alicejohnson',
    instagram: 'https://instagram.com/alicejohnson',

  },
  {
    name: 'Bob Smith',
    role: 'Curriculum Designer',
    bio: 'Specialist in creating interactive, outcome-based learning.',
    image: 'https://cdn.pixabay.com/photo/2023/04/21/16/22/ai-generated-7942209_1280.jpg',
  },
  {
    name: 'Carla Reyes',
    role: 'Frontend Developer',
    bio: 'Expert in UX/UI and building responsive interfaces.',
    image: 'https://cdn.pixabay.com/photo/2024/02/23/05/39/ai-generated-8591339_1280.jpg',
  },
  {
    name: 'David Lin',
    role: 'Backend Engineer',
    bio: 'Server architecture and database wizard.',
    image: 'https://static.vecteezy.com/system/resources/previews/046/449/468/non_2x/a-man-in-a-hooded-cloak-with-a-sword-on-transparent-background-free-png.png',
  },
  {
    name: 'Eva Tan',
    role: 'Product Manager',
    bio: 'Bringing ideas to life with agile methodology.',
    image: 'https://png.pngtree.com/png-clipart/20250108/original/pngtree-businesswoman-working-on-laptop-png-image_19319571.png',
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

          <section
          className="bg-fixed bg-center bg-cover min-h-screen"
          style={{
            backgroundImage: "url('/assets/background.png')",
          }}
        >
  <div className=" bg-opacity-60  w-full">
    <BrandLeadScroller />
  </div>
</section>
  <div className=" bg-opacity-70 w-full">
    <ServiceSection />
  </div>

  <div className=" bg-opacity-60  w-full">
    <TestimonialScroller />
  </div>

  <div className=" bg-opacity-70  w-full">
    <ProductCarousel />
  </div>


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