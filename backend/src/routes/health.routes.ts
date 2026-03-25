import {Router} from "express";
import {prisma} from "../config/prisma";

const router = Router();

router.get("/", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({status: "ok", database: "connected"});
    } catch {
        res.status(500).json({status: "error"});
    }
});

export default router;