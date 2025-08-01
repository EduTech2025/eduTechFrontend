'use client';

import Link from 'next/link';
import {
    Menu,
    X,
    User,
    BookOpen,
    HelpCircle,
    Trophy,
    FolderKanban,
    MessageSquare,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReferLink from '@/app/student_dashboard/refer/page';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar({ collapsed, toggleSidebar }) {
    const pathname = usePathname();
    const { role } = useAuth();

    const isActive = (href) => pathname === href;

    const base = role === 'admin' ? '/admin_dashboard' : '/student_dashboard';

    const navLinks = [
        { label: 'Profile', icon: User, path: `${base}/profile` },
        { label: 'Courses', icon: BookOpen, path:`${base}/courses` },
        {
            label: 'Doubt',
            icon: HelpCircle,
            path: role === 'admin' ? '/admin_dashboard/doubt' : '/student_dashboard/doubt',
        },
        // {
        //     label: 'Student Showcase',
        //     icon: Trophy,
        //     path: '/student_dashboard/student_showcase', // same for both roles?
        // },
        // {
        //     label: 'Project',
        //     icon: FolderKanban,
        //     path: '/student_dashboard/student_projects',
        // },
        // {
        //     label: 'Feedback',
        //     icon: MessageSquare,
        //     path: '/student_dashboard/feedback',
        // },
    ];

    return (
        <div
            className={`bg-white/5 text-white h-[90%] p-4 ${
                collapsed ? 'w-16' : 'w-64'
            } transition-all duration-300`}
        >
            <button
                onClick={toggleSidebar}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="mb-4 flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                {collapsed ? <Menu size={24} /> : <X size={24} />}
            </button>

            <nav className="space-y-4">
                {navLinks.map(({ label, icon: Icon, path }) => (
                    <Link
                        key={label}
                        href={path}
                        className={`flex items-center space-x-3 p-2 rounded ${
                            isActive(path) ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                    >
                        <Icon size={20} />
                        {!collapsed && <span className="truncate">{label}</span>}
                    </Link>
                ))}

                {role === 'student' && <ReferLink collapsed={collapsed} />}
            </nav>
        </div>
    );
}
