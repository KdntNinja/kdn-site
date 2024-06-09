export interface User {
    uid: string;
    displayName: string;
    email: string;
    group: "default" | "family";
}

export type PostModel = {
    id: string;
    title: string;
    content: string;
    userId: string;
    timestamp: number;
    imageUrl: string;
    replies: Array<{ text: string; userId: string; timestamp: number }>;
};

export interface UserRole {
    group: "default" | "family";
    isAdmin: boolean;
}

export interface Credit {
    name: string;
    role: string;
}
