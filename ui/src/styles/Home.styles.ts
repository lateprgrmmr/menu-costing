import type { SxProps, Theme } from "@mui/material";

export const styles = {
    root: {
        minHeight: "100vh",
    },

    // Hero section
    hero: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 12,
        px: 4,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        color: "white",
    },
    heroTitle: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
        mb: 2,
    },
    heroSubtitle: {
        maxWidth: 700,
        opacity: 0.85,
        mb: 4,
        fontSize: "1.25rem",
        lineHeight: 1.6,
    },

    // Features section
    featuresSection: {
        py: 10,
        px: 4,
        bgcolor: "#fafafa",
    },
    featuresGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 4,
        maxWidth: 1100,
        mx: "auto",
    },
    featureCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 4,
        borderRadius: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
        },
    },
    featureIcon: {
        width: 64,
        height: 64,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        bgcolor: "primary.main",
        color: "white",
        mb: 2,
        "& svg": { fontSize: 32 },
    },
    featureTitle: {
        fontWeight: 600,
        mb: 1,
    },
} satisfies Record<string, SxProps<Theme>>;