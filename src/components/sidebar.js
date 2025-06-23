'use client';
import Link from 'next/link';
import { Menu, Home, User } from 'lucide-react';

export default function Sidebar({ collapsed, toggleSidebar }) {
  return (
    <div className={`bg-white/5 text-white h-screen p-4 ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <button onClick={toggleSidebar} className="mb-4">
        <Menu size={24} />
      </button>
      <nav className="space-y-4">
        <Link href="/dashboard/home" className="flex items-center space-x-2">
          <Home />
          {!collapsed && <span>Home</span>}
        </Link>
        <Link href="/dashboard/profile" className="flex items-center space-x-2">
          <User />
          {!collapsed && <span>All Users</span>}
        </Link>
      </nav>
    </div>
  );
}
