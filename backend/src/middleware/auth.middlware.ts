import { Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { prisma } from "../config/prisma";
import { JWKS } from "../utils/jwks";
import { AuthRequest } from "../types/auth.types";

export const requireAuth = (requiredScopes: string[] = []) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader?.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Missing token" });
            }

            const token = authHeader.split(" ")[1];

            const { payload } = await jwtVerify(token, JWKS, {
                issuer: `${process.env.LOGTO_ENDPOINT}/oidc`,
                audience: process.env.LOGTO_API_RESOURCE,
            });

            const user = await prisma.user.upsert({
                where: { id: payload.sub as string },
                update: { email: (payload.email as string) || "" },
                create: {
                    id: payload.sub as string,
                    email: (payload.email as string) || "",
                    role: "USER",
                },
            });

            req.user = {
                id: user.id,
                role: user.role,
                scopes: ((payload.scope as string) || "").split(" "),
            };

            if (requiredScopes.length) {
                const hasPermissions = requiredScopes.every((s) =>
                    req.user?.scopes.includes(s)
                );

                if (!hasPermissions) {
                    return res.status(403).json({ error: "Insufficient permissions" });
                }
            }

            next();
        } catch (error) {
            console.error("Auth error:", error);
            res.status(401).json({ error: "Unauthorized" });
        }
    };
};