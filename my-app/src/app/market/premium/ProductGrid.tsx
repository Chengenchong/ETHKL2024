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
        { id: '1', name: 'Game 1', price: 50, image: 'https://www.freetogame.com/g/5/thumbnail.jpg' }, // Warframe banner
        { id: '2', name: 'Game 2', price: 75, image: 'https://www.freetogame.com/g/6/thumbnail.jpg' }, // Path of Exile banner
        { id: '3', name: 'Game 3', price: 100, image: 'https://www.freetogame.com/g/4/thumbnail.jpg' }, // Dauntless banner
        { id: '4', name: 'Game 4', price: 125, image: 'https://www.freetogame.com/g/3/thumbnail.jpg' }, // Destiny 2 banner
      ]
    : [
        { id: '1', name: 'Asset 1', price: 5, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006' }, // Sword asset
        { id: '2', name: 'Asset 2', price: 10, image: 'https://images.unsplash.com/photo-1610271044747-f302f4d0c402' }, // Magical artifact
        { id: '3', name: 'Asset 3', price: 15, image: 'https://images.unsplash.com/photo-1610271045832-05b6d52bcf0e' }, // Shield
        { id: '4', name: 'Asset 4', price: 20, image: 'https://images.unsplash.com/photo-1588361866246-4ef51c9f60c7' }, // Helmet
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
