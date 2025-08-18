'use client';

import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from 'framer-motion';
import { Mail, User, BookOpenText, MessageSquareText } from 'lucide-react';
import Toast from '@/utils/toast';
import contactApi from '@/lib/contact_api';

export default function ContactUsPage() {
  const searchParams = useSearchParams();
  const subjectFromUrl = searchParams.get("subject") || "";
  
  const [form, setForm] = useState({ name: '', email: '', subject: subjectFromUrl, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);


  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await contactApi.contact_email(form);
      if (response.status === 200) {
        setToast({ type: 'success', message: 'Message sent successfully!' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setToast({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Something went wrong. Try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex pt-[5%] items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-10 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-10 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">Subject</label>
            <div className="relative">
              <BookOpenText className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full px-10 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">Message</label>
            <div className="relative">
              <MessageSquareText className="absolute left-3 top-3 text-white/60" size={18} />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Type your message..."
                className="w-full px-10 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 bg-white/10 border border-white/20 text-white rounded-lg transition duration-300 ${
              submitting
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-white/20 hover:text-white'
            }`}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
