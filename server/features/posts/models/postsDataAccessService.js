const DB = process.env.DB;
const _ = require("lodash");
const Post = require("./mongodb/Post");
const { handleBadRequest } = require("@utils/handleErrors");
const { NotFoundError } = require("@/utils/customErrors");

//region | ###### Get ###### |

exports.findOne = async (postId) => {
    if (DB === "MONGODB") {
        try {
            const post = await Post.findById(postId, {
                __v: 0,
            });

            if (!post) {
                throw new NotFoundError("Could not find this post in the database");
            }

            return Promise.resolve(post);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Not From MONGODB");
};

exports.findPublicPosts = async () => {
    if (DB === "MONGODB") {
        try {
            const posts = await Post.find({ isPublic: true }, { __v: 0 });
            return Promise.resolve(posts);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }

    return Promise.resolve([]);
};

exports.find = async () => {
    if (DB === "MONGODB") {
        try {
            const posts = await Post.find({}, { __v: 0 });
            return Promise.resolve(posts);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve([]);
};

exports.findByUserId = async (userId) => {
    if (DB === "MONGODB") {
        try {
            const posts = await Post.find({ createdBy: userId }, { __v: 0 });
            return Promise.resolve(posts);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Not From MONGODB");
};

//endregion | ###### Get ###### |

//region | ###### Post ###### |

exports.create = async (normalizedPost) => {
    if (DB === "MONGODB") {
        try {
            // Receiving the created post back with additional properties from the database.
            let newPost = await Post(normalizedPost);
            newPost = await newPost.save();

            // Removing the __v property from the object to be returned.
            newPost = _.omit(newPost, ["__v"]);

            // Returning the created card without the __v property.
            return Promise.resolve(newPost);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Post created not in mongodb!");
};

//endregion | ###### Post ###### |

//region | ###### Put ###### |

exports.update = async (postId, normalizedPost) => {
    if (DB === "MONGODB") {
        try {
            // If there is an empty object sent to update - no fields to update,
            // so we just return the current project object from the database.
            if (checkIfEmptyObject(normalizedPost, "posts")) {
                return this.findOne(postId);
            }
            const post = await Post.findByIdAndUpdate(postId, normalizedPost, {
                new: true,
            }).select("-__v");

            if (!post) {
                throw new NotFoundError(
                    "Could not update this post because a user with this ID cannot be found in the database"
                );
            }

            return Promise.resolve(post);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Post updated not in mongodb!");
};

//endregion | ###### Put ###### |

//region | ###### Patch ###### |

//endregion | ###### Patch ###### |

//region | ###### Delete ###### |

exports.remove = async (postId) => {
    if (DB === "MONGODB") {
        try {
            let post = await Post.findByIdAndDelete(postId);
            post = _.omit(post, ["__v"]);
            return Promise.resolve(post);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Post deleted not in mongodb!");
};

//endregion | ###### Delete ###### |
