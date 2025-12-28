import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import useIngredients from "../../common/hooks/useIngredients"
import type { IngredientRecord } from "../../shared/types/ingredient";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    return (
        <div>
            <h1>Ingredients</h1>
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
                            {columns.map((column) => (
                                <TableCell
                                    key={column.accessor}
                                    onClick={() => navigate(`/ingredient/${ingredient.id}`)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {ingredient[column.accessor as keyof IngredientRecord] as string}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};

export default IngredientPage;