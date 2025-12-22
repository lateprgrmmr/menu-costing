import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, List, ListItem, ListItemText, Radio, RadioGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { RecipeIngredientRecord, RecipeUXRecord } from "../../shared/types/recipe";
import { getRecipe } from "../../actions/Recipe.action";
import { Delete } from "@mui/icons-material";
import { styles } from "../../styles/EditOrCreateIngredient.styles";

interface EditOrCreateRecipeDialogProps {
    open: boolean;
    onClose: () => void;
    existingRecipeId: number | null;
}

const EditOrCreateRecipeDialog = (props: EditOrCreateRecipeDialogProps) => {
    const { existingRecipeId, open, onClose } = props;
    const [recipeName, setRecipeName] = useState<string>("");
    const [recipeType, setRecipeType] = useState<"ingredient" | "prep_recipe">("ingredient");
    const [recipeYield, setRecipeYield] = useState<number>(0);
    const [existingRecipe, setExistingRecipe] = useState<RecipeUXRecord | null>(null);
    const [ingredients, setIngredients] = useState<RecipeIngredientRecord[]>([]);

    useEffect(() => {
        if (existingRecipeId) {
            const fetchRecipe = async () => {
                const recipe = await getRecipe(existingRecipeId);
                if (recipe) {
                    console.log('recipe', recipe)
                    setExistingRecipe(recipe);
                }
            }
            fetchRecipe();
        }
    }, [existingRecipeId]);

    useEffect(() => {
        if (existingRecipe) {
            console.log('existingRecipe', existingRecipe);
            setRecipeName(existingRecipe.name);
            setRecipeYield(existingRecipe.yield_oz);
            setIngredients(existingRecipe.ingredients);
        }
    }, [existingRecipe]);

    console.log('ingredients', ingredients);

    return (
        <Dialog open={open} onClose={onClose} sx={styles.root}>
            <DialogTitle paddingBottom={'20px'}>{existingRecipeId ? "Edit" : "Create"} Recipe</DialogTitle>
            <DialogContent>
                <FormControl sx={{ padding: '10px' }} fullWidth component="fieldset">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <TextField
                            label="Recipe Name"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            sx={styles.textInput}
                            style={{ width: '100%' }}
                            required
                        />
                        <TextField
                            label="Recipe Yield"
                            value={recipeYield}
                            onChange={(e) => setRecipeYield(Number(e.target.value))}
                            sx={styles.textInput}
                            style={{ width: '100%' }}
                            required
                        />
                        <RadioGroup
                            value={recipeType}
                            onChange={(e) => setRecipeType(e.target.value as "ingredient" | "prep_recipe")}
                            sx={styles.radioGroup}
                        >
                            <FormControlLabel value="ingredient" control={<Radio />} label="Ingredient" />
                            <FormControlLabel value="prep_recipe" control={<Radio />} label="Prep Recipe" />
                        </RadioGroup>
                    </div>
                    <List>
                        {ingredients && ingredients.map((ingredient) => (
                            <ListItem key={ingredient.ingredient_id}>
                                <ListItemText primary={ingredient.ingredient_name} secondary={ingredient.quantity} />
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}

export default EditOrCreateRecipeDialog;