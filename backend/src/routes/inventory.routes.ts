import { Router } from "express";
import { requireAuth } from "../middleware/auth.middlware";
import { inventoryController } from "../contollers/inventory.controller";

const router = Router();

router.get(
  "/",
  requireAuth(["read:tables"]),
  inventoryController.getInventories
);

router.post(
  "/",
  requireAuth(["write:tables"]),
  inventoryController.createInventory
);

export default router;