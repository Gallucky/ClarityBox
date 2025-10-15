/**
 * Returns an appropriate status code based on the contents of the data response array.
 * @param {array} array - The response data array.
 * @returns {number} - The appropriate status code.
 */
const responseArrayOKContent = (array) => {
    if (!array) {
        return 404;
    }

    if (array.length === 0) {
        return 204;
    }

    return 200;
};

/**
 * Returns an appropriate status code based on the contents of the data response array.
 * @param {Object} obj - The response data array.
 * @returns {number} - The appropriate status code.
 */
const responseObjectOKContent = (obj) => {
    if (!obj) {
        return 404;
    }

    if (obj.length === 0) {
        return 204;
    }

    return 200;
};

module.exports = { responseArrayOKContent, responseObjectOKContent };
