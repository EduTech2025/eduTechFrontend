'use client';

import { useState, useEffect } from 'react';
import LandingOverlay from '../landing/landing';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { motion, AnimatePresence } from 'framer-motion';

export default function ClientRoot({ children }) {
  const [launched, setLaunched] = useState(false);
  const [navbarShown, setNavbarShown] = useState(false);
  const [contentShown, setContentShown] = useState(false);

  const handleLaunch = () => {
    setLaunched(true);
    // Start showing navbar immediately after launch is triggered
    setNavbarShown(true);
  };

  useEffect(() => {
    if (launched) {
      // Show content after 2 seconds (2000ms)
      const contentTimer = setTimeout(() => {
        setContentShown(true);
      }, 2000);

      return () => {
        clearTimeout(contentTimer);
      };
    }
  }, [launched]);

  return (
    <>
      {/* <AnimatePresence>
        {!launched && <LandingOverlay onLaunch={handleLaunch} />}
      </AnimatePresence>

      {navbarShown && <Navbar animate={launched} />}

      {contentShown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <main className="pt-16">{children}</main>
          <Footer />
        </motion.div>
      )} */}
      <Navbar/>
          <main className="pt-16">{children}</main>
          <Footer />
      
    </>
  );
}