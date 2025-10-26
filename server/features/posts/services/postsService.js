const {
    findOne,
    findPublicPosts,
    find,
    findByUserId,
    create,
    update,
    remove,
} = require("@features/posts/models/postsDataAccessService");
const {
    validatePost,
    validatePostUpdate,
} = require("@features/posts/validations/postValidationService");
const normalizePost = require("@features/posts/helpers/normalizePost");
const { handleJoiError } = require("@utils/handleErrors");

//region | ====== Get ====== |

exports.getPostById = async (postId) => {
    try {
        const post = await findOne(postId);
        return Promise.resolve(post);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getPublicPosts = async () => {
    try {
        const posts = await findPublicPosts();
        return Promise.resolve(posts);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getPosts = async () => {
    try {
        const posts = await find();
        return Promise.resolve(posts);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getUserPosts = async (userId) => {
    try {
        const posts = await findByUserId(userId);
        return Promise.resolve(posts);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Get ====== |

//region | ====== Post ====== |

exports.createPost = async (rawPost, userId) => {
    try {
        const { error } = validatePost(rawPost);

        if (error) {
            return handleJoiError(error);
        }

        let post = normalizePost(rawPost, userId);
        post = await create(post);
        return Promise.resolve(post);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Post ====== |

//region | ====== Put ====== |

exports.updatePost = async (postId, rawPost) => {
    try {
        const { error } = validatePostUpdate(rawPost);

        if (error) {
            return handleJoiError(error);
        }

        let post = normalizePost(rawPost);
        post = await update(postId, post);
        return Promise.resolve(post);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Put ====== |

//region | ====== Patch ====== |

//endregion | ====== Patch ====== |

//region | ====== Delete ====== |

exports.deletePost = async (postId) => {
    try {
        const post = await remove(postId);
        return Promise.resolve(post);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Delete ====== |
