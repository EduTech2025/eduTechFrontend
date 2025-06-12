'use client';

import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'Responsive portfolio for showcasing projects and skills using Next.js & Tailwind.',
    image: '/assets/service/web-development.png',
    link: '#',
    tech: ['Next.js', 'Tailwind CSS']
  },
  {
    title: 'E-commerce Platform',
    description: 'High-performance online store with shopping cart, payment gateway, and admin dashboard.',
    image: '/assets/service/web-development.png',
    link: '#',
    tech: ['React', 'Stripe', 'Node.js']
  },
  {
    title: 'Company Landing Page',
    description: 'Modern business landing page with smooth animations and SEO optimization.',
    image: '/assets/service/web-development.png',
    link: '#',
    tech: ['HTML5', 'CSS3', 'GSAP']
  }
];

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-14 font-sans">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto bg-white/5 border border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <Code size={32} className="text-purple-400" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Web Development</h1>
          </div>
          <p className="text-gray-300 leading-relaxed text-base">
            We create fast, scalable, and visually stunning websites using modern technologies like Next.js, Tailwind, and headless CMS. From landing pages to complex web apps — we cover it all.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition"
          >
            Get in Touch
          </Link>
        </div>

        <div className="mt-12 flex justify-center">
          <Image
            src="/assets/service/web-development.png"
            alt="Web Dev Cartoon"
            width={400}
            height={300}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-purple-500/30 transition hover:-translate-y-1 backdrop-blur-md"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={300}
              height={300}
              className=" object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Tech Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {project.tech.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-600/80 text-white text-xs px-2 py-0.5 rounded-full shadow"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              <Link
                href={project.link}
                className="inline-block text-purple-400 text-sm font-medium hover:underline mt-1"
              >
                View Project →
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </main>
  );
}
