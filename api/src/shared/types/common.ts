export enum UnitTypeEnum {
    // LB = "lb",
    OZ = "oz",
    FL_OZ = "fl oz",
    EA = "ea",
}


export type IngredientCategory =
    | "bread"
    | "dairy"
    | "grocery"
    | "meat"
    | "other"
    | "produce"
    | "recipe"
    | "spice";

export enum IngredientCategoryEnum {
    BREAD = "bread",
    DAIRY = "dairy",
    GROCERY = "grocery",
    MEAT = "meat",
    OTHER = "other",
    PRODUCE = "produce",
    RECIPE = "recipe",
    SPICE = "spice",
}

export const IngredientCategoryValueLookup = {
    [IngredientCategoryEnum.BREAD]: "Bread",
    [IngredientCategoryEnum.DAIRY]: "Dairy",
    [IngredientCategoryEnum.GROCERY]: "Grocery",
    [IngredientCategoryEnum.MEAT]: "Meat",
    [IngredientCategoryEnum.PRODUCE]: "Produce",
    [IngredientCategoryEnum.OTHER]: "Other",
    [IngredientCategoryEnum.RECIPE]: "Recipe",
    [IngredientCategoryEnum.SPICE]: "Spice",
}

export type MenuItemComponentType =
    | "ingredient"
    | "prep_recipe";