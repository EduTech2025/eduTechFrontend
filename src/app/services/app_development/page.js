'use client';

import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'Fitness Tracker App',
    description: 'Cross-platform mobile app for tracking workouts, calories, and progress with real-time sync.',
    image: '/assets/service/app-development.png',
    link: '#',
    tech: ['Flutter', 'Firebase']
  },
  {
    title: 'E-learning Mobile App',
    description: 'Interactive learning platform with video courses, quizzes, and progress dashboards.',
    image: '/assets/service/app-development.png',
    link: '#',
    tech: ['React Native', 'GraphQL']
  },
  {
    title: 'Food Delivery Platform',
    description: 'Modern food delivery app with real-time tracking, payment integration, and restaurant dashboards.',
    image: '/assets/service/app-development.png',
    link: '#',
    tech: ['Next.js', 'Stripe']
  }
];

export default function AppDevelopmentPage() {
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
            <Smartphone size={32} className="text-purple-400" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">App Development</h1>
          </div>
          <p className="text-gray-300 leading-relaxed text-base">
            From scalable cross-platform apps to native experiences, we build engaging mobile applications tailored to your business needs.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition"
          >
            Start Your App
          </Link>
        </div>

        <div className="mt-12 flex justify-center">
          <Image
            src="/assets/service/app-development.png"
            alt="App Dev Illustration"
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
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Tech Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
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
