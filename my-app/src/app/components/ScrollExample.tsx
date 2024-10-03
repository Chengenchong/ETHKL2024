'use client';

import React, { useState, useEffect } from 'react';
import { getProvider, connectWallet } from '../../utils/ethereumProvider';
import { ethers } from 'ethers';

export default function ScrollExample() {
  const [balance, setBalance] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const provider = getProvider();
    // You can use the provider here to interact with the Scroll network
  }, []);

  const handleConnect = async () => {
    const walletProvider = await connectWallet();
    if (walletProvider) {
      const signer = await walletProvider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
      setIsConnected(true);
      const balance = await walletProvider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scroll Integration Example</h1>
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
        </div>
      )}
    </div>
  );
}