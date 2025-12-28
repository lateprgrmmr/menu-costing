import { useEffect, useState } from "react";
import type { RecipeUXRecord } from "../../shared/types/recipe";
import { loadRecipes } from "../../actions/Recipe.action";

const useRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeUXRecord[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await loadRecipes();
            setRecipes(recipes);
        };
        fetchRecipes();
    }, []);

    return { recipes, setRecipes };
}

export default useRecipes;