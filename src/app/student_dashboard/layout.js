'use client';
import { useState } from 'react';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-[90vh] overflow-hidden">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-2 overflow-auto">
        {children}
      </main>
    </div>
  );
}