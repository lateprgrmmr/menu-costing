import { Autocomplete, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import type { IngredientRecord } from "../../shared/types/ingredient";
import { loadIngredients } from "../../actions/Ingredient.action";
import { useEffect, useState } from "react";


interface IngredientPickerProps {
    open: boolean;
    onClose: () => void;
    onSelect: (ingredient: IngredientRecord) => void;
}

export const IngredientPicker = (props: IngredientPickerProps) => {
    const { open, onClose, onSelect } = props;
    const [ingredients, setIngredients] = useState<IngredientRecord[]>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            const ingredients = await loadIngredients();
            setIngredients(ingredients);
        }
        fetchIngredients();
    }, []);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Ingredient</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Select Ingredient</Typography>
                <Autocomplete
                    options={ingredients}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, value) => onSelect(value as IngredientRecord)}
                    renderInput={(params) => <TextField {...params} label="Ingredient" />}
                />
            </DialogContent>
        </Dialog>
    )
}