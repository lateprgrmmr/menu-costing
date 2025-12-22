import { Dialog, DialogTitle } from "@mui/material";

interface EditOrCreateMenuItemDialogProps {
    open: boolean;
    onClose: () => void;
    existingMenuItemId: number | null;
}

const EditOrCreateMenuItemDialog = (props: EditOrCreateMenuItemDialogProps) => {
    const { open, onClose } = props;
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create or Edit Menu Item</DialogTitle>
        </Dialog>
    )
}

export default EditOrCreateMenuItemDialog;