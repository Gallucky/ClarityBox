import ErrorCodes from "@utils/errorCodes";

class CustomError extends Error {
    status: number;
    rawMessage: string;

    constructor(message: string, name: string, status: number) {
        super(message.substring(message.indexOf("]:") + 2));
        this.name = name;
        this.rawMessage = message;
        this.status = status || ErrorCodes.INTERNAL_SERVER_ERROR;
    }
}

class AuthenticationError extends CustomError {
    constructor(message: string) {
        super(message, "Authentication Error", ErrorCodes.UNAUTHORIZED);
    }
}

class AuthorizationError extends CustomError {
    constructor(message: string) {
        super(message, "Authorization Error", ErrorCodes.FORBIDDEN);
    }
}

class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, "Not Found Error", ErrorCodes.NOT_FOUND);
    }
}

class AlreadyExistsError extends CustomError {
    constructor(message: string) {
        super(message, "Already Exists Error", ErrorCodes.CONFLICT);
    }
}

class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, "Conflict Error", ErrorCodes.CONFLICT);
    }
}

class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, "Bad Request Error", ErrorCodes.BAD_REQUEST);
    }
}

class ServerError extends CustomError {
    constructor(message: string) {
        super(message, "Server Error", ErrorCodes.INTERNAL_SERVER_ERROR);
    }
}

class ConfigurationError extends CustomError {
    constructor(message: string) {
        super(message, "Configuration Error", ErrorCodes.INTERNAL_SERVER_ERROR);
    }
}

export {
    CustomError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    AlreadyExistsError,
    ConflictError,
    BadRequestError,
    ServerError,
    ConfigurationError,
};
