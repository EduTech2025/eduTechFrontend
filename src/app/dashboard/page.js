'use client';
import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import GrokStarBackground from '@/utils/ParticleBackground';

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-screen  overflow-hidden ">  
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 overflow-auto ">
         
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {/* Add content here */}
      </main>
    </div>
  );
}
