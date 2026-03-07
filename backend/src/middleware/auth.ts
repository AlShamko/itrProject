import { createRemoteJWKSet, jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWKS = createRemoteJWKSet(new URL('https://nd76sa.logto.app/oidc/jwks'));

export const authMiddleware = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');

    try {
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: 'https://nd76sa.logto.app/oidc',
            audience: 'https://api.inventory-app.com',
        });

        let user = await prisma.user.findUnique({ where: { id: payload.sub } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: payload.sub as string,
                    email: payload.email as string || '',
                }
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
};