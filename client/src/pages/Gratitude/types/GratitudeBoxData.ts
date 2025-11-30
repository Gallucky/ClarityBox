export type GratitudeBoxData = {
    _id: string;
    content: string;
    creator: {
        profilePicture: string;
        nickname: string;
    };
    createdAt: string;
    likes: string[];
};
