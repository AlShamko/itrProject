import { Request, Response } from 'express';
import { uploadToDropbox } from '../services/dropbox.service';

const ADMIN_EMAILS = ["shamkoag@gmail.com"];

export const createSupportTicket = async (req: Request, res: Response) => {
    try {
        const { summary, priority, reportedBy, inventory, link } = req.body;

        if (!summary || !priority) {
            return res.status(400).json({ error: "Summary and Priority are required" });
        }

        const ticketData = {
            summary,
            priority,
            reportedBy: reportedBy || "Anonymous",
            inventory: inventory || "N/A",
            link: link || "N/A",
            admins: ADMIN_EMAILS,
            createdAt: new Date().toISOString()
        };

        const jsonContent = JSON.stringify(ticketData, null, 2);
        const filename = `ticket_${Date.now()}.json`;

        await uploadToDropbox(jsonContent, filename);


        res.status(201).json({ message: "Support ticket created successfully", ticketId: filename });
    } catch (error) {
        console.error("Error creating support ticket:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: `Failed to create support ticket: ${errorMessage}` });
    }
};
