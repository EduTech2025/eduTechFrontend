'use client';

import { useState, useEffect } from 'react';
import LandingOverlay from '../landing/landing';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { usePathname } from 'next/navigation';

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

   const pathname = usePathname();
   const hiddenFooterPaths = [
    '/student_dashboard',
    '/contact',
    '/products',
    '/login',
    '/admin_dashboard',
  ];
  
  const hideFooter = hiddenFooterPaths.some(path => pathname.startsWith(path));
  


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

      <Navbar/>
          <main className='pt-16'>{children}</main>
        {hideFooter ?null: <Footer />}
      
    </>
  );
}