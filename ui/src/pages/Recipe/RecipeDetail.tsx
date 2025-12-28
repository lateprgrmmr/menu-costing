import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { RecipeUXRecord } from "../../shared/types/recipe";
import RecipeHeader from "./RecipeHeader";
import { loadRecipe } from "../../actions/Recipe.action";
import RecipeCard from "./RecipeCard";

const RecipeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<RecipeUXRecord | null>(null);
    console.log('id', id);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) {
                return;
            }
            const recipe = await loadRecipe(parseInt(id));
            console.log('recipe', recipe);
            setRecipe(recipe);
        }
        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <RecipeHeader recipe={recipe} />
            <RecipeCard recipe={recipe} />
        </div>
    )
}

export default RecipeDetail;