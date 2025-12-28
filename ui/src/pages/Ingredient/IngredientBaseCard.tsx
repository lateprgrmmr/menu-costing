import { Card, CardContent, Typography } from "@mui/material";
import type { IngredientUXRecord } from "../../shared/types/ingredient";

interface IngredientBaseCardProps {
    ingredient: IngredientUXRecord;
}

const IngredientBaseCard = (props: IngredientBaseCardProps) => {
    const { ingredient } = props;

    const { recipes, purchases } = ingredient;

    console.log('ingredient from base card', ingredient);
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Used in {recipes.length} recipes</Typography>
                <Typography variant="h6">Has been purchased {purchases.length} time{purchases.length === 1 ? '' : 's'}</Typography>
            </CardContent>
        </Card>
    );
};

export default IngredientBaseCard;