import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "@app/providers/Auth/useAuth";
import usePosts from "@hooks/api/usePosts";
import useUsers from "@hooks/api/useUsers";
import formatDateTimeLocale from "@utils/formatDateTime";
import type { BasicUserInfo } from "@/types/BasicUserInfo";
import type { Post } from "@/types/models/Post";

type EnrichedPost = Post & {
    creator: BasicUserInfo;
};

const GratitudeBoxDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { getPostById, likeUnlikePostToggle } = usePosts();
    const { getUserBasicInfo } = useUsers();
    const [postData, setPostData] = useState<EnrichedPost | undefined>(
        undefined,
    );
    const [loading, setLoading] = useState(false);
    const [localLikes, setLocalLikes] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                if (!id) return;

                const postData = await getPostById(id);
                if (!postData) return;

                const creator = await getUserBasicInfo(postData.createdBy);
                if (!creator) return;

                setPostData({ ...postData, creator });
                setLocalLikes(postData.likes);
            } finally {
                setLoading(false); // correct place
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLikeUnlikeToggle = async () => {
        try {
            if (!postData) return;

            const updatedPost = await likeUnlikePostToggle(postData._id);

            if (!updatedPost) return;

            setLocalLikes(updatedPost.likes); // <- UI updates instantly
        } catch (e) {
            console.error(e);
        }
    };

    if (!loading && !postData)
        return (
            <div className="absolute-center">
                <h2>An Unexpected Error Occurred</h2>
            </div>
        );

    if (!postData) return null;

    return (
        <>
            <div className="gratitude-box-details">
                <h2>Gratitude Box Details - {id}</h2>
                <div className="content">{postData.content}</div>
                <div className="info">
                    <p className="created-by">
                        <img
                            src={postData.creator.profileImage.url}
                            alt={`${postData.creator.nickname}'s profile picture`}
                            className="profile-picture"
                        />
                        <span>{postData.creator.nickname}</span>
                    </p>
                    <p className="created-at">
                        <span>{formatDateTimeLocale(postData.createdAt)}</span>
                    </p>
                    <p
                        className={`likes ${localLikes.includes(user._id) ? "liked" : ""}`}
                        onClick={handleLikeUnlikeToggle}
                    >
                        <span>{localLikes?.length}</span>
                        <Heart />
                    </p>
                </div>
                <div className="comments">Coming Soon?</div>
            </div>
        </>
    );
};

export default GratitudeBoxDetails;
