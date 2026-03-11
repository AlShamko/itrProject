import {jwtVerify} from "jose";
import {prisma} from "../config/prisma";
import {JWKS} from "../utils/jwks";

export const requireAuth = (requiredScopes: string[] = []) => {
    return async (req: any, res: any, next: any) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({error: "Missing token"});
            }

            const token = authHeader.split(" ")[1];

            const {payload} = await jwtVerify(token, JWKS, {
                issuer: `${process.env.LOGTO_ENDPOINT}/oidc`,
                audience: process.env.LOGTO_API_RESOURCE,
            });

            if (!payload.sub) {
                return res.status(401).json({error: "Invalid token payload"});
            }

            const logtoId = payload.sub;
            const email = (payload.email as string) || "";

            const user = await prisma.user.upsert({
                where: {logtoId: logtoId},
                update: {email: email},
                create: {
                    logtoId: logtoId,
                    email: email,
                    name: (payload.name as string) || email.split('@')[0],
                    role: 'USER',
                    status: 'active'
                },
            });

            req.user = {
                id: user.id,
                logtoId: user.logtoId,
                role: user.role,
                scopes: (payload.scope as string)?.split(" ") || [],
            };

            if (requiredScopes.length > 0) {
                const hasPermissions = requiredScopes.every(s => req.user.scopes.includes(s));
                if (!hasPermissions) {
                    return res.status(403).json({error: "Insufficient permissions"});
                }
            }

            next();
        } catch (error) {
            console.error("Auth Error:", error);
            res.status(401).json({error: "Unauthorized or invalid token"});
        }
    };
};