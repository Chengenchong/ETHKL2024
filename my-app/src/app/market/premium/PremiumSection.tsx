import React from 'react';

const PremiumSection: React.FC = () => {
  const premiumItems = [
    { id: '1', name: 'Product 2', price: 75, image: '/product2.jpg' },
    { id: '2', name: 'Product 3', price: 100, image: '/product3.jpg' },
    { id: '3', name: 'Product 4', price: 125, image: '/product4.jpg' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {premiumItems.map((item) => (
        <div key={item.id} className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
            <p className="text-yellow-300 mt-2">{item.price} ETH</p>
            <button className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors duration-300">
              Play Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumSection;