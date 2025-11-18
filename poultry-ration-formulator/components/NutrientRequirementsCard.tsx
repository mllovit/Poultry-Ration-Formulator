
import React from 'react';
import { NUTRIENT_DISPLAY_NAMES, NUTRIENT_UNITS, NUTRIENT_CHECKS } from '../constants';
import { type Nutrient, type RequirementProfile } from '../types';

interface NutrientRequirementsCardProps {
    requirements: RequirementProfile;
}

const NutrientRequirementsCard: React.FC<NutrientRequirementsCardProps> = ({ requirements }) => {
  const orderedNutrients = Object.keys(requirements).sort((a,b) => {
    const order = ['metabolizableEnergy', 'crudeProtein', 'lysine', 'methionine', 'methionineCystine', 'threonine', 'tryptophan', 'calcium', 'availablePhosphorus', 'crudeFat', 'crudeFiber', 'linoleicAcid', 'salt'];
    return order.indexOf(a) - order.indexOf(b);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutrient Requirements</h2>
      <p className="text-sm text-gray-500 mb-4">Target values for a 100kg feed mix.</p>
      <div className="space-y-3">
        {orderedNutrients.map((key) => {
            const nutrientKey = key as Nutrient;
            const value = requirements[nutrientKey];
            if(value === undefined) return null;

            const checkType = NUTRIENT_CHECKS[nutrientKey];
            let checkLabel = '';
            if (checkType === 'min') checkLabel = '(min)';
            if (checkType === 'max') checkLabel = '(max)';

            return (
                <div key={key} className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0">
                    <span className="text-gray-600 font-medium">
                        {NUTRIENT_DISPLAY_NAMES[nutrientKey]} 
                        <span className="text-xs text-gray-400 ml-1">{checkLabel}</span>
                    </span>
                    <span className="font-semibold text-gray-800">
                        {value.toLocaleString()} {NUTRIENT_UNITS[nutrientKey]}
                    </span>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default NutrientRequirementsCard;
