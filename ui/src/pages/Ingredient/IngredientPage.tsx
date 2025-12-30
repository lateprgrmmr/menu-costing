import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import useIngredients from "../../common/hooks/useIngredients"
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import CreateOrEditIngredientDialog from "./IngredientBaseCardForm/CreateOrEditIngredientDialog";
import dayjs from "dayjs";

const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Default Measurement Unit', accessor: 'default_measurement_unit' },
    { header: 'Created By', accessor: 'created_by' },
    { header: 'Created At', accessor: 'created_at' },
    { header: 'Updated At', accessor: 'updated_at' },
]


const IngredientPage = () => {
    const { ingredients } = useIngredients();
    const [createIngredientOpen, setCreateIngredientOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreateIngredient = () => {
        setCreateIngredientOpen(true);
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleCreateIngredient}>
                <Add sx={{ marginRight: 1 }} />
                Add New Ingredient
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
                        {ingredients.map((ingredient) => (
                            <TableRow key={ingredient.id}>
                                <TableCell
                                    onClick={() => navigate(`/ingredient/${ingredient.id}`)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {ingredient.name}
                                </TableCell>
                                <TableCell>
                                    {ingredient.category}
                                </TableCell>
                                <TableCell>
                                    {ingredient.default_measurement_unit}
                                </TableCell>
                                <TableCell>
                                    {ingredient.created_by}
                                </TableCell>
                                <TableCell>
                                    {dayjs(ingredient.created_at).format('MM/DD/YYYY')}
                                </TableCell>
                                <TableCell>
                                    {dayjs(ingredient.updated_at).format('MM/DD/YYYY')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <CreateOrEditIngredientDialog
                open={createIngredientOpen}
                onClose={() => setCreateIngredientOpen(false)}
            />
        </div>
    )
};

export default IngredientPage;