const express = require("express");
const router = express.Router();

// Requiring the tasksService methods.
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require("@features/tasks/services/tasksService");

const { auth } = require("@auth/authService");
const RouterLogger = require("@logger/loggers/customLogger");
const { handleWebError } = require("@utils/handleErrors");
const { responseOKContent } = require("@/utils/accurateStatus");
const { AuthorizationError } = require("@/utils/customErrors");
const { areObjectIdsEqual } = require("@/utils/mongoUtils");

//region | ------ Get ------ |

// GetAllTasks route - admin only.
router.get("/", auth, async (req, res) => {
    RouterLogger.get(`Get all tasks request has been received.`, "GetAllTasks", new Error());

    try {
        const { isAdmin } = req.user;

        if (!isAdmin) {
            throw new AuthorizationError("You are not authorized to view all tasks.");
        }

        const tasks = await getAllTasks();
        const status = responseOKContent(tasks);
        return res.status(status).send(tasks);
    } catch (error) {
        handleWebError(res, error);
    }
});

// GetTask route - task creator or admin only for the MVP version.
router.get("/:id", auth, async (req, res) => {
    RouterLogger.get(`Get task by id request has been received.`, "GetTaskById", new Error());

    const taskId = req.params.id;
    const { _id: userId, isAdmin } = req.user;

    try {
        const task = await getTaskById(taskId);

        // Todo: Create a utility function for this check.
        // And later on extend it to include general permissions access checks.
        if (!areObjectIdsEqual(task.createdBy, userId) && !isAdmin) {
            throw new AuthorizationError("You are not authorized to view this task.");
        }

        const status = responseOKContent(task);
        return res.status(status).send(task);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Get ------ |

//region | ------ Post ------ |

// CreateTask route - any authenticated user.
router.post("/", auth, async (req, res) => {
    RouterLogger.post(`Create task request has been received.`, "CreateTask", new Error());

    const rawTask = req.body;
    const { _id: userId } = req.user;

    try {
        const task = await createTask(rawTask, userId);
        const status = responseOKContent(task);
        return res.status(status).send(task);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Post ------ |

//region | ------ Put ------ |

// UpdateTask route - task creator only.
router.put("/:id", auth, async (req, res) => {
    RouterLogger.put(`Update task request has been received.`, "UpdateTask", new Error());

    try {
        const { _id } = req.user;
        const taskId = req.params.id;
        const currentTask = await getTaskById(taskId);

        if (!areObjectIdsEqual(currentTask.createdBy, _id)) {
            throw new AuthorizationError(
                "Access Denied - Only the task's creator can update the task information."
            );
        }

        const task = await updateTask(taskId, req.body);
        const status = responseOKContent(task);
        return res.status(status).send(task);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Put ------ |

//region | ------ Patch ------ |

// MarkTaskAsCompleted route - task creator or admin only.
// For the MVP version, this route is not required to be implemented.

// RestoreTask route- task creator.
// For the MVP version, this route is not required to be implemented.

//endregion | ------ Patch ------ |

//region | ------ Delete ------ |

// DeleteTask route - task creator or admin only.
router.delete("/:id", auth, async (req, res) => {
    RouterLogger.delete(`Delete task request has been received.`, "DeleteTask", new Error());

    try {
        const { _id, isAdmin } = req.user;
        const taskId = req.params.id;
        const currentTask = await getTaskById(taskId);

        if (!areObjectIdsEqual(currentTask.createdBy, _id) && !isAdmin) {
            throw new AuthorizationError(
                "Access Denied - Only the task's creator or an admin user can delete the task."
            );
        }

        const task = await deleteTask(taskId);
        const status = responseOKContent(task);
        return res.status(status).send(task);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Delete ------ |

module.exports = router;
