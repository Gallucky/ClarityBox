/**
 * @constant
 * @namespace HTTP_CODES
 * @description
 * A frozen object containing standard HTTP status codes used across the API.
 * Each property represents a specific HTTP response type.
 */
const HTTP_CODES = Object.freeze({
    /**
     * Successful GET, PUT, PATCH, or DELETE request.
     */
    OK: 200,

    /**
     * Resource successfully created (POST).
     */
    CREATED: 201,

    /**
     * Request succeeded but there is no content to return.
     * Typically used for DELETE or empty GET responses.
     */
    NO_CONTENT: 204,

    /**
     * Invalid request syntax or failed validation.
     */
    BAD_REQUEST: 400,

    /**
     * Authentication required or provided token is invalid.
     */
    UNAUTHORIZED: 401,

    /**
     * Authenticated but does not have permission to access the resource.
     */
    FORBIDDEN: 403,

    /**
     * The requested resource could not be found.
     */
    NOT_FOUND: 404,

    /**
     * Conflict with the current resource state.
     * Commonly used for duplicate data entries.
     */
    CONFLICT: 409,

    /**
     * Request is well-formed but contains semantic errors.
     * Example: validation passes syntactically but logic fails.
     */
    UNPROCESSABLE_ENTITY: 422,

    /**
     * Generic server-side error or unexpected failure.
     */
    INTERNAL_SERVER_ERROR: 500,
});

/**
 * Returns an appropriate status code based on the contents of the response object or array.
 * @param {Object|Array} obj - The response data.
 * @returns {number} The appropriate HTTP status code.
 */
const responseOKContent = (obj) => {
    if (!obj) return HTTP_CODES.NOT_FOUND;

    if (Array.isArray(obj) && obj.length === 0) return HTTP_CODES.NO_CONTENT;

    if (typeof obj === "object" && Object.keys(obj).length === 0) return HTTP_CODES.NO_CONTENT;

    if (
        typeof obj === "object" &&
        Object.values(obj).every((v) => v === null || v === undefined || v === "")
    )
        return HTTP_CODES.NO_CONTENT;

    return HTTP_CODES.OK;
};

module.exports = { responseOKContent, HTTP_CODES };
