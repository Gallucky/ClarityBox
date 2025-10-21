const normalizeProject = (rawProject, userId) => {
    if (!rawProject) return null;

    return {
        ...rawProject,
        description: rawProject.description?.trim(),
        isPublic: rawProject.isPublic || false,
        createdBy: userId,
        likes: [],
    };
};

module.exports = normalizeProject;
