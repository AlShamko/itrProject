export const UserRole = {
    ADMIN: "ADMIN",
    USER: "USER",
    AUTHOR: "AUTHOR",
} as const;

export const UserStatus = {
    ACTIVE: "active",
    BLOCKED: "blocked",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
