const normalizePost = (rawPost, userId) => {
    if (!rawPost) return null;

    return {
        ...rawPost,
        content: rawPost.content?.trim(),
        isPublic: rawPost.isPublic,
        createdBy: userId,
    };
};

module.exports = normalizePost;
