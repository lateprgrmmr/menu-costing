import { Router } from "express";
import { Connection } from "src/database/connection";
import { Request, Response } from "express";
import { getDashboardData } from "./api";

export type DashboardRequest = Request & { db: Connection };

const router = Router();

router.get("/data", async (req: DashboardRequest, res: Response) => {
    const dashboardData = await getDashboardData(req.db);
    res.status(200).json(dashboardData);
});

export default router;