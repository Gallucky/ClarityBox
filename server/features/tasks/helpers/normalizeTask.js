const { BadRequestError } = require("@/utils/customErrors");

const normalizeTask = (rawTask, userId) => {
    if (!rawTask) return null;

    if (!rawTask.projectId) {
        throw new BadRequestError("projectId is required for task normalization");
    }

    const normalizedTask = {
        title: rawTask.title?.trim() || "Untitled Task",
        description: rawTask.description?.trim() || "",
        createdBy: userId,
        status: rawTask.status || "pending",
        projectId: rawTask.projectId,
    };

    // Adding completedAt only if the status is completed.
    if (rawTask.status === "completed") {
        normalizedTask.completedAt = rawTask.completedAt || new Date();
    }

    return normalizedTask;
};

module.exports = normalizeTask;
