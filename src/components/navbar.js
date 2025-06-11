'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

import { motion } from 'framer-motion';


export default function Navbar({ animate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { email, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/products' },
    { name: 'Blog', path: '/blogs/user' },
    { name: 'Services', hasDropdown: true },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceItems = [
    { name: 'Web Development', path: '/services/web-development' },
    { name: 'App Development', path: '/services/app-development' },
    { name: 'UI/UX Design', path: '/services/ui-ux' },
    { name: 'Consulting', path: '/services/consulting' },
  ];

  const isActive = (path) =>
    pathname === path || (path === '/services' && pathname.startsWith('/services'));

  return (
    
      <nav className="w-full py-4 fixed top-4 z-50 ">
        <motion.div
        className="relative w-full max-w-screen-2xl"
        initial={animate ? {
          clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
          opacity: 0
        } : {}}
        animate={animate ? {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          transition: {
            clipPath: {
              duration: 1.2,
              ease: [0.83, 0, 0.17, 1] // Custom cubic bezier for dramatic effect
            },
            opacity: {
              duration: 0.8,
              delay: 0.3
            }
          }
        } : {}}
      >
        {/* Glow effect container */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0"
          animate={animate ? {
            opacity: [0, 0.3, 0],
            transition: {
              duration: 1.5,
              delay: 0.8
            }
          } : {}}
        />
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="backdrop-blur-md justify-between bg-white/10 border border-white/20 rounded-full px-6 py-1 flex items-center space-x-6 shadow-lg">

            {/* Left: Logo */}
            <div className=" font-100 text-white  transition" style={{ fontFamily: 'EthnocentricItalic' }}>
              <Link href="/">De Silent Order</Link>
            </div>

            {/* Center: Menu - hidden on mobile */}
            <div className="hidden md:flex space-x-8 items-center justify-center flex-1 gap-4">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div style={{ fontFamily: 'Anta-Regular' }} key={item.name} className="relative group">
                    <button
                      className={`flex items-center text-base font-medium px-6 py-1 rounded-2xl transition duration-200 ${isActive('/services') ? 'bg-white text-black' : 'text-white hover:text-black hover:bg-white'
                        }`}
                    >
                      {item.name}
                      <ChevronDown size={18} className="ml-1" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
                      {serviceItems.map((service) => (
                        <Link
                          key={service.name}
                          href={service.path}
                          className={`block px-4 py-2 hover:bg-gray-100 ${pathname === service.path ? 'text-red-500 font-medium' : ''
                            }`}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    style={{ fontFamily: 'Anta-Regular' }}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base font-medium px-6 py-1 rounded-2xl transition duration-200 ${isActive(item.path) ? 'bg-white text-black' : 'text-white hover:text-black hover:bg-white'
                      }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Right: Login/Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-6 py-1.5 rounded-2xl border border-white hover:bg-white/10 transition">
                    <User className="w-5 h-5 text-white" />
                    <span className="text-sm">{email}</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute right-0 mt-2 w-76 bg-white rounded-2xl shadow-lg ring-1 ring-black/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                    <div className="px-4 py-3 border-b text-sm text-gray-600">
                      Signed in as <br />
                      <span className="font-semibold text-gray-900">{email}</span>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-1.5 border border-white text-white rounded-2xl hover:bg-white/10 transition text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div
              className="md:hidden mt-2 w-full max-w-md mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-4 shadow-lg space-y-3 overflow-hidden"
              style={{ wordBreak: 'break-word' }}
            >
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`w-full flex items-center justify-between text-base font-medium px-6 py-1 rounded-2xl transition duration-200 ${isActive('/services') ? 'bg-white text-black' : 'text-white hover:text-black hover:bg-white'
                        }`}
                    >
                      {item.name}
                      <ChevronDown
                        size={18}
                        className={`transform transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="mt-2 space-y-1 pl-5 border-l border-white/20">
                        {serviceItems.map((service) => (
                          <Link
                            key={service.name}
                            href={service.path}
                            className={`block px-2 py-1 text-sm transition duration-200 ${pathname === service.path
                                ? 'text-red-500 font-semibold'
                                : 'text-white hover:text-blue-300'
                              }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base font-medium px-6 py-1 rounded-2xl transition duration-200 ${isActive(item.path) ? 'bg-white text-black' : 'text-white hover:text-black hover:bg-white'
                      }`}
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* Profile / Login on Mobile */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-white mb-2">
                    Signed in as <br />
                    <span className="font-semibold break-all">{email}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="block text-white text-sm hover:text-black hover:bg-white py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block text-white text-sm hover:text-black hover:bg-white py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left text-sm text-red-400 hover:text-red-600 py-1"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block text-white text-sm font-medium hover:text-black hover:bg-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
          
        </div>
        </motion.div>
      </nav>
    
  );
}
