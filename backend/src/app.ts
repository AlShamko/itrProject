import express from "express";
import cors from "cors";

import inventoryRoutes from "./routes/inventory.routes";
import healthRoutes from "./routes/health.routes";

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