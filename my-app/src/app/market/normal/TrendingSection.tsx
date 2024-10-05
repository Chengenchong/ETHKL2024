import React from 'react';

interface TrendingSectionProps {
  title: string;
  type: 'games' | 'assets';
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ title, type }) => {
  const trendingItems = [
    { id: 1, name: 'Item 1', price: '50', volume: '1000' },
    { id: 2, name: 'Item 2', price: '75', volume: '1500' },
    { id: 3, name: 'Item 3', price: '100', volume: '2000' },
    { id: 4, name: 'Item 4', price: '125', volume: '2500' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button className="font-bold text-blue-500">Trending</button>
          <button className="text-gray-500">Top</button>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-500">1h</button>
          <button className="text-gray-500">6h</button>
          <button className="text-gray-500">24h</button>
          <button className="text-gray-500">7d</button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2">Collection</th>
            <th className="pb-2">Floor Price</th>
            <th className="pb-2">Volume</th>
          </tr>
        </thead>
        <tbody>
          {trendingItems.map((item) => (
            <tr key={item.id} className="border-t border-gray-700">
              <td className="py-4 flex items-center">
                <img src={`/placeholder-${type}.jpg`} alt={item.name} className="w-10 h-10 rounded-full mr-2" />
                {item.name}
              </td>
              <td className="py-4">{item.price}</td>
              <td className="py-4">{item.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingSection;