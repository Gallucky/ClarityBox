const express = require("express");
const router = express.Router();

// Requiring the projectsService methods.

const { auth } = require("@auth/authService");
const RouterLogger = require("@logger/loggers/customLogger");
const { handleWebError } = require("@utils/handleErrors");
const { responseOKContent, HTTP_CODES } = require("@/utils/accurateStatus");
const { AuthorizationError } = require("@/utils/customErrors");

//region | ------ Get ------ |

// Getting all projects - admin only.
router.get("/", auth, async (req, res) => {
    RouterLogger.get("Get all projects request has been received.", "GetAllProjects", new Error());

    try {
        const { isAdmin } = req.user;

        if (!isAdmin) {
            throw new AuthorizationError("Only admins can access all projects.");
        }

        const projects = await getAllProjects();
        const status = responseOKContent(projects);
        return res.status(status).send(projects);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting all public projects - Everyone.
router.get("/public", async (req, res) => {
    RouterLogger.get(
        `Get all public projects request has been received.`,
        "GetPublicProjects",
        new Error()
    );

    try {
        const projects = await getPublicProjects();
        const status = responseOKContent(projects);
        return res.status(status).send(projects);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting all of my projects - the user itself (could be admin getting their own projects).
router.get("/my-projects", auth, async (req, res) => {
    RouterLogger.get("Get my projects request has been received.", "GetMyProjects", new Error());
    const { _id } = req.user;

    try {
        const projects = await getUserProjects(_id);
        const status = responseOKContent(projects);
        return res.status(status).send(projects);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting all projects of a user by user id - the user itself or admin.
router.get("/user-projects/:id", auth, async (req, res) => {
    RouterLogger.get(
        "Get user projects request has been received.",
        "GetUserProjects",
        new Error()
    );
    const userId = req.params.id;
    const { _id, isAdmin } = req.user;

    try {
        if (String(_id) !== String(userId) && !isAdmin) {
            throw new AuthorizationError("Access Denied - Access is for the user and admin users!");
        }

        const projects = await getUserProjects(userId);
        const status = responseOKContent(projects);
        return res.status(status).send(projects);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Getting a project by id - Everyone can view public projects,
// the project owner/participants and admins can view private projects.
router.get("/:id", auth, async (req, res) => {
    RouterLogger.get("Get project by id request has been received.", "GetProjectById", new Error());

    try {
        const projectId = req.params.id;
        const { _id, isAdmin } = req.user;

        const project = await getProjectById(projectId, _id);
        const isUserProjectCreator = String(_id) === String(project.createdBy);

        // Non-MVP Edition/Feature:
        // const isUserProjectParticipant = project.participants.some(participantId =>
        //     String(participantId) === String(_id)
        // );
        if (!project.isPublic && !isUserProjectCreator && !isAdmin) {
            throw new AuthorizationError(
                "Access Denied - You must be the project owner/participant or an admin to view this private project!"
            );
        }

        const status = responseOKContent(project);
        return res.status(status).send(project);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Get ------ |

//region | ------ Post ------ |

// Creating a project - authenticated users.
router.post("/", auth, async (req, res) => {
    RouterLogger.post("Create project request has been received.", "CreateProject", new Error());

    try {
        const { _id } = req.user;
        const project = await createProject(req.body, _id);
        return res.status(HTTP_CODES.CREATED).send(project);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Post ------ |

//region | ------ Put ------ |

// Updating a project - only the project creator.
router.put("/:id", auth, async (req, res) => {
    RouterLogger.put("Update project request has been received.", "UpdateProject", new Error());

    try {
        const { _id } = req.user;
        const projectId = req.params.id;

        let project = await getProjectById(projectId);
        if (String(project.createdBy) !== String(_id)) {
            throw new AuthorizationError(
                "Access Denied - Only the project creator can update the project information."
            );
        }

        project = await updateProject(projectId, req.body, _id);
        const status = responseOKContent(project);
        return res.status(status).send(project);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Put ------ |

//region | ------ Patch ------ |

// Adding/Attaching a task to a project
router.patch("/:projectId/attach-task/:taskId", auth, async (req, res) => {
    RouterLogger.patch(
        "Adding/Creating task to project request has been received.",
        "AddTaskToProject",
        new Error()
    );

    try {
        const { _id } = req.user;
        const { projectId, taskId } = req.params.id;

        let project = await getProjectById(projectId);
        if (String(project.createdBy) !== String(_id)) {
            throw new AuthorizationError(
                "Access Denied - Only the project creator can update the project information."
            );
        }

        project = await addTaskToProject(projectId, taskId);
        return res.status(HTTP_CODES.CREATED).send(project);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Removing/Detaching a task from a project.
router.patch("/:projectId/detach-task/:taskId", auth, async (req, res) => {
    RouterLogger.patch(
        "Removing task from project request has been received.",
        "RemoveTaskFromProject",
        new Error()
    );

    try {
        const { _id } = req.user;
        const { projectId, taskId } = req.params.id;

        let project = await getProjectById(projectId);
        // Todo: Create a separate permission for project participants to remove tasks?
        // Todo: Create a helper function to check if the user has permission to continue...
        if (String(project.createdBy) !== String(_id)) {
            throw new AuthorizationError(
                "Access Denied - Only the project creator can update the project information."
            );
        }

        project = await removeTaskFromProject(projectId, taskId);
        return res.status(HTTP_CODES.CREATED).send(project);
    } catch (error) {
        handleWebError(res, error);
    }
});

// Can include non-MVP features such as:
// 1. Adding/Removing participants.
// 2. Changing project status (e.g., from active to completed).
// 3. Updating project visibility (public/private).
// 4. Managing project tags or categories.
// 5. Managing participant roles/permissions (e.g., viewer, editor).
// 6. Adding project milestones or deadlines.
// 7. Other partial updates to project details.

//endregion | ------ Patch ------ |

//region | ------ Delete ------ |

// Deleting a project - only the project creator or an admin user.
router.delete("/:id", auth, async (req, res) => {
    RouterLogger.delete("Delete project request has been received.", "DeleteProject", new Error());

    try {
        const { _id, isAdmin } = req.user;
        const projectId = req.params.id;
        const project = await getProjectById(projectId);

        if (String(project.createdBy) !== String(_id) && !isAdmin) {
            throw new AuthorizationError(
                "Access Denied - Only the project's creator or an admin user can delete the project."
            );
        }

        const deletedProject = await deleteProject(projectId);
        const status = responseOKContent(deletedProject);
        return res.status(status).send(deletedProject);
    } catch (error) {
        handleWebError(res, error);
    }
});

//endregion | ------ Delete ------ |
