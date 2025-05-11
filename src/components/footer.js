'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bottom-0 w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / About */}
        <div className='col-span-1 pr-4'>
          <h2 className="text-2xl font-bold text-white mb-4">Silent Order</h2>
          <p className="text-sm leading-relaxed">
            Empowering learners with cutting-edge tech education. Your journey to digital mastery begins here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">About</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">About</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">
              <Linkedin size={20} />
            </a>
            <a href="mailto:support@edutech.com" className="hover:text-green-400 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EduTech. All rights reserved.
      </div>
    </footer>
  );
}
