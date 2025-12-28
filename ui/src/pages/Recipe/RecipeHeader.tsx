import { Chip } from "@mui/material";
import type { RecipeUXRecord } from "../../shared/types/recipe";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button } from "@mui/material";

interface RecipeHeaderProps {
    recipe: RecipeUXRecord;
}
const RecipeHeader = (props: RecipeHeaderProps) => {
    const { recipe } = props;
    const navigate = useNavigate();
    console.log('recipe', recipe);

    const handleBack = () => {
        navigate('/recipe');
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
                Back to recipes
            </Button>
            <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textTransform: 'capitalize'
            }}
            >
                {recipe.name}
            </h1>
            <Chip
                label={`${recipe.yield_quantity} ${recipe.yield_unit}`}
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                    ml: 2
                }}
            />
        </div>
    )
}

export default RecipeHeader;