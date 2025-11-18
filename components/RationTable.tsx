
import React from 'react';
import { type RationIngredient } from '../types';
import { TrashIcon } from './icons';

interface RationTableProps {
  ingredients: RationIngredient[];
  onUpdateWeight: (id: string, weight: number) => void;
  onRemove: (id: string) => void;
  totalWeight: number;
}

const RationTable: React.FC<RationTableProps> = ({ ingredients, onUpdateWeight, onRemove, totalWeight }) => {
  const totalWeightClass =
    totalWeight === 100
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Ration Formula</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="py-3 px-4 font-semibold text-gray-600">Ingredient</th>
              <th className="py-3 px-4 font-semibold text-gray-600 w-32 text-right">Weight (kg)</th>
              <th className="py-3 px-4 font-semibold text-gray-600 w-16 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  Add ingredients to start formulating your ration.
                </td>
              </tr>
            ) : (
              ingredients.map((ing) => (
                <tr key={ing.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-800">{ing.name}</td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={ing.weight}
                      onChange={(e) => onUpdateWeight(ing.id, parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full p-2 border border-gray-300 rounded-md text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onRemove(ing.id)}
                      className="p-2 text-red-500 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                      aria-label={`Remove ${ing.name}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className={`font-bold text-lg ${totalWeightClass} transition-colors duration-300`}>
              <td className="py-3 px-4">Total</td>
              <td className="py-3 px-4 text-right">{totalWeight.toFixed(2)} kg</td>
              <td className="py-3 px-4"></td>
            </tr>
          </tfoot>
        </table>
        {totalWeight !== 100 && ingredients.length > 0 && (
             <p className="text-red-600 text-sm mt-2 text-center">Total weight must be exactly 100 kg.</p>
        )}
      </div>
    </div>
  );
};

export default RationTable;
