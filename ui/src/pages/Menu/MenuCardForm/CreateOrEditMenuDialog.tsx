import { Box, Button, Dialog, DialogContent, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import type { MenuUXRecord } from "../../../shared/types/menu";

interface CreateOrEditMenuDialogProps {
    open: boolean;
    onClose: () => void;
    existingMenu?: MenuUXRecord | null;
}

const CreateOrEditMenuDialog = (props: CreateOrEditMenuDialogProps) => {
    const { open, onClose, existingMenu } = props;
    const [menuName, setMenuName] = useState<string>('');

    const handleClose = () => {
        setMenuName('');
        onClose();
    }

    const title = existingMenu ? `Edit ${existingMenu.name}` : "Create Menu";
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
            <DialogContent sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <form>
                    <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2, maxHeight: '70vh', overflowY: 'auto' }}>
                        <Box>
                            {title}
                        </Box>
                        <Box>
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center" marginBottom={2}>
                                <TextField
                                    size="small"
                                    type="text"
                                    value={menuName}
                                    onChange={(e) => setMenuName(e.target.value)}
                                    placeholder="Enter menu name"
                                />
                            </Box>
                        </Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ingredient</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Unit</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button variant="outlined" color="primary" onClick={() => console.log('add ingredient')}>Add Ingredient</Button>
                        <Button variant="outlined" color="primary" onClick={() => console.log('save menu')}>Save</Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateOrEditMenuDialog;