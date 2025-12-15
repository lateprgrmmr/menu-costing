import { Router } from "express";
import daos from "../../database";
import { Connection } from "src/database/connection";
import { Request, Response } from "express";
import { IngredientInsertOrUpdateRequest } from "../../shared/types/ingredient";

export type IngredientRequest = Request & { db: Connection };

const router = Router();

router.get("/", async (req: IngredientRequest, res: Response) => {
    const ingredients = await daos.ingredientDAO.findAll(req.db);
    res.status(200).json(ingredients);
});

router.post("/", async (req: IngredientRequest, res: Response) => {
    const { body, db } = req
    const ingredientToCreate = IngredientInsertOrUpdateRequest.fromRequest(body);
    const newIngredient = await daos.ingredientDAO.insert(db, ingredientToCreate);
    if (newIngredient) {
        res.status(201).json(newIngredient);
    } else {
        res.status(500).json({ error: "Failed to create ingredient" });
    }
});

export default router;