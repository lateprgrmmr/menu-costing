import { useState } from "react";
import { Button } from "@mui/material";
import { EditOrCreateIngredientDialog } from "./EditOrCreateIngredientDialog";

export const IngredientSelectionFlow = () => {
  const [isEditOrCreateDialogOpen, setIsEditOrCreateDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsEditOrCreateDialogOpen(true)}>
        Add Ingredient
      </Button>

      <EditOrCreateIngredientDialog
        open={isEditOrCreateDialogOpen}
        onClose={() => setIsEditOrCreateDialogOpen(false)}
      />
    </>
  );
};
