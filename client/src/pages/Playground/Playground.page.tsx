import Gratitude from "@pages/Gratitude/components/GratitudeBox";

const Playground = () => {
    return (
        <>
            <Gratitude
                content={
                    "Dolor do ex deserunt qui nostrud occaecat. Amet non pariatur voluptate amet. Proident minim velit non duis. Magna elit laborum excepteur mollit aliquip enim velit fugiat ipsum est tempor."
                }
                creator={{
                    profilePicture: "vite.svg",
                    nickname: "Gallucky",
                }}
                createdAt={"23/11/2025"}
                likes={0}
            />
        </>
    );
};

export default Playground;
