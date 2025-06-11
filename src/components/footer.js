'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#F0F8FF] bg-opacity-10 backdrop-blur-md shadow-inner border-t border-gray-400">
      {/* DE SILENT ORDER Divider */}
      <div className="w-full px-6 pt-10 pb-4 text-center">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl text-[#000000] font-bold whitespace-nowrap overflow-hidden"
          style={{
            fontFamily: 'EthnocentricItalic',
            textShadow: '0 0 12px rgb(93, 99, 104)',
            letterSpacing: '0.25em',
          }}
        >
          DE SILENT ORDER
        </h1>
      </div>

      {/* Grid Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-black">
        {/* About */}
        <div>
          <p className="text-sm text-black leading-loose">
            We empower creators and learners with cutting-edge technology, pushing the boundaries of what's possible.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <ul className="space-y-2 text-sm text-black">
            <li><Link href="/" className="hover:text-[#000000] transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#000000] transition">About</Link></li>
            <li><Link href="/services" className="hover:text-[#000000] transition">Services</Link></li>
            <li><Link href="/contact" className="hover:text-[#000000] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <ul className="space-y-2 text-sm text-black">
            <li>Email: <a href="mailto:desilentorder@gmail.com" className="hover:text-[#000000]">desilentorder@gmail.com</a></li>
            <li>Remote-first | India</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#000000] transition"><Facebook size={20} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#000000] transition"><Twitter size={20} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#000000] transition"><Linkedin size={20} /></a>
          <a href="mailto:desilentorder@gmail.com" className="hover:text-[#000000] transition"><Mail size={20} /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-black pb-6">
        © {new Date().getFullYear()} DE SILENT ORDER. All rights reserved.
      </div>
    </footer>
  );
}