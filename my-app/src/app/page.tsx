"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import AnimatedZonTitle from './AnimatedZonTitle';
import GameBanner from './GameBanner';
import Sidebar from './SideMenu';
import MarketplaceSwitcher from './components/WalletSwitcher';
import YourCollections from './YourCollections';

interface GameCardProps {
  title: string;
  image: string;
  videoPreview: string;
}

const FeaturedGameCard: React.FC<GameCardProps> = ({ title, image }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg h-[200px]">
    <img src={image} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  </div>
);

const GameCard: React.FC<GameCardProps> = ({ title, image, videoPreview }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:bg-zinc-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4 p-4">
        <img src={image} alt={title} className="w-16 h-16 object-cover rounded" />
        <div className="flex-1">
          <h3 className="text-white font-bold">{title}</h3>
        </div>
      </div>
      {isHovered && (
        <div className="w-full">
          <div className="h-36 bg-black">
            <video 
              src={videoPreview} 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <button 
              className="w-full py-2 bg-[#2c007d] text-white font-bold rounded hover:bg-opacity-90 transition-colors duration-300"
              onClick={() => {
                // Add marketplace redirect logic here
                console.log('Redirecting to marketplace for:', title);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MainPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlayableOnly, setShowPlayableOnly] = useState(false);

  const games: GameCardProps[] = [
    {
      title: "Rebel Bots Epic War",
      image: "/game_images/Game_2.png",
      videoPreview: "/game_video/Game_Vid1.mp4"
    },
    {
      title: "Aradena",
      image: "/game_images/Game_1.jpeg",
      videoPreview: "/game_videos/aradena_preview.mp4"
    },
    {
      title: "Shardbound",
      image: "/game_images/Game_3.jpg",
      videoPreview: "/game_videos/shardbound_preview.mp4"
    },
    {
      title: "Galaxy Commanders",
      image: "/game_images/Game_4.jpg",
      videoPreview: "/game_videos/galaxy_commanders_preview.mp4"
    },
    {
      title: "Rune Realms",
      image: "/game_images/Game_5.jpeg",
      videoPreview: "/game_videos/rune_realms_preview.mp4"
    },
    {
      title: "Skiesverse",
      image: "/game_images/Game_6.jpg",
      videoPreview: "/game_videos/skiesverse_preview.mp4"
    },
  ];

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
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
          
          <YourCollections />

          <div className="mb-16"></div>


          <GameBanner 
            title="Example Game"
            playerCount={1000000}
            isFollowing={true}
            imagePath="/game_images/Game_7.jpg"
          />

          <div className="mb-16"></div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">New Releases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((game, index) => (
                <GameCard 
                  key={index} 
                  {...game} 
                />
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-zinc-900 p-4 border-t border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-zinc-700 text-white py-2 pl-10 pr-4 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;