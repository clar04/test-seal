import React from 'react';

const CategoryMenu = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">News Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.path}
            className={`category-button ${
              selectedCategory === category.path
                ? 'active' 
                : '' 
            }`}
            onClick={() => onSelectCategory(category.path)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;