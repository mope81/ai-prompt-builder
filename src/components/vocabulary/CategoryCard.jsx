import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function CategoryCard({ 
  category, 
  onAddTerm, 
  isUserCategory = false,
  onDeleteTerm = null 
}) {
  const Icon = category.icon;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-3">
        {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
        <h3 className="text-lg font-semibold">{category.name}</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {category.values.map((term, index) => (
          <span 
            key={index}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm
              ${isUserCategory ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {term}
            {isUserCategory && onDeleteTerm && (
              <button
                onClick={() => onDeleteTerm(category.name, term)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            )}
          </span>
        ))}
        
        {onAddTerm && (
          <button
            onClick={() => onAddTerm(category.name)}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm
              bg-green-100 text-green-800 hover:bg-green-200"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            添加词条
          </button>
        )}
      </div>
    </div>
  );
}
