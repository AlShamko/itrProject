import { Response } from "express";
import { inventoryService } from "../services/inventory.service";
import { AuthRequest } from "../types/auth.types";

export const inventoryController = {
  async getInventories(req: AuthRequest, res: Response) {
    try {
      const inventories = await inventoryService.getInventories(
        req.user!.id,
        req.user!.role
      );

      res.json(inventories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventories" });
    }
  },

  async createInventory(req: AuthRequest, res: Response) {
    try {
      const { title, description } = req.body;

      const inventory = await inventoryService.createInventory(
        req.user!.id,
        title,
        description
      );

      res.status(201).json(inventory);
    } catch (error) {
      res.status(500).json({ error: "Failed to create inventory" });
    }
  },
};