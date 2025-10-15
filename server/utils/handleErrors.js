const chalk = require("chalk");
const currentDate = require("./timeStamp");
const getLocationFromErrorStack = require("./getLocationFormatted");

const handleWebError = (res, status, err) => {
    const message = err.message;
    const location = getLocationFromErrorStack(err.stack);
    let shownErrorMessage = `${currentDate()} [${location.file}] [Line: ${location.line}]`;
    const index = message ? message.toLowerCase().indexOf("error:") : -1;

    if (index !== -1) {
        shownErrorMessage += ` [${message.substring(0, index + 5)}]: ${message.substring(
            index + 7
        )}`;
    } else {
        shownErrorMessage += ": " + message;
    }

    console.error(chalk.redBright(shownErrorMessage));
    res.status(status || 500).send(message);
};

const handleBadRequest = async (validator, error) => {
    if (validator === "Joi") {
        let errorMessage = "[Joi Validation Error]: " + error.details[0].message;
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
    error.status = error.status || 400;

    return Promise.reject(error);
};

const handleJoiError = async (error) => {
    error.status = 400;
    return handleBadRequest("Joi", error);
};

module.exports = {
    handleWebError,
    handleBadRequest,
    handleJoiError,
};
