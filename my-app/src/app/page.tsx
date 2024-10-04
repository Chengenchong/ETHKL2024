"use client";

import "./globals.css";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import AnimatedZonTitle from './AnimatedZonTitle';
import Sidebar from './SideMenu';
import MarketplaceSwitcher from './components/MarketplaceSwitcher';


interface GameCardProps {
  title: string;
  description: string;
  image: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, image }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg -[100px] md:h-[380px] lg:h-[380px]">
    <img src={image} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm mb-4">{description}</p>
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
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlayableOnly, setShowPlayableOnly] = useState(false);

  const games: GameCardProps[] = [
    {
      title: "Rebel Bots Epic War",
      description: "Command your army in dynamic, real-time PvP battles, employing strategic gameplay to outmaneuver opponents",
      image: "/game_images/Game_2.png"
    },
    {
      title: "Aradena",
      description: "Battle in immersive gameplay, trade with other players, and compete in Aradena",
      image: "/game_images/Game_1.jpeg"
    },
    {
      title: "Shardbound",
      description: "The best of a thousand worlds - the ultimate fusion of strategy, fantasy, and heart-pumping competition.",
      image: "/game_images/Game_3.jpg"
    },
    {
      title: "Galaxy Commanders",
      description: "Competitive PvP Space Battles / Assemble and Command your Space Fleet to Victory",
      image: "/game_images/Game_4.jpg"
    },
    {
      title: "Rune Realms",
      description: "Rune Realms is a gamified investment experience where users can mint two unique classes of playable NFTs",
      image: "/game_images/Game_5.jpeg"
    },
    {
      title: "Skiesverse",
      description: "Post-apocalyptic tactical RPG with user-driven economics and tokenomics.",
      image: "/game_images/Game_6.jpg"
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
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <AnimatedZonTitle />
            </div>
            <div className="flex-shrink-0 ml-4">
              <MarketplaceSwitcher />
            </div>
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