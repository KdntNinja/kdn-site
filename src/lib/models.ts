export interface User {
    uid: string;
    displayName: string;
    email: string;
}

export type PostModel = {
    id: string;
    title: string;
    content: string;
    userId: string;
    userName: string;
    timestamp: number;
    imageUrl: string;
};

export interface UserRole {
    role: "default" | "family" | "friend";
    isAdmin: boolean;
}
