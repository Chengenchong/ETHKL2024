"use client";

import React, { useState } from 'react';
import AnimatedZonTitle from '../../components/AnimatedZonTitle';
import Sidebar from '../../SideMenu';
import ScrollWallet from '../../components/ScrollWallet';
import NFTMintingForm from './NFTmintform';

const NormalMarket: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleConnectionChange = (isConnected: boolean) => {
    // Update your app state here
  };

  return (
    <div className="min-h-screen flex text-white"
      style={{
      background: 'linear-gradient(to bottom, #2c007d 0%, #000000 20%, #000000 70%)'
    }}>
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
              <NFTMintingForm />
            </div>
            <div className="flex-shrink-0 ml-4">
              <ScrollWallet onConnectionChange={handleConnectionChange} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
  
export default NormalMarket;
  