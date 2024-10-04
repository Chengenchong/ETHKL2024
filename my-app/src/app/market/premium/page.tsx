"use client";

import { useState } from "react"; // Import useState
import Sidebar from "../../SideMenu";

const NormalMarket = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Initialize state

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <Sidebar 
        isExpanded={isExpanded} 
        onToggle={() => setIsExpanded(!isExpanded)} 
      />
      <div className={`flex-1 p-4 transition-all duration-700 ease-in-out ${isExpanded ? 'ml-[260px]' : 'ml-[80px]'}`}>
        <h1 className="text-white">Premium Market Place</h1>
        {/* Your component logic here */}
      </div>
    </div>
  );
};

export default NormalMarket;
