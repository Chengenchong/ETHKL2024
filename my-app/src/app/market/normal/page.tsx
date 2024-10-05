"use client";

import React, { useState } from "react";
import AnimatedZonTitle from "../../components/AnimatedZonTitle";
import Sidebar from "../../SideMenu";
import ScrollWallet from "../../components/ScrollWallet";
import ProductGrid from "./ProductGrid"; // Import ProductGrid
import PremiumSection from "./PremiumSection"; // Import PremiumSection
import './NormalMarket.css'; // if the CSS file is in the same directory


const NormalMarket: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleConnectionChange = (isConnected: boolean) => {
    // Update your app state here
  };

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <Sidebar 
        isExpanded={isExpanded} 
        onToggle={() => setIsExpanded(!isExpanded)} 
      />
      <main 
        className={`flex-1 p-8 transition-all duration-500 ease-in-out relative
          ${isExpanded ? 'ml-[260px]' : 'ml-[80px]'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <AnimatedZonTitle />
            </div>
            <div className="flex-shrink-0 ml-4">
              <ScrollWallet onConnectionChange={handleConnectionChange} />
            </div>
          </div>
          
          <div className="marketplace-sections">
            {/* Game and Asset Marketplace */}
            <section className="section game-marketplace">
              <h2 className="text-white text-3xl mb-6">Game Marketplace</h2>
              <ProductGrid type="games" />
            </section>

            {/* Premium Marketplace */}
            <section className="section premium-marketplace mt-16">
              <h2 className="text-purple-500 text-3xl mb-6">Premium Marketplace</h2>
              <PremiumSection /> {/* Use imported component */}
            </section>
          </div>

        </div>
      </main>
    </div>
  );
};
  
export default NormalMarket;
  