import {jwtVerify, decodeJwt} from "jose";
import {prisma} from "../config/prisma";
import {JWKS} from "../utils/jwks";


export const requireAuth = (requiredScopes: string[] = []) => {
    return async (req: any, res: any, next: any) => {
        try {
            console.log(`[requireAuth] called for ${req.method} ${req.path}`);
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                console.warn("[requireAuth] Missing or invalid authorization header");
                return res.status(401).json({error: "Missing token"});
            }

            const token = authHeader.split(" ")[1];

            const endpoint = process.env.LOGTO_ENDPOINT?.replace(/\/$/, "");
            if (!endpoint) {
                console.error("[requireAuth] LOGTO_ENDPOINT environment variable is not set!");
                return res.status(500).json({error: "Server configuration error: LOGTO_ENDPOINT missing"});
            }

            const issuerUrl = `${endpoint}/oidc`;
            const audience = process.env.LOGTO_API_RESOURCE;

            if (!audience) {
                console.warn("[requireAuth] LOGTO_API_RESOURCE environment variable is not set! Audience validation might fail if token has audience.");
            }
            
            console.log(`[requireAuth] Verifying token. Issuer: ${issuerUrl}, Audience: ${audience}`);

            try {
                const {payload} = await jwtVerify(token, JWKS, {
                    issuer: issuerUrl,
                    audience: audience,
                });

                if (!payload.sub) {
                    console.error("[requireAuth] Token payload missing 'sub' claim");
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
            } catch (verifyError: any) {
                console.error("[requireAuth] Token Verification Failed:", verifyError.message);
                try {
                    const decoded = decodeJwt(token);
                    console.error("[requireAuth] Failed Token Claims:", {
                        iss: decoded.iss,
                        aud: decoded.aud,
                        exp: decoded.exp,
                        sub: decoded.sub
                    });
                    console.error(`[requireAuth] Expected Issuer: ${issuerUrl}`);
                    console.error(`[requireAuth] Expected Audience: ${audience}`);
                } catch (decodeError) {
                    console.error("[requireAuth] Could not decode token for debugging:", decodeError);
                }
                
                return res.status(401).json({error: "Unauthorized or invalid token"});
            }

        } catch (error) {
            console.error("Auth Error (Unexpected):", error);
            res.status(500).json({error: "Internal Server Error during authentication"});
        }
    };
};