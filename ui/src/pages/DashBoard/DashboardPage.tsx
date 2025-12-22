import { useEffect, useState } from "react"
import { getDashboardData } from "../../actions/Dashbard.action"
import AppBar from "../../common/components/AppBar"
import { IngredientSelectionFlow } from "../../features/ingredients/IngredientSelectionFlow"
import RecipeCreationFlow from "../../features/recipes/RecipeCreationFlow"
import type { DashboardData } from "../../shared/types/dashboard"
import RecentItemSummary, { RecentItemSummaryKindEnum } from "./RecentItemSummary"

export const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const data = await getDashboardData();
            setDashboardData(data);
        }
        fetchDashboardData();
    }, []);

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    console.log('dashboardData', dashboardData);
    
    return (
        <div>
            <AppBar />
            <h1>Dashboard</h1>
            <IngredientSelectionFlow />
            <RecipeCreationFlow />
            <RecentItemSummary
                kind={RecentItemSummaryKindEnum.INGREDIENT}
                data={dashboardData} />
            <RecentItemSummary
                kind={RecentItemSummaryKindEnum.RECIPE}
                data={dashboardData} />
            {/* <RecentItemSummary
                kind={RecentItemSummaryKindEnum.MENU_ITEM}
                data={dashboardData} /> */}
        </div>
    )
}