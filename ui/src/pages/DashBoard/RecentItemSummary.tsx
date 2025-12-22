import {
    useState
} from "react";
import { EditOrCreateIngredientDialog } from "../../features/ingredients/EditOrCreateIngredientDialog";
import { Typography } from "@mui/material";
import type { DashboardData } from "../../shared/types/dashboard";
import EditOrCreateRecipeDialog from "../../features/recipes/EditOrCreateRecipeDialog";
import EditOrCreateMenuItemDialog from "../../features/menuItems/EditOrCreateMenuItemDialog";

export enum RecentItemSummaryKindEnum {
    INGREDIENT = "ingredient",
    RECIPE = "recipe",
    MENU_ITEM = "menu item",
}

interface RecentItemSummaryProps {
    kind: RecentItemSummaryKindEnum;
    data: DashboardData;
}

const RecentItemSummary = (props: RecentItemSummaryProps) => {
    const { kind, data } = props;
    const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);
    const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
    const [menuItemDialogOpen, setMenuItemDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);


    const handleItemClick = (id: number) => {
        console.log('handleItemClick', kind)
        setSelectedItemId(id);
        if (kind === RecentItemSummaryKindEnum.INGREDIENT) {
            setIngredientDialogOpen(true);
        } else if (kind === RecentItemSummaryKindEnum.RECIPE) {
            setRecipeDialogOpen(true);
        } else if (kind === RecentItemSummaryKindEnum.MENU_ITEM) {
            setMenuItemDialogOpen(true);
        }
    }

    const items =
        kind === RecentItemSummaryKindEnum.INGREDIENT ?
            data.recentIngredients : kind === RecentItemSummaryKindEnum.RECIPE
                ? data.recentPrepRecipes : data.recentMenuItems;


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
            <h4 style={{ textTransform: 'capitalize' }}>Recent {kind} Summary</h4>
            <div style={{
                maxWidth: '500px',
                height: '600px',
                overflow: 'auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            }}>
                {items.map((i) => (
                    <div key={i.id}>
                        <Typography
                            variant="body1"
                            onClick={() => handleItemClick(i?.id || 0)}
                            style={{
                                cursor: 'pointer',
                            }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                }
                            }}
                        >
                            {i?.name}
                        </Typography>
                    </div>
                ))}
            </div>
            {kind === RecentItemSummaryKindEnum.INGREDIENT && (
                <EditOrCreateIngredientDialog
                    open={ingredientDialogOpen}
                    onClose={() => setIngredientDialogOpen(false)}
                    existingIngredientId={selectedItemId}
                />
            )}
            {kind === RecentItemSummaryKindEnum.RECIPE && (
                <EditOrCreateRecipeDialog
                    open={recipeDialogOpen}
                    onClose={() => setRecipeDialogOpen(false)}
                    existingRecipeId={selectedItemId}
                />
            )}
            {kind === RecentItemSummaryKindEnum.MENU_ITEM && (
                <EditOrCreateMenuItemDialog
                    open={menuItemDialogOpen}
                    onClose={() => setMenuItemDialogOpen(false)}
                    existingMenuItemId={selectedItemId}
                />
            )}
        </div>
    )
}

export default RecentItemSummary;