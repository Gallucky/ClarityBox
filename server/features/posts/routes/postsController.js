const express = require("express");
const router = express.Router();

// Requiring the postsService methods.

const { auth } = require("@auth/authService");
const RouterLogger = require("@logger/loggers/customLogger");
const { handleWebError } = require("@utils/handleErrors");
const { responseOKContent } = require("@/utils/accurateStatus");
const { AuthorizationError } = require("@/utils/customErrors");

//region | ------ Get ------ |

// Getting all public posts - Everyone.
router.get("/public", async (req, res) => {
    RouterLogger.get(
        `Get all public posts request has been received.`,
        "GetPublicPosts",
        new Error()
    );

    try {
        // Todo: Implement getPublicPosts method.
        const posts = await getPublicPosts();
        const status = responseOKContent(posts);
        return res.status(status).send(posts);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting a post by id - Everyone if public or creator of the post or admin if private.
router.get("/:id", auth, async (req, res) => {
    RouterLogger.get("Get post by id request has been received.", "GetPostById", new Error());

    const postId = req.params.id;
    const { _id, isAdmin } = req.user;

    try {
        // Todo: Implement getPostById method.
        const post = await getPostById(postId);

        // Todo: Add !post.isPublic check...
        if (post.createdBy !== _id && !isAdmin) {
            throw new AuthorizationError(
                "Access Denied for user none other than the post's creator or admin users!"
            );
        }

        const status = responseOKContent(post);
        return res.status(status).send(post);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting all posts - admin.
router.get("/", auth, async (req, res) => {
    RouterLogger.get("Get all posts request has been received.", "GetPosts", new Error());
    try {
        // Todo: Create custom errors for the different scenarios.
        const { isAdmin } = req.user;

        if (!isAdmin) {
            throw new AuthorizationError("Access Denied for non admin users!");
        }

        // Todo: Implement getPosts method.
        const posts = await getPosts();
        const status = responseOKContent(posts);
        return res.status(status).send(posts);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting all of my posts - the user itself (could be admin getting their own posts).
router.get("/my-posts", auth, async (req, res) => {
    RouterLogger.get("Get my posts request has been received.", "GetMyPosts", new Error());
    const { _id } = req.user;

    try {
        // Todo: Implement getMyPosts method.
        const posts = await getMyPosts(_id);
        const status = responseOKContent(posts);
        return res.status(status).send(posts);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting all posts of a user by user id - the user itself or admin.
router.get("/user-posts/:id", auth, async (req, res) => {
    RouterLogger.get("Get user posts request has been received.", "GetUserPosts", new Error());
    const userId = req.params.id;
    const { _id, isAdmin } = req.user;

    try {
        if (_id !== userId && !isAdmin) {
            throw new AuthorizationError("Access Denied - Access is for the user and admin users!");
        }

        // Todo: Implement getUserPosts method.
        const posts = await getUserPosts(userId);
        const status = responseOKContent(posts);

        return res.status(status).send(posts);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Get ------ |

//region | ------ Post ------ |

router.post("/", auth, async (req, res) => {
    RouterLogger.post("Create post request has been received.", "CreatePost", new Error());

    try {
        const { _id } = req.user;
        const post = await createPost(req.body, _id);
        const status = responseOKContent(post);
        return res.status(status).send(post);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Post ------ |

//region | ------ Put ------ |

router.put("/:id", auth, async (req, res) => {
    RouterLogger.put("Update post request has been received.", "UpdatePost", new Error());

    try {
        const { _id } = req.user;
        const postId = req.params.id;
        const currentPost = await getPostById(postId);

        if (currentPost.createdBy !== _id) {
            throw new AuthorizationError(
                "Access Denied - Only the post's creator can update the post information."
            );
        }

        const post = await updatePost(postId, req.body);
        const status = responseOKContent(post);
        return res.status(status).send(post);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Put ------ |

//region | ------ Patch ------ |

//endregion | ------ Patch ------ |

//region | ------ Delete ------ |

router.delete("/:id", auth, async (req, res) => {
    RouterLogger.delete("Delete post request has been received.", "DeletePost", new Error());

    try {
        const { _id, isAdmin } = req.user;
        const postId = req.params.id;
        const currentPost = await getPostById(postId);

        if (currentPost.createdBy !== _id && !isAdmin) {
            throw new AuthorizationError(
                "Access Denied - Only the post's creator or an admin user can delete the post."
            );
        }

        const post = await deletePost(postId);
        const status = responseOKContent(post);
        return res.status(status).send(post);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Delete ------ |

module.exports = router;
