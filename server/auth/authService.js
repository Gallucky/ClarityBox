const { AuthenticationError, ConfigurationError } = require("@/utils/customErrors");
const { verifyToken } = require("./Providers/jwt");
const { handleWebError } = require("@utils/handleErrors");
const { HTTP_CODES } = require("@utils/accurateStatus");

const tokenGenerator = process.env.TOKEN_GENERATOR;

/**
 * Express middleware to authenticate requests using JWT tokens.
 * It checks for the presence of a valid token in the 'x-auth-token' header.
 * If the token is valid, it attaches the decoded user data to req.user and calls next().
 * If the token is missing or invalid, it responds with a 401 Unauthorized error.
 */
const auth = async (req, res, next) => {
    try {
        // If the token generator is not set, return an error.
        if (!tokenGenerator) {
            throw new ConfigurationError(
                "TOKEN_GENERATOR environment variable is required for JWT authentication."
            );
        }

        const tokenFromClient = req.header("x-auth-token");

        // If no token is provided, return an authentication error.
        if (!tokenFromClient) {
            throw new AuthenticationError("Please Login/Authenticate");
        }

        // Verifying the token.
        const userData = verifyToken(tokenFromClient);
        if (!userData) {
            throw new AuthenticationError("Invalid/Expired Token or Unauthorized User");
        }

        req.user = userData;
        return next();
    } catch (error) {
        handleWebError(res, error, HTTP_CODES.UNAUTHORIZED);
    }
};

exports.auth = auth;
