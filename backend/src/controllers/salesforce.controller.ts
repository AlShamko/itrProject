import {Response} from "express";
import {syncUserToSalesforce} from "../services/salesforce.service";
import {AuthRequest} from "../types/auth.types";

export const syncToCRM = async (req: AuthRequest, res: Response) => {
    try {
        const {firstName, lastName, email, company, phone} = req.body;

        if (!lastName || !company || !email) {
            return res
                .status(400)
                .json({error: "Last Name, Email and Company are required"});
        }

        const result = await syncUserToSalesforce({
            firstName,
            lastName,
            email,
            company,
            phone,
        });

        res.json({message: "Successfully synced to Salesforce", ids: result});
    } catch (error) {
        console.error("Salesforce sync error:", error);
        const errorMessage =
            error instanceof Error ? error.message : "SF Sync Failed";
        res.status(500).json({error: errorMessage});
    }
};
