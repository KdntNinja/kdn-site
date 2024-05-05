export interface User {
    uid: string;
    displayName: string;
    email: string;
}

export type Post = {
    id: string;
    title: string;
    content: string;
    userId: string;
    userName: string;
    timestamp: number;
};

export interface UserRole {
    role: "default" | "family" | "friend";
    isAdmin: boolean;
}
