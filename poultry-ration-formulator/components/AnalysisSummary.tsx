
import React from 'react';
import { NUTRIENT_DISPLAY_NAMES, NUTRIENT_UNITS, NUTRIENT_CHECKS } from '../constants';
import { type Nutrient, type NutrientProfile, type RequirementProfile } from '../types';

interface AnalysisSummaryProps {
  calculatedNutrients: NutrientProfile;
  requirements: RequirementProfile;
  totalWeight: number;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ calculatedNutrients, requirements, totalWeight }) => {
  
    const getStatus = (key: Nutrient, value: number) => {
        const neutral = { text: 'N/A', badgeColor: 'bg-gray-200 text-gray-700', textColor: 'text-gray-800' };
        
        if (totalWeight !== 100) return neutral;

        const requirement = requirements[key];
        if (requirement === undefined) return { ...neutral, text: '-' };
        
        const checkType = NUTRIENT_CHECKS[key];
        const tolerance = key === 'metabolizableEnergy' ? 50 : 0.05;

        const sufficient = { text: 'Sufficient', badgeColor: 'bg-green-100 text-green-800', textColor: 'text-green-600' };
        const deficient = { text: 'Deficient', badgeColor: 'bg-red-100 text-red-800', textColor: 'text-red-600' };
        const excess = { text: 'Excess', badgeColor: 'bg-yellow-100 text-yellow-800', textColor: 'text-yellow-600' };

        switch (checkType) {
            case 'min':
                if (value >= requirement) return sufficient;
                return deficient;
            case 'max':
                if (value <= requirement) return sufficient;
                return excess;
            case 'exact':
                 if (Math.abs(value - requirement) <= tolerance) return sufficient;
                 if (value < requirement) return deficient;
                 return excess;
            default:
                return neutral;
        }
    };
  
    const orderedNutrients = Object.keys(requirements).sort((a,b) => {
        const order = ['metabolizableEnergy', 'crudeProtein', 'lysine', 'methionine', 'methionineCystine', 'threonine', 'tryptophan', 'calcium', 'availablePhosphorus', 'crudeFat', 'crudeFiber', 'linoleicAcid', 'salt'];
        return order.indexOf(a) - order.indexOf(b);
      });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutrient Analysis</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
                <tr>
                    <th className="py-2 px-3 font-semibold text-gray-600">Nutrient</th>
                    <th className="py-2 px-3 font-semibold text-gray-600 text-right">Required</th>
                    <th className="py-2 px-3 font-semibold text-gray-600 text-right">Formulated</th>
                    <th className="py-2 px-3 font-semibold text-gray-600 text-center">Status</th>
                </tr>
            </thead>
            <tbody>
            {orderedNutrients.map((key) => {
                const nutrientKey = key as Nutrient;
                const calculatedValue = calculatedNutrients[nutrientKey] || 0;
                const requirement = requirements[nutrientKey];
                if (requirement === undefined) return null;

                const status = getStatus(nutrientKey, calculatedValue);
                const unit = NUTRIENT_UNITS[nutrientKey];
                
                return (
                    <tr key={key} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 px-3 text-gray-700">{NUTRIENT_DISPLAY_NAMES[nutrientKey]}</td>
                        <td className="py-3 px-3 text-right text-gray-500">{requirement.toLocaleString()} {unit}</td>
                        <td className={`py-3 px-3 text-right font-semibold ${status.textColor} transition-colors`}>
                            {calculatedValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {unit}
                        </td>
                        <td className="py-3 px-3 text-center">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.badgeColor}`}>
                                {status.text}
                            </span>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
        {totalWeight !== 100 && <p className="text-center mt-4 text-sm text-gray-500">Analysis will be shown when total weight is 100 kg.</p>}
      </div>
    </div>
  );
};

export default AnalysisSummary;
