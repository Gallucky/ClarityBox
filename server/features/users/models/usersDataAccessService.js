const { comparePassword } = require("@features/users/helpers/bcrypt");
const { handleBadRequest } = require("@utils/handleErrors");
const { generateAuthToken } = require("@auth/Providers/jwt");
const User = require("./mongodb/User");
const _ = require("lodash");
const {
    NotFoundError,
    AuthenticationError,
    AuthorizationError,
    AlreadyExistsError,
} = require("@/utils/customErrors");
const DB = process.env.DB;

//region | ###### Get ###### |

exports.find = async () => {
    if (DB === "MONGODB") {
        try {
            const users = await User.find(
                {},
                {
                    password: 0,
                    __v: 0,
                }
            );

            return Promise.resolve(users);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve([]);
};

exports.findOne = async (userId) => {
    if (DB === "MONGODB") {
        try {
            const user = await User.findById(userId, {
                password: 0,
                __v: 0,
            });

            if (!user) {
                throw new NotFoundError("Could not find this user in the database");
            }

            return Promise.resolve(user);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Not From MONGODB");
};

//endregion | ###### Get ###### |

//region | ###### Post ###### |

exports.register = async (normalizedUser) => {
    if (DB === "MONGODB") {
        try {
            const { email } = normalizedUser;
            let user = await User.findOne({ email });

            if (user) {
                throw new AlreadyExistsError("User is already registered");
            }

            nicknameTaken = await User.findOne({ nickname: normalizedUser.nickname });
            if (nicknameTaken) {
                throw new AlreadyExistsError("Nickname is already taken");
            }

            user = await User(normalizedUser);
            user = await user.save();
            user = _.pick(user, ["_id", "name", "email"]);
            return Promise.resolve(user);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("User created not in mongodb!");
};

exports.login = async (normalizedUser) => {
    if (DB === "MONGODB") {
        try {
            const { email, password } = normalizedUser;
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("There is no user with this email.");
            }

            // Checking if the user is blocked.
            if (user.blocked) {
                // Unblocking user after 24 hours.
                const BLOCK_DURATION_HOURS = 24;
                const now = new Date();
                if (
                    user.lastBlockedAt &&
                    now - user.lastBlockedAt > BLOCK_DURATION_HOURS * 60 * 60 * 1000
                ) {
                    user.blocked = false;
                    user.strikes = 0;
                    await user.save();
                } else {
                    throw new AuthorizationError("The user is blocked. Try again later.");
                }
            }

            const validPassword = comparePassword(password, user.password);

            if (!validPassword) {
                // Add strike.
                user.strikes = (user.strikes || 0) + 1;

                // If the strikes is equal or greater than the threshold then blocking the user.
                const STRIKES_THRESHOLD = 3;
                if (user.strikes >= STRIKES_THRESHOLD) {
                    user.blocked = true;
                    user.lastBlockedAt = new Date();

                    await user.save();

                    throw new AuthenticationError("Invalid Password");
                }
                await user.save();
            } else {
                // Resetting strikes on successful login!
                user.strikes = 0;
                await user.save();
            }

            const token = generateAuthToken(user);
            return Promise.resolve(token);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("User logged-in not using mongodb!");
};

//endregion | ###### Post ###### |

//region | ###### Put ###### |

exports.update = async (userId, normalizedUser) => {
    if (DB === "MONGODB") {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $set: normalizedUser },
                { new: true }
            ).select("-password -__v");

            if (!user) {
                throw new NotFoundError(
                    "Could not update this user because a user with this ID cannot be found in the database"
                );
            }

            return Promise.resolve(user);
        } catch (error) {
            return handleBadRequest("mongoose", error);
        }
    }
    return Promise.resolve("User updated not in mongodb");
};

//endregion | ###### Put ###### |

//region | ###### Patch ###### |

//endregion | ###### Patch ###### |

//region | ###### Delete ###### |

exports.remove = async (userId) => {
    if (DB === "MONGODB") {
        try {
            const user = await User.findOneAndDelete({ _id: userId }).select("-password -__v");

            if (!user) {
                throw new NotFoundError(
                    "Could not delete this user because a user with this ID cannot be found in the database"
                );
            }

            return Promise.resolve(user);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("User deleted not in mongodb!");
};

//endregion | ###### Delete ###### |
