const mongoose = require("mongoose");

/**
 * Safely checks equality between two ObjectIds or strings.
 * @param {string|ObjectId} id1
 * @param {string|ObjectId} id2
 * @returns {boolean}
 */
exports.areObjectIdsEqual = (id1, id2) => {
    if (!id1 || !id2) return false;
    try {
        return mongoose.Types.ObjectId(id1).equals(id2);
    } catch {
        return false;
    }
};

/**
 * Checks if a value is a valid ObjectId.
 * @param {string} id
 * @returns {boolean}
 */
exports.isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * Converts any valid id (string/ObjectId) to ObjectId safely.
 * @param {string|ObjectId} id
 * @returns {ObjectId|null}
 */
exports.toObjectId = (id) => {
    if (!isValidObjectId(id)) return null;
    return mongoose.Types.ObjectId(id);
};
