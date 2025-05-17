'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function LandingOverlay({ onLaunch }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex flex-col items-center py-5 px-10 justify-start bg-black from-gradient-to-br via-gray-900 to-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
      >

    <motion.button
          className="text-white border border-white px-4 py-2 rounded-full text-md font-semibold tracking-wide relative overflow-hidden group"
          onClick={onLaunch}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: 'spring', stiffness: 100 }}
        >
          <span className="z-10 relative">Start to Launch</span>
          {/* Glow effect */}
          <span className="absolute inset-0 bg-white opacity-10 rounded-full blur-xl scale-150 group-hover:opacity-20 transition duration-500" />
        </motion.button>

        {/* Optional: Flicker / pulse animation */}
        <style jsx>{`
          button:hover {
            animation: flicker 1.5s infinite alternate;
          }

          @keyframes flicker {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.85;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
