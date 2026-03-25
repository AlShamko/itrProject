import {prisma} from "../config/prisma";

export const userService = {
    async getAllUsers() {
        return prisma.user.findMany({
            orderBy: {createdAt: "desc"},
        });
    },

    async updateUsersStatus(userIds: number[], status: string) {
        return prisma.user.updateMany({
            where: {id: {in: userIds}},
            data: {status},
        });
    },

    async deleteUsers(userIds: number[]) {
        return prisma.user.deleteMany({
            where: {id: {in: userIds}},
        });
    },
};
