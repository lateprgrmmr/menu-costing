import AppBar from "../../common/components/AppBar"
import { IngredientSelectionFlow } from "../../features/ingredients/IngredientSelectionFlow"
import RecipeCreationFlow from "../../features/recipes/RecipeCreationFlow"
import RecentItemSummary from "./RecentItemSummary"

export const Dashboard = () => {
    return (
        <div>
            <AppBar />
            <h1>Dashboard</h1>
            <IngredientSelectionFlow />
            <RecipeCreationFlow />
            <RecentItemSummary />
        </div>
    )
}