// 'use client';

import React, { useState } from 'react';
import ScrollWallet from './ScrollWallet';
import MantaPacificWallet from './MantaPacificWallet';

export default function MarketplaceSwitcher() {
  const [currentNetwork, setCurrentNetwork] = useState<'scroll' | 'manta'>('scroll');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleNetworkChange = (network: 'scroll' | 'manta') => {
    setCurrentNetwork(network);
  };

  const handleConnectionChange = (isConnected: boolean) => {
    setIsWalletConnected(isConnected);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${currentNetwork === 'scroll' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-300'}`}
          onClick={() => handleNetworkChange('scroll')}
        >
          Scroll Sepolia Testnet
        </button>
        <button
          className={`px-4 py-2 rounded ${currentNetwork === 'manta' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-300'}`}
          onClick={() => handleNetworkChange('manta')}
        >
          Manta Pacific Sepolia Testnet
        </button>
      </div>
      
      {currentNetwork === 'scroll' ? (
        <ScrollWallet onConnectionChange={handleConnectionChange} />
      ) : (
        <MantaPacificWallet onConnectionChange={handleConnectionChange} />
      )}
    </div>
  );
}