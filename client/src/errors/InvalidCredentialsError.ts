class InvalidCredentialsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidCredentials";
        this.message = `[Invalid Credentials Error]: ${message}`;
    }
}

export default InvalidCredentialsError;
