"use client";
import { useState } from 'react';
import Sidebar from './SideMenu';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-screen flex bg-[#101010]">
      <Sidebar 
        isExpanded={isExpanded} 
        onToggle={() => setIsExpanded(!isExpanded)} 
      />
      <main 
        className={`flex-1 p-8 transition-all duration-500 ease-in-out
          ${isExpanded ? 'ml-[260px]' : 'ml-[80px]'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Welcome to Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-gray-300">Your dashboard overview and summary</p>
            </div>
            
            <div className="bg-zinc-900/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-3">Statistics</h2>
              <p className="text-gray-300">View your latest analytics</p>
            </div>
            
            <div className="bg-zinc-900/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-3">Activities</h2>
              <p className="text-gray-300">Recent activities and updates</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}