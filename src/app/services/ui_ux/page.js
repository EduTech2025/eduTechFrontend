'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function UIUXDesignCreativePage() {
  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      <section className="py-20 px-6 bg-white/5  backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12"
        >
          <Image
            src="/assets/service/ui.png"
            alt="UIUX Process"
            width={500}
            height={400}
            className="rounded-xl p-4 border border-purple-600 shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">We Design Emotions</h2>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Our design isn't about buttons—it’s about experiences that guide and delight. Powered by deep research and user empathy.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Design Systems', 'Micro-Interactions', 'Dark Mode', 'Mobile-first', 'Accessibility'].map((tag, i) => (
                <span key={i} className="text-xs bg-white/10 text-white border border-purple-600 px-3 py-1 rounded-full backdrop-blur">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-16 bg-white/5 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h3 className="text-3xl font-semibold text-white mb-4">Design That Thinks Ahead</h3>
          <p className="text-gray-300 text-base mb-8">
            We craft intuitive flows using layout psychology, animation, and simplicity—anticipating user actions before they happen.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 border border-purple-600 rounded-xl backdrop-blur-md">
              <h4 className="text-lg font-semibold text-purple-300 mb-2">User Journey Mapping</h4>
              <p className="text-sm text-gray-200">Track and optimize user steps to enhance usability and delight.</p>
            </div>
            <div className="p-6 bg-white/10 border border-purple-600 rounded-xl backdrop-blur-md">
              <h4 className="text-lg font-semibold text-purple-300 mb-2">Interactive Prototypes</h4>
              <p className="text-sm text-gray-200">Clickable, testable mockups—experience before development begins.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white/5 py-16 px-6  backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white">UX That Amplifies Your Brand</h3>
          <p className="text-sm text-gray-300 mt-3">
            Whether it’s a fresh idea or a redesign, we turn functionality into elegant, thoughtful experiences.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 px-6 py-2 bg-white/10 text-white text-sm border border-purple-600 rounded-full hover:bg-purple-600 transition backdrop-blur"
          >
            Let’s Talk Design
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
