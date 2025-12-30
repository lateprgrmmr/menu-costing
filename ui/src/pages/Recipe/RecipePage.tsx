
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import useRecipes from "../../common/hooks/useRecipes";
import { useNavigate } from "react-router-dom";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import CreateOrEditRecipeDialog from "./RecipeCardForm/CreateOrEditRecipeDialog";
import dayjs from "dayjs";

const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Yield', accessor: 'yield_quantity' },
    { header: 'Yield Unit', accessor: 'yield_unit' },
    { header: 'Created At', accessor: 'created_at' },
    { header: 'Last Updated', accessor: 'updated_at' },
]

const RecipePage = () => {
    const { recipes } = useRecipes();
    const navigate = useNavigate();
    const [createRecipeOpen, setCreateRecipeOpen] = useState(false);
    console.log('recipes from recipe page', recipes);

    const handleCreateRecipe = () => {
        setCreateRecipeOpen(true);
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleCreateRecipe}>
                <Add sx={{ marginRight: 1 }} />
                Create Recipe
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.accessor}>{column.header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow key={recipe.id}>
                                <TableCell
                                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                                    sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                                >
                                    {recipe.name}
                                </TableCell>
                                <TableCell>
                                    {recipe.yield_quantity}
                                </TableCell>
                                <TableCell>
                                    {recipe.yield_unit}
                                </TableCell>
                                <TableCell>
                                    {dayjs(recipe.created_at).format('MM/DD/YYYY')}
                                </TableCell>
                                <TableCell>
                                    {dayjs(recipe.updated_at).format('MM/DD/YYYY')}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                                    >
                                        <Edit sx={{ marginRight: 1 }} />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={() => console.log('delete recipe', recipe.id)}
                                    >
                                        <Delete sx={{ marginRight: 1 }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <CreateOrEditRecipeDialog
                open={createRecipeOpen}
                onClose={() => setCreateRecipeOpen(false)}
            />
        </div >
    )
}

export default RecipePage;