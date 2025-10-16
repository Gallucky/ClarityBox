const { HTTP_CODES } = require("./accurateStatus");

class CustomError extends Error {
    constructor(message, name, status) {
        super(`[${name}]: ${message}`);
        this.name = name;
        this.status = status || HTTP_CODES.INTERNAL_SERVER_ERROR;
        Error.captureStackTrace(this, this.constructor);
    }
}

class AuthenticationError extends CustomError {
    constructor(message) {
        super(message, "Authentication Error", HTTP_CODES.UNAUTHORIZED);
    }
}

class AuthorizationError extends CustomError {
    constructor(message) {
        super(message, "Authorization Error", HTTP_CODES.FORBIDDEN);
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, "Not Found Error", HTTP_CODES.NOT_FOUND);
    }
}

class AlreadyExistsError extends CustomError {
    constructor(message) {
        super(message, "Already Exists Error", HTTP_CODES.CONFLICT);
    }
}

class ConflictError extends CustomError {
    constructor(message) {
        super(message, "Conflict Error", HTTP_CODES.CONFLICT);
    }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super(message, "Bad Request Error", HTTP_CODES.BAD_REQUEST);
    }
}

class ServerError extends CustomError {
    constructor(message) {
        super(message, "Server Error", HTTP_CODES.INTERNAL_SERVER_ERROR);
    }
}

class ConfigurationError extends CustomError {
    constructor(message) {
        super(message, "Configuration Error", HTTP_CODES.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    AlreadyExistsError,
    ConflictError,
    BadRequestError,
    ServerError,
    ConfigurationError,
};
