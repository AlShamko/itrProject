import express from "express";
import cors from "cors";

import inventoryRoutes from "./routes/inventory.routes";
import healthRoutes from "./routes/health.routes";
import {prisma} from "./config/prisma";
import {requireAuth} from "./middleware/auth.middlware";
import {AuthRequest} from "./types/auth.types";

export const app = express();
app.use(express.json());

app.use(
    cors({
        origin: [
            "https://itrprojectfinal.onrender.com",
            "http://localhost:5173",
        ],
        credentials: true,
    })
);

app.use("/health", healthRoutes);
app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

app.get('/api/users', requireAuth(), async (req: AuthRequest, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {createdAt: 'desc'}
        });
        res.json(users);
    } catch (error) {
        console.error("Fetch users error:", error);
        res.status(500).json({error: 'Failed to fetch users'});
    }
});

app.patch('/api/users/status', requireAuth(), async (req: AuthRequest, res) => {
    const {ids, status} = req.body;

    if (!Array.isArray(ids)) {
        return res.status(400).json({error: "Ids must be an array"});
    }

    try {
        const numericIds = ids.map(Number);

        await prisma.user.updateMany({
            where: {id: {in: numericIds}},
            data: {status: status}
        });

        res.json({message: `Users status updated to ${status}`});
    } catch (error) {
        res.status(500).json({error: 'Update failed'});
    }
});

app.delete('/api/users', requireAuth(), async (req: AuthRequest, res) => {
    const {ids} = req.body;

    if (!Array.isArray(ids)) {
        return res.status(400).json({error: "Ids must be an array"});
    }

    try {
        const numericIds = ids.map(Number);
        await prisma.user.deleteMany({
            where: {id: {in: numericIds}}
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: 'Delete failed'});
    }
});