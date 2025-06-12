'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AnimatePresence } from 'framer-motion';
import Toast from '@/utils/toast';
import auth from '@/lib/auth_api';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth as firebaseAuth, provider } from "@/lib/firebase";

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [toast, setToast] = useState(null);

  const handleGoogleLogin = async (e) => {
    try {
      e.preventDefault();
      if (window.popupInProgress) return;
      window.popupInProgress = true;

      const result = await signInWithPopup(firebaseAuth, provider);
      const email = result.user.email;
      const password = result.user.uid;
      const loginData = { email, password };

      console.log(loginData);

      await auth.login(loginData).then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          localStorage.setItem('auth-token', response.data.token);
          handleShowToast('success');
        } else {
          console.log(response.data);
          handleShowToast('error');
        }
      });
    } catch (err) {
      console.error("Google login failed", err);
      alert(err.message);
    }
  };

  const handleShowToast = (type) => {
    setToast({ type, message: type === 'success' ? 'Data saved successfully!' : 'Failed to save data!' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(firebaseAuth, form.email, form.password);
      const user = userCred.user;
      const loginData = {
        email: user.email,
        password: user.uid,
      };

      console.log("Login data being sent:", loginData);
      const response = await auth.login(loginData);

      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem('auth-token', response.data.token);
        handleShowToast('success');
      } else {
        console.log(response.data);
        handleShowToast('error');
      }
    } catch (error) {
      console.error("Firebase email/password login failed:", error);
      handleShowToast('error');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-white mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 hover:text-white transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 flex items-center justify-center gap-2 border border-white/20 text-white bg-white/5 rounded-lg hover:bg-white/20 transition duration-300"
          >
            <FcGoogle size={20} /> Sign in with Google
          </button>
        </div>

        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="underline hover:text-white">Sign up</Link>
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
