import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import brattsBitesLogo from "../../assets/newLogo.png";

const AppBar = () => {
    const navigate = useNavigate();
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 1 }}>
                <img src={brattsBitesLogo} alt="logo" width={100} height={100} />
                <Typography variant="h6">Bratt's Bites</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <Button variant="contained" color="primary"
                    onClick={() => navigate("/")}
                >
                    Home
                </Button>
                <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                    Menu
                </Button>
            </Box>
        </Box>
    )
}

export default AppBar;