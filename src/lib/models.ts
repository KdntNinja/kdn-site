export interface User {
    uid: string;
    displayName: string;
    email: string;
    group: "default" | "family";
}

export type Post = {
    id: string;
    title: string;
    content: string;
    userId: string;
    userName: string;
    timestamp: number;
    group: "default" | "family";
};
