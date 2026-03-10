import { createRemoteJWKSet } from "jose";

export const JWKS = createRemoteJWKSet(
  new URL(`${process.env.LOGTO_ENDPOINT}/oidc/jwks`)
);