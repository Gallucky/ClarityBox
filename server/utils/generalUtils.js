const _ = require("lodash");

const normalizePost = require("@/features/posts/helpers/normalizePost");
const normalizeProject = require("@/features/projects/helpers/normalizeProject");
const normalizeTask = require("@/features/tasks/helpers/normalizeTask");
const normalizeUser = require("@/features/users/helpers/normalizeUser");

/**
  Utility function to check if an object is empty or matches the normalized structure
  for a specific controller.
  Parameters:
  @param {Object} obj - The object to check.
  @param {"tasks"|"projects"|"posts"|"users"} controllerName - The name of the controller to determine the normalization structure.
*/
const checkIfEmptyObject = (obj, controllerName) => {
    if (!obj || Object.keys(obj).length === 0 || controllerName === undefined) return true;

    switch (controllerName) {
        case "tasks":
            return _.isEqual(obj, normalizeTask({ projectId: obj.projectId }, obj.createdBy));
        case "projects":
            return _.isEqual(obj, normalizeProject({}, obj.createdBy));
        case "posts":
            return _.isEqual(obj, normalizePost({}, obj.createdBy));
        case "users":
            return _.isEqual(obj, normalizeUser({}));
        default:
            return false;
    }
};

module.exports = checkIfEmptyObject;
