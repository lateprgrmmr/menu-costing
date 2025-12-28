import { useEffect, useState } from "react";
import type { IngredientRecord } from "../../shared/types/ingredient";
import { loadIngredients } from "../../actions/Ingredient.action";

const useIngredients = () => { 
    const [ingredients, setIngredients] = useState<IngredientRecord[]>([]);
    useEffect(() => {
        const fetchIngredients = async () => {
            const ingredients = await loadIngredients();
            setIngredients(ingredients);
        };
        fetchIngredients();
    }, []);
    return { ingredients, setIngredients };
};

export default useIngredients;