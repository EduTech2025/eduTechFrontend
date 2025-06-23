'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, User, BookOpenText, MessageSquareText } from 'lucide-react';
import Toast from '@/utils/toast';
import contactApi from '@/lib/contact_api';

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="pl-10 pr-3 w-full bg-black/30 text-white border border-white/20 rounded-md py-2 text-sm placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="pl-10 pr-3 w-full bg-black/30 text-white border border-white/20 rounded-md py-2 text-sm placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Subject */}
          <div className="relative">
            <BookOpenText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="pl-10 pr-3 w-full bg-black/30 text-white border border-white/20 rounded-md py-2 text-sm placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquareText className="absolute left-3 top-4 h-5 w-5 text-white/60" />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message..."
              required
              rows={4}
              className="pl-10 pr-3 pt-2 w-full bg-black/30 text-white border border-white/20 rounded-md text-sm placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className={`w-full py-2 rounded-lg text-white text-sm font-semibold transition ${
              submitting
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
