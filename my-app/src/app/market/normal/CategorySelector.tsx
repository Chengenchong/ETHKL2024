import React from 'react';

interface CategorySelectorProps {
  activeCategory: 'Games' | 'In-Game Assets';
  onCategoryChange: (category: 'Games' | 'In-Game Assets') => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-2 mb-6">
      <button
        className={`px-4 py-2 rounded-lg ${
          activeCategory === 'Games'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-700 text-gray-300'
        }`}
        onClick={() => onCategoryChange('Games')}
      >
        Games
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          activeCategory === 'In-Game Assets'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-700 text-gray-300'
        }`}
        onClick={() => onCategoryChange('In-Game Assets')}
      >
        In-Game Assets
      </button>
    </div>
  );
};

export default CategorySelector;