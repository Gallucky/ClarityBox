import GratitudeBox from "./GratitudeBox";
import type { GratitudeBoxData } from "@pages/Gratitude/types/GratitudeBoxData";

type GratitudeBoxesViewProps = {
    gratitudeBoxes?: GratitudeBoxData[];
    setReload: (reload: boolean | ((prev: boolean) => boolean)) => void;
};

const GratitudeBoxesView = (props: GratitudeBoxesViewProps) => {
    const { gratitudeBoxes, setReload } = props;

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
                        setReload={setReload}
                    />
                ))}
        </>
    );
};

export default GratitudeBoxesView;
