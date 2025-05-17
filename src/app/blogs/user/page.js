'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import blogApi from '@/lib/blogs_api';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogApi.get_all_blogs().then((res) => {
      if (res.status === 200) setBlogs(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-indigo-700">📚 Latest Blogs</h1>
          <Link href={`/blogs/admin`}><button className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">Add Blog</button></Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/details/${blog.id}`}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden">
                <img
                  src={blog.header_image}
                  alt={blog.heading}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.heading}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {blog.description[0]?.paragraph || 'No content available.'}
                  </p>
                  <p className="mt-4 text-xs text-gray-400">
                    Posted on {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
