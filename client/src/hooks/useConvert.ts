import type { Post } from "@/types/models/Post";
import type { GratitudeBoxData } from "@pages/Gratitude/types/GratitudeBoxData";
import useUsers from "./api/useUsers";

const useConvert = () => {
    const users = useUsers();

    const unknownUser = {
        _id: "unknown",
        profilePicture:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_1280.png",
        nickname: "Unknown User",
    };

    const convertPostToGratitudeBoxData = async (posts: Post[]) => {
        const settled = await Promise.allSettled(
            posts.map(async (post) => {
                let creator: {
                    _id: string;
                    profilePicture: string;
                    nickname: string;
                };

                if (post.createdBy) {
                    try {
                        const user = await users.getUserBasicInfo(
                            post.createdBy,
                        );
                        creator = {
                            _id: user?._id ?? unknownUser._id,
                            profilePicture:
                                user?.profileImage?.url ??
                                unknownUser.profilePicture,
                            nickname: user?.nickname ?? unknownUser.nickname,
                        };
                    } catch {
                        creator = unknownUser;
                    }
                } else {
                    creator = unknownUser;
                }

                return {
                    _id: post._id,
                    content: post.content,
                    creator,
                    createdAt: post.createdAt,
                    likes: post.likes,
                    isPublic: post.isPublic,
                };
            }),
        );

        // Extracted only successful and valid promises.
        const boxes: GratitudeBoxData[] = settled
            .filter(
                (r): r is PromiseFulfilledResult<GratitudeBoxData> =>
                    r.status === "fulfilled",
            )
            .map((r) => r.value);

        return boxes;
    };

    return {
        convertPostToGratitudeBoxData,
    };
};

export default useConvert;
