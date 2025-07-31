'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
      <footer
          className="w-full text-white h-[80%] mt-6 relative z-10 backdrop-blur-md bg-no-repeat bg-cover"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-extrabold mb-4">De Silent Order</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              We turn creative ambition into beautiful, functional user experiences. Let’s build the future together.
            </p>
            <Link
                href="/contact"
                className="inline-block px-6 py-2 text-sm font-semibold rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:bg-purple-600/20 transition backdrop-blur-sm"
            >
              Let's Collaborate
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-purple-400 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition">About</Link></li>
              <li><Link href="/services" className="hover:text-purple-400 transition">Services</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-purple-400 transition">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-purple-400 transition">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Connected</h3>
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
                      className="p-2 rounded-full border border-purple-400/30 bg-white/5 hover:bg-purple-500/20 transition text-purple-300"
                  >
                    {icon}
                  </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-cover bg-center px-14 ">
          <img src={'/assets/image_footer.png'} width={"35%"} height={"auto"} className="px-4" />
          <img src={'/assets/footer_name_image.png'} width={"35%"} height={"auto"} className="px-4"/>
          <img src={'/assets/image_footer.png'} width={"35%"} height={"auto"} className="px-4" />

        </div>
        {/* Bottom Bar */}
        <div className="py-4border-white/10 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Silent Order. All rights reserved.
        </div>
      </footer>
  );
}
