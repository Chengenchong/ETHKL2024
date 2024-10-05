'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';

interface MantaTransactionProps {
  isWalletConnected: boolean;
  onTransactionComplete: () => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function MantaTransaction({ isWalletConnected, onTransactionComplete }: MantaTransactionProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const validateAddress = (address: string) => {
    try {
      ethers.getAddress(address); // This will throw an error if the address is invalid
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSendTransaction = async () => {
    if (!isWalletConnected) {
      setStatus('Please connect your wallet first.');
      return;
    }

    if (!recipient || !amount) {
      setStatus('Please fill in both recipient address and amount.');
      return;
    }

    if (!validateAddress(recipient)) {
      setStatus('Invalid recipient address. Please check and try again.');
      return;
    }

    setIsLoading(true);
    setStatus('Processing transaction...');

    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const tx = await signer.sendTransaction({
          to: recipient,
          value: ethers.parseEther(amount)
        });

        setStatus(`Transaction sent! Hash: ${tx.hash}`);
        await tx.wait();
        setStatus(`Transaction confirmed! Hash: ${tx.hash}`);
        onTransactionComplete();
      } else {
        throw new Error('Ethereum object not found, do you have MetaMask installed?');
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      setStatus(`Transaction failed: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4">Send ETH on Manta Pacific Sepolia</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Recipient Address:</label>
        <input 
          type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700 text-white"
          placeholder="0x..."
          disabled={!isWalletConnected || isLoading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Amount (ETH):</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700 text-white"
          placeholder="0.0000"
          disabled={!isWalletConnected || isLoading}
        />
      </div>

      <button 
        onClick={handleSendTransaction} 
        disabled={!isWalletConnected || isLoading}
        className={`w-full font-bold py-2 px-4 rounded ${
          !isWalletConnected || isLoading
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isLoading ? 'Processing...' : 'Send Transaction'}
      </button>

      {status && (
        <div className="mt-4 p-2 bg-zinc-700 rounded max-w-full">
          <p className="text-sm break-words overflow-wrap-anywhere">{status}</p>
        </div>
      )}
    </div>
  );
}