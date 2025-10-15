const express = require("express");
const router = express.Router();

// Requiring the postsService methods.

const { auth } = require("@auth/authService");
const RouterLogger = require("@logger/loggers/customLogger");
const { handleWebError } = require("@utils/handleErrors");
const { responseArrayOKContent, responseObjectOKContent } = require("@/utils/accurateStatus");

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
        const status = responseArrayOKContent(posts);
        return res.status(status).send(posts);
    } catch (error) {
        return handleWebError(res, error.status, error);
    }
});

// Getting a post by id - Everyone if public or creator of the post or admin if private.
router.get("/:id", auth, async (req, res) => {
    RouterLogger.get("Get post by id request has been received.", "GetPostById", new Error());

    const postId = req.params.id;
    const { _id } = req.user;

    try {
        // Todo: Implement getPostById method.
        const post = await getPostById(postId, _id);
        const status = responseObjectOKContent(post);
        return res.status(status).send(post);
    } catch (error) {
        return handleWebError(res, error.status, error);
    }
});

// Getting all posts - admin.
router.get("/", auth, async (req, res) => {
    RouterLogger.get("Get all posts request has been received.", "GetPosts", new Error());
    try {
        // Todo: Create custom errors for the different scenarios.
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return handleWebError(
                res,
                403,
                new Error("[Authorization Error]: Access Denied for non admin users!")
            );
        }

        // Todo: Implement getPosts method.
        const posts = await getPosts();
        const status = responseArrayOKContent(posts);
        return res.status(status).send(posts);
    } catch (error) {
        return handleWebError(res, error.status, error);
    }
});

// Getting all of my posts - the user itself (could be admin getting their own posts).
router.get("/my-posts", auth, async (req, res) => {
    RouterLogger.get("Get my posts request has been received.", "GetMyPosts", new Error());
    const { _id } = req.user;

    try {
        // Todo: Implement getMyPosts method.
        const posts = await getMyPosts(_id);
        const status = responseArrayOKContent(posts);
        return res.status(status).send(posts);
    } catch (error) {
        return handleWebError(res, error.status, error);
    }
});

// Getting all posts of a user by user id - the user itself or admin.
router.get("/user-posts/:id", auth, async (req, res) => {
    RouterLogger.get("Get user posts request has been received.", "GetUserPosts", new Error());
    const userId = req.params.id;
    const { _id, isAdmin } = req.user;

    try {
        if (_id !== userId && !isAdmin) {
            return handleWebError(
                res,
                403,
                new Error(
                    "[Authorization Error]: Access Denied - Access is for the user and admin users!"
                )
            );
        }

        // Todo: Implement getUserPosts method.
        const posts = await getUserPosts(userId);
        const status = responseArrayOKContent(posts);

        return res.status(status).send(posts);
    } catch (error) {
        return handleWebError(res, error.status, error);
    }
});

//endregion | ------ Get ------ |

//region | ------ Post ------ |

//endregion | ------ Post ------ |

//region | ------ Put ------ |

//endregion | ------ Put ------ |

//region | ------ Patch ------ |

//endregion | ------ Patch ------ |

//region | ------ Delete ------ |

//endregion | ------ Delete ------ |
