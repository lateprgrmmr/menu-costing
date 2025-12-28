import { useMemo } from "react";
import type { ComponentOption } from "../../shared/types/components";
import useIngredients from "./useIngredients";
import useRecipes from "./useRecipes";

const useComponents = () => {
    const { ingredients } = useIngredients();
    const { recipes } = useRecipes();

    const componentOptions: ComponentOption[] = useMemo(() =>[
        ...ingredients.map((ingredient) => ({
            type: 'ingredient' as const,
            id: ingredient.id,
            name: ingredient.name,
            data: ingredient,
        })),
        ...recipes.map((recipe) => ({
            type: 'recipe' as const,
            id: recipe.id,
            name: recipe.name,
            data: recipe,
        })),
    ], [ingredients, recipes]);

    return { componentOptions };
}

export default useComponents;