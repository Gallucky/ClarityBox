const winston = require("winston");
const { combine, timestamp, printf } = winston.format;
const chalk = require("chalk");
const getLocationFromErrorStack = require("@utils/getLocationFormatted");

// Defining custom log levels for the logger.
const customLevels = { error: -1, get: 0, post: 1, put: 2, patch: 3, delete: 4, info: 5 };

const RouteLoggerBase = winston.createLogger({
    levels: customLevels,
    format: combine(
        // Making sure that timestamp can be used
        // and it will be formatted based on
        // the format pattern bellow.
        timestamp({ format: "DD-MM-YYYY | HH:mm:ss" }),
        // This will use the different log data and will write
        // To the transports destinations in a structured way.
        printf(({ timestamp, level, message }) => {
            // Defining the default, starting, base color.
            let color = chalk.white;

            // Color coding based on the log level.
            switch (level) {
                case "get":
                    color = chalk.greenBright;
                    break;
                case "post":
                    color = chalk.yellowBright;
                    break;
                case "put":
                    color = chalk.blueBright;
                    break;
                case "patch":
                    color = chalk.hex("#ad84e6");
                    break;
                case "delete":
                    color = chalk.hex("#FF5719");
                    break;
                case "info":
                    color = chalk.cyan;
                    break;
                case "error":
                    color = chalk.redBright;
                    break;
                default:
                    color = chalk.white;
            }

            if (message.includes("[") && message.includes("]:"))
                return color(`[${timestamp}] [CustomLogger] [${level.toUpperCase()}] ${message}`);

            // The message to send.
            return color(`[${timestamp}] [CustomLogger] [${level.toUpperCase()}]: ${message}`);
        })
    ),

    // To where the log message will be sent to.
    transports: [new winston.transports.Console()],
});

/** An helper function that will construct the final log message based on the parameters:
 * @param level The log priority/level of the message. [Mandatory]
 * @param msg The message text itself. [Mandatory - Can be an empty string.]
 * @param routeName The name of the route or section from where the log message was called from. [Optional]
 * @param errLoc An error object created in the method call that it can get the location information/data from. [Optional - Without it the location will be unknown]
 */
const log = (level, msg, options = { routeName, errLoc, override }) => {
    const { routeName, errLoc, override, prefix } = options;

    if (override && prefix) return RouteLoggerBase.log(level, `[${prefix}]: ${msg}`);
    if (override) return RouteLoggerBase.log(level, msg);

    let stack;
    if (errLoc) stack = errLoc.stack;
    const location = getLocationFromErrorStack(stack);

    const logMessage = routeName
        ? `[${location.file} | ${routeName}] [Line: ${location.line}]: ${msg}`
        : `[${location.file}] [Line: ${location.line}]: ${msg}`;

    RouteLoggerBase.log(level, logMessage);
};

// Wrapping the logger.
// Making sure that there is room for the
// error object used to get the location from
// where the method was called and also
// avoiding logger levels inconsistencies.
const RouteLogger = {
    get: (msg, routeName, errLoc) => log("get", msg, { routeName, errLoc }),
    post: (msg, routeName, errLoc) => log("post", msg, { routeName, errLoc }),
    put: (msg, routeName, errLoc) => log("put", msg, { routeName, errLoc }),
    patch: (msg, routeName, errLoc) => log("patch", msg, { routeName, errLoc }),
    delete: (msg, routeName, errLoc) => log("delete", msg, { routeName, errLoc }),
    info: (msg, options = { routeName, errLoc: {}, override: false }) => log("info", msg, options),
    error: (msg, errLoc) => log("error", msg, { errLoc }),
};

module.exports = RouteLogger;
