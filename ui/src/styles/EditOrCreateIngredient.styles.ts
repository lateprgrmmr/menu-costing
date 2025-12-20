import type { SxProps, Theme } from "@mui/material";

export const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        py: 12,
        px: 4,
    },
    dialog: {
        width: "500px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 12,
        px: 4,
    },
    textInput: {
        marginBottom: 2,
        marginRight: '5px',
    },
    requiredInput: {
        width: '100%',
    },
    autocomplete: {
        width: "100%",
        marginBottom: 2,
    },
    button: {
        width: "100%",
        marginBottom: 2,
    },
} satisfies Record<string, SxProps<Theme>>;