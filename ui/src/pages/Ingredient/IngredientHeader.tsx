import { Chip } from "@mui/material";
import type { IngredientUXRecord } from "../../shared/types/ingredient";

interface IngredientHeaderProps {
    ingredient: IngredientUXRecord;
}

const IngredientHeader = (props: IngredientHeaderProps) => {
    const { ingredient } = props;
    console.log('ingredient from header', ingredient);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px'
            }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'capitalize' }}>{ingredient.name}</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize' }}>{ingredient.category}</div>
            <Chip
                label={ingredient.default_measurement_unit}
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                    ml: 2
                }}
            />
        </div>
    );
};

export default IngredientHeader;