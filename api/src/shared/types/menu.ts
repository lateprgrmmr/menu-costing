import { UnitTypeEnum } from "./common";
// import * as t from "io-ts";

export type MenuItemComponentType =
    | "ingredient"
    | "recipe";

export enum MenuItemComponentTypeEnum {
    INGREDIENT = "ingredient",
    RECIPE = "recipe",
}

export type MenuItemRecord = {
    id: number;
    name: string;
    target_food_cost: number;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

export interface MenuItemComponentRecord {
    id: number;
    menu_item_id: number;
    component_type: MenuItemComponentTypeEnum;
    ingredient_id: number;
    recipe_id: number;
    quantity: number;
    unit: UnitTypeEnum;
}

export interface MenuRecord {
    id: number;
    name: string;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

export interface MenuUXRecord extends MenuRecord {
    menu_items: MenuItemRecord[];
}