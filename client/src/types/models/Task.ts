export type Task = {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    projectId: string;
    completedAt: string;
    createdAt: string;
    updatedAt: string;
};
