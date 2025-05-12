'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AnimatePresence } from 'framer-motion';
import Toast from '@/utils/toast';
import auth from '@/lib/auth_api';
import { signInWithPopup } from "firebase/auth";
import { auth as firebaseAuth, provider } from '@/lib/firebase';

export default function SignUpPage() {
  const [toast, setToast] = useState(null);

  const handleShowToast = (type) => {
    setToast({ type, message: type === 'success' ? 'Data saved successfully!' : 'Failed to save data!' });
  };

  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    gender: '',
    date_of_birth: '',
    is_school: false,
    college_year: '',
    university_name: '',
    school_name: '',
    grade: ''
  });

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;

      // Optional: Send the user info to your backend
      console.log("Google user:", user);
      let form = {
        full_name: user.displayName,
        email: user.email,
        password: user.uid,
        gender: 'M',
        date_of_birth: '2000-01-01',
        is_school: false,
        college_year: '',
        university_name: '',
        school_name: '',
        grade: ''
      }
      auth.signup(form).then((response) => {
        if (response.status == 201) {
          console.log(response.data)
          setToast({
            type: "success",
            message: `Welcome, ${user.displayName || "user"}!`
          });;
        } else {
          console.log(response.data)
          handleShowToast('error');
        }
      });
      // Example: Show toast


    } catch (error) {
      console.error("Google sign-in error:", error);
      setToast({ type: "error", message: "Google sign-in failed." });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signup(form).then((response) => {
      if (response.status == 201) {
        console.log(response.data)
        handleShowToast('success');
      } else {
        console.log(response.data)
        handleShowToast('error');
      }
    });
    console.log(form);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className={`w-full ${page === 2 ? 'max-w-4xl' : 'max-w-md'} p-8 bg-white rounded-2xl shadow-xl transition-all duration-300`}>
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Sign Up</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {page === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                  placeholder="••••••••"
                  required
                />
              </div>
            </>
          )}

          {page === 2 && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Name</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                  className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>

              <div className="flex flex-col justify-center">
                <label className="block text-sm font-semibold text-black mb-1">Are you in school?</label>
                <div className="flex items-center gap-4">
                  <label className="flex text-sm font-semibold text-black items-center gap-2">
                    <input
                      type="radio"
                      name="edu"
                      checked={form.is_school === true}
                      onChange={() => setForm({ ...form, is_school: true })}
                    />
                    Yes
                  </label>
                  <label className="flex text-sm font-semibold text-black items-center gap-2">
                    <input
                      type="radio"
                      name="edu"
                      checked={form.is_school === false}
                      onChange={() => setForm({ ...form, is_school: false })}
                    />
                    No
                  </label>
                </div>
              </div>

              {form.is_school ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">School Name</label>
                    <input
                      type="text"
                      value={form.school_name}
                      onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                      className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                      placeholder="ABC School"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">Grade</label>
                    <input
                      type="text"
                      value={form.grade}
                      onChange={(e) => setForm({ ...form, grade: e.target.value })}
                      className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                      placeholder="10"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">College Year</label>
                    <input
                      type="text"
                      value={form.college_year}
                      onChange={(e) => setForm({ ...form, college_year: e.target.value })}
                      className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                      placeholder="3rd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">University Name</label>
                    <input
                      type="text"
                      value={form.university_name}
                      onChange={(e) => setForm({ ...form, university_name: e.target.value })}
                      className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                      placeholder="XYZ University"
                    />
                  </div>
                </>
              )}
            </div>
          )}


          <div className="flex justify-between">
            {page > 1 && (
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
              >
                Back
              </button>
            )}
            {page < 2 && (
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                className="ml-auto px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
              >
                Next
              </button>
            )}
            {page === 2 && (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-black text-white border border-black rounded-lg hover:bg-white hover:text-black transition"
              >
                Create Account
              </button>
            )}
          </div>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignUp}
            className="w-full py-2 px-4 flex items-center justify-center gap-2 border border-black text-black bg-white rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            <FcGoogle size={20} /> Sign up with Google
          </button>
        </div>

        <p className="text-sm text-center text-black mt-4">
          Already have an account?{' '}
          <Link href="/login" className="underline hover:text-gray-600">Log in</Link>
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
