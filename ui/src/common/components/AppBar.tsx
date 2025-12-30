import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import brattsBitesLogo from "../../assets/newLogo.png";
import portionLogo from "../../assets/portion_logo.png";
import ActionButton from "./ActionButton";

const AppBar = () => {
    const navigate = useNavigate();
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 1 }}>
                <img src={portionLogo} alt="logo" width={100} height={100} />
                <Typography variant="h6">Portion</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <Button variant="contained" color="primary"
                    onClick={() => navigate("/")}
                >
                    Home
                </Button>
                <IconButton color="primary" sx={{ marginRight: 2 }}>
                    <ActionButton />
                </IconButton>
            </Box>
        </Box>
    )
}

export default AppBar;