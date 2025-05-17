'use client';

import { useState } from 'react';

export default function CreateBlogPage() {
  const [heading, setHeading] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [sections, setSections] = useState([
    { id: 1, subheading: '', paragraph: '', images: [''] },
  ]);

  // Add a new description section
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { id: Date.now(), subheading: '', paragraph: '', images: [''] },
    ]);
  };

  // Remove a description section
  const removeSection = (id) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  // Update fields in a section
  const updateSection = (id, field, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  // Update image URL in a section
  const updateImage = (sectionId, index, value) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const newImages = [...section.images];
          newImages[index] = value;
          return { ...section, images: newImages };
        }
        return section;
      })
    );
  };

  // Add new image input field in a section
  const addImageInput = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, images: [...section.images, ''] }
          : section
      )
    );
  };

  // Remove an image input field in a section
  const removeImageInput = (sectionId, index) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const newImages = section.images.filter((_, i) => i !== index);
          // Ensure at least one image input remains
          return { ...section, images: newImages.length ? newImages : [''] };
        }
        return section;
      })
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      heading,
      header_image: headerImage,
      description: sections.map(({ id, ...rest }) => rest), // omit id
      created_by: 'admin', // static for now
      created_at: new Date().toISOString(),
    };

    console.log('Submitting blog:', blogData);
    alert('Blog submitted! Check console.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📝 Create a New Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-xl shadow-md"
      >
        {/* Heading */}
        <div>
          <label
            className="block mb-2 font-semibold text-gray-700"
            htmlFor="heading"
          >
            Blog Title
          </label>
          <input
            id="heading"
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter blog title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Header Image URL */}
        <div>
          <label
            className="block mb-2 font-semibold text-gray-700"
            htmlFor="headerImage"
          >
            Header Image URL
          </label>
          <input
            id="headerImage"
            type="url"
            value={headerImage}
            onChange={(e) => setHeaderImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {headerImage && (
            <img
              src={headerImage}
              alt="Header preview"
              className="mt-3 max-h-48 object-contain rounded-md border"
            />
          )}
        </div>

        {/* Description Sections */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Description Sections</h2>

          {sections.map((section) => (
            <div
              key={section.id}
              className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50 relative"
            >
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold"
                  title="Remove Section"
                >
                  &times;
                </button>
              )}

              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor={`subheading-${section.id}`}
              >
                Subheading
              </label>
              <input
                id={`subheading-${section.id}`}
                type="text"
                value={section.subheading}
                onChange={(e) =>
                  updateSection(section.id, 'subheading', e.target.value)
                }
                placeholder="Section subheading"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor={`paragraph-${section.id}`}
              >
                Paragraph
              </label>
              <textarea
                id={`paragraph-${section.id}`}
                value={section.paragraph}
                onChange={(e) =>
                  updateSection(section.id, 'paragraph', e.target.value)
                }
                placeholder="Write paragraph content here..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                required
              />

              {/* Images input */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Images URLs
                </label>
                {section.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex items-center mb-2 space-x-2"
                  >
                    <input
                      type="url"
                      value={img}
                      onChange={(e) =>
                        updateImage(section.id, idx, e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                      className="flex-grow border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {section.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageInput(section.id, idx)}
                        className="text-red-500 hover:text-red-700 font-bold"
                        title="Remove image"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addImageInput(section.id)}
                  className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm"
                >
                  + Add Image URL
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            + Add Section
          </button>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}
