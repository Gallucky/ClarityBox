const dotenv = require("dotenv");
const express = require("express");
const app = express();
const chalk = require("chalk");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const router = require("./router/router");
const { handleWebError } = require("./utils/handleErrors");
const Log = require("./logger/loggers/customLogger");

const getEnv = () => {
    return process.env.ENV === "production" ? ".env.production" : ".env.development";
};

// Global configuration.
dotenv.config({ path: ".env" });

// Environment-specific configuration (overrides global).
dotenv.config({ path: getEnv() });

// Middleware - App Level.
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

// Error Handler Middleware - Last in the chain.
app.use((err, req, res) => {
    handleWebError(res, err.status || 500, err.message);
});

// Server configurations.
const PORT = process.env.PORT;
app.listen(PORT, () => {
    Log.info(chalk.cyanBright(`\n${currentDate()} [server] Listening...`));
    // Todo: connect to DB here and add generate methods for initial data.
});
