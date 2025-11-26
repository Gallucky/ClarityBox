import { Heart } from "lucide-react";
import ReadMore from "@components/utils/ReadMore";
import useMediaQuery from "@hooks/useMediaQuery";

type GratitudeBoxProps = {
    content: string;
    creator: {
        profilePicture: string;
        nickname: string;
    };
    createdAt: string;
    likes: number;
    className?: string;
};

const GratitudeBox = (props: GratitudeBoxProps) => {
    const { content, creator, createdAt, likes } = props;
    const isMobile = useMediaQuery("(max-width: 768px)");

    const textPreviewAmount = isMobile ? 100 : 150;

    return (
        <>
            <div className="gratitude-box">
                <p className="relative">
                    {content.substring(0, textPreviewAmount)}...{" "}
                </p>
                <ReadMore className="read-more right-0 bottom-[5dvh]" />
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
                        <span>{createdAt}</span>
                    </p>
                    <p className="likes">
                        <span>{likes}</span>
                        <Heart />
                    </p>
                </div>
            </div>
        </>
    );
};

export default GratitudeBox;
