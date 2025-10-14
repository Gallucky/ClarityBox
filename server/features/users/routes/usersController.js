const express = require("express");
const router = express.Router();

// Requiring the usersService methods.

const { auth } = require("@auth/authService");
const RouterLogger = require("@logger/loggers/customLogger");
const { handleWebError } = require("@utils/handleErrors");

//region | ------ Get ------ |

/**
 * Route: GetUsers
 *
 * Defining the start of the route that will return all the users in the database.
 *
 * Receives:
 * None.
 *
 * Response:
 * @returns an array of user objects each containing the data / information of the user.
 *
 * Requirements:
 * 1. Be an authenticated user.
 * 2. Be a user with admin permissions.
 *
 * @throws {Error} If the requirements are not met or an unexpected error occurred.
 * @see {@link |Docs} for more information.
 */
router.get("/", auth, async (req, res) => {
    RouterLogger.get("Get all users request has been received.", "GetUsers", new Error());

    try {
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return handleWebError(
                res,
                403,
                new Error("[Authorization Error]: Access Denied for non admin users!")
            );
        }

        const users = await getUsers();
        return res.send(users);
    } catch (error) {
        return handleWebError(res, 500, error);
    }
});

// Extra Feature: Grant access to any registered and authenticated user but limit response data.

/**
 * Route: GetUser
 *
 * Defining the start of the route that will receive an
 * id and will return the information of the user with said id.
 *
 * Receives:
 * An id of a user to get it's data information.
 *
 * Response:
 * @returns the user's data as an formatted object.
 * @see {@link |Docs} for more information.
 *
 * Requirements:
 * 1. Be an authenticated user.
 * 2. Be a user with said id or be a user with admin permissions.
 *
 * @throws {Error} If the requirements are not met or an unexpected error occurred.
 */
router.get("/:id", auth, async (req, res) => {
    const id = req.params.id;
    RouterLogger.get(`Get user by id request has been received.`, "GetUserById", new Error());

    try {
        const { _id, isAdmin } = req.user;
        if (_id !== id && !isAdmin) {
            return handleWebError(
                res,
                403,
                new Error(
                    "[Authorization Error]: Access Denied - Access is for the user and admin users!"
                )
            );
        }

        const user = await getUser(id);
        return res.send(user);
    } catch (error) {
        return handleWebError(res, 500, error);
    }
});

//endregion | ------ Get ------ |

//region | ------ Post ------ |

/**
 * Route: Register
 *
 * Defining the start of the route that will register a new user.
 *
 * Receives:
 * User object data in the request body.
 *
 * Response:
 * @returns an updated user object data with additional properties / attributes.
 *
 * Requirements:
 * Sending a valid user object in the request body.
 * @see {@link |Docs} for more information about the user object's structure.
 *
 * @throws {Error} If the requirements are not met or an unexpected error occurred.
 */
router.post("/", async (req, res) => {
    RouterLogger.post("Register request has been received.", "RegisterUser", new Error());

    try {
        const user = await registerUser(req.body);
        return res.status(201).send(user);
    } catch (error) {
        return handleWebError(res, 500, error);
    }
});

/**
 * Route: Login
 *
 * Defining the start of the route that will login a user,
 * in other words grants the user access to the site with his/her account.
 *
 * Receives:
 * An object containing the email and password of the user's account.
 *
 * Response:
 * @returns a 200 OK Response with a success message.
 *
 * Requirements:
 * Sending an object in the request body with said object containing email + password.
 * @see {@link |Docs} for more information.
 *
 * @throws {Error} If the requirements are not met or an unexpected error occurred.
 */
router.post("/login", async (req, res) => {
    RouterLogger.post("Login request has been received.", "LoginUser", new Error());

    try {
        const user = await loginUser(req.body);
        return res.send(user);
    } catch (error) {
        return handleWebError(res, 500, error);
    }
});

//endregion | ------ Post ------ |

//region | ------ Put ------ |

// Extra Feature: Allow admin users to change/edit some of the user's information.

/**
 * Route: UpdateUser
 *
 * Defining the start of the route that will update a users data.
 *
 * Receives:
 * User object data to set.
 *
 * Response:
 * @returns a 200 OK Response with a success message.
 *
 * Requirements:
 * 1. Sending a valid user object to set at the request body.
 * 2. Be a user with said id.
 * @see {@link |Docs} for more information about the user object's structure.
 *
 * @throws {Error} If the requirements are not met or an unexpected error occurred.
 */
router.put("/:id", auth, async (req, res) => {
    const id = req.params.id;
    RouterLogger.put(`Update user by id request has been received.`, "UpdateUser", new Error());

    try {
        const { _id } = req.user;
        if (_id !== id) {
            return handleWebError(
                res,
                403,
                new Error(
                    "[Authorization Error]: Access Denied - Only the user can update his/her information."
                )
            );
        }
        const user = await updateUser(id, req.body);
        return res.send(user);
    } catch (error) {
        return handleWebError(res, 500, error);
    }
});

//endregion | ------ Put ------ |

//region | ------ Patch ------ |

// Todo: To think about patch related requests and if it is necessary / can be included in the MVP.
// 1) Allow admin users to block/ban a user.

//endregion | ------ Patch ------ |

//region | ------ Delete ------ |

/**
 * Route: DeleteUser
 *
 * Defining the start of the route that will update a users data.
 *
 * Receives:
 * The user's id to delete.
 *
 * Response:
 * @returns the deleted user's object data.
 *
 * Requirements:
 * 1. Be an authenticated user.
 * 2. Be a user with said id or be a user with admin permissions.
 * @see {@link |Docs} for more information about the user object's structure.
 *
 * @throws {Error} If the requirements are not met or an unexpected error occurred.
 */
router.delete("/:id", auth, async (req, res) => {
    const id = req.params.id;
    RouterLogger.delete(`Delete user by id request has been received.`, "DeleteUser", new Error());

    try {
        const { _id, isAdmin } = req.user;
        if (_id !== id && !isAdmin) {
            return handleWebError(
                res,
                403,
                new Error(
                    "[Authorization Error]: Access Denied - Only the given user or an admin user can delete this user's account."
                )
            );
        }
        const user = await deleteUser(id);
        return res.send(user);
    } catch (error) {
        return handleWebError(res, 500, error);
    }
});

//endregion | ------ Delete ------ |

// Exporting the router including all the routes related to the users.
module.exports = router;
