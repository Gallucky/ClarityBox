import { Heart } from "lucide-react";

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

    return (
        <>
            <div className="absolute-center">
                <div className="gratitude-box">
                    <p className="content">{content.substring(0, 100)}...</p>
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
            </div>
        </>
    );
};

export default GratitudeBox;
