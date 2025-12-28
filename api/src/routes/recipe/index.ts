import { Router } from "express";
import { Connection } from "../../database/connection";
import { Request, Response } from "express";
import { createNewRecipe, deleteRecipeComponentById, getAllRecipeUX, getRecipeUXById, updateRecipe } from "./api";
import { RecipeInsertOrUpdateRequest, RecipeInsertOrUpdateRequestValidator } from "../../shared/types/recipe";

const router = Router();

export type RecipeRequest = Request & { db: Connection };

router.get("/", async (req: RecipeRequest, res: Response) => { 
    const recipes = await getAllRecipeUX(req.db);
    res.status(200).json(recipes);
});


router.get("/:id", async (req: RecipeRequest, res: Response) => { 
    const { id } = req.params;
    const recipeUX = await getRecipeUXById(req.db, parseInt(id));
    res.status(200).json(recipeUX);
});

router.delete("/component/:id", async (req: RecipeRequest, res: Response) => {
    const { id } = req.params;
    const recipeComponent = await deleteRecipeComponentById(req.db, parseInt(id));
    res.status(200).json(recipeComponent);
});

router.post("/", async (req: RecipeRequest, res: Response) => {
    const { recipe } = req.body;   

    const recipeToCreate = RecipeInsertOrUpdateRequestValidator.fromRequest(recipe);

    const newRecipe = await createNewRecipe(req.db, recipeToCreate);
    if (newRecipe)
        res.status(200).json(newRecipe);
    else
        res.status(500).json({ error: 'Failed to create recipe' });
});

router.put("/:id", async (req: RecipeRequest, res: Response) => {
    const { id } = req.params;
    const { changes } = req.body;
    const changesToUpdate = RecipeInsertOrUpdateRequestValidator.fromRequest(changes);
    const updatedRecipe = await updateRecipe(req.db, parseInt(id), changesToUpdate);
    if (updatedRecipe)
        res.status(200).json(updatedRecipe);
    else
        res.status(500).json({ error: 'Failed to update recipe' });
});

export default router;