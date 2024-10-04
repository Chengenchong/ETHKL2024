'use client';

import React, { useState, useEffect } from 'react';
import { getProvider, connectWallet } from '../../utils/ethereumProvider';
import truncateEthAddress from 'truncate-eth-address';
import { ethers } from 'ethers';

interface ScrollExampleProps {
  onConnectionChange: (isConnected: boolean) => void;
}

export default function ScrollExample({ onConnectionChange }: ScrollExampleProps) {
  const [balance, setBalance] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const provider = getProvider();
    onConnectionChange(isConnected);
    // You can use the provider here to interact with the Scroll network
  }, [isConnected, onConnectionChange]);

  const handleConnect = async () => {
    const walletProvider = await connectWallet();
    if (walletProvider) {
      const signer = await walletProvider.getSigner();
      const address = await signer.getAddress();
      setAddress(truncateEthAddress(address));
      setIsConnected(true);
      const balance = await walletProvider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    }
  };

  const handleDisconnect = () => {
    // Disconnect the wallet
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
  };

  return (
    <div className="p-4">
      {!isConnected ? (
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="mb-2">Connected Address: {address}</p>
          <p>Balance: {balance} ETH</p>
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleDisconnect}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
}