'use client';

import React, { useState, useEffect } from 'react';
import { connectWallet } from '../../utils/ethereumProvider';
import { ethers } from 'ethers';
import truncateEthAddress from 'truncate-eth-address';

export default function WalletSwitcher() {
  const [currentNetwork, setCurrentNetwork] = useState<'scroll' | 'manta'>('scroll');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (isWalletConnected) {
      handleNetworkChange(currentNetwork);
    }
  }, [currentNetwork]);

  const handleNetworkChange = async (network: 'scroll' | 'manta') => {
    setCurrentNetwork(network);
    if (isWalletConnected) {
      await connectAndUpdateWallet(network);
    }
  };

  const connectAndUpdateWallet = async (network: 'scroll' | 'manta') => {
    const walletProvider = await connectWallet(network);
    if (walletProvider) {
      const signer = await walletProvider.getSigner();
      const newAddress = await signer.getAddress();
      setAddress(truncateEthAddress(newAddress));
      setIsWalletConnected(true);
      const newBalance = await walletProvider.getBalance(newAddress);
      setBalance(ethers.formatEther(newBalance));
    } else {
      setIsWalletConnected(false);
      setAddress(null);
      setBalance(null);
    }
  };

  const handleConnect = async () => {
    await connectAndUpdateWallet(currentNetwork);
  };

  const handleDisconnect = () => {
    setIsWalletConnected(false);
    setAddress(null);
    setBalance(null);
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
      
      <div className="px-10">
        {!isWalletConnected ? (
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnect}
          >
            Connect to {currentNetwork === 'scroll' ? 'Scroll Sepoila Testnet' : 'Manta Pacific Sepoila Testnet'}
          </button>
        ) : (
          <div>
            <p className="mb-2">Connected to: {currentNetwork === 'scroll' ? 'Scroll Sepoila Testnet' : 'Manta Pacific Sepoila Testnet'}</p>
            <p className="mb-2">Address: {address}</p>
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
    </div>
  );
}