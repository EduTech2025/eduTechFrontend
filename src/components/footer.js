'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full  text-white border-t border-white/10 backdrop-blur-md relative z-10"  >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-extrabold text-white mb-4">De Silent Order</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            We turn creative ambition into beautiful, functional user experiences. Let’s build the future together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-5 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition backdrop-blur"
          >
            Let's Collaborate
          </Link>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
          <p className="text-sm text-gray-400 mb-4">Follow us for updates and insights.</p>
          <div className="flex items-center space-x-4">
            {[ 
              { href: 'https://facebook.com', icon: <Facebook size={18} /> },
              { href: 'https://twitter.com', icon: <Twitter size={18} /> },
              { href: 'https://linkedin.com', icon: <Linkedin size={18} /> },
              { href: 'mailto:support@edutech.com', icon: <Mail size={18} /> }
            ].map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Silent Order. All rights reserved.
      </div>
    </footer>
  );
}
