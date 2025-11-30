import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import useAuth from "@app/providers/Auth/useAuth";
import usePosts from "@hooks/api/usePosts";
import useUsers from "@hooks/api/useUsers";
import GratitudeBoxesView from "./components/GratitudeBoxesBrowseView";
import type { GratitudeBoxData } from "./types/GratitudeBoxData";

const Gratitude = () => {
    const posts = usePosts();
    const users = useUsers();
    const { user } = useAuth();

    const [gratitudeBoxes, setGratitudeBoxes] = useState<
        GratitudeBoxData[] | undefined
    >(undefined);

    useEffect(() => {
        const sync = async () => {
            const publicPosts = await posts.getAllPublicPosts();
            if (!publicPosts) return;

            const unknownUser = {
                profilePicture:
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_1280.png",
                nickname: "Unknown User",
            };

            // Map posts to GratitudeBoxData properly
            const settled = await Promise.allSettled(
                publicPosts.map(async (post) => {
                    let creator: { profilePicture: string; nickname: string };

                    if (post.createdBy) {
                        try {
                            const user = await users.getUserBasicInfo(
                                post.createdBy,
                            );
                            creator = {
                                profilePicture:
                                    user?.profileImage.url ??
                                    unknownUser.profilePicture,
                                nickname:
                                    user?.nickname ?? unknownUser.nickname,
                            };
                        } catch {
                            creator = unknownUser;
                        }
                    } else {
                        creator = unknownUser;
                    }

                    return {
                        _id: post._id,
                        content: post.content,
                        creator,
                        createdAt: post.createdAt,
                        likes: post.likes,
                    };
                }),
            );

            // Extracted only successful and valid promises.
            const boxes: GratitudeBoxData[] = settled
                .filter(
                    (r): r is PromiseFulfilledResult<GratitudeBoxData> =>
                        r.status === "fulfilled",
                )
                .map((r) => r.value);

            setGratitudeBoxes(boxes);
        };

        sync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount

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
    };

    const [viewedGratitudeBoxes, setViewedGratitudeBoxes] = useState<
        GratitudeBoxData[] | undefined
    >(undefined);

    useEffect(() => {
        const filtered = () => {
            if (!gratitudeBoxes) return;

            if (view === "browse") {
                setViewedGratitudeBoxes(gratitudeBoxes);
                return;
            }

            if (view === "my-boxes") {
                const myBoxes = gratitudeBoxes.filter(
                    (box) => box.creator.nickname === user.nickname,
                );
                setViewedGratitudeBoxes(myBoxes);
                return;
            }

            if (view === "liked-boxes") {
                const likedBoxes = gratitudeBoxes.filter((box) =>
                    box.likes.includes(user._id),
                );
                setViewedGratitudeBoxes(likedBoxes);
                return;
            }
        };

        filtered();
    }, [gratitudeBoxes, user._id, user.nickname, view]);

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
                        <ScrollArea className="main">
                            <GratitudeBoxesView
                                gratitudeBoxes={viewedGratitudeBoxes}
                            />
                        </ScrollArea>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Gratitude;
