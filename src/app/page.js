'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import TestimonialScroller from '@/components/testimonial';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import GlassyProfileCard from '@/utils/glassy_profile_card';

const team = [
  {
    name: 'Alice Johnson',
    role: 'Lead Instructor',
    bio: '10+ years in tech education and software engineering.',
    image: 'https://cdn.pixabay.com/photo/2024/02/20/08/40/cartoon-8584938_1280.jpg',
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
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
    perView: 'auto',
    spacing: 15,
    },
  });

  return (
    <main className="bg-black text-gray-800 overflow-x-hidden">
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-80 z-0">
          <Image
            src="/assets/DeSilentOrder_DarkLogo_new.png"
            fill
            style={{ objectFit: "contain" }}
            alt="Background"
            className="opacity-80 z-0"
          />
        </div>
      </section>

      <section className="py-20 text-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-white text-lg">
              We are a passionate team of educators and developers committed to bridging the tech gap through hands-on learning and world-class instruction and provide you with best software solution and services. Our mission is to prepare you for the demands of tomorrow’s job market today.
            </p>
          </motion.div>

          <motion.img
            src="https://static.vecteezy.com/system/resources/previews/046/449/468/non_2x/a-man-in-a-hooded-cloak-with-a-sword-on-transparent-background-free-png.png"
            alt="3D Assassin"
            className="w-full h-auto rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 text-lg">
            Empowering you with tailored tech solutions built for the future.
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider px-2">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="keen-slider__slide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="group relative rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 shadow-xl hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={180}
                  className=" rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                  {service.tech.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-600/90 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-xs text-gray-300 line-clamp-3">{service.description}</p>
                  <Link
                    href={service.link}
                    className="inline-block text-purple-400 text-xs font-medium hover:underline"
                  >
                    View Service →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-gray-400 text-lg">
            Explore our tools designed to simplify and accelerate your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {Array(4).fill({
            image: "/assets/service/app-development.png",
            tech: ["React", "PDF.js"],
            title: "PDF Editor",
            description: "Edit, merge, split, and annotate PDF files in a user-friendly interface.",
            link: "/products/pdf-editor",
          }).map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-purple-500/30 transition hover:-translate-y-1 backdrop-blur-md"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover group-hover:scale-105 transition-transform duration-500 w-full"
              />
              <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                {product.tech.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-600/80 text-white text-xs px-2 py-0.5 rounded-full shadow"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {product.description}
                </p>
                <Link
                  href={product.link}
                  className="inline-block text-purple-400 text-sm font-medium hover:underline mt-1"
                >
                  View Product →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-3 rounded-full transition duration-300 shadow-lg"
          >
            View All Products
          </Link>
        </div>
      </section>

      <section className="pt-10 px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl text-white font-bold mb-12">Meet the Team</h2>
          <div className='flex justify-center items-center'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
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
        </div>
      </section>

      <TestimonialScroller />
    </main>
  );
}