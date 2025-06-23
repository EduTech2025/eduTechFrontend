"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    company: "TechCorp",
    rating: 5,
    text: "Working with this team was an incredible experience. Professional and creative!",
  },
  {
    name: "Jane Smith",
    company: "Designify",
    rating: 4,
    text: "They delivered on time and exceeded expectations. Highly recommended.",
  },
  {
    name: "Alice Ray",
    company: "Innova",
    rating: 5,
    text: "Great communication and stunning designs. Would hire again!",
  },
  {
    name: "Mark Liu",
    company: "DevLoop",
    rating: 5,
    text: "Our product got a whole new level of UX after working with them.",
  },
];

export default function TestimonialScroller() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;

    const scroll = () => {
      scrollAmount += 0.3;
      if (scrollAmount >= container.scrollWidth / 2) scrollAmount = 0;
      container.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    scroll();
  }, []);

  return (
    <div className="relative  py-10 overflow-hidden">
      <h2 className="text-white text-4xl font-extrabold text-center mb-12 tracking-tight">
        What Our Clients Say
      </h2>

      <div
        ref={containerRef}
        className="flex gap-8 px-8 overflow-x-auto no-scrollbar"
      >
        {[...testimonials, ...testimonials].map((t, idx) => (
          <div
            key={idx}
            className="w-[320px] shrink-0 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1"
                />
              ))}
            </div>

            <p className="text-base italic mb-5 leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
              “{t.text}”
            </p>

            <div className="font-semibold text-base text-white">{t.name}</div>
            <div className="text-sm text-gray-400">{t.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
