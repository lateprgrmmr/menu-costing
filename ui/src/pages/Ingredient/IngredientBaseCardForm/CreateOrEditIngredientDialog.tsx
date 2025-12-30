import { Dialog, DialogTitle } from "@mui/material";

interface CreateOrEditIngredientDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateOrEditIngredientDialog = (props: CreateOrEditIngredientDialogProps) => {
    const { open, onClose } = props;
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Ingredient</DialogTitle>
        </Dialog>
    )
}

export default CreateOrEditIngredientDialog;