"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [text, setText] = useState("");
  const fullText = "Who We Are";

  const quoteText =
    "Work in Shadows, keep the silence .. Your Work Louder than your words";

  const [quote, setQuote] = useState("");


  // Typewriter Effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Looping Typewriter for Quote
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    const speed = 80;
    const pauseTime = 1500;

    const interval = setInterval(() => {
      if (!isDeleting) {
        // Typing
        setQuote(quoteText.slice(0, i + 1));
        i++;
        if (i === quoteText.length) {
          isDeleting = true;
          setTimeout(() => {}, pauseTime);
        }
      } else {
        // Deleting
        setQuote(quoteText.slice(0, i - 1));
        i--;
        if (i === 0) {
          isDeleting = false;
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black via-gray-900 to-black px-4 sm:px-6 lg:px-8 py-12">
      {/* Floating Blobs */}
      <div className="absolute -top-20 -left-20 w-56 sm:w-72 h-56 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-bounce" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-6xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 text-center text-white"
      >
      {/* Title with Typewriter - Clean & Professional */}
      <h1
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-10 
                  bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
                  tracking-tight leading-tight text-center relative"
      >
        {text}

        {/* Minimal underline accent */}
        <span className="absolute left-1/2 -bottom-3 w-16 sm:w-24 h-[3px] 
                        bg-gradient-to-r from-purple-400 to-blue-400 
                        rounded-full -translate-x-1/2" />
      </h1>


        
      {/* Looping Quote */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 font-mono">
          {quote}
          <span className="animate-pulse">|</span>
        </p>



        {/* Intro */}
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 max-w-3xl mx-auto">
          We are <span className="font-semibold text-white">De Silent Order</span>,  
          a forward-thinking organization dedicated to shaping the future.  
          Our mission is to guide students with trending technical skills, provide 
          opportunities, and turn ideas into impactful realities.  
          We believe in making learning simpler, smarter, and more accessible.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {[
            { src: "/assets/about/teamwork.jpg", alt: "Teamwork" },
            { src: "/assets/about/inovation.jpg", alt: "Innovation" },
            { src: "/assets/about/learning.jpg", alt: "Learning" },
          ].map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group w-full h-56 rounded-2xl overflow-hidden shadow-lg border border-white/20"
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Overlay with Alt Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg sm:text-xl font-semibold">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission, Vision & More */}
        <div className="mt-16 space-y-14 text-center">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Our Mission
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              To empower individuals with the right knowledge and tools to innovate,  
              excel, and build a brighter tomorrow.  
              <br />  
              We aim to bridge the gap between education and real-world opportunities,  
              helping students and professionals transform ideas into impactful solutions.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Our Vision
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              To become a global hub for innovation, skill-building, and futuristic solutions  
              that make life easier and create endless opportunities.  
              <br />  
              We envision a world where technology blends seamlessly with creativity,  
              shaping industries and empowering communities.
            </p>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              Our Values
            </h2>
            <ul className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto space-y-2">
              <li>🌱 <span className="font-semibold text-white">Innovation First</span> – turning ideas into impactful realities.</li>
              <li>🤝 <span className="font-semibold text-white">Collaboration</span> – we grow stronger by working together.</li>
              <li>💡 <span className="font-semibold text-white">Continuous Learning</span> – staying ahead with future-ready skills.</li>
              <li>🌍 <span className="font-semibold text-white">Social Impact</span> – building technology that benefits people and society.</li>
            </ul>
          </motion.div>

          {/* Culture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
              Our Culture
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              At <span className="font-semibold text-white">De Silent Order</span>, we believe in  
              working in the shadows, innovating quietly, and letting our work speak louder  
              than words. Our team thrives in an environment of trust, creativity, and freedom  
              to experiment.
            </p>
          </motion.div>

          {/* Closing Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 text-xl md:text-2xl font-semibold text-white italic"
          >
            “Together, we innovate. Together, we build the future.”
          </motion.p>
          </div>
      </motion.div>
    </section>
  );
}
