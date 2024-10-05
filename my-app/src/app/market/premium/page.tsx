"use client";

import React, { useState } from 'react';
import AnimatedZonTitle from '../../components/AnimatedZonTitle';
import Sidebar from '../../SideMenu';
import MantaPacificWallet from '../../components/MantaPacificWallet';
import MantaTransaction from '../../components/MantaTransaction';


const PremiumMarket: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectionChange = (isConnected: boolean) => {
    setIsWalletConnected(isConnected);
  };
  
  const handleTransactionComplete = () => {
    console.log('Transaction completed!');
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
              <MantaPacificWallet onConnectionChange={handleConnectionChange} />
            </div>
          </div>
        </div>

          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Premium Marketplace</h1>
            {isWalletConnected && (
              <MantaTransaction 
                isWalletConnected={isWalletConnected} 
                onTransactionComplete={handleTransactionComplete} 
              />
            )}
          </div>

      </main>
    </div>
  );
};
  
export default PremiumMarket;
  