exports.registerUser = async (rawUser) => {
    try {
        const { error } = validateRegistration(rawUser);

        if (error) {
            return Promise.reject(error);
        }

        let user = normalizeUser(rawUser);
        user.password = generateUserPassword(user.password);
        user = register(user);

        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.loginUser = async (user) => {};

exports.getUsers = async () => {};

exports.getUser = async (userId) => {};

exports.updateUser = async (userId, rawUser) => {};

exports.deleteUser = async (userId) => {};
