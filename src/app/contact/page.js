'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Glassmorphic Card with Neon Glow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg w-full p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_30px_4px_#F0F8FF]"
      >
        <h2 className="text-3xl font-bold text-[#F0F8FF] text-center mb-2 tracking-wide">
          Contact Us
        </h2>
        <p className="text-sm text-[#F0F8FF]/80 text-center mb-6">
          Share your ideas, feedback, or collaboration proposals.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'email', 'subject'].map((field) => (
            <div key={field}>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder-[#F0F8FF]/40 focus:outline-none focus:ring-2 focus:ring-[#F0F8FF] transition"
              />
            </div>
          ))}
          <div>
            <textarea
              name="message"
              rows={4}
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder-[#F0F8FF]/40 focus:outline-none focus:ring-2 focus:ring-[#F0F8FF] resize-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg font-medium text-black transition ${
              submitting
                ? 'bg-[#F0F8FF]/50 cursor-not-allowed'
                : 'bg-[#F0F8FF] hover:bg-[#eaf6ff]'
            }`}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#F0F8FF]/70">
          Prefer email?{' '}
          <a href="mailto:desilentorder@gmail.com" className="underline hover:text-[#F0F8FF]">
            desilentorder@gmail.com
          </a>
        </p>
      </motion.div>

      {/* Toasts */}
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
