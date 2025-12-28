import { Box, Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import type { RecipeUXRecord } from "../../shared/types/recipe";
import { useEffect, useState } from "react";
import CreateOrEditRecipeDialog from "./RecipeCardForm/CreateOrEditRecipeDialog";

interface RecipeCardProps {
    recipe: RecipeUXRecord;
}

const RecipeCard = (props: RecipeCardProps) => {
    const { recipe: initialRecipe } = props;
    const [recipe, setRecipe] = useState<RecipeUXRecord | null>(initialRecipe);
    const [editCardOpen, setEditCardOpen] = useState(false);

    useEffect(() => {
        setRecipe(initialRecipe);
    }, [initialRecipe]);


    const handleEditCard = () => {
        setEditCardOpen(true);
    };



    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <CardHeader
                    action={
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleEditCard}>Edit
                        </Button>
                    }
                />
                <CardContent>
                    <Box sx={{ overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ingredient</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Unit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recipe?.ingredient_components.map((component) => (
                                    <TableRow key={component.name}>
                                        <TableCell
                                            sx={{
                                                cursor: 'pointer',
                                                textTransform: 'capitalize',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}>
                                            {component.name}
                                        </TableCell>
                                        <TableCell>{component.quantity}</TableCell>
                                        <TableCell>{component.unit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
            <CreateOrEditRecipeDialog
                open={editCardOpen}
                onClose={(updatedRecipe) => {
                    setEditCardOpen(false);
                    if (updatedRecipe) {
                        setRecipe(updatedRecipe);
                    }
                }}
                existingRecipe={recipe}
            />
        </>
    )
}

export default RecipeCard;