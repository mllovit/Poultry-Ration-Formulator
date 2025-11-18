
import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import NutrientRequirementsCard from './components/NutrientRequirementsCard';
import IngredientSelector from './components/IngredientSelector';
import RationTable from './components/RationTable';
import AnalysisSummary from './components/AnalysisSummary';
import { RefreshCwIcon } from './components/icons';
import { type Ingredient, type RationIngredient, type Nutrient, type NutrientProfile, type NutrientDensity } from './types';
import { ALL_NUTRIENT_REQUIREMENTS } from './constants';
import SelectionControls from './components/SelectionControls';

// Helper function to safely get nested keys from the requirements object.
const getSafeInitialState = () => {
  const initialCategory = Object.keys(ALL_NUTRIENT_REQUIREMENTS)[0] || '';
  const typesForCategory = initialCategory ? ALL_NUTRIENT_REQUIREMENTS[initialCategory] : {};
  const initialType = Object.keys(typesForCategory)[0] || '';
  const stagesForType = initialType ? (typesForCategory[initialType] || {}) : {};
  const initialStage = Object.keys(stagesForType)[0] || '';
  const stageData = initialStage ? (stagesForType[initialStage] || {}) : {};

  const densities = Object.keys(stageData).filter(d => d !== 'default') as NutrientDensity[];
  let initialDensity: NutrientDensity = 'high'; // Default fallback

  if (densities.length > 0) {
     initialDensity = densities.includes('high') ? 'high' : densities[0];
  }

  return { initialCategory, initialType, initialStage, initialDensity };
};


// Calculate initial states safely before component definition.
const { initialCategory, initialType, initialStage, initialDensity } = getSafeInitialState();

