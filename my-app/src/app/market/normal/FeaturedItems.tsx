import React from 'react';

const FeaturedItems: React.FC = () => {
  const items = [
    { id: 1, title: 'Cosmic Rays (Verse)', artist: 'Melissa Wiederrecht', price: '0.09 ETH', image: '/cosmic-rays.jpg' },
    { id: 2, title: 'Dylan Wade Editions', artist: '', price: '0.23 ETH', image: '/dylan-wade.jpg' },
    { id: 3, title: 'Night Vision Series', artist: 'Jake Fried', price: '0.57 ETH', image: '/night-vision.jpg' },
    { id: 4, title: "Zanzibar's Kids", artist: 'Alexandru Chitu', price: '0.18 ETH', image: '/zanzibar-kids.jpg' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {items.map((item) => (
        <div key={item.id} className="relative rounded-lg overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-bold">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.artist}</p>
            <p className="text-white text-sm mt-1">Floor: {item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedItems;