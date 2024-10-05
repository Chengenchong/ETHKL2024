import React from "react";

const PremiumSection: React.FC = () => {
  const premiumProducts = [
    { id: 1, name: "Premium Game 1", price: "$120", imageUrl: "/premium1.png" },
    { id: 2, name: "Premium Game 2", price: "$200", imageUrl: "/premium2.png" },
    // Add more premium products as needed
  ];

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {premiumProducts.map((product) => (
        <div
          key={product.id}
          className="premium-card bg-purple-600 text-white rounded-lg overflow-hidden shadow-lg"
        >
          <img src={product.imageUrl} alt={product.name} className="w-full" />
          <div className="p-4">
            <h3 className="text-lg">{product.name}</h3>
            <p className="text-gray-200">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumSection;
