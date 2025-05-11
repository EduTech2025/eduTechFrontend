'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Login', path: '/login' },
    { name: 'Services', hasDropdown: true },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceItems = [
    { name: 'Web Development', path: '/services/web-development' },
    { name: 'App Development', path: '/services/app-development' },
    { name: 'UI/UX Design', path: '/services/ui-ux' },
    { name: 'Consulting', path: '/services/consulting' },
  ];

  // Helper to check if link is active
  const isActive = (path) => pathname === path || (path === '/services' && pathname.startsWith('/services'));

  return (
    <nav className="bg-transparent text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white hover:text-blue-400 transition">
          <Link href="/">Silent Order</Link>
        </div>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.name} className="relative group">
                <button
                  className={`flex items-center text-base font-medium transition ${
                    isActive('/services') ? 'text-red-500' : 'hover:text-blue-400'
                  }`}
                >
                  {item.name}
                  <ChevronDown size={18} className="ml-1" />
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
                  {serviceItems.map((service) => (
                    <Link
                      key={service.name}
                      href={service.path}
                      className={`block px-4 py-2 hover:bg-gray-100 ${
                        pathname === service.path ? 'text-red-500 font-medium' : ''
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
                className={`text-base font-medium transition duration-200 ${
                  isActive(item.path) ? 'text-red-500' : 'hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 pb-4 space-y-2">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.name}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`w-full flex items-center justify-between text-base font-medium ${
                    isActive('/services') ? 'text-red-500' : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item.name}
                  <ChevronDown size={18} className={`transform transition ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.name}
                        href={service.path}
                        className={`block text-sm ${
                          pathname === service.path ? 'text-red-500 font-medium' : 'text-white hover:text-blue-300'
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
                className={`block text-base font-medium ${
                  isActive(item.path) ? 'text-red-500' : 'text-white hover:text-blue-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
