import { RecipeComponentInsertOrUpdateRequest, RecipeComponentRecord, RecipeInsertOrUpdateRequest, RecipeRecord, RecipeUXRecord } from "src/shared/types/recipe";
import { Connection } from "../connection";
import { BaseDAO, transaction } from "../types";
import { UnitTypeEnum } from "src/shared/types/common";
import daos from "..";

export class RecipeDAO extends BaseDAO<RecipeRecord> {
    protected getTableName(): string {
        return "recipe";
    }

    async findRecent(db: Connection): Promise<RecipeRecord[]> {
        return await this.executeScript(db, "findRecentRecipes", {});
    }

    async findAll(db: Connection): Promise<RecipeRecord[]> {
        return await this.find(db, {});
    }

    async findRecipeUX(db: Connection): Promise<RecipeUXRecord[]> {
        console.log('findRecipeUX')
        const results = await this.executeScript<RecipeUXRecord[]>(db, "getRecipeUX", {
            recipeId: null,
        });
        if (!results || results.length === 0) {
            return [];
        }
        console.log('results', JSON.stringify(results, null, 2))
        return results;
    }

    async findRecipeUXById(db: Connection, id: number): Promise<RecipeUXRecord | null> {
        const results = await this.executeScript<RecipeUXRecord[]>(db, "getRecipeUX", {
            recipeId: id,
        });
        if (!results || results.length === 0) {
            return null;
        }
        return results[0];
    }

    async createNewRecipe(db: Connection, recipe: RecipeInsertOrUpdateRequest): Promise<RecipeUXRecord> {
        // insert recipe first w/o components
        const recipeRecord = await this.insert(db, {
            name: recipe.name,
            yield_quantity: recipe.yield_quantity,
            yield_unit: recipe.yield_unit as UnitTypeEnum,
        });
        if (!recipeRecord) {
            throw new Error('Failed to create recipe');
        }
        // insert components into recipe_component table using the id of the recipe just created
        const recipeComponents = recipe.components.map(component => ({
            recipe_id: recipeRecord.id,
            component_type: component.component_type,
            ingredient_id: component.component_type === 'ingredient' ? component.ingredient_id : undefined,
            child_recipe_id: component.component_type === 'recipe' ? component.child_recipe_id : undefined,
            quantity: component.quantity,
            unit: component.unit as UnitTypeEnum,
        }));
        const recipeComponentsRecords = await daos.recipeComponentDAO.insertMany(db, recipeComponents);
        if (!recipeComponentsRecords || recipeComponentsRecords.length === 0) {
            throw new Error('Failed to create recipe components');
        }
        const newRecipeUX = await this.findRecipeUXById(db, recipeRecord.id);
        if (!newRecipeUX) {
            throw new Error('Failed to find new recipe');
        }
        return newRecipeUX;
    }

    async updateRecipeById(db: Connection, id: number, recipe: RecipeInsertOrUpdateRequest): Promise<RecipeUXRecord> {
        const recipeRecord = await this.updateById(db, id, {
            name: recipe.name,
            yield_quantity: recipe.yield_quantity,
            yield_unit: recipe.yield_unit as UnitTypeEnum,
            updated_at: new Date(),
        });
        if (!recipeRecord) {
            throw new Error('Failed to update recipe');
        }
        const existingRecipeUX = await this.findRecipeUXById(db, id);
        if (!existingRecipeUX) {
            throw new Error('Failed to find existing recipe');
        }
        const existingComponents = existingRecipeUX.ingredient_components;
        const newComponents = recipe.components;
        // just delete all existing components and add all new components
        await daos.recipeComponentDAO.delete(db, {
            recipe_id: id,
        });
        await daos.recipeComponentDAO.insertMany(db, newComponents.map(component => ({
            recipe_id: id,
            ingredient_id: component.ingredient_id,
            child_recipe_id: component.child_recipe_id,
            component_type: component.component_type,
            quantity: component.quantity,
            unit: component.unit as UnitTypeEnum,
        })));
        const updatedRecipeUX = await this.findRecipeUXById(db, id);
        if (!updatedRecipeUX) {
            throw new Error('Failed to find updated recipe');
        }
        return updatedRecipeUX;
    }
}

export class RecipeComponentDAO extends BaseDAO<RecipeComponentRecord> {
    protected getTableName(): string {
        return "recipe_component";
    }

    async createRecipeComponent(db: Connection, recipeComponent: RecipeComponentInsertOrUpdateRequest): Promise<RecipeComponentRecord> {
        return await this.insert(db, recipeComponent);
    }

    async deleteRecipeComponentByIngredientId(db: Connection, ingredientId: number): Promise<RecipeComponentRecord[]> {
        console.log('deleteRecipeComponentByIngredientId', ingredientId);
        const results = await this.delete(db, {
            ingredient_id: ingredientId,
        });
        console.log('results', JSON.stringify(results, null, 2));
        return results;
    }

    // async updateExistingComponents(db: Connection, components: RecipeComponentInsertOrUpdateRequest[]): Promise<RecipeComponentRecord[]> {
    //     return components;
}