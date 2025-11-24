import { ScrollArea } from "@radix-ui/react-scroll-area";
import GratitudeBox from "./components/GratitudeBox";

const Gratitude = () => {
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
                            {items.map((item) => (
                                <GratitudeBox key={item._id} {...item} />
                            ))}
                        </ScrollArea>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Gratitude;
