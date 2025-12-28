import { Outlet, Route, Routes, useParams } from "react-router-dom"
import { Home } from "./Home";
import IngredientDetail from "../pages/Ingredient/IngredientDetail";
import IngredientPage from "../pages/Ingredient/IngredientPage";
import { Box } from "@mui/material";
import RecipePage from "../pages/Recipe/RecipePage";
import RecipeDetail from "../pages/Recipe/RecipeDetail";
import AppBar from "../common/components/AppBar";
import MenuPage from "../pages/Menu/MenuPage";

const IngredientRoutes = () => {
    const { ingredientId } = useParams<{ ingredientId: string }>();
    console.log('ingredientId', ingredientId);
    return (
        <Box sx={{
            display: 'flex',
            width: '1200px',
            margin: '20px auto',
            padding: '20px',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <Outlet />
        </Box >
    )
}

const RecipeRoutes = () => {
    return (
        <Box sx={{
            display: 'flex',
            width: '1200px',
            margin: '20px auto',
            padding: '20px',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <Outlet />
        </Box >
    )
}

const MenuRoutes = () => {
    return (
        <Box sx={{
            display: 'flex',
            width: '1200px',
            margin: '20px auto',
            padding: '20px',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <Outlet />

        </Box >
    )
}

const AppRouter = () => {
    return (
        <div className="app-router">
            <AppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ingredient" element={<IngredientRoutes />}>
                    <Route index element={<IngredientPage />} />
                    <Route path=":id" element={<IngredientDetail />} />
                </Route>
                <Route path="/recipe" element={<RecipeRoutes />}>
                    <Route index element={<RecipePage />} />
                    <Route path=":id" element={<RecipeDetail />} />
                </Route>
                <Route path="/menu" element={<MenuRoutes />}>
                    <Route index element={<MenuPage />} />
                </Route>
            </Routes>
        </div>
    )
};

export default AppRouter;