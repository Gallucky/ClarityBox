const jwt = require("jsonwebtoken");
const key = process.env.TOKEN_SECRET_KEY;
const tokenValidationPeriod = process.env.TOKEN_VALID_DURATION;
const Log = require("@logger/loggers/customLogger");

/**
 * Validates that all required environment variables for JWT token signing are defined.
 * Throws an error if any required variable is missing.
 *
 * @throws {Error} If TOKEN_SECRET_KEY or TOKEN_VALID_DURATION environment variables are not set.
 */
const validateRequiredEnvVars = () => {
    // A secret key is required to sign the token and must be defined in the .env file.
    if (!key) {
        throw new Error("TOKEN_SECRET_KEY environment variable is required to sign tokens.");
    }

    // A duration for token to stay valid is also required.
    if (!tokenValidationPeriod) {
        throw new Error(
            "TOKEN_VALID_DURATION environment variable is required to set token expiration and to sign tokens."
        );
    }
};
/**
 * Generates a JWT token for the given user.
 *
 * @param {object} user
 * The user object for whom the token is to be generated.
 * Must contain _id and isAdmin properties.
 * @returns {string} The generated JWT token.
 * @throws {Error} If required environment variables are not set.
 */
const generateAuthToken = (user) => {
    // Checking if the required environment variables are set.
    // If not, an error will be thrown.
    validateRequiredEnvVars();

    const { _id, isAdmin } = user;
    const token = jwt.sign({ _id, isAdmin }, key, { expiresIn: tokenValidationPeriod });
    return token;
};

/**
 * Verifies the given JWT token and returns the decoded user data if valid.
 *
 * @param {string} token - The JWT token to be verified.
 */
const verifyToken = (token) => {
    // Checking if the required environment variables are set.
    // If not, an error will be thrown.
    validateRequiredEnvVars();

    try {
        const userData = jwt.verify(token, key);
        return userData;
    } catch (error) {
        Log.error(error.message, new Error());
        return null;
    }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
