import type { Post } from "@/types/models/Post"; // Added import
import type { GratitudeBoxData } from "@pages/Gratitude/types/GratitudeBoxData";
import GratitudeBox from "./GratitudeBox";

type GratitudeBoxesViewProps = {
    gratitudeBoxes?: GratitudeBoxData[];
    handleLike: (postId: string, newLikes: string[]) => void;
    onPostUpdated: (updatedPost: Post) => void;
    onPostDeleted: (postId: string) => void;
};

const GratitudeBoxesView = (props: GratitudeBoxesViewProps) => {
    const { gratitudeBoxes, handleLike, onPostUpdated, onPostDeleted } = props; // Destructure new props

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
                        isPublic={gratitudeBox.isPublic}
                        likes={gratitudeBox.likes}
                        handleLike={handleLike}
                        onPostUpdated={onPostUpdated} // Pass new prop
                        onPostDeleted={onPostDeleted} // Pass new prop
                    />
                ))}
        </>
    );
};

export default GratitudeBoxesView;
