import DensityCard from "./IngredientActions/DensityCard";
import PurchasesCard from "./IngredientActions/PurchasesCard";
import IngredientBaseCard from "./IngredientBaseCard";
import IngredientHeader from "./IngredientHeader";
import { loadIngredientUXById } from "../../actions/Ingredient.action";
import { useEffect, useState } from "react";
import type { IngredientUXRecord } from "../../shared/types/ingredient";
import { useParams } from "react-router-dom";

const IngredientDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [ingredient, setIngredient] = useState<IngredientUXRecord | null>(null);
    useEffect(() => {
        const fetchIngredient = async () => {
            if (!id) {
                return
            };
            const ingredientUX = await loadIngredientUXById(parseInt(id));
            console.log('ingredient', ingredient);
            setIngredient(ingredientUX);
        };
        fetchIngredient();
    }, [id]);
    console.log('ingredient', ingredient);
    if (!ingredient) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <IngredientHeader ingredient={ingredient} />
            <IngredientBaseCard ingredient={ingredient} />
            <DensityCard />
            <PurchasesCard />
        </div>
    );
};

export default IngredientDetail;