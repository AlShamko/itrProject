import express from "express";
import cors from "cors";

import inventoryRoutes from "./routes/inventory.routes";
import healthRoutes from "./routes/health.routes";
import supportRoutes from "./routes/support.routes";
import salesforceRoutes from "./routes/salesforce.routes";
import userRoutes from "./routes/user.routes";

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
app.use("/api/support", supportRoutes);
app.use("/api/salesforce", salesforceRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend running");
});
