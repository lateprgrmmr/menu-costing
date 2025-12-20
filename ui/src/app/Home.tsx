import { Box, Button, Card, Typography } from "@mui/material";
import { styles } from "../styles/Home.styles";
import { useNavigate } from "react-router-dom";

import {
    Construction as ConstructionIcon,
    AttachMoney as PriceIcon,
    Restaurant as RestaurantIcon
} from "@mui/icons-material";

export const Home = () => {
    const navigate = useNavigate();
    const features = [
        {
            icon: <ConstructionIcon />,
            title: "Customizable",
            description: "Build your own recipes and ingredients to fit your menu and brand.",
        },
        {
            icon: <PriceIcon />,
            title: "Manage your food costs accurately",
            description: "Portion's 'AI-powered' menu costing tool makes menu costing fast, accurate, and reusable — so you can price correctly from day one.",
        },
        {
            icon: <RestaurantIcon />,
            title: "Focus on what you do best",
            description: "Portion takes care of the heavy lifting, so you can focus on what you do best: creating delicious food and providing excellent customer service.",
        },
    ];
    return (
        <Box style={styles.root}>
            <Box sx={styles.hero}>
                <Typography variant="h2" sx={styles.heroTitle}>Portion</Typography>
                <Typography sx={styles.heroSubtitle}>Built for operators before opening day, Portion makes menu costing fast, transparent, and reusable — so you can price correctly from day one.</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
                    Get Started

                </Button>
            </Box>
            <Box sx={styles.featuresSection}>
                <Box sx={styles.featuresGrid}>
                    {features.map((feature) => (
                        <Card key={feature.title} sx={styles.featureCard} elevation={2}>
                            <Box sx={styles.featureIcon}>
                                {feature.icon}
                            </Box>
                            <Typography variant="h6" sx={styles.featureTitle}>{feature.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    )
};