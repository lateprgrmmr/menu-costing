import * as t from "io-ts";
import type { MenuItemRecord } from "./menu";
import type { IngredientRecord } from "./ingredient";
import type { RecipeRecord } from "./recipe";

export enum UnitMeasurementEnum {
    WEIGHT = "weight",
    VOLUME = "volume",
    COUNT = "count",
}

export const UnitMeasurementDefinition = t.keyof({
    weight: null,
    volume: null,
    count: null,
})
export const UnitMeasurementValueLookup = {
    [UnitMeasurementEnum.WEIGHT]: "Weight",
    [UnitMeasurementEnum.VOLUME]: "Volume",
    [UnitMeasurementEnum.COUNT]: "Count",
}

export enum UnitTypeEnum {
    // weight
    LB = "lb",
    OZ = "oz",
    // volume
    FL_OZ = "fl_oz",
    GAL = "gal",
    QT = "qt",
    PT = "pt",
    CUP = "cup",
    TBSP = "tbsp",
    TSP = "tsp",
    ML = "ml",
    L = "l",
    // count
    EA = "ea",
}

export const UnitTypeDefinition = t.keyof({
    lb: null,
    oz: null,
    fl_oz: null,
    gal: null,
    qt: null,
    pt: null,
    cup: null,
    tbsp: null,
    tsp: null,
    ml: null,
    l: null,
    ea: null,
})

export const UnitTypeValueLookup = {
    [UnitTypeEnum.LB]: "lb",
    [UnitTypeEnum.OZ]: "oz",
    [UnitTypeEnum.FL_OZ]: "fl_oz",
    [UnitTypeEnum.GAL]: "gal",
    [UnitTypeEnum.QT]: "qt",
    [UnitTypeEnum.PT]: "pt",
    [UnitTypeEnum.CUP]: "cup",
    [UnitTypeEnum.TBSP]: "tbsp",
    [UnitTypeEnum.TSP]: "tsp",
    [UnitTypeEnum.ML]: "ml",
    [UnitTypeEnum.L]: "l",
    [UnitTypeEnum.EA]: "ea",
}


export interface DashboardData {
    recipeCount: number;
    ingredientCount: number;
    menuItemCount: number;
    prepRecipeCount: number;
    recentIngredients: Partial<IngredientRecord>[];
    recentPrepRecipes: Partial<RecipeRecord>[];
    recentMenuItems: Partial<MenuItemRecord>[];
    costLastUpdated?: Date;
}