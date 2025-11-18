
import { type Ingredient, type Nutrient, type AnimalCategoryRequirements } from './types';

export const ALL_NUTRIENT_REQUIREMENTS: AnimalCategoryRequirements = {
  poultry: {
    'egg-type': {
      'Starter (0-6 wks)': {
        low: { metabolizableEnergy: 2750, crudeProtein: 19.20, calcium: 0.96, availablePhosphorus: 0.47, salt: 0.25, linoleicAcid: 1.00, lysine: 0.88, methionine: 0.36, methionineCystine: 0.69, threonine: 0.66, tryptophan: 0.19 },
        medium: { metabolizableEnergy: 2800, crudeProtein: 19.60, calcium: 0.98, availablePhosphorus: 0.48, salt: 0.25, linoleicAcid: 1.00, lysine: 0.90, methionine: 0.36, methionineCystine: 0.70, threonine: 0.67, tryptophan: 0.20 },
        high: { metabolizableEnergy: 2850, crudeProtein: 19.90, calcium: 1.00, availablePhosphorus: 0.49, salt: 0.25, linoleicAcid: 1.00, lysine: 0.91, methionine: 0.37, methionineCystine: 0.71, threonine: 0.68, tryptophan: 0.20 },
      },
      'Grower (6-12 wks)': {
        low: { metabolizableEnergy: 2700, crudeProtein: 15.70, calcium: 1.00, availablePhosphorus: 0.43, salt: 0.30, linoleicAcid: 1.00, lysine: 0.68, methionine: 0.32, methionineCystine: 0.57, threonine: 0.54, tryptophan: 0.16 },
        medium: { metabolizableEnergy: 2750, crudeProtein: 16.00, calcium: 1.13, availablePhosphorus: 0.44, salt: 0.30, linoleicAcid: 1.00, lysine: 0.69, methionine: 0.33, methionineCystine: 0.58, threonine: 0.55, tryptophan: 0.17 },
        high: { metabolizableEnergy: 2800, crudeProtein: 16.30, calcium: 1.18, availablePhosphorus: 0.45, salt: 0.30, linoleicAcid: 1.00, lysine: 0.70, methionine: 0.34, methionineCystine: 0.59, threonine: 0.56, tryptophan: 0.17 },
      },
      'Developer (12-18 wks)': {
        low: { metabolizableEnergy: 2650, crudeProtein: 14.00, calcium: 0.90, availablePhosphorus: 0.43, salt: 0.20, linoleicAcid: 1.00, lysine: 0.69, methionine: 0.33, methionineCystine: 0.57, threonine: 0.55, tryptophan: 0.15 },
        medium: { metabolizableEnergy: 2700, crudeProtein: 14.30, calcium: 0.95, availablePhosphorus: 0.44, salt: 0.20, linoleicAcid: 1.00, lysine: 0.70, methionine: 0.34, methionineCystine: 0.58, threonine: 0.56, tryptophan: 0.16 },
        high: { metabolizableEnergy: 2750, crudeProtein: 14.50, calcium: 0.95, availablePhosphorus: 0.45, salt: 0.20, linoleicAcid: 1.00, lysine: 0.70, methionine: 0.34, methionineCystine: 0.58, threonine: 0.56, tryptophan: 0.16 },
      },
    },
    'broiler-type': {
        'Booster (0-2 wks)': {
            low: { metabolizableEnergy: 2800, crudeProtein: 21.50, calcium: 0.84, availablePhosphorus: 0.45, salt: 0.25, lysine: 1.12, methionine: 0.48, methionineCystine: 0.84, threonine: 0.78, tryptophan: 0.22 },
            medium: { metabolizableEnergy: 2900, crudeProtein: 22.30, calcium: 0.87, availablePhosphorus: 0.46, salt: 0.25, lysine: 1.16, methionine: 0.49, methionineCystine: 0.87, threonine: 0.81, tryptophan: 0.23 },
            high: { metabolizableEnergy: 3000, crudeProtein: 23.00, calcium: 0.90, availablePhosphorus: 0.48, salt: 0.25, lysine: 1.20, methionine: 0.51, methionineCystine: 0.90, threonine: 0.84, tryptophan: 0.24 },
        },
        'Starter (2-4 wks)': {
            low: { metabolizableEnergy: 2700, crudeProtein: 19.30, calcium: 0.81, availablePhosphorus: 0.41, salt: 0.30, lysine: 0.97, methionine: 0.38, methionineCystine: 0.68, threonine: 0.62, tryptophan: 0.19 },
            medium: { metabolizableEnergy: 2800, crudeProtein: 20.00, calcium: 0.84, availablePhosphorus: 0.42, salt: 0.30, lysine: 1.01, methionine: 0.39, methionineCystine: 0.70, threonine: 0.64, tryptophan: 0.20 },
            high: { metabolizableEnergy: 2900, crudeProtein: 20.70, calcium: 0.87, availablePhosphorus: 0.44, salt: 0.30, lysine: 1.04, methionine: 0.41, methionineCystine: 0.72, threonine: 0.67, tryptophan: 0.21 },
        },
        'Finisher (4-6 wks)': {
            low: { metabolizableEnergy: 2700, crudeProtein: 18.00, calcium: 0.76, availablePhosphorus: 0.38, salt: 0.30, lysine: 0.86, methionine: 0.32, methionineCystine: 0.59, threonine: 0.57, tryptophan: 0.16 },
            medium: { metabolizableEnergy: 2800, crudeProtein: 18.70, calcium: 0.78, availablePhosphorus: 0.39, salt: 0.30, lysine: 0.90, methionine: 0.33, methionineCystine: 0.62, threonine: 0.59, tryptophan: 0.17 },
            high: { metabolizableEnergy: 2900, crudeProtein: 19.30, calcium: 0.81, availablePhosphorus: 0.41, salt: 0.30, lysine: 0.93, methionine: 0.35, methionineCystine: 0.64, threonine: 0.61, tryptophan: 0.18 },
        },
    }
  }
};

