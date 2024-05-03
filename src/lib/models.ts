export interface User {
    uid: string;
    displayName: string;
    email: string;
}

export interface Post {
    title: string;
    content: string;
    userId: string;
    userName: string;
}
