import { Menu as MenuIcon } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ActionButton = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClick}
            >
                <MenuIcon sx={{ marginRight: 1 }} />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => navigate('/ingredient')}
                >Ingredients</MenuItem>
                <MenuItem
                    onClick={() => navigate('/recipe')}
                >Recipes</MenuItem>
                <MenuItem
                    onClick={() => navigate('/menu')}
                >Menus</MenuItem>
            </Menu>
        </div>
    );
};

export default ActionButton;