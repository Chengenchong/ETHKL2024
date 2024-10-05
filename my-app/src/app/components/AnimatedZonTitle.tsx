import React from 'react';

const AnimatedZonTitle = () => {
  return (
    <svg width="300" height="100" viewBox="0 0 300 100">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ffff">
            <animate attributeName="stop-color" values="#00ffff; #ff00ff; #00ff00; #00ffff" dur="5s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#ff00ff">
            <animate attributeName="stop-color" values="#ff00ff; #00ff00; #00ffff; #ff00ff" dur="5s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="80" fontWeight="bold" fill="url(#gradient)" filter="url(#glow)">
        ZON
      </text>
    </svg>
  );
};

export default AnimatedZonTitle;