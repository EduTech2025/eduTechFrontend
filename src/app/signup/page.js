'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { AnimatePresence } from 'framer-motion';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Toast from '@/utils/toast';
import auth from '@/lib/auth_api';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth as firebaseAuth, provider } from '@/lib/firebase';

export default function SignUpPage() {
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [isGoogle, setIsGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
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

  const handleShowToast = (type) => {
    setToast({ type, message: type === 'success' ? 'Data saved successfully!' : 'Failed to save data!' });
  };

  const handleGoogleSignUp = async () => {
    try {
      if (window.popupInProgress) return;
      window.popupInProgress = true;

      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;

      setForm({
        full_name: user.displayName,
        email: user.email,
        password: user.uid,
        gender: '',
        date_of_birth: '',
        is_school: false,
        college_year: '',
        university_name: '',
        school_name: '',
        grade: ''
      });
      setIsGoogle(true);
      setPage(2);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setToast({ type: "error", message: "Google sign-in failed." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isGoogle) {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);
      form.password = userCredential.user.uid;
    }

    const cleanedForm = {
      ...form,
      is_school: form.is_school,
      college_year: form.is_school ? '' : form.college_year,
      university_name: form.is_school ? '' : form.university_name,
      school_name: form.is_school ? form.school_name : '',
      grade: form.is_school ? form.grade : '',
    };

    await auth.signup(cleanedForm).then((response) => {
      if (response.status === 201) {
        setToast({ type: "success", message: `Welcome, ${form.full_name || "user"}!` });
        setTimeout(() =>{
           window.location.assign('/login'); 
        },1500);

      } else {
        handleLogin({email: form.email, password: form.password});
      }
    });
  };

  async function handleLogin(loginData) {
    await auth.login(loginData).then((response) => {
      if (response.status == 200) {
        console.log(response.data);
        localStorage.setItem('auth-token', response.data.token);
        handleShowToast('success');
         setTimeout(() =>{
           window.location.assign('/'); 
        },1500);          
      } else {
        console.log(response.data);
        handleShowToast('error');
      }
    }); 
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className={`w-full ${page === 2 ? 'max-w-4xl' : 'max-w-md'} p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300`}>
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {page === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-white mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="you@example.com" required />
              </div>
              <div>
                          <label className="block text-sm font-semibold text-white mb-1">Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={form.password}
                              onChange={(e) => setForm({ ...form, password: e.target.value })}
                              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition pr-10"
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                              onClick={() => setShowPassword((prev) => !prev)}
                              tabIndex={-1}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                          </div>
                        </div>
            </>
          )}

          {page === 2 && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-1">Name</label>
                <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={(e) =>
                    setForm({ ...form, date_of_birth: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30 [color-scheme:dark]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-1">Gender</label>
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30" required>
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div className="flex flex-col justify-center">
                <label className="block text-sm font-semibold text-white mb-1">Are you in school?</label>
                <div className="flex items-center gap-4 text-white">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="edu" checked={form.is_school === true} onChange={() => setForm({ ...form, is_school: true })} /> Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="edu" checked={form.is_school === false} onChange={() => setForm({ ...form, is_school: false })} /> No
                  </label>
                </div>
              </div>
              {form.is_school ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">School Name</label>
                    <input type="text" value={form.school_name} onChange={(e) => setForm({ ...form, school_name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="ABC School" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">Grade</label>
                    <input type="text" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="10" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">College Year</label>
                    <input type="text" value={form.college_year} onChange={(e) => setForm({ ...form, college_year: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="3rd" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">University Name</label>
                    <input type="text" value={form.university_name} onChange={(e) => setForm({ ...form, university_name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="XYZ University" />
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex justify-between pt-2">
            {page > 1 && (
              <button type="button" onClick={() => setPage(page - 1)} className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white/5 hover:text-white transition">Back</button>
            )}
            {page < 2 && (
              <button type="button" onClick={() => setPage(page + 1)} className="ml-auto px-4 py-2 border border-white text-white rounded-lg hover:bg-white/5 hover:text-white transition">Next</button>
            )}
            {page === 2 && (
              <button type="submit" className="ml-auto px-4 py-2 bg-white/5 text-white border border-white/20 rounded-lg hover:bg-white/20 transition">Create Account</button>
            )}
          </div>
        </form>

        {page!=2 && (<div className="mt-6">
          <button onClick={handleGoogleSignUp} className="w-full py-2 px-4 flex items-center justify-center gap-2 border border-white text-white bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white hover:text-black transition duration-300">
            <FcGoogle size={20} /> Sign up with Google
          </button>
        </div>)}

        <p className="text-sm text-center text-white mt-4">
          Already have an account?{' '}
          <Link href="/login" className="underline hover:text-gray-300">Log in</Link>
        </p>
      </div>

      <AnimatePresence>
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </main>
  );
}