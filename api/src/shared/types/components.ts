import type { UnitTypeEnum } from "./common";
import type { IngredientRecord } from "./ingredient";
import type { RecipeRecord } from "./recipe";

export type ComponentOption =
    | {
        type: 'ingredient';
        id: number;
        name: string;
        data: Partial<IngredientRecord>;
    }
    | {
        type: 'recipe';
        id: number;
        name: string;
        data: Partial<RecipeRecord>;
    }

export interface ComponentRow {
    id: string;
    component: ComponentOption | null;
    quantity: number;
    unit: UnitTypeEnum;
}