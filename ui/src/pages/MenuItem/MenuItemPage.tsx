import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import dayjs from "dayjs";
import useMenuItems from "../../common/hooks/useMenuItems";

const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Created At', accessor: 'created_at' },
    { header: 'Last Updated', accessor: 'updated_at' },
]

const MenuPage = () => {
    const { menuItems } = useMenuItems();
    const [createMenuOpen, setCreateMenuOpen] = useState(false);

    const handleCreateMenu = () => {
        setCreateMenuOpen(true);
    }
    console.log('menus from menu page', menuItems);
    console.log('create menu open', createMenuOpen);
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
                            {menuItems.map((menuItem) => (
                                <TableRow key={menuItem.id}>
                                    <TableCell>{menuItem.name}</TableCell>
                                    <TableCell>{dayjs(menuItem.created_at).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{dayjs(menuItem.updated_at).format('MM/DD/YYYY')}</TableCell>
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
            {/* <CreateOrEditMenuDialog
                open={createMenuOpen}
                onClose={() => setCreateMenuOpen(false)}
            /> */}
        </div>
    );
};

export default MenuPage;