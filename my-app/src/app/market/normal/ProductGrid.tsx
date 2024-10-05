import React from "react";

interface ProductGridProps {
  type: "games" | "assets";
}

const ProductGrid: React.FC<ProductGridProps> = ({ type }) => {
  const products = [
    { id: 1, name: "Game 1", price: "$50", imageUrl: "/game1.png" },
    { id: 2, name: "Game 2", price: "$30", imageUrl: "/game2.png" },
    { id: 3, name: "Skin 1", price: "$10", imageUrl: "/skin1.png" },
    // Add more products as needed
  ];

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card bg-zinc-800 text-white rounded-lg overflow-hidden shadow-lg"
        >
          <img src={product.imageUrl} alt={product.name} className="w-full" />
          <div className="p-4">
            <h3 className="text-lg">{product.name}</h3>
            <p className="text-gray-400">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
