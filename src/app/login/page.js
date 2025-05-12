// app/login/page.tsx (Next.js App Router)
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AnimatePresence } from 'framer-motion';
import Toast from '@/utils/toast';
import auth from '@/lib/auth_api'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [toast, setToast] = useState(null);
 
  const handleGoogleLogin = () => {
    // TODO: Replace with actual Google login integration
    console.log('Google login clicked');
  };

   const handleShowToast = (type) => {
    setToast({ type, message: type === 'success' ? 'Data saved successfully!' : 'Failed to save data!' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    auth.login(form).then((response) => {
      if (response.status == 200) {
        console.log(response.data)
        localStorage.setItem('auth-token',response.data.token);
        handleShowToast('success');
      } else {
        console.log(response.data)
        handleShowToast('error');
      }
    });
    console.log(form);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200 bg-white text-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200 bg-white text-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 flex items-center justify-center gap-2 border border-black text-black bg-white rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            <FcGoogle size={20} /> Sign in with Google
          </button>
        </div>

        <p className="text-sm text-center text-black mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="underline hover:text-gray-600">Sign up</Link>
        </p>
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
