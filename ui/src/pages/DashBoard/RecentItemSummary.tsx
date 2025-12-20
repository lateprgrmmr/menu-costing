import { useEffect, useState } from "react";
import type { IngredientRecord } from "../../shared/types/ingredient";
import { loadRecentIngredients } from "../../actions/Ingredient.action";
import { EditOrCreateIngredientDialog } from "../../features/ingredients/EditOrCreateIngredientDialog";
import { Typography } from "@mui/material";

const RecentItemSummary = () => {
    const [recentItems, setRecentItems] = useState<IngredientRecord[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null);
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientRecord | null>(null);

    useEffect(() => {
        const fetchRecentItems = async () => {
            const results = await loadRecentIngredients();
            setRecentItems(results);
        }
        fetchRecentItems();
    }, []);

    useEffect(() => {
        if (selectedIngredientId) {
            const ingredient = recentItems.find((item) => item.id === selectedIngredientId);
            if (ingredient) {
                setSelectedIngredient(ingredient);
            }
        } else {
            setSelectedIngredient(null);
        }
    }, [selectedIngredientId]);

    const handleItemClick = (id: number) => {
        setSelectedIngredientId(id);
        setOpen(true);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                padding: '20px',
                height: '700px',
            }}
        >
            <h4>Recent Item Summary</h4>
            <div style={{
                maxWidth: '500px',
                height: '600px',
                overflow: 'auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            }}>
                {recentItems.map((i) => (
                    <div key={i.id}>
                        <Typography
                            variant="body1"
                            onClick={() => handleItemClick(i.id)}
                            style={{
                                cursor: 'pointer',
                            }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                }
                            }}
                        >
                            {i.name}
                        </Typography>
                    </div>
                ))}
            </div>
            <EditOrCreateIngredientDialog
                open={open}
                onClose={() => setOpen(false)}
                existingIngredient={selectedIngredient || undefined}
            />
        </div>
    )
}

export default RecentItemSummary;