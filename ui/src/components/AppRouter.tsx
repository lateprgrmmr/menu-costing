import { Route, Routes } from "react-router-dom"
import { Home } from "./Home";
import { Dashboard } from "./Dashboard";

const AppRouter = () => {
    return (
        <div className="app-router">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    )
};

export default AppRouter;