import {
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    AlreadyExistsError,
    ConflictError,
    BadRequestError,
    ConfigurationError,
    ServerError,
} from "@errors/customErrors";
import ErrorCodes from "@utils/errorCodes";

const isError = (prefix: string) => {
    return (message: string) => message.startsWith(`[${prefix} Error]:`);
};

const isAuthenticationError = isError("Authentication");
const isAuthorizationError = isError("Authorization");
const isNotFoundError = isError("NotFound");
const isAlreadyExistsError = isError("AlreadyExists");
const isConflictError = isError("Conflict");
const isBadRequestError = isError("BadRequest");
const isServerError = isError("Server");
const isConfigurationError = isError("Configuration");

const parseError = (errorCode: number, message: string): Error => {
    switch (errorCode) {
        case ErrorCodes.UNAUTHORIZED:
            return new AuthenticationError(message);
        case ErrorCodes.FORBIDDEN:
            return new AuthorizationError(message);
        case ErrorCodes.NOT_FOUND:
            return new NotFoundError(message);
        case ErrorCodes.CONFLICT:
            return isAlreadyExistsError(message)
                ? new AlreadyExistsError(message)
                : new ConflictError(message);
        case ErrorCodes.BAD_REQUEST:
            return new BadRequestError(message);
        case ErrorCodes.INTERNAL_SERVER_ERROR:
            return isConfigurationError(message)
                ? new ConfigurationError(message)
                : new ServerError(message);
        default:
            return new Error(message);
    }
};

export {
    isAuthenticationError,
    isAuthorizationError,
    isNotFoundError,
    isAlreadyExistsError,
    isConflictError,
    isBadRequestError,
    isServerError,
    isConfigurationError,
    parseError,
};
