const normalizePost = (rawPost, userId) => {
    if (!rawPost) return null;

    return {
        content: rawPost.content?.trim(),
        isPublic: rawPost.isPublic,
        createdBy: userId,
    };
};

module.exports = normalizePost;
