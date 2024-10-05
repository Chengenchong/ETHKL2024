import React from 'react';

interface ProductGridProps {
  type: 'Games' | 'In-Game Assets';
  onPurchase: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ type, onPurchase }) => {
  const handlePurchase = () => {
    onPurchase();
  };

  const products = type === 'Games' 
    ? [
        { id: '1', name: 'Game 1', price: 50, image: '/game1.jpg' },
        { id: '2', name: 'Game 2', price: 75, image: '/game2.jpg' },
        { id: '3', name: 'Game 3', price: 100, image: '/game3.jpg' },
        { id: '4', name: 'Game 4', price: 125, image: '/game4.jpg' },
      ]
    : [
        { id: '1', name: 'Asset 1', price: 5, image: '/asset1.jpg' },
        { id: '2', name: 'Asset 2', price: 10, image: '/asset2.jpg' },
        { id: '3', name: 'Asset 3', price: 15, image: '/asset3.jpg' },
        { id: '4', name: 'Asset 4', price: 20, image: '/asset4.jpg' },
      ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-purple-300 mt-2">{product.price} ETH</p>
            <button onClick={handlePurchase} className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full w-full">
              {type === 'Games' ? 'Play Now' : 'Buy Now'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;