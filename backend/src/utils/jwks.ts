import {createRemoteJWKSet} from "jose";

const logtoEndpoint = process.env.LOGTO_ENDPOINT?.replace(/\/$/, "");
export const JWKS = createRemoteJWKSet(
    new URL(`${logtoEndpoint}/oidc/jwks`)
);
