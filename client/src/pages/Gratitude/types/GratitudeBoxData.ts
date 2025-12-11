export type GratitudeBoxData = {
    _id: string;
    content: string;
    creator: {
        _id: string;
        profilePicture: string;
        nickname: string;
    };
    createdAt: string;
    likes: string[];
    isPublic: boolean;
};
