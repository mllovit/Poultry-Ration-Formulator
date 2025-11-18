
export type Nutrient =
  | 'metabolizableEnergy'
  | 'crudeProtein'
  | 'crudeFiber'
  | 'crudeFat'
  | 'lysine'
  | 'methionine'
  | 'methionineCystine'
  | 'threonine'
  | 'tryptophan'
  | 'calcium'
  | 'availablePhosphorus'
  | 'linoleicAcid'
  | 'salt';

export type NutrientProfile = Partial<Record<Nutrient, number>>;

export interface Ingredient {
  name: string;
  nutrients: NutrientProfile;
}

export interface RationIngredient extends Ingredient {
  id: string;
  weight: number;
}

// Data structure for requirements
export type NutrientDensity = 'low' | 'medium' | 'high';
export type RequirementProfile = NutrientProfile;

export interface StageRequirements {
  [stage: string]: {
    [density in NutrientDensity]?: RequirementProfile;
  } & {
    // For stages that don't have density levels
    default?: RequirementProfile;
  };
}

export interface AnimalTypeRequirements {
  [type: string]: StageRequirements;
}

export interface AnimalCategoryRequirements {
  [category: string]: AnimalTypeRequirements;
}
