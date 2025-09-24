const dotenv = require("dotenv");

const getEnv = () => {
    return process.env.ENV === "production" ? ".env.production" : ".env.development";
};

// Global configuration.
dotenv.config({ path: ".env" });

// Environment-specific configuration (overrides global).
dotenv.config({ path: getEnv() });
