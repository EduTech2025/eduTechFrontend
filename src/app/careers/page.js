"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Users, Star, Briefcase, Heart, Zap } from "lucide-react";

const jobs = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-Time",
    salary: "$70k - $90k",
    experience: "2-4 years",
    description:
      "Looking for a creative React/Next.js developer with experience in TailwindCSS and modern UI animations.",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    urgent: false,
  },
  {
    title: "Backend Developer",
    location: "Remote",
    type: "Full-Time",
    salary: "$80k - $100k",
    experience: "3-5 years",
    description:
      "Seeking an experienced backend engineer skilled in Django/FastAPI, API integrations, and database optimization.",
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    urgent: true,
  },
  {
    title: "AI Engineer",
    location: "Remote",
    type: "Contract",
    salary: "$90k - $120k",
    experience: "4-6 years",
    description:
      "Passionate about AI, LLMs, and GenAI applications? Join our AI team to build intelligent solutions.",
    skills: ["Python", "TensorFlow", "PyTorch", "LangChain"],
    urgent: false,
  },
  {
    title: "DevOps Engineer",
    location: "Hybrid",
    type: "Full-Time",
    salary: "$85k - $110k",
    experience: "3-5 years",
    description:
      "Expert in cloud infrastructure, CI/CD pipelines, and automation. Help us scale our platform globally.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    urgent: false,
  },
  {
    title: "Product Designer",
    location: "Remote",
    type: "Full-Time",
    salary: "$75k - $95k",
    experience: "3-4 years",
    description:
      "Creative UI/UX designer to craft beautiful, intuitive experiences that users love and remember.",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    urgent: false,
  },
  {
    title: "Marketing Specialist",
    location: "Remote",
    type: "Part-Time",
    salary: "$50k - $65k",
    experience: "2-3 years",
    description:
      "Drive growth through strategic marketing campaigns, content creation, and brand partnerships.",
    skills: ["Content Marketing", "SEO", "Social Media", "Analytics"],
    urgent: true,
  },
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours and unlimited PTO"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Growth & Learning",
    description: "Learning budget, conferences, and mentorship programs"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Amazing Team",
    description: "Work with passionate, talented people who inspire each other"
  },
];

const stats = [
  { number: "50+", label: "Team Members" },
  { number: "15+", label: "Countries" },
  { number: "99%", label: "Employee Satisfaction" },
  { number: "4.8", label: "Glassdoor Rating" },
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="px-6 md:px-20 py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
              We're building the future of tech. If you're passionate, talented, and
              ready to innovate, we want to hear from you.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="px-6 md:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Open Positions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover your next career opportunity and join our mission to transform the digital landscape.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 relative"
            >
              {job.urgent && (
                <div className="absolute right-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Urgent Hiring
                </div>
              )}

              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {job.experience}
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-green-400 mb-3">{job.salary}</div>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-md text-xs border border-purple-600/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/contact?subject=${encodeURIComponent(`Job Application - ${job.title}`)}`}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-medium group-hover:scale-105"
                >
                  Apply Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Work With Us?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We believe in creating an environment where you can do your best work and grow your career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all duration-300">
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don't See Your Role?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for exceptional talent. Send us your resume and let's start a conversation.
          </p>
          <Link
            href={`/contact?subject=${encodeURIComponent("General Application")}`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-full text-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
          >
            Send General Application <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}