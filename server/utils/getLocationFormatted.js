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
    if (!errorStack) return { file: "unknown", line: "unknown", character: "unknown" };

    const locationBlocks = errorStack.split("\n")[1].split("\\");
    const locationFileLineCharacter = locationBlocks[locationBlocks.length - 1].split(")")[0];
    const locationFile = locationFileLineCharacter.split(":")[0];
    const locationLine = locationFileLineCharacter.split(":")[1];
    const locationCharacter = locationFileLineCharacter.split(":")[2];
    const location = {
        file: locationFile,
        line: locationLine,
        character: locationCharacter,
    };
    return location;
};

module.exports = getLocationFromErrorStack;
