/**
 * This method will get an error stack.
 * For example:
 * new Error().stack
 * And based from where the new Error object was initialized/created
 * It will get and extract the location.
 * The method will return a location object
 * with the file name, line number and character number.
 * Using this method is a way to add a param to a function that will receive
 * a new error object and thus tracking from where the function was called from dynamically...
 */
const getLocationFromErrorStack = (errorStack) => {
    const unknown = { file: "unknown", line: "unknown", character: "unknown", stack: errorStack };
    if (!errorStack) return unknown;

    // Splitting the error stack by lines.
    const lines = errorStack.split("\n");
    // If the error stack only has one line, then we can't get the location.
    if (lines.length < 2) return unknown;

    // Getting the file name and line number.
    const locationLine = lines[1];
    // Getting the last segment of the file name.
    const lastSegment = locationLine.split(/[\\/]/).pop();
    // If the last segment is empty, then we can't get the location.
    if (!lastSegment) return unknown;

    // Removing the trailing ')'.
    const fileLineChar = lastSegment.replace(/\)$/, "");
    // Splitting the file name, line number and character number each as a part.
    const parts = fileLineChar.split(":");
    // If the parts length is less than 3, then we can't get the full location.
    if (parts.length < 3)
        return {
            file: parts[0] || "unknown",
            line: parts[1] || "unknown",
            character: parts[2] || "unknown",
            stack: errorStack,
        };

    // Returning the location object along with the error stack.
    return {
        file: parts[0],
        line: parts[1],
        character: parts[2],
        stack: errorStack,
    };
};

module.exports = getLocationFromErrorStack;
