const { verifyToken } = require("./Providers/jwt");
const { handleWebError } = require("@utils/handleErrors");

const tokenGenerator = process.env.TOKEN_GENERATOR;

/**
 * Express middleware to authenticate requests using JWT tokens.
 * It checks for the presence of a valid token in the 'x-auth-token' header.
 * If the token is valid, it attaches the decoded user data to req.user and calls next().
 * If the token is missing or invalid, it responds with a 401 Unauthorized error.
 */
const auth = async (req, res, next) => {
    // If the token generator is not set, return an error.
    if (!tokenGenerator) {
        const err = new Error(
            "TOKEN_GENERATOR environment variable is required for JWT authentication."
        );
        return handleWebError(res, 500, err);
    }

    try {
        const tokenFromClient = req.header("x-auth-token");

        // If no token is provided, return an authentication error.
        if (!tokenFromClient) {
            throw new Error("[Authentication Error]: Please Login/Authenticate");
        }

        // Verifying the token.
        const userData = verifyToken(tokenFromClient);
        if (!userData) {
            throw new Error("[Authentication Error]: Invalid/Expired Token or Unauthorized User");
        }

        req.user = userData;
        return next();
    } catch (error) {
        return handleWebError(res, 401, error);
    }
};

exports.auth = auth;
