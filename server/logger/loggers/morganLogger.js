const chalk = require("chalk");
const morgan = require("morgan");
const currentDate = require("../../utils/timeStamp");
const fs = require("fs");
const { appendFile } = fs.promises;

const logger = morgan((tokens, req, res) => {
    const logMessage =
        [
            currentDate(),
            tokens.method(req, res),
            "- url:",
            tokens.url(req, res),
            "| status:",
            tokens.status(req, res),
            "response time:",
            `${tokens["response-time"](req, res)}ms`,
        ].join(" ") + "\n";

    if (res.statusCode >= 400) {
        appendFile("./logger/loggers/errors.log", logMessage).catch((err) => {
            console.error(
                `[${currentDate()}] [MorganLogger]: Failed to write error to log file...\nError:\n${err}`
            );
        });
        return chalk.redBright(logMessage);
    } else {
        return chalk.cyanBright(logMessage);
    }
});

module.exports = logger;
