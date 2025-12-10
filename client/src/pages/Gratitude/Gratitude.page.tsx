import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import useConvert from "@/hooks/useConvert";
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
    const [createBox, setCreateBox] = useState(false);
    const { convertPostToGratitudeBoxData } = useConvert();

    useEffect(() => {
        const sync = async () => {
            const publicPosts = await posts.getAllPublicPosts();
            if (!publicPosts) return;

            // Map posts to GratitudeBoxData properly
            const boxes = await convertPostToGratitudeBoxData(publicPosts);

            setGratitudeBoxes(boxes);
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

            if (view === "browse") {
                setViewedGratitudeBoxes(gratitudeBoxes);
                return;
            }

            if (view === "my-boxes") {
                if (!user) {
                    setView("browse");
                    return;
                }

                const myBoxes = await posts.getMyPosts();
                if (!myBoxes) return;

                const allMyBoxes = await convertPostToGratitudeBoxData(myBoxes);
                setViewedGratitudeBoxes(allMyBoxes);
                return;
            }

            if (view === "liked-boxes") {
                if (!user) {
                    setView("browse");
                    return;
                }
                const likedBoxes = gratitudeBoxes.filter((box) =>
                    box.likes.includes(user._id),
                );
                setViewedGratitudeBoxes(likedBoxes);
                return;
            }
        };

        filtered();
    }, [gratitudeBoxes, user, view, createBox]);

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
                    <CreateBoxDialog setCreateBox={setCreateBox} />
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
                        {layout === "list" && (
                            <ScrollArea className="main">
                                <GratitudeBoxesView
                                    gratitudeBoxes={viewedGratitudeBoxes}
                                    setReload={setReload}
                                />
                            </ScrollArea>
                        )}
                        {layout === "table" && (
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
