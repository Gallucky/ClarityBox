import { Heart } from "lucide-react";
import { useState } from "react";
import useAuth from "@app/providers/Auth/useAuth";
import ReadMore from "@components/utils/ReadMore";
import usePosts from "@hooks/api/usePosts";
import useMediaQuery from "@hooks/useMediaQuery";
import formatDateTimeLocale from "@utils/formatDateTime";

type GratitudeBoxProps = {
    _id: string;
    content: string;
    creator: {
        profilePicture: string;
        nickname: string;
    };
    createdAt: string;
    likes: string[];
    setReload: (reload: boolean | ((prev: boolean) => boolean)) => void;
    className?: string;
};

const GratitudeBox = (props: GratitudeBoxProps) => {
    const { _id, content, creator, createdAt, likes, setReload, className } =
        props;
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { user } = useAuth();
    const { likeUnlikePostToggle } = usePosts();

    const textPreviewAmount = isMobile ? 100 : 150;

    const [localLikes, setLocalLikes] = useState(likes);

    const handleLikeUnlikeToggle = async () => {
        try {
            const updatedPost = await likeUnlikePostToggle(_id);

            if (!updatedPost) return;

            setLocalLikes(updatedPost.likes); // <- UI updates instantly
            setReload((prev) => !prev);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className={`gratitude-box ${className}`}>
                <p className="relative">
                    {content.substring(0, textPreviewAmount)}...{" "}
                </p>
                <ReadMore
                    href={`/gratitude-boxes/${_id}`}
                    className="read-more right-0 bottom-[5dvh]"
                />
                <div className="info">
                    <p className="created-by">
                        <img
                            src={creator.profilePicture}
                            alt={`${creator.nickname}'s profile picture`}
                            className="profile-picture"
                        />
                        <span>{creator.nickname}</span>
                    </p>
                    <p className="created-at">
                        <span>{formatDateTimeLocale(createdAt)}</span>
                    </p>
                    <p
                        className={`likes ${localLikes.includes(user._id) ? "liked" : ""}`}
                        onClick={handleLikeUnlikeToggle}
                    >
                        <span>{localLikes.length}</span>
                        <Heart />
                    </p>
                </div>
            </div>
        </>
    );
};

export default GratitudeBox;
