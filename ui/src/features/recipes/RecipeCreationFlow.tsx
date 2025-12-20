import { useState } from "react";
import EditOrCreateRecipeDialog from "./EditOrCreateRecipeDialog";
import { Button } from "@mui/material";

const RecipeCreationFlow = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button color="primary" onClick={() => setOpen(true)}>Create Recipe</Button>
            <EditOrCreateRecipeDialog open={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default RecipeCreationFlow;