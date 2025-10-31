class ConfigurationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConfigurationError";
        this.message = `[Configuration Error]: ${message}`;
    }
}

export default ConfigurationError;
