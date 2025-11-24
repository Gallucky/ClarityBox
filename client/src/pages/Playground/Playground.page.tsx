import { ScrollArea } from "@components/ui/shadcn/scroll-area";
import GratitudeBox from "@pages/Gratitude/components/GratitudeBox";

const Playground = () => {
    return (
        <>
            <div className="absolute-center flex flex-col gap-2">
                <ScrollArea className="h-72 w-fit rounded-md border">
                    <GratitudeBox
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
                    <GratitudeBox
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
                    <GratitudeBox
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
                </ScrollArea>
            </div>
        </>
    );
};

export default Playground;
