import GratitudeBox from "./GratitudeBox";
import type { GratitudeBoxData } from "@pages/Gratitude/types/GratitudeBoxData";

type GratitudeBoxesViewProps = {
    gratitudeBoxes?: GratitudeBoxData[];
};

const GratitudeBoxesView = (props: GratitudeBoxesViewProps) => {
    const { gratitudeBoxes } = props;

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
                    />
                ))}
        </>
    );
};

export default GratitudeBoxesView;
