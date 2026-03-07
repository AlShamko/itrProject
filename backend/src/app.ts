import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import {PrismaClient} from "@prisma/client";

export const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.send({ status: 'OK', database: 'Connected' });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).send({ status: 'Error', message });
    }
});

app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
});
