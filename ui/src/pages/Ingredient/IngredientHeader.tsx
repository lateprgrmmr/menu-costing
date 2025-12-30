import { Button, Chip } from "@mui/material";
import type { IngredientUXRecord } from "../../shared/types/ingredient";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface IngredientHeaderProps {
    ingredient: IngredientUXRecord;
}

const IngredientHeader = (props: IngredientHeaderProps) => {
    const { ingredient } = props;
    const navigate = useNavigate();
    console.log('ingredient from header', ingredient);

    const handleBack = () => {
        navigate('/ingredient');
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px'
            }}>
            <Button variant="outlined" color="primary" onClick={handleBack} sx={{ marginBottom: '20px' }}>
                <ArrowBackIosNew sx={{ marginRight: 1 }} />
                Back to ingredients
            </Button>
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