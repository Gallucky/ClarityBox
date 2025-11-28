import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import usePosts from "@/hooks/api/usePosts";
import useUsers from "@/hooks/api/useUsers";
import GratitudeBox from "./components/GratitudeBox";

type GratitudeBoxData = {
    _id: string;
    content: string;
    creator: {
        profilePicture: string;
        nickname: string;
    };
    createdAt: string;
    likes: number;
};

const Gratitude = () => {
    const posts = usePosts();
    const users = useUsers();

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
            const boxes: GratitudeBoxData[] = await Promise.all(
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
                        creator, // ✅ now matches GratitudeBoxData
                        createdAt: post.createdAt,
                        likes: post.likes.length,
                    };
                }),
            );

            setGratitudeBoxes(boxes); // ✅ now fully typed
        };

        sync();
    }, []); // run once on mount

    const items = [
        {
            _id: "sdfsdfsdfds",
            content:
                "Sint mollit ipsum occaecat non elit voluptate incididunt nisi qui. Enim eu officia id eu qui ex incididunt. Excepteur ex officia sit aliqua aliquip laboris. Incididunt quis cupidatat Lorem sint veniam laboris consequat do eu in. Commodo non magna voluptate voluptate officia et sit. Nostrud reprehenderit voluptate ex esse minim nulla qui.Cillum irure tempor amet velit.",
            creator: {
                profilePicture: "vite.svg",
                nickname: "Gallucky",
            },
            createdAt: "23/11/2025",
            likes: 0,
        },
        {
            _id: "sdfsdfsdfds",
            content:
                "Sint mollit ipsum occaecat non elit voluptate incididunt nisi qui. Enim eu officia id eu qui ex incididunt. Excepteur ex officia sit aliqua aliquip laboris. Incididunt quis cupidatat Lorem sint veniam laboris consequat do eu in. Commodo non magna voluptate voluptate officia et sit. Nostrud reprehenderit voluptate ex esse minim nulla qui. Cillum irure tempor amet velit.",
            creator: {
                profilePicture: "vite.svg",
                nickname: "Gallucky",
            },
            createdAt: "23/11/2025",
            likes: 0,
        },
        {
            _id: "sdfsdfsdfds",
            content:
                "Sint mollit ipsum occaecat non elit voluptate incididunt nisi qui. Enim eu officia id eu qui ex incididunt. Excepteur ex officia sit aliqua aliquip laboris. Incididunt quis cupidatat Lorem sint veniam laboris consequat do eu in. Commodo non magna voluptate voluptate officia et sit. Nostrud reprehenderit voluptate ex esse minim nulla qui. Cillum irure tempor amet velit.",
            creator: {
                profilePicture: "vite.svg",
                nickname: "Gallucky",
            },
            createdAt: "23/11/2025",
            likes: 0,
        },
        {
            _id: "sdfsdfsdfds",
            content:
                "Sint mollit ipsum occaecat non elit voluptate incididunt nisi qui. Enim eu officia id eu qui ex incididunt. Excepteur ex officia sit aliqua aliquip laboris. Incididunt quis cupidatat Lorem sint veniam laboris consequat do eu in. Commodo non magna voluptate voluptate officia et sit. Nostrud reprehenderit voluptate ex esse minim nulla qui. Cillum irure tempor amet velit.",
            creator: {
                profilePicture: "vite.svg",
                nickname: "Gallucky",
            },
            createdAt: "23/11/2025",
            likes: 0,
        },
        {
            _id: "sdfsdfsdfds",
            content:
                "Sint mollit ipsum occaecat non elit voluptate incididunt nisi qui. Enim eu officia id eu qui ex incididunt. Excepteur ex officia sit aliqua aliquip laboris. Incididunt quis cupidatat Lorem sint veniam laboris consequat do eu in. Commodo non magna voluptate voluptate officia et sit. Nostrud reprehenderit voluptate ex esse minim nulla qui. Cillum irure tempor amet velit.",
            creator: {
                profilePicture: "vite.svg",
                nickname: "Gallucky",
            },
            createdAt: "23/11/2025",
            likes: 0,
        },
        {
            _id: "sdfsdfsdfds",
            content:
                "Sint mollit ipsum occaecat non elit voluptate incididunt nisi qui. Enim eu officia id eu qui ex incididunt. Excepteur ex officia sit aliqua aliquip laboris. Incididunt quis cupidatat Lorem sint veniam laboris consequat do eu in. Commodo non magna voluptate voluptate officia et sit. Nostrud reprehenderit voluptate ex esse minim nulla qui. Cillum irure tempor amet velit.",
            creator: {
                profilePicture: "vite.svg",
                nickname: "Gallucky",
            },
            createdAt: "23/11/2025",
            likes: 0,
        },
        {
            _id: "sdfsdfsdfds",
            content:
                "Sint mollit ipsum occaecat non elit voluptate incididunt nisi qui. Enim eu officia id eu qui ex incididunt. Excepteur ex officia sit aliqua aliquip laboris. Incididunt quis cupidatat Lorem sint veniam laboris consequat do eu in. Commodo non magna voluptate voluptate officia et sit. Nostrud reprehenderit voluptate ex esse minim nulla qui. Cillum irure tempor amet velit.",
            creator: {
                profilePicture: "vite.svg",
                nickname: "Gallucky",
            },
            createdAt: "23/11/2025",
            likes: 0,
        },
    ];

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
                                <ul>
                                    <li className="link active">Browse</li>
                                    <li className="link">My Boxes</li>
                                    <li className="link">
                                        Liked Boxes - Coming Soon!
                                    </li>
                                </ul>
                            </nav>
                        </aside>
                        <ScrollArea className="main">
                            {gratitudeBoxes &&
                                gratitudeBoxes.map((gratitudeBox) => (
                                    <GratitudeBox
                                        key={gratitudeBox._id}
                                        content={gratitudeBox.content}
                                        creator={gratitudeBox.creator}
                                        createdAt={gratitudeBox.createdAt}
                                        likes={gratitudeBox.likes}
                                    />
                                ))}
                        </ScrollArea>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Gratitude;
