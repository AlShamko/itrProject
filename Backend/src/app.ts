import { Request, Response } from "express";
import express from "express";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors())

app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
});
