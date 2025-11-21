export type User = {
    _id: string;
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    nickname: string;
    email: string;
    profileImage: {
        url?: string;
        alt?: string;
    };
    isAdmin: boolean;
    posts: string[];
    createdAt: string;
    updatedAt: string;
};
