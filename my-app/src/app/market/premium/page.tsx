'use client';

import React, { useState } from 'react';
import AnimatedZonTitle from '../../components/AnimatedZonTitle';
import Sidebar from '../../SideMenu';
import TrendingSection from './TrendingSection';
import ProductGrid from './ProductGrid';
import PremiumSection from './PremiumSection';
import CategorySelector from './CategorySelector';
import MantaPacificWallet from '../../components/MantaPacificWallet';
import MantaTransaction from '../../components/MantaTransaction';

// Import the CSS file as a side effect
import './premiumMarket.css';

const PremiumMarket: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'Games' | 'In-Game Assets'>('Games');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectionChange = (isConnected: boolean) => {
    setIsWalletConnected(isConnected);
  };
  
  const handleTransactionComplete = () => {
    console.log('Transaction completed!');
  };

  return (
    <div className="min-h-screen flex text-white"
        style={{ backgroundColor: 'linear-MdGradient(to bottom, #2c007d 0%, #000000 20%, #000000 70%)' }}>
      <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
      <main className={`flex-1 p-8 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <AnimatedZonTitle />
            <div className="flex-shrink-0 ml-4">
              <MantaPacificWallet onConnectionChange={handleConnectionChange} />
            </div>
          </div>
          
          <div className="bg-purple-900 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
            <p className="text-gray-300">Slider content goes here...</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <TrendingSection title="Trending Games" type="games" />
            <TrendingSection title="Trending In-Game Assets" type="assets" />
          </div>
          
          <CategorySelector
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <ProductGrid type={activeCategory} />

          <h2 className="text-2xl font-bold my-8 text-purple-300">Premium</h2>
          <PremiumSection />
        </div>

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-white">Premium Marketplace</h1>
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
  