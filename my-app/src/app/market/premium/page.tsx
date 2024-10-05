'use client';

import React, { useState } from 'react';
import AnimatedZonTitle from '../../components/AnimatedZonTitle';
import Sidebar from '../../SideMenu';
import TrendingSection from './TrendingSection';
import ProductGrid from './ProductGrid';
import PremiumSection from './PremiumSection';
import CategorySelector from './CategorySelector';

const NormalMarket: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'Games' | 'In-Game Assets'>('Games');

  return (
    <div className="min-h-screen flex text-white"
        style={{ backgroundColor: 'linear-MdGradient(to bottom, #2c007d 0%, #000000 20%, #000000 70%)' }}>
      <Sidebar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
      <main className={`flex-1 p-8 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <AnimatedZonTitle />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Connect to Scroll Sepolia Testnet
            </button>
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
      </main>
    </div>
  );
};

export default NormalMarket;