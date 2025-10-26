const chalk = require("chalk");
const currentDate = require("./timeStamp");
const getLocationFromErrorStack = require("./getLocationFormatted");
const { HTTP_CODES } = require("./accurateStatus");

/**
 * This method will handle errors that occur in the web layer.
 * It will log the error to the console and send the error message to the client.
 * @param {Object} res The response object of the request.
 * @param {Error} err The error object.
 * @param {number|undefined|null} status The status code of the error.
 */
const handleWebError = (res, err, status) => {
    const message = err.message;
    const location = getLocationFromErrorStack(err.stack);
    const shownErrorMessage = `${currentDate()} [handleWebError] [${location.file}] [Line: ${
        location.line
    }] ${message}`;

    // Show the error message in the console.
    console.error(chalk.redBright(shownErrorMessage));

    // If provided a status code apply it.
    // If not provided then apply the status code from the error object.
    // If all else fails apply the internal server error status code (500).
    res.status(status || err.status || HTTP_CODES.INTERNAL_SERVER_ERROR).send(message);
};

const handleBadRequest = async (validator, error) => {
    if (validator === "Joi") {
        const errorMessage = "[Joi Validation Error]: " + error.details[0].message;
        error.message = errorMessage;
        return Promise.reject(error);
    }

    let errorMessage = error.message;
    if (errorMessage.includes("[") && errorMessage.includes("]:")) {
        errorMessage = errorMessage.substring(1);
        errorMessage = "[" + validator + " - " + errorMessage;
    } else if (errorMessage.includes(": ")) {
        errorMessagePrefix = errorMessage.substring(0, errorMessage.indexOf(": ")) + "]: ";
        errorMessage = errorMessage.substring(errorMessage.indexOf(": ") + 2);
        errorMessage = "[" + validator + " - " + errorMessagePrefix + errorMessage;
    } else {
        errorMessage = "[" + validator + " Error]: " + error.message;
    }

    error.message = errorMessage;
    error.status = error.status || HTTP_CODES.BAD_REQUEST;

    return Promise.reject(error);
};

const handleJoiError = async (error) => {
    error.status = HTTP_CODES.BAD_REQUEST;
    return handleBadRequest("Joi", error);
};

module.exports = {
    handleWebError,
    handleBadRequest,
    handleJoiError,
};
