const normalizeTask = (rawTask, userId) => {
    if (!rawTask) return null;

    return {
        ...rawTask,
        description: rawTask.description?.trim(),
        isPublic: rawTask.isPublic,
        createdBy: userId,
        status: rawTask.status || "Pending",
        completedAt: rawTask.completedAt || null,
    };
};

module.exports = normalizeTask;
