import { Dialog, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";

interface EditOrCreateRecipeDialogProps {
    open: boolean;
    onClose: () => void;
}

const EditOrCreateRecipeDialog = (props: EditOrCreateRecipeDialogProps) => {
    const { open, onClose } = props;
    const [recipeName, setRecipeName] = useState<string>("");
    const [recipeType, setRecipeType] = useState<"ingredient" | "prep_recipe">("ingredient");
    const [recipeYield, setRecipeYield] = useState<number>(0);
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create or Edit Recipe</DialogTitle>
            <DialogContent>
                <TextField label="Recipe Name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                <RadioGroup value={recipeType} onChange={(e) => setRecipeType(e.target.value as "ingredient" | "prep_recipe")}>
                    <FormControlLabel value="ingredient" control={<Radio />} label="Ingredient" />
                    <FormControlLabel value="prep_recipe" control={<Radio />} label="Prep Recipe" />
                </RadioGroup>
                <TextField label="Recipe Yield" value={recipeYield} onChange={(e) => setRecipeYield(Number(e.target.value))} />
            </DialogContent>
        </Dialog>
    )
}

export default EditOrCreateRecipeDialog;