<<<<<<< HEAD
import React from 'react';
import "./globals.css";
import Sidebar from "./SideMenu";

interface GameCardProps {
  title: string;
  price: string;
  image?: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, image, price }) => (
  <div className="bg-[#1D1A2F] rounded-lg overflow-hidden shadow-lg p-4">
    {image ? (
      <div className="h-32 bg-gray-300 mb-2" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
    ) : (
      <div className="h-32 bg-gray-300 mb-2"></div>
    )}
    <h3 className="text-white text-lg font-semibold">{title}</h3>
    <p className="text-[#B8B5FF]">{price}</p>
  </div>
);

const MainContent: React.FC = () => (
  <div>
    <Sidebar/>
  <div className="bg-[#13111E] min-h-screen text-white p-8">
    <h1 className="text-3xl font-bold mb-8">Welcome to Web3 Game Hub</h1>
    
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Your Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GameCard 
          title="Crypto Legends" 
          price="Owned" 
          image="https://via.placeholder.com/300x200?text=Crypto+Legends" 
        />
        <GameCard 
          title="NFT Racer" 
          price="Owned" 
          image="https://via.placeholder.com/300x200?text=NFT+Racer" 
        />
        <GameCard 
          title="Blockchain Battles" 
          price="Owned" 
          image="https://via.placeholder.com/300x200?text=Blockchain+Battles" 
        />
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GameCard 
          title="Ethereum Quest" 
          price="$19.99" 
          image="https://via.placeholder.com/300x200?text=Ethereum+Quest" 
        />
        <GameCard 
          title="Manta Miner" 
          price="$24.99" 
          image="https://via.placeholder.com/300x200?text=Manta+Miner" 
        />
        <GameCard 
          title="Scroll Saga" 
          price="Free to Play" 
          image="https://via.placeholder.com/300x200?text=Scroll+Saga" 
        />
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-6">Web3 Game Development Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Asset Library', description: 'Access verified, copyright-free game assets' },
          { name: 'NFT Integration', description: 'Tools for creating and managing in-game NFTs' },
          { name: 'Smart Contracts', description: 'Deploy and manage game logic on the blockchain' },
          { name: 'Copyright Checker', description: 'Verify the originality of game assets' }
        ].map((tool, index) => (
          <div key={index} className="bg-[#1D1A2F] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
            <p className="text-[#B8B5FF]">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
  </div>
);

export default MainContent;
=======
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
>>>>>>> c2b31031a3676445a5d4ad0c8381cdf6478ef5eb
