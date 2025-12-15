import { useState } from "react";
import { Button } from "@mui/material";
import { IngredientPicker } from "./common/IngredientPicker";
import type { IngredientRecord } from "../shared/types/ingredient";

export const Dashboard = () => {

    const [showIngredientPicker, setShowIngredientPicker] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientRecord | null>(null);

    const handleSelectIngredient = (ingredient: IngredientRecord) => {
        setSelectedIngredient(ingredient);
        setShowIngredientPicker(false);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={() => setShowIngredientPicker(true)}>Add Ingredient</Button>
            <IngredientPicker open={showIngredientPicker} onClose={() => setShowIngredientPicker(false)} onSelect={handleSelectIngredient} />
            {selectedIngredient && <div>Selected Ingredient: {selectedIngredient.name}</div>}
        </div>
    )
}