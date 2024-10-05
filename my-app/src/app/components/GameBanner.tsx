import React from 'react';

interface GameBannerProps {
  title: string;
  playerCount: number;
  isFollowing: boolean;
  imagePath: string;
}

const GameBanner: React.FC<GameBannerProps> = ({ title, playerCount, isFollowing, imagePath }) => {
  const handlePlayClick = () => {
    window.open('https://playvalorant.com/en-us/', '_blank');
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden">
      <img 
        src={imagePath} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="flex items-center mb-2">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">Verified Game</span>
        </div>
        <h2 className="text-5xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-300 mb-4 text-lg">{playerCount.toLocaleString()} monthly players</p>
        <div className="flex space-x-4">
          <button onClick={handlePlayClick} className="bg-[#2c007d] text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors duration-300 text-lg">PLAY</button>
          <button className={`border ${isFollowing ? 'border-white text-white' : 'border-gray-500 text-gray-500'} font-bold py-3 px-8 rounded-full hover:bg-opacity-10 hover:bg-white transition-colors duration-300 text-lg`}>
            {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBanner;