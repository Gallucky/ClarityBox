class InvalidTokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidTokenError";
        this.message = `[Invalid Token Error]: ${message}`;
    }
}

export default InvalidTokenError;
