import {jwtVerify, decodeJwt} from "jose";
import {prisma} from "../config/prisma";
import {JWKS} from "../utils/jwks";
import {UserRole, UserStatus} from "../constants/roles";

export const requireAuth = (requiredScopes: string[] = []) => {
    return async (req: any, res: any, next: any) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({error: "Missing token"});
            }

            const token = authHeader.split(" ")[1];

            const endpoint = process.env.LOGTO_ENDPOINT?.replace(/\/$/, "");
            if (!endpoint) {
                return res
                    .status(500)
                    .json({error: "Server configuration error: LOGTO_ENDPOINT missing"});
            }

            const issuerUrl = `${endpoint}/oidc`;
            const audience = process.env.LOGTO_API_RESOURCE;

            try {
                const {payload} = await jwtVerify(token, JWKS, {
                    issuer: issuerUrl,
                    audience: audience,
                });

                if (!payload.sub) {
                    return res.status(401).json({error: "Invalid token payload"});
                }

                const logtoId = payload.sub;
                const email = (payload.email as string) || "";

                const user = await prisma.user.upsert({
                    where: {logtoId},
                    update: {email},
                    create: {
                        logtoId,
                        email,
                        name: (payload.name as string) || email.split("@")[0],
                        role: UserRole.USER,
                        status: UserStatus.ACTIVE,
                    },
                });

                req.user = {
                    id: user.id,
                    logtoId: user.logtoId,
                    role: user.role,
                    scopes: (payload.scope as string)?.split(" ") || [],
                };

                if (requiredScopes.length > 0) {
                    const hasAllScopes = requiredScopes.every((scope) =>
                        req.user.scopes.includes(scope)
                    );
                    if (!hasAllScopes) {
                        return res.status(403).json({error: "Insufficient permissions"});
                    }
                }

                next();
            } catch (verifyError: any) {
                try {
                    const decoded = decodeJwt(token);
                    console.error("Token verification failed:", {
                        issuer: decoded.iss,
                        audience: decoded.aud,
                        expectedIssuer: issuerUrl,
                        expectedAudience: audience,
                    });
                } catch {
                    console.error("Could not decode token for debugging");
                }

                return res
                    .status(401)
                    .json({error: "Unauthorized or invalid token"});
            }
        } catch (error) {
            console.error("Authentication error:", error);
            res
                .status(500)
                .json({error: "Internal Server Error during authentication"});
        }
    };
};
