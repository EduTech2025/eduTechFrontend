"use client";

import { useEffect, useRef, useState } from "react";
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

const logos = [
  '/assets/brands/1.png',
  '/assets/brands/2.png',
  '/assets/brands/3.png',
  '/assets/brands/4.png',
  '/assets/brands/5.png',
];


export function TestimonialScroller() {
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
      <div className="relative py-13 bg-gradient-to-b  accent-purple-600 to-black overflow-hidden">
        <h2 className="text-white text-4xl font-extrabold text-center mb-12 tracking-tight">
          What Our Clients Say
        </h2>

        <div
            ref={containerRef}
            className="flex gap-8 h-auto px-8 overflow-x-auto no-scrollbar"
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                  key={idx}
                  className="w-[320px] shrink-0 m-4 p-6 rounded-2xl bg-purple-900/20 border border-purple-400/20 backdrop-blur-md text-white shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300"
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
                <div className="text-sm text-purple-300">{t.company}</div>
              </div>
          ))}
        </div>
      </div>
  );
}


export function BrandLeadScroller() {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;

    const scroll = () => {
      if (!paused) {
        scrollAmount += 0.3;
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
        }
        container.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(scroll);
    };

    scroll();
  }, [paused]);

  return (
      <section className="py-10 overflow-hidden relative">
        <div className="max-w-full mx-auto px-10">
          <h2 className="text-white text-2xl md:text-4xl font-semibold text-center mb-10">
            Trusted by Leading Brands
          </h2>

          <div
              ref={containerRef}
              className="flex gap-10 px-8 overflow-x-auto no-scrollbar"
              style={{ scrollBehavior: 'auto' }}
          >
            {[...logos, ...logos].map((logo, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 w-40 h-20 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl shadow-lg backdrop-blur-md transition-transform duration-300"
                >
                  <img
                      src={logo}
                      alt={`Brand ${i + 1}`}
                      className="max-h-12 object-contain"
                  />
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}

