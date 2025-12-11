import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import SpinnerBox3DTumble from "@/components/ui/Spinner3DTrumblingBox";
import useConvert from "@/hooks/useConvert";
import type { PostFormData } from "@/types/forms/post/PostFormData";
import useAuth from "@app/providers/Auth/useAuth";

import usePosts from "@hooks/api/usePosts";
import useUsers from "@hooks/api/useUsers";
import CreateBoxDialog from "./components/CreateBoxDialog";
import GratitudeBoxesView from "./components/GratitudeBoxesBrowseView";
import GratitudeBoxesTableLayout from "./components/GratitudeBoxesTableLayout";
import LayoutToggle from "./components/LayoutToggle";
import type { GratitudeBoxData } from "./types/GratitudeBoxData";

const Gratitude = () => {
    const posts = usePosts();
    const users = useUsers();
    const { user } = useAuth();

    const [gratitudeBoxes, setGratitudeBoxes] = useState<
        GratitudeBoxData[] | undefined
    >(undefined);

    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const { convertPostToGratitudeBoxData } = useConvert();

    useEffect(() => {
        const sync = async () => {
            setLoading(true);

            const publicPosts = await posts.getAllPublicPosts();
            if (!publicPosts) return;

            // Map posts to GratitudeBoxData properly
            const boxes = await convertPostToGratitudeBoxData(publicPosts);

            setGratitudeBoxes(boxes);
            setLoading(false);
        };

        sync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]); // run once on mount

    const [view, setView] = useState<"browse" | "my-boxes" | "liked-boxes">(
        "browse",
    );

    const handleChangeView = (view: "browse" | "my-boxes" | "liked-boxes") => {
        setView(view);

        const ul = document.getElementById("gratitude-boxes-page-views");
        if (!ul) return;

        const views = ul.querySelectorAll("li.link");
        views.forEach((v) => {
            v.classList.remove("active");

            const dataView = v.getAttribute("data-view");
            if (!dataView) return;

            if (dataView === view) {
                v.classList.add("active");
            }
        });

        setReload(!reload);
    };

    const [viewedGratitudeBoxes, setViewedGratitudeBoxes] = useState<
        GratitudeBoxData[] | undefined
    >(undefined);

    useEffect(() => {
        const filtered = async () => {
            if (!gratitudeBoxes) return;

            setLoading(true);

            if (view === "browse") {
                setViewedGratitudeBoxes(gratitudeBoxes);
                setLoading(false);
                return;
            }

            if (view === "my-boxes") {
                if (!user) {
                    setView("browse");
                    setLoading(false);
                    return;
                }

                const myBoxes = await posts.getMyPosts();
                if (!myBoxes) return;

                const allMyBoxes = await convertPostToGratitudeBoxData(myBoxes);
                setViewedGratitudeBoxes(allMyBoxes);
                setLoading(false);
                return;
            }

            if (view === "liked-boxes") {
                if (!user) {
                    setView("browse");
                    setLoading(false);
                    return;
                }
                const likedBoxes = gratitudeBoxes.filter((box) =>
                    box.likes.includes(user._id),
                );
                setViewedGratitudeBoxes(likedBoxes);
                setLoading(false);
                return;
            }
        };

        filtered();
    }, [gratitudeBoxes, view]);

    const handleLike = (postId: string, newLikes: string[]) => {
        if (!gratitudeBoxes) return;

        const updatedGratitudeBoxes = gratitudeBoxes.map((box) => {
            if (box._id === postId) {
                return { ...box, likes: newLikes };
            }
            return box;
        });

        setGratitudeBoxes(updatedGratitudeBoxes);
    };

    const handleCreateBox = async (data: PostFormData) => {
        if (!user) return;

        const tempId = Date.now().toString();
        const newBox: GratitudeBoxData = {
            _id: tempId,
            content: data.content,
            creator: {
                _id: user._id,
                nickname: user.nickname,
                profilePicture:
                    user.profileImage.url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_1280.png",
            },
            createdAt: new Date().toISOString(),
            likes: [],
            isPublic: data.isPublic,
        };

        setGratitudeBoxes((prev) => (prev ? [newBox, ...prev] : [newBox]));

        const createdPost = await posts.createPost(data);
        if (!createdPost) return;

        const createdBox = await convertPostToGratitudeBoxData([createdPost]);

        setGratitudeBoxes((prev) =>
            prev?.map((box) => (box._id === tempId ? createdBox[0] : box)),
        );
    };

    const [layout, setLayout] = useState<"list" | "table">("list");

    return (
        <>
            <div className="gratitude-container">
                <section className="gratitude-page">
                    <div className="header">
                        <h2 className="text-outline text-outline-foreground text-primary">
                            Gratitude Boxes
                        </h2>
                        <p className="text-secondary text-outline text-outline-background">
                            Here are some gratitude boxes to inspire your own.
                        </p>
                    </div>
                    <LayoutToggle
                        setLayout={setLayout}
                        toggledLayout={layout}
                    />
                    <CreateBoxDialog handleCreateBox={handleCreateBox} />
                    <div className="content">
                        <aside>
                            <nav>
                                <ul id="gratitude-boxes-page-views">
                                    <li
                                        data-view="browse"
                                        className="link active"
                                        onClick={() =>
                                            handleChangeView("browse")
                                        }
                                    >
                                        Browse
                                    </li>
                                    <li
                                        data-view="my-boxes"
                                        className="link"
                                        onClick={() =>
                                            handleChangeView("my-boxes")
                                        }
                                    >
                                        My Boxes
                                    </li>
                                    <li
                                        data-view="liked-boxes"
                                        className="link"
                                        onClick={() =>
                                            handleChangeView("liked-boxes")
                                        }
                                    >
                                        Liked Boxes
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        {loading && (
                            <SpinnerBox3DTumble
                                className="absolute-center"
                                size="xl"
                                textSize="md"
                                textClassName="font-montserrat"
                                text="Loading..."
                                textAnimation="dots-wave"
                                direction="horizontal"
                            />
                        )}

                        {!loading && layout === "list" && (
                            <ScrollArea className="main">
                                <GratitudeBoxesView
                                    gratitudeBoxes={viewedGratitudeBoxes}
                                    handleLike={handleLike}
                                />
                            </ScrollArea>
                        )}
                        {!loading && layout === "table" && (
                            <GratitudeBoxesTableLayout
                                gratitudeBoxes={viewedGratitudeBoxes}
                            />
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Gratitude;
