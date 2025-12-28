import * as t from "io-ts";
import { UnitTypeDefinition, UnitTypeEnum } from "./common";
import { validateRequestPayload } from "./utils";

export enum RecipeTypeEnum {
    INGREDIENT = "ingredient",
    RECIPE = "recipe",
}

export interface RecipeRecord {
    id: number;
    name: string;
    type: RecipeTypeEnum;
    yield_quantity: number;
    yield_unit: UnitTypeEnum;
    created_at: Date;
    updated_at: Date;
}

export interface RecipeComponentRecord {
    recipe_id?: number;
    ingredient_id?: number;
    child_recipe_id?: number;
    name: string;
    quantity: number;
    unit: UnitTypeEnum;
}

const RecipeComponentInsertOrUpdateRequestDefinition = t.type({
    recipe_id: t.union([t.number, t.undefined]),
    component_type: t.union([t.literal('ingredient'), t.literal('recipe')]),
    ingredient_id: t.union([t.number, t.undefined]),
    child_recipe_id: t.union([t.number, t.undefined]),
    quantity: t.number,
    unit: UnitTypeDefinition
})

export interface RecipeComponentInsertOrUpdateRequest {
    recipe_id?: number;
    component_type: 'ingredient' | 'recipe';
    ingredient_id?: number;
    child_recipe_id?: number;
    quantity: number;
    unit: UnitTypeEnum;
}

const RecipeInsertOrUpdateRequestDefinition = t.type({
    recipe_id: t.union([t.number, t.undefined]),
    name: t.string,
    yield_quantity: t.number,
    yield_unit: UnitTypeDefinition,
    components: t.array(RecipeComponentInsertOrUpdateRequestDefinition),
})

export interface RecipeInsertOrUpdateRequest extends t.TypeOf<typeof RecipeInsertOrUpdateRequestDefinition> {}
// validation functions using validateRequestPayload
export class RecipeInsertOrUpdateRequestValidator {
    public static fromRequest = validateRequestPayload<RecipeInsertOrUpdateRequest>(RecipeInsertOrUpdateRequestDefinition);
}
export interface RecipeUXRecord {
    id: number;
    name: string;
    // type: RecipeTypeEnum;
    yield_quantity: number;
    yield_unit: UnitTypeEnum;
    created_at: Date;
    updated_at: Date;
    ingredient_components: RecipeComponentRecord[];
    recipe_components: RecipeComponentRecord[];
}