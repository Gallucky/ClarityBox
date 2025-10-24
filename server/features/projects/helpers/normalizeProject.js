const normalizeProject = (rawProject, userId) => {
    if (!rawProject) return null;

    return {
        ...rawProject,
        name: rawProject.name?.trim() || "New Project",
        description: rawProject.description?.trim() || "",
        isPublic: rawProject.isPublic || false,
        createdBy: userId,
        likes: [],
    };
};

module.exports = normalizeProject;
