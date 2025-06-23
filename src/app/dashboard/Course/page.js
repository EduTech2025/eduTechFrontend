'use client';

import React, { useState } from 'react';

// Course object shape for reference:
// { name: string, link: string, image: string }

export default function CourseManager() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [courses, setCourses] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
    if (!name || !link || !preview) return;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !link || !preview) return;

    const newCourse = { name, link, image: preview };
    setCourses([newCourse, ...courses]);
    setName('');
    setLink('');
    setImage(null);
    setPreview(null);
  };
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl max-w-md mx-auto space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Add New Course</h2>

        <div>
          <label className="block text-sm font-semibold mb-1">Course Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-white/5 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter course name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Course Link</label>
          <input
            type="url"
            className="w-full p-2 rounded-lg bg-white/5 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter course link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded-lg bg-white/5 border border-white/30 text-white file:bg-white/10 file:border-0 file:rounded file:px-3 file:py-1"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="mt-3 rounded-xl border border-white/20"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-white text-black font-bold hover:bg-white/90 transition"
        >
          Add Course
        </button>
      </form>

      {courses.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6 text-center">Course Listings</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses.map((course, index) => (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:scale-105 transition-transform shadow-md"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{course.name}</h4>
                  <p className="text-sm text-white/70 break-all">{course.link}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )};
}
