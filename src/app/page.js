'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/DeSilentOrder_DarkLogo.png';
import { BookOpen, Code2, MonitorSmartphone, Rocket } from 'lucide-react';

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
];

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-80 z-0">
        <Image
            src={logo}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-80 z-0"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <BookOpen size={32} />, title: 'Expert Courses', desc: 'Learn from industry professionals with real-world experience.' },
              { icon: <Code2 size={32} />, title: 'Hands-on Projects', desc: 'Build real projects to strengthen your skills.' },
              { icon: <MonitorSmartphone size={32} />, title: 'Responsive Learning', desc: 'Access courses anywhere, on any device.' },
              { icon: <Rocket size={32} />, title: 'Career Boost', desc: 'Get certified and boost your job prospects.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="mb-4 text-indigo-600">{feature.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-indigo-50 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-700 text-lg">
              We are a passionate team of educators and developers committed to bridging the tech gap through hands-on learning and world-class instruction. Our mission is to prepare you for the demands of tomorrow’s job market today.
            </p>
          </motion.div>
          <motion.img
            src="https://static.vecteezy.com/system/resources/previews/004/409/820/large_2x/brainstorming-process-concept-with-team-meeting-free-vector.jpg"
            alt="Teamwork Illustration"
            className="w-full h-auto mix-blend-multiply"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden shadow-lg transition">
                <img src={member.image} alt={member.name} className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 p-4 text-white text-center">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm">{member.role}</p>
                  <p className="mt-2 text-xs">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
