import React from 'react';
import { ALL_NUTRIENT_REQUIREMENTS } from '../constants';
import { type NutrientDensity } from '../types';

interface SelectionControlsProps {
    animalCategory: string;
    onCategoryChange: (value: string) => void;
    animalType: string;
    onTypeChange: (value: string) => void;
    animalStage: string;
    onStageChange: (value: string) => void;
    nutrientDensity: NutrientDensity;
    onDensityChange: (value: NutrientDensity) => void;
}

const SelectionControls: React.FC<SelectionControlsProps> = ({
    animalCategory, onCategoryChange,
    animalType, onTypeChange,
    animalStage, onStageChange,
    nutrientDensity, onDensityChange,
}) => {
    // Safely derive options for dropdowns by accessing data step-by-step
    const typesForCategory = ALL_NUTRIENT_REQUIREMENTS[animalCategory] || {};
    const animalTypes = Object.keys(typesForCategory);

    const stagesForType = typesForCategory[animalType] || {};
    const animalStages = Object.keys(stagesForType);
    
    const densitiesForStage = stagesForType[animalStage] || {};
    const nutrientDensityOptions = Object.keys(densitiesForStage).filter(d => d !== 'default');


    const toTitleCase = (str: string) => str.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

    const Select = ({ label, value, onChange, options, formatOptions = true }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[], formatOptions?: boolean }) => (
      <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <select
              value={value}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={options.length === 0}
          >
              {/* Use the new prop to conditionally format the option text */}
              {options.map(option => <option key={option} value={option}>{formatOptions ? toTitleCase(option) : option}</option>)}
          </select>
      </div>
    );
    
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
            <Select 
                label="Category" 
                value={animalCategory} 
                onChange={(e) => onCategoryChange(e.target.value)} 
                options={Object.keys(ALL_NUTRIENT_REQUIREMENTS)} 
            />
            <Select 
                label="Type" 
                value={animalType} 
                onChange={(e) => onTypeChange(e.target.value)} 
                options={animalTypes} 
            />
            <Select 
                label="Stage" 
                value={animalStage} 
                onChange={(e) => onStageChange(e.target.value)} 
                options={animalStages}
            />  
            {nutrientDensityOptions.length > 0 && (
                <Select 
                    label="Density" 
                    value={nutrientDensity} 
                    onChange={(e) => onDensityChange(e.target.value as NutrientDensity)} 
                    options={nutrientDensityOptions} 
                />
            )}
        </div>
    );
};

export default SelectionControls;