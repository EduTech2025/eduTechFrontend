'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
    name: 'Bob Smith',
    role: 'Curriculum Designer',
    bio: 'Specialist in creating interactive, outcome-based learning.',
    image: 'https://static.vecteezy.com/system/resources/previews/046/449/468/non_2x/a-man-in-a-hooded-cloak-with-a-sword-on-transparent-background-free-png.png',
  },
  {
    name: 'Carla Reyes',
    role: 'Frontend Developer',
    bio: 'Expert in UX/UI and building responsive interfaces.',
    image: 'https://png.pngtree.com/png-clipart/20250108/original/pngtree-businesswoman-working-on-laptop-png-image_19319571.png',
  },
];

export default function Home() {
  
  return (
    <main className="bg-black text-gray-800 overflow-x-hidden">
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-80 z-0">
          <Image
            src='/assets/DeSilentOrder_DarkLogo_new.png'
            alt="Background"
            layout="fill"
            objectFit="contain"
            className="opacity-80 z-0"
          />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 text-white bg-black-50 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-white text-lg">
              We are a passionate team of educators and developers committed to bridging the tech gap through hands-on learning and world-class instruction. Our mission is to prepare you for the demands of tomorrow’s job market today.
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
      

      {/* Team Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl text-white font-bold mb-12">Meet the Team</h2>
          <div className='flex justify-center items-center'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <GlassyProfileCard
                  name="Jane Doe"
                  bio="Creative UI Designer"
                  designation="Senior Product Designer"
                  imageUrl={member.image}
                  linkedinUrl="https://linkedin.com/in/janedoe"
                  instagramUrl="https://instagram.com/janedoe"
                  email="jane@example.com"
                />
                
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
