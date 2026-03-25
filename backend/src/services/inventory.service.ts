import {prisma} from "../config/prisma";

export const inventoryService = {
    async getInventories(userId: number, role: string) {
        if (role === "ADMIN") {
            return prisma.inventory.findMany({
                include: {creator: true},
            });
        }

        return prisma.inventory.findMany({
            where: {creatorId: userId},
        });
    },

    async createInventory(userId: number, title: string, description?: string) {
        return prisma.inventory.create({
            data: {
                title,
                description,
                creatorId: userId,
                version: 0,
            },
        });
    },
};