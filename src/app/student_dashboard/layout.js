'use client';
import { useState } from 'react';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div id='main-client' className="flex h-screen overflow-hidden">  
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-2 overflow-hidden">
        {children}
      </main>
    </div>
  );
}