import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import useMenus from "../../common/hooks/useMenus";
import dayjs from "dayjs";
import CreateOrEditMenuDialog from "./MenuCardForm/CreateOrEditMenuDialog";

const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Created At', accessor: 'created_at' },
    { header: 'Last Updated', accessor: 'updated_at' },
]

const MenuPage = () => {
    const { menus } = useMenus();
    const [createMenuOpen, setCreateMenuOpen] = useState(false);

    const handleCreateMenu = () => {
        setCreateMenuOpen(true);
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleCreateMenu}>
                <Add sx={{ marginRight: 1 }} />
                Create Menu
            </Button>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.accessor}>{column.header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menus.map((menu) => (
                                <TableRow key={menu.id}>
                                    <TableCell>{menu.name}</TableCell>
                                    <TableCell>{dayjs(menu.created_at).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{dayjs(menu.updated_at).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary">
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <CreateOrEditMenuDialog
                open={createMenuOpen}
                onClose={() => setCreateMenuOpen(false)}
            />
        </div>
    );
};

export default MenuPage;