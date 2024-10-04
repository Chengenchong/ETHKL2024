"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Sidebar from './SideMenu';
import ScrollExample from './components/ScrollExample';
import "./globals.css";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  hasDiscord?: boolean;
  hasTwitter?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, image, hasDiscord = true, hasTwitter = true }) => (
  <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          View game
        </button>
      </div>
    </div>
  </div>
);

const MainPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlayableOnly, setShowPlayableOnly] = useState(false);

  const games: GameCardProps[] = [
    {
      title: "Rebel Bots Epic War",
      description: "Command your army in dynamic, real-time PvP battles, employing strategic gameplay to outmaneuver opponents",
      // image: "/game_images/Game_1.png"
      image: "/game_images/game_2.jpg"
    },
    {
      title: "Aradena",
      description: "Battle in immersive gameplay, trade with other players, and compete in Aradena",
      image: "https://via.placeholder.com/400x200?text=Aradena"
    },
    {
      title: "Shardbound",
      description: "The best of a thousand worlds - the ultimate fusion of strategy, fantasy, and heart-pumping competition.",
      image: "https://via.placeholder.com/400x200?text=Shardbound"
    },
    {
      title: "Galaxy Commanders",
      description: "Competitive PvP Space Battles / Assemble and Command your Space Fleet to Victory",
      image: "https://via.placeholder.com/400x200?text=Galaxy+Commanders"
    },
    {
      title: "Rune Realms",
      description: "Rune Realms is a gamified investment experience where users can mint two unique classes of playable NFTs",
      image: "https://via.placeholder.com/400x200?text=Rune+Realms"
    },
    {
      title: "Skiesverse",
      description: "Post-apocalyptic tactical RPG with user-driven economics and tokenomics.",
      image: "https://via.placeholder.com/400x200?text=Skiesverse"
    },
  ];

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-4xl font-bold text-white mb-8">Welcome to Dashboard</h1>

          <div style={{ position: 'absolute', top: '0', right: '0', marginRight: '20px', padding: '20px' }}>
            <ScrollExample onConnectionChange={setIsWalletConnected} />
          </div>
          
          <div className="bg-zinc-800 p-4 rounded-lg mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-bold text-white">Filters</h2>
              <div className="relative">
                <select className="bg-zinc-700 text-white py-2 pl-3 pr-8 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option>Game Genres</option>
                </select>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showPlayableOnly}
                  onChange={() => setShowPlayableOnly(!showPlayableOnly)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="text-white">Playable games only</span>
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search game titles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-700 text-white py-2 pl-10 pr-4 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;