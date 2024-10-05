'use client';

import React, { useState } from 'react';

const MantaTransaction = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initializeSDK = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/manta-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getBalance', privateKey }),
      });
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
        setStatus('SDK initialized and balance fetched');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to initialize SDK:', error);
      setStatus('Failed to initialize SDK: ' + (error as Error).message);
    }
    setIsLoading(false);
  };

  const fetchBalance = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/manta-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getBalance', privateKey }),
      });
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
        setStatus('Balance updated');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setStatus('Failed to fetch balance: ' + (error as Error).message);
    }
    setIsLoading(false);
  };

  const sendTransaction = async () => {
    if (!recipient || !amount) {
      setStatus('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/manta-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sendTransaction', privateKey, recipient, amount }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus(`Transaction sent. Hash: ${data.hash}`);
        await fetchBalance();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      setStatus('Transaction failed: ' + (error as Error).message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manta Network Transaction</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Private Key:</label>
        <input 
          type="password" 
          value={privateKey} 
          onChange={(e) => setPrivateKey(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700 text-white"
          placeholder="Enter your private key"
        />
      </div>

      <button 
        onClick={initializeSDK} 
        disabled={isLoading || !privateKey}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {isLoading ? 'Initializing...' : 'Initialize SDK'}
      </button>

      {balance !== null && (
        <div className="mb-4">
          <p>Balance: {balance} MANTA</p>
          <button onClick={fetchBalance} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
            Refresh Balance
          </button>
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2">Recipient Address:</label>
        <input 
          type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700 text-white"
          placeholder="0x..."
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Amount (MANTA):</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700 text-white"
          placeholder="0.0000"
        />
      </div>

      <button 
        onClick={sendTransaction} 
        disabled={isLoading || !privateKey || !balance}
        className={`w-full font-bold py-2 px-4 rounded ${
          isLoading || !privateKey || !balance
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isLoading ? 'Processing...' : 'Send Transaction'}
      </button>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
};

export default MantaTransaction;