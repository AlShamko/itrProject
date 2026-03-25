import {Response} from "express";
import {userService} from "../services/user.service";
import {AuthRequest} from "../types/auth.types";
import {validateIdArray} from "../utils/validation";

export const userController = {
    async getUsers(req: AuthRequest, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({error: "Failed to fetch users"});
        }
    },

    async updateUsersStatus(req: AuthRequest, res: Response) {
        const {ids, status} = req.body;

        const validationError = validateIdArray(ids);
        if (validationError) {
            return res.status(400).json({error: validationError});
        }

        try {
            const numericIds = ids.map(Number);
            await userService.updateUsersStatus(numericIds, status);
            res.json({message: `Users status updated to ${status}`});
        } catch (error) {
            res.status(500).json({error: "Update failed"});
        }
    },

    async deleteUsers(req: AuthRequest, res: Response) {
        const {ids} = req.body;

        const validationError = validateIdArray(ids);
        if (validationError) {
            return res.status(400).json({error: validationError});
        }

        try {
            const numericIds = ids.map(Number);
            await userService.deleteUsers(numericIds);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: "Delete failed"});
        }
    },
};
