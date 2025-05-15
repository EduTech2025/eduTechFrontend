'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { email, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
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
    <nav className="bg-transparent text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-white hover:text-blue-400 transition">
          <Link href="/">Silent Order</Link>
        </div>

        {/* Center: Menu - hidden on mobile */}
        <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.name} className="relative group">
                <button
                  className={`flex items-center text-base font-medium transition ${isActive('/services') ? 'text-red-500' : 'hover:text-blue-400'
                    }`}
                >
                  {item.name}
                  <ChevronDown size={18} className="ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
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
                className={`text-base font-medium transition duration-200 ${isActive(item.path) ? 'text-red-500' : 'hover:text-blue-400'
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
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white hover:bg-white/10 transition">
                <User className="w-5 h-5 text-white" />
                <span className="text-sm">{email}</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-76 bg-white rounded-md shadow-lg ring-1 ring-black/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
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
              className="px-4 py-1.5 border border-white text-white rounded-md hover:bg-white/10 transition text-sm font-medium"
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
        <div className="md:hidden bg-gray-900 px-6 pb-4 space-y-2">
          {[...navItems, { name: isAuthenticated ? email : 'Login', path: isAuthenticated ? '/profile' : '/login' }].map((item) =>
            item.name === 'Services' ? (
              <div key={item.name}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`w-full flex items-center justify-between text-base font-medium ${isActive('/services') ? 'text-red-500' : 'text-white hover:text-blue-300'
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
                        className={`block text-sm ${pathname === service.path ? 'text-red-500 font-medium' : 'text-white hover:text-blue-300'
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
                className={`block text-base font-medium ${isActive(item.path) ? 'text-red-500' : 'text-white hover:text-blue-300'
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
