'use client';

import Image from 'next/image';

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900  text-white px-4 py-12 flex items-center justify-center">
            <div className="max-w-4xl w-full overflow-auto no-scrollbar rounded-3xl bg-white/10 backdrop-blur-md shadow-xl p-8 sm:p-12 border border-white/10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        <Image
                            src="/profile.jpg" // replace with actual profile image path
                            alt="Profile"
                            width={150}
                            height={150}
                            className="rounded-full border-4 border-purple-500 shadow-lg"
                        />
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-3xl font-bold">Himanshu Swami</h1>
                        <p className="text-purple-300 mt-2 text-lg">Full Stack Developer | UI/UX Designer</p>
                        <p className="text-gray-300 mt-4">
                            Passionate about building high-performance web apps with stunning UIs. Experienced in
                            React, Next.js, Tailwind CSS, Django, and Firebase.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-8" />

                {/* Skills */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-3">
                        {['React', 'Next.js', 'Tailwind CSS', 'Django', 'Firebase', 'PDF-lib', 'Framer Motion'].map(skill => (
                            <span
                                key={skill}
                                className="px-4 py-1 bg-purple-700/30 rounded-full text-sm border border-purple-500"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Highlighted Projects</h2>
                    <ul className="space-y-4">
                        <li className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-purple-700/10 transition">
                            <h3 className="font-semibold text-lg">PDF Editor</h3>
                            <p className="text-sm text-gray-300">Full-featured PDF editor built with pdf-lib and iframe preview, drag/drop, text/image edit, and export.</p>
                        </li>
                        <li className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-purple-700/10 transition">
                            <h3 className="font-semibold text-lg">CMD Portfolio</h3>
                            <p className="text-sm text-gray-300">Terminal-style portfolio with command suggestions, nested projects, and full responsiveness.</p>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
    );
}
