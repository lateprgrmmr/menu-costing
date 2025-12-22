import type { IngredientRecord } from "./ingredient";
import type { MenuItemRecord } from "./menuItem";
import type { RecipeRecord } from "./recipe";

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