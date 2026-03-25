export interface AdminUser {
    id: number;
    name: string;
    email: string;
    status: string;
    createdAt: string;
    role: string;
}

export type UserStatus = "active" | "blocked";
