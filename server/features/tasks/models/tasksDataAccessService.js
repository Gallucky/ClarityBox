const DB = process.env.DB;
const _ = require("lodash");
const Task = require("./mongodb/Task");
const { handleBadRequest } = require("@utils/handleErrors");
const { NotFoundError } = require("@/utils/customErrors");
const normalizeTask = require("../helpers/normalizeTask");
const checkIfEmptyObject = require("@/utils/generalUtils");

//region | ###### Get ###### |

exports.findOne = async (taskId) => {
    if (DB === "MONGODB") {
        try {
            const task = await Task.findById(taskId, {
                __v: 0,
            });

            if (!task) {
                throw new NotFoundError("Could not find this task in the database");
            }

            return Promise.resolve(task);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Not From MONGODB");
};

exports.find = async () => {
    if (DB === "MONGODB") {
        try {
            const tasks = await Task.find({}, { __v: 0 });
            return Promise.resolve(tasks);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve([]);
};

//endregion | ###### Get ###### |

//region | ###### Post ###### |

exports.create = async (task) => {
    if (DB === "MONGODB") {
        try {
            // Receiving the created task back with additional properties from the database.
            let newTask = await Task.create(task);
            newTask = await newTask.save();

            // Removing the __v property from the object to be returned.
            newTask = _.omit(newTask.toObject(), ["__v"]);

            // Returning the created task without the __v property.
            return Promise.resolve(newTask);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Task created not in mongodb!");
};

//endregion | ###### Post ###### |

//region | ###### Put ###### |

exports.update = async (taskId, normalizedTask) => {
    if (DB === "MONGODB") {
        try {
            // If there is an empty object sent to update - no fields to update,
            // so we just return the current project object from the database.
            if (checkIfEmptyObject(normalizedTask, "tasks")) {
                return this.findOne(taskId);
            }

            const updatedTask = await Task.findByIdAndUpdate(taskId, normalizedTask, {
                new: true,
                omitUndefined: true, // prevents unsetting fields
                runValidators: true, // re-run schema validation
            }).select("-__v"); // same as _.omit(["__v"]);

            if (!updatedTask) {
                throw new NotFoundError("Could not find the task to update in the database");
            }

            return Promise.resolve(updatedTask);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Task updated not in mongodb!");
};

//endregion | ###### Put ###### |

//region | ###### Patch ###### |

//endregion | ###### Patch ###### |

//region | ###### Delete ###### |

exports.remove = async (taskId) => {
    if (DB === "MONGODB") {
        try {
            let deletedTask = await Task.findByIdAndDelete(taskId);
            deletedTask = _.omit(deletedTask, ["__v"]);
            return Promise.resolve(deletedTask);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Task deleted not in mongodb!");
};

//endregion | ###### Delete ###### |