const App: React.FC = () => {
  const [rationIngredients, setRationIngredients] = useState<RationIngredient[]>([]);

  const [animalCategory, setAnimalCategory] = useState(initialCategory);
  const [animalType, setAnimalType] = useState(initialType);
  const [animalStage, setAnimalStage] = useState(initialStage);
  const [nutrientDensity, setNutrientDensity] = useState<NutrientDensity>(initialDensity);

  const handleCategoryChange = (newCategory: string) => {
    setAnimalCategory(newCategory);
    
    const types = ALL_NUTRIENT_REQUIREMENTS[newCategory] || {};
    const newType = Object.keys(types)[0] || '';
    setAnimalType(newType);
    
    const stages = newType ? (types[newType] || {}) : {};
    const newStage = Object.keys(stages)[0] || '';
    setAnimalStage(newStage);
    
    const stageData = newStage ? (stages[newStage] || {}) : {};
    const densities = Object.keys(stageData).filter(d => d !== 'default') as NutrientDensity[];
    if (densities.length > 0) {
        const newDensity = densities.includes('high') ? 'high' : densities[0];
        setNutrientDensity(newDensity);
    }
  };

  const handleTypeChange = (newType: string) => {
      setAnimalType(newType);

      const stages = ALL_NUTRIENT_REQUIREMENTS[animalCategory]?.[newType] || {};
      const newStage = Object.keys(stages)[0] || '';
      setAnimalStage(newStage);

      const stageData = newStage ? (stages[newStage] || {}) : {};
      const densities = Object.keys(stageData).filter(d => d !== 'default') as NutrientDensity[];
      if (densities.length > 0) {
          const newDensity = densities.includes('high') ? 'high' : densities[0];
          setNutrientDensity(newDensity);
      }
  };

  const handleStageChange = (newStage: string) => {
      setAnimalStage(newStage);
      const stageData = ALL_NUTRIENT_REQUIREMENTS[animalCategory]?.[animalType]?.[newStage] || {};
      const densities = Object.keys(stageData).filter(d => d !== 'default') as NutrientDensity[];
      if (densities.length > 0) {
          const newDensity = densities.includes('high') ? 'high' : densities[0];
          setNutrientDensity(newDensity);
      }
  };


  const currentRequirements = useMemo(() => {
    const stageData = ALL_NUTRIENT_REQUIREMENTS[animalCategory]?.[animalType]?.[animalStage];
    if (!stageData) return {};
    // Use `default` if it exists and there are no density levels, otherwise use selected density
    const densityKeys = Object.keys(stageData).filter(k => k !== 'default');
    if (densityKeys.length > 0) {
        return stageData[nutrientDensity] || {};
    }
    return stageData.default || {};
  }, [animalCategory, animalType, animalStage, nutrientDensity]);


  const handleAddIngredient = useCallback((ingredient: Ingredient) => {
    setRationIngredients(prev => {
        if (prev.some(i => i.name === ingredient.name)) {
            return prev;
        }
        const newIngredient: RationIngredient = {
            ...ingredient,
            id: `${Date.now()}-${Math.random()}`,
            weight: 0,
        };
        return [...prev, newIngredient];
    });
  }, []);

  const handleRemoveIngredient = useCallback((id: string) => {
    setRationIngredients(prev => prev.filter(ing => ing.id !== id));
  }, []);
  
  const handleUpdateIngredientWeight = useCallback((id: string, weight: number) => {
    setRationIngredients(prev => 
      prev.map(ing => (ing.id === id ? { ...ing, weight: Math.max(0, weight) } : ing))
    );
  }, []);

  const handleReset = () => {
    setRationIngredients([]);
  };

  const { totalWeight, calculatedNutrients } = useMemo(() => {
    const currentTotalWeight = rationIngredients.reduce((sum, ing) => sum + ing.weight, 0);

    if (currentTotalWeight === 0) {
        return { totalWeight: 0, calculatedNutrients: {} };
    }

    const sums: NutrientProfile = {};

    // Calculate the sum of (nutrientValue * weight) for each nutrient
    for (const ingredient of rationIngredients) {
        for (const key in ingredient.nutrients) {
            const nutrientKey = key as Nutrient;
            const nutrientValue = ingredient.nutrients[nutrientKey] || 0;
            sums[nutrientKey] = (sums[nutrientKey] || 0) + nutrientValue * ingredient.weight;
        }
    }
    
    const finalNutrients: NutrientProfile = {};
    
    // Calculate the weighted average for each nutrient
    for (const key in sums) {
        const nutrientKey = key as Nutrient;
        finalNutrients[nutrientKey] = (sums[nutrientKey] || 0) / currentTotalWeight;
    }

    return { totalWeight: currentTotalWeight, calculatedNutrients: finalNutrients };
  }, [rationIngredients]);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header category={animalCategory} type={animalType} stage={animalStage} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 p-4 border rounded-lg bg-white shadow-sm">
                <SelectionControls 
                  animalCategory={animalCategory} onCategoryChange={handleCategoryChange}
                  animalType={animalType} onTypeChange={handleTypeChange}
                  animalStage={animalStage} onStageChange={handleStageChange}
                  nutrientDensity={nutrientDensity} onDensityChange={setNutrientDensity}
                />
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 w-full md:w-auto"
                >
                    <RefreshCwIcon className="h-4 w-4" />
                    Reset Formula
                </button>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <NutrientRequirementsCard requirements={currentRequirements} />
              <IngredientSelector onAddIngredient={handleAddIngredient} rationIngredients={rationIngredients}/>
            </div>

            <div className="lg:col-span-2 space-y-8">
                <RationTable 
                    ingredients={rationIngredients} 
                    onUpdateWeight={handleUpdateIngredientWeight}
                    onRemove={handleRemoveIngredient}
                    totalWeight={totalWeight}
                />
                <AnalysisSummary calculatedNutrients={calculatedNutrients} totalWeight={totalWeight} requirements={currentRequirements} />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>Nutrient data based on PHILSAN Reference Standards (4th Edition). Created by VETM2C - Group 6.</p>
      </footer>
    </div>
  );
};

export default App;
