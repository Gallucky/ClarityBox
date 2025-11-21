class RequestError extends Error {
    rawMessage: string;
    location: string;
    method: string;
    errorThrown?: Error;

    constructor(
        location: string,
        method: string,
        message: string,
        error?: Error,
    ) {
        super(`[RequestError] @${location} - ${method}: ${message}`);
        this.name = "RequestError";
        this.rawMessage = message;
        this.location = location;
        this.method = method;
        this.errorThrown = error;
    }
}

class UserRequestError extends RequestError {
    constructor(method: string, message: string, error?: Error) {
        super("useUsers hook", method, message, error);
        this.name = "UserRequestError";
    }
}

class PostRequestError extends RequestError {
    constructor(method: string, message: string, error?: Error) {
        super("usePosts hook", method, message, error);
        this.name = "PostRequestError";
    }
}

class ProjectRequestError extends RequestError {
    constructor(method: string, message: string, error?: Error) {
        super("useProjects hook", method, message, error);
        this.name = "ProjectRequestError";
    }
}

class TaskRequestError extends RequestError {
    constructor(method: string, message: string, error?: Error) {
        super("useTasks hook", method, message, error);
        this.name = "TaskRequestError";
    }
}

export {
    UserRequestError,
    PostRequestError,
    ProjectRequestError,
    TaskRequestError,
};
