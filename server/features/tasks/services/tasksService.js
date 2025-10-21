const {
    create,
    find,
    findOne,
    update,
    remove,
} = require("@/features/tasks/repositories/tasksRepository");
const {
    validateTask,
    validateTaskUpdate,
} = require("@/features/tasks/validations/taskValidationService");
const normalizeTask = require("@/features/tasks/helpers/normalizeTask");
const { handleJoiError } = require("@/utils/handleErrors");

//region | ====== Get ====== |

exports.getAllTasks = async () => {
    try {
        const tasks = await find();
        return Promise.resolve(tasks);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getTaskById = async (taskId) => {
    try {
        const task = await findOne(taskId);
        return Promise.resolve(task);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Get ====== |

//region | ====== Post ====== |

exports.createTask = async (rawTask, userId) => {
    try {
        const { error } = validateTask(rawTask);

        if (error) {
            return handleJoiError(error);
        }

        let task = normalizeTask(rawTask, userId);
        task = await create(task);
        return Promise.resolve(task);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Post ====== |

//region | ====== Put ====== |

exports.updateTask = async (taskId, rawTask) => {
    try {
        const { error } = validateTaskUpdate(rawTask);

        if (error) {
            return handleJoiError(error);
        }

        let task = normalizeTask(rawTask);
        task = await update(taskId, task);
        return Promise.resolve(task);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Put ====== |

//region | ====== Patch ====== |

//endregion | ====== Patch ====== |

//region | ====== Delete ====== |

exports.deleteTask = async (taskId) => {
    try {
        const task = await remove(taskId);
        return Promise.resolve(task);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Delete ====== |
