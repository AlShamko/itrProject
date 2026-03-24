import { createRemoteJWKSet } from "jose";

const endpoint = process.env.LOGTO_ENDPOINT?.replace(/\/$/, "");
export const JWKS = createRemoteJWKSet(
  new URL(`${endpoint}/oidc/jwks`)
);