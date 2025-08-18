'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  FileText,
  Video,
  Image,
  BookOpen,
  Wrench,
  Bot, Code, Smartphone, Layout, HelpCircle
} from 'lucide-react';

import { motion } from 'framer-motion';


export default function Navbar({ animate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { email, isAuthenticated, logout, role } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/products' },
    { name: 'Services', hasDropdown: true, path: '/services?tab=web' },
    { name: 'Resources', hasResourceDropdown: true, path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];
  const resourceItems = [
    {
      name: 'PDF Tools',
      icon: <FileText size={16} />,
      children: [
        { name: 'PDF Editor', path: '/resources/pdf-editor' },
        { name: 'PDF to Word', path: '/resources/pdf-to-word' },
        { name: 'PDF to Image', path: '/resources/pdf-to-image' },
        { name: 'Merge PDFs', path: '/resources/merge-pdfs' },
        { name: 'Split PDF', path: '/resources/split-pdf' },
        { name: 'Compress PDF', path: '/resources/compress-pdf' },
        { name: 'Add Watermark', path: '/resources/add-watermark' },
        { name: 'Rotate PDF', path: '/resources/rotate-pdf' },
        { name: 'Unlock PDF', path: '/resources/unlock-pdf' },
        { name: 'Protect PDF', path: '/resources/protect-pdf' },
      ],
    },
    
    {
      name: 'Interview Simulators',
      icon: <HelpCircle size={16} />,
      children: [
        { name: 'ATS Resume Selection', upcoming: true },
        { name: 'Mock Interviews', upcoming: true },
        { name: 'HR Interview', upcoming: true },
        { name: 'Tech Stack Specific', upcoming: true },
      ],
    },
    {
      name: 'AI Agents',
      icon: <Bot size={16} />,
      children: [
        { name: 'AI Resume Builder', upcoming: true },
        { name: 'AI Career Mentor', upcoming: true },
        { name: 'AI Code Debugger', upcoming: true },
      ],
    },
    {
      name: 'Travel Tools',
      icon: <Wrench size={16} />,
      children: [
        { name: 'Travel Planner', upcoming: true },
        { name: 'Itinerary Generator', upcoming: true },
        { name: 'Budget Estimator', upcoming: true },
      ],
    },
    {
      name: 'Courses',
      icon: <BookOpen size={16} />,
      children: [
        { name: 'Generative AI', path: '/courses/gen-ai' },
        { name: 'Web Design', upcoming: true },
        { name: 'Next.js Development', upcoming: true },
        { name: 'Django Framework', upcoming: true },
        { name: 'Node.js Backend', upcoming: true },
        { name: 'Flutter Apps', upcoming: true },
      ],
    },
  ];
  

  
  const serviceItems = [
    { name: 'Web Development', path: '/services?tab=web', icon: <Code size={16} /> },
    { name: 'App Development', path: '/services?tab=app', icon: <Smartphone size={16} /> },
    { name: 'Wordpress', path: '/services?tab=wordpress', icon: <Layout size={16} /> },
    { name: 'Shopify', path: '/services?tab=shopify', icon: <HelpCircle size={16} /> },
  ];
  const isActive = (path) =>
    pathname === path ||
    (path === '/services' && pathname.startsWith('/services')) ||
    (path === '/resources' && pathname.startsWith('/resources'));

  return (

    <nav className="w-full py-2 fixed bg-black z-50">
    <div className="px-4 sm:px-6 lg:px-10">
      <div className="backdrop-blur-md justify-between bg-white/10 border border-white/20 rounded-full px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] flex items-center shadow-lg">
        
        {/* Left: Logo */}
        <div
          className="text-white text-md transition"
          style={{ fontFamily: "EthnocentricItalic" }}
        >
          <Link href="/">De Silent Order</Link>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-4">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.name}
                style={{ fontFamily: "Anta-Regular" }}
                className="relative group"
              >
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center text-md px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                    isActive("/services")
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
                <div className="absolute left-0 mt-2 w-56 bg-[#1a1a1a] text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
                  {serviceItems.map((service) => (
                    <Link
                      key={service.name}
                      href={service.path}
                      passHref
                      className="flex items-center gap-2 px-5 py-3 text-sm  transition duration-300 hover:bg-white/20 hover:text-blue-200"
                    >
                      {service.icon}
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : item.hasResourceDropdown ? (
              <div
                style={{ fontFamily: "Anta-Regular" }}
                key={item.name}
                className="group"
              >
                <button
                  className={`flex items-center text-md px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                    isActive("/resources")
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </button>

                {/* Full-width dropdown */}
                <div className="absolute left-0 mt-2 w-full bg-[#1a1a1a] text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {(() => {
                      const flattened = [];
                      resourceItems.forEach((category) => {
                        const { name, icon, children } = category;
                        for (let i = 0; i < children.length; i += 6) {
                          flattened.push({
                            name: i === 0 ? name : "",
                            icon: i === 0 ? icon : null,
                            children: children.slice(i, i + 6),
                          });
                        }
                      });
                      return flattened.map((block, index) => (
                        <div key={index}>
                          {(block.name || block.icon) && (
                            <div className="flex items-center gap-2 mb-2 text-white font-semibold">
                              {block.icon}
                              {block.name && <span>{block.name}</span>}
                            </div>
                          )}
                          <ul className="space-y-1 text-sm">
                            {block.children.map((link) => (
                              <li key={link.name}>
                                {link.upcoming ? (
                                  <div className="flex items-center gap-2 px-2 py-1 text-gray-400 italic">
                                    <span className="text-sm">🔒</span>
                                    {link.name}
                                  </div>
                                ) : (
                                  <Link
                                    href={link.path}
                                    className="block px-2 py-1 rounded hover:bg-purple-500 hover:text-white transition duration-200"
                                  >
                                    {link.name}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.path}
                style={{ fontFamily: "Anta-Regular" }}
                onClick={() => setIsOpen(false)}
                className={`block text-md px-[clamp(2rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                  isActive(item.path)
                    ? "bg-white text-black"
                    : "text-white hover:bg-white/10"
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
              </button>
              <div className="absolute right-0 mt-2 w-76 bg-white rounded-2xl shadow-lg ring-1 ring-black/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                <div className="px-4 py-3 border-b text-sm text-gray-600">
                  Signed in as <br />
                  <span className="font-semibold text-gray-900">{email}</span>
                </div>
                <Link
                  href={
                    role === "admin"
                      ? "/admin_dashboard/profile"
                      : "/student_dashboard/profile"
                  }
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                >
                  {role === "admin" ? "Admin Dashboard" : "Dashboard"}
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
              className="px-4 py-1.5 border border-white text-white rounded-2xl hover:bg-white/10 transition text-md "
            >
              Login / Sign Up
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
          style={{ wordBreak: "break-word" }}
        >
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.name}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`w-full flex items-center justify-between text-md px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                    isActive("/services")
                      ? "bg-white text-black"
                      : "text-white hover:text-black hover:bg-white"
                  }`}
                >
                  {item.name}
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="mt-2 space-y-1 pl-5 border-l border-white/20">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.name}
                        href={service.path}
                        className={`block px-2 py-1 text-sm transition duration-200 ${
                          pathname === service.path
                            ? "text-purple-500 font-semibold"
                            : "text-white hover:text-blue-300"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasResourceDropdown ? null : (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block text-md px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                  isActive(item.path)
                    ? "bg-white text-black"
                    : "text-white hover:text-black hover:bg-white"
                }`}
              >
                {item.name}
              </Link>
            )
          )}

          {/* Profile / Login on Mobile */}
          <div className="pt-4 border-t border-white/20">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-white mb-2">
                  Signed in as <br />
                  <span className="font-semibold break-all">{email}</span>
                </div>
                <Link
                  href={
                    role === "admin"
                      ? "/admin_dashboard/profile"
                      : "/student_dashboard/profile"
                  }
                  className="block text-white text-sm hover:text-black hover:bg-white py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {role === "admin" ? "Admin Dashboard" : "Student Dashboard"}
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
              </>
            ) : (
              <Link
                href="/login"
                className="block text-white text-md  hover:text-black hover:bg-white py-2"
                onClick={() => setIsOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
</nav>



  );
}
