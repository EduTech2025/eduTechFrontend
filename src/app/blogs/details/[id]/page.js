'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import blogApi from '@/lib/blogs_api';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      blogApi.get_blog_by_id(id).then((res) => {
        if (res.status === 200) setBlog(res.data);
      });
    }
  }, [id]);

  if (!blog) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <img src={blog.header_image} alt={blog.heading} className="w-full h-64 object-cover rounded-xl mb-6" />
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{blog.heading}</h1>
        <p className="text-sm text-gray-500 mb-8">
          Posted on {new Date(blog.created_at).toLocaleDateString()} by {blog.created_by}
        </p>

        {blog.description.map((section) => (
          <div key={section.id} className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">{section.subheading}</h2>
            <p className="text-gray-700 mb-4">{section.paragraph}</p>
            <div className="grid grid-cols-2 gap-4">
              {section.images.map((img, index) => (
                <img key={index} src={img} alt={`img-${index}`} className="rounded-lg object-cover w-full h-48" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
