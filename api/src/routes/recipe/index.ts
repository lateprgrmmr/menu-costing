import { Router } from "express";
import { Connection } from "../../database/connection";
import { Request, Response } from "express";
import daos from "../../database";

const router = Router();

export type RecipeRequest = Request & { db: Connection };


router.get("/:id", async (req: RecipeRequest, res: Response) => { 
    const { id } = req.params;
    console.log('id', id)
    const recipeUX = await daos.recipeDAO.findRecipeUX(req.db, parseInt(id));
    console.log('recipeUX', JSON.stringify(recipeUX, null, 2))
    res.status(200).json(recipeUX);
});

export default router;