export const AVAILABLE_INGREDIENTS: Ingredient[] = [
    { name: 'Corn, yellow (local)', nutrients: { metabolizableEnergy: 3359, crudeProtein: 8.05, crudeFat: 3.94, crudeFiber: 2.44, calcium: 0.17, availablePhosphorus: 0.07, lysine: 0.26, methionine: 0.18, methionineCystine: 0.37, threonine: 0.29, tryptophan: 0.07, linoleicAcid: 1.85 } },
    { name: 'Soybean Meal (US, 47.5%)', nutrients: { metabolizableEnergy: 2355, crudeProtein: 47.65, crudeFat: 1.23, crudeFiber: 3.43, calcium: 0.47, availablePhosphorus: 0.21, lysine: 3.06, methionine: 0.68, methionineCystine: 1.4, threonine: 1.86, tryptophan: 0.64, linoleicAcid: 0.65 } },
    { name: 'Rice bran, D1', nutrients: { metabolizableEnergy: 2988, crudeProtein: 12.14, crudeFat: 13.79, crudeFiber: 5.27, calcium: 0.15, availablePhosphorus: 0.22, lysine: 0.55, methionine: 0.25, methionineCystine: 0.51, threonine: 0.45, tryptophan: 0.14, linoleicAcid: 4.50 } },
    { name: 'Copra meal, expeller', nutrients: { metabolizableEnergy: 2119, crudeProtein: 21.00, crudeFat: 10.51, crudeFiber: 8.76, calcium: 0.22, availablePhosphorus: 0.10, lysine: 0.53, methionine: 0.32, methionineCystine: 0.63, threonine: 0.67, tryptophan: 0.17, linoleicAcid: 0.15 } },
    { name: 'Fish meal, local tuna (60%)', nutrients: { metabolizableEnergy: 3137, crudeProtein: 59.19, crudeFat: 13.28, crudeFiber: 0.57, calcium: 4.83, availablePhosphorus: 2.94, lysine: 4.52, methionine: 1.66, methionineCystine: 2.23, threonine: 2.51, tryptophan: 0.62, linoleicAcid: 0.85 } },
    { name: 'Limestone', nutrients: { calcium: 38.0 } },
    { name: 'Dicalcium Phosphate', nutrients: { calcium: 24.46, availablePhosphorus: 15.91 } },
    { name: 'Salt (NaCl)', nutrients: { salt: 100 } },
    { name: 'Vitamins/Minerals Premix', nutrients: {} },
];

export const NUTRIENT_DISPLAY_NAMES: Record<Nutrient, string> = {
  metabolizableEnergy: 'Metabolizable Energy',
  crudeProtein: 'Crude Protein',
  crudeFiber: 'Crude Fiber',
  crudeFat: 'Crude Fat',
  lysine: 'Lysine',
  methionine: 'Methionine',
  methionineCystine: 'Methionine + Cystine',
  threonine: 'Threonine',
  tryptophan: 'Tryptophan',
  calcium: 'Calcium',
  availablePhosphorus: 'Available Phosphorus',
  linoleicAcid: 'Linoleic Acid',
  salt: 'Salt (NaCl)',
};

export const NUTRIENT_UNITS: Record<Nutrient, string> = {
  metabolizableEnergy: 'kcal/kg',
  crudeProtein: '%',
  crudeFiber: '%',
  crudeFat: '%',
  lysine: '%',
  methionine: '%',
  methionineCystine: '%',
  threonine: '%',
  tryptophan: '%',
  calcium: '%',
  availablePhosphorus: '%',
  linoleicAcid: '%',
  salt: '%',
};

export const NUTRIENT_CHECKS: Partial<Record<Nutrient, 'min' | 'max' | 'exact'>> = {
    metabolizableEnergy: 'min',
    crudeProtein: 'min',
    crudeFiber: 'max',
    crudeFat: 'min',
    lysine: 'min',
    methionine: 'min',
    methionineCystine: 'min',
    threonine: 'min',
    tryptophan: 'min',
    calcium: 'exact',
    availablePhosphorus: 'exact',
    linoleicAcid: 'min',
    salt: 'exact',
};
