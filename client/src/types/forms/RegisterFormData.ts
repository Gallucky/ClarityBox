export type RegisterFormData = {
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    nickname: string;
    email: string;
    password: string;
    profileImage: {
        url?: string;
        alt?: string;
    };
    isAdmin: boolean;
};
