const express = require("express");
const router = express.Router();
const { handleWebError } = require("@utils/handleErrors");
const usersController = require("@features/users/routes/usersController");
const postsController = require("@features/posts/routes/postsController");
const projectsController = require("@features/projects/routes/projectsController");
const tasksController = require("@features/tasks/routes/tasksController");

router.use("/users", usersController);
// router.use("/posts", postsController);
// router.use("/projects", projectsController);
// router.use("/tasks", tasksController);

// Not supported routes / non-existing routes - Error 404.
router.use((req, res) => handleWebError(res, 404, new Error("Route not found")));

// Exporting the wrapper router / routes level router.
module.exports = router;
