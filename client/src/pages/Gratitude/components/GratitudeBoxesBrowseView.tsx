import type { GratitudeBoxData } from "@pages/Gratitude/types/GratitudeBoxData";
import GratitudeBox from "./GratitudeBox";

type GratitudeBoxesViewProps = {
    gratitudeBoxes?: GratitudeBoxData[];
    handleLike: (postId: string, newLikes: string[]) => void;
};

const GratitudeBoxesView = (props: GratitudeBoxesViewProps) => {
    const { gratitudeBoxes, handleLike } = props;

    return (
        <>
            {gratitudeBoxes &&
                gratitudeBoxes.map((gratitudeBox) => (
                    <GratitudeBox
                        key={gratitudeBox._id}
                        _id={gratitudeBox._id}
                        content={gratitudeBox.content}
                        creator={gratitudeBox.creator}
                        createdAt={gratitudeBox.createdAt}
                        likes={gratitudeBox.likes}
                        handleLike={handleLike}
                    />
                ))}
        </>
    );
};

export default GratitudeBoxesView;
