import React, { useState, useEffect } from 'react';

const MantaMarketplace = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [gasFee, setGasFee] = useState('0.0001');
  const [assetPrice, setAssetPrice] = useState('');
  const [totalCost, setTotalCost] = useState('');

  useEffect(() => {
    if (assetPrice) {
      const total = parseFloat(assetPrice) + parseFloat(gasFee);
      setTotalCost(total.toFixed(8));
    }
  }, [assetPrice, gasFee]);

  const connect = () => {
    // Simulating connection to Manta Network
    setIsConnected(true);
  };

  const handleTrade = () => {
    // Simulating trade functionality
    alert('Trading functionality would be implemented here.');
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Manta Network Marketplace</h2>
      <div className="space-y-4">
        {!isConnected ? (
          <button
            onClick={connect}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Connect to Manta Network
          </button>
        ) : (
          <>
            <div>
              <label className="block text-white mb-2">Asset Price (MANTA)</label>
              <input
                type="number"
                value={assetPrice}
                onChange={(e) => setAssetPrice(e.target.value)}
                placeholder="Enter asset price"
                className="w-full p-2 rounded bg-zinc-700 text-white"
              />
            </div>
            <div>
              <p className="text-white">Estimated Gas Fee: {gasFee} MANTA</p>
              <p className="text-white font-bold">Total Cost: {totalCost} MANTA</p>
            </div>
          </>
        )}
        <button
          onClick={handleTrade}
          disabled={!isConnected || !assetPrice}
          className={`w-full font-bold py-2 px-4 rounded ${
            isConnected && assetPrice
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          Trade Asset
        </button>
      </div>
      <div className="mt-4 p-4 bg-yellow-100 rounded-md flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-sm text-yellow-700">
          This is a simulated interface. In a real implementation, you would integrate with the Manta Network SDK.
        </p>
      </div>
    </div>
  );
};

export default MantaMarketplace;