import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDb, Connection } from "./database/connection";
import { Request, Response } from "express";
import ingredientRouter from "./routes/ingredient";
import dashboardRouter from "./routes/dashboard";
import recipeRouter from "./routes/recipe";

const APP_PORT = process.env.APP_PORT || 5005;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


const startServer = async () => {
    const db = await connectDb();
    app.use((req: Request & { db: Connection }, res: Response, next) => {
        req.db = db;
        next();
    });
    app.use("/ingredient", ingredientRouter);
    app.use("/recipe", recipeRouter);
    app.use("/dashboard", dashboardRouter);

    console.log("Routes configured");
    app.listen(APP_PORT, () => {
        console.log(`Server started on http://localhost:${APP_PORT}`);
    });
};

startServer().catch((error) => console.error(error));
