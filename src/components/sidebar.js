'use client';
import Link from 'next/link';
import { Menu, Home, User, HelpCircle, Trophy, FolderKanban, MessageSquare, BookOpen, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReferLink from '@/app/student_dashboard/refer/page';

export default function Sidebar({ collapsed, toggleSidebar }) {
  const pathname = usePathname();

  // Function to check if a link is active
  const isActive = (href) => pathname === href;

  return (
    <div className={`bg-white/5 text-white h-[90%] p-4 ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <button
        onClick={toggleSidebar}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="mb-4 flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>
      <nav className="space-y-4">
        {/* <Link
          href="/student_dashboard/home"
          className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/home') ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <Home size={20} />
          {!collapsed && <span className="truncate">Home</span>}
        </Link> */}
         <Link
          href="/student_dashboard/profile"
          className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/profile') ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <User size={20} />
          {!collapsed && <span className="truncate">Profile</span>}
        </Link>
        <Link
          href="/student_dashboard/course"
          className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/course') ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <BookOpen size={20} />
          {!collapsed && <span className="truncate">Courses</span>}
        </Link>
        <Link
          href="/student_dashboard/doubt"
          className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/doubt') ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <HelpCircle size={20} />
          {!collapsed && <span className="truncate">Doubt</span>}
        </Link>
        <Link
          href="/student_dashboard/student_showcase"
          className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/student_showcase') ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <Trophy size={20} />
          {!collapsed && <span className="truncate">Student Showcase</span>}
        </Link>
        <Link
          href="/student_dashboard/student_projects"
          className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/project_submission') ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <FolderKanban size={20} />
          {!collapsed && <span className="truncate">Project</span>}
        </Link>
        <ReferLink collapsed={collapsed} />
        <Link
          href="/student_dashboard/feedback"
          className={`flex items-center space-x-3 p-2 rounded ${isActive('/student_dashboard/feedback') ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <MessageSquare size={20} />
          {!collapsed && <span className="truncate">Feedback</span>}
        </Link>       
      </nav>
    </div>
  );
}