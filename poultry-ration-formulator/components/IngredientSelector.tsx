
import React from 'react';
import { AVAILABLE_INGREDIENTS } from '../constants';
import { type Ingredient, type RationIngredient } from '../types';
import { PlusIcon } from './icons';

interface IngredientSelectorProps {
  onAddIngredient: (ingredient: Ingredient) => void;
  rationIngredients: RationIngredient[];
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ onAddIngredient, rationIngredients }) => {
  const addedIngredientNames = new Set(rationIngredients.map(ing => ing.name));
  const availableToAdd = AVAILABLE_INGREDIENTS.filter(ing => !addedIngredientNames.has(ing.name));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Feed Ingredients</h2>
       <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {availableToAdd.map((ingredient) => (
          <div key={ingredient.name} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
            <span className="text-gray-700">{ingredient.name}</span>
            <button
              onClick={() => onAddIngredient(ingredient)}
              className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
              aria-label={`Add ${ingredient.name}`}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
       </div>
       {availableToAdd.length === 0 && (
          <p className="text-center text-gray-500 py-4">All ingredients have been added.</p>
        )}
    </div>
  );
};

export default IngredientSelector;
