// Module alias configuration.
// This line allows the use of the @ prefixes and aliases in the project.
// Using the module alias package.
require("module-alias/register");
const dotenv = require("dotenv");

const getEnv = () => (process.env.ENV === "production" ? ".env.production" : ".env.development");

// Global configuration.
dotenv.config({ path: ".env" });

// Environment-specific configuration (overrides global).
dotenv.config({ path: getEnv() });

const express = require("express");
const app = express();
const Log = require("@logger/loggers/customLogger");

const cors = require("@middlewares/cors");
const logger = require("@logger/loggerService");
const router = require("@router/router");
const { handleWebError } = require("@utils/handleErrors");
const connectToDb = require("@DB/dbService");

// Middleware - App Level.
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

// Error Handler Middleware - Last in the chain.
app.use((err, req, res) => {
    handleWebError(res, err);
});

// Server configurations.
const PORT = process.env.PORT;
app.listen(PORT, () => {
    Log.info(`Listening...`, { override: true, prefix: "Server" });
    connectToDb();
    // Todo: connect to DB here and add generate methods for initial data.
});
