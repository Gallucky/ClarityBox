const {
    find,
    findOne,
    register,
    login,
    update,
    remove,
} = require("@features/users/models/usersDataAccessService");
const {
    validateRegistration,
    validateLogin,
    validateUserUpdate,
} = require("@features/users/validations/userValidationService");
const normalizeUser = require("@features/users/helpers/normalizeUser");
const { generateUserPassword } = require("@features/users/helpers/bcrypt");
const { handleJoiError } = require("@/utils/handleErrors");

//region | ====== Get ====== |

exports.getUsers = async () => {
    try {
        const users = await find();
        return Promise.resolve(users);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getUser = async (userId) => {
    try {
        const user = await findOne(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Get ====== |

//region | ====== Post ====== |

exports.registerUser = async (rawUser) => {
    try {
        const { error } = validateRegistration(rawUser);

        if (error) {
            return handleJoiError(error);
        }

        let user = normalizeUser(rawUser);
        user.password = generateUserPassword(user.password);
        user = await register(user);

        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.loginUser = async (user) => {
    try {
        const { error } = validateLogin(user);

        if (error) {
            return handleJoiError(error);
        }

        user = await login(user);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Post ====== |

//region | ====== Put ====== |

exports.updateUser = async (userId, rawUser) => {
    try {
        const { error } = validateUserUpdate(rawUser);

        if (error) {
            return handleJoiError(error);
        }

        let user = normalizeUser(rawUser);
        user = await update(userId, user);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Put ====== |

//region | ====== Patch ====== |

//endregion | ====== Patch ====== |

//region | ====== Delete ====== |

exports.deleteUser = async (userId) => {
    try {
        const user = await remove(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Delete ====== |
