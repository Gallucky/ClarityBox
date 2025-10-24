const DB = process.env.DB;
const _ = require("lodash");
const Project = require("./mongodb/Project");
const { handleBadRequest } = require("@utils/handleErrors");
const { NotFoundError } = require("@/utils/customErrors");
const { areObjectIdsEqual } = require("@/utils/mongoUtils");
const normalizeProject = require("../helpers/normalizeProject");

//region | ###### Get ###### |

exports.findPublicProjects = async () => {
    if (DB === "MONGODB") {
        try {
            const publicProjects = await Project.find({ isPublic: true }, { __v: 0 });
            return Promise.resolve(publicProjects);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve([]);
};

exports.findOne = async (projectId) => {
    if (DB === "MONGODB") {
        try {
            const project = await Project.findById(projectId, { __v: 0 });

            if (!project) {
                throw new NotFoundError("Could not find this project in the database");
            }

            return Promise.resolve(project);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Not From MONGODB");
};

exports.findByUserId = async (userId) => {
    if (DB === "MONGODB") {
        try {
            const userProjects = await Project.find({ createdBy: userId }, { __v: 0 });
            return Promise.resolve(userProjects);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Not From MONGODB");
};

exports.find = async () => {
    if (DB === "MONGODB") {
        try {
            const projects = await Project.find({}, { __v: 0 });
            return Promise.resolve(projects);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve([]);
};

//endregion | ###### Get ###### |

//region | ###### Post ###### |

exports.create = async (project) => {
    if (DB === "MONGODB") {
        try {
            // Receiving the created project from the DB with added properties.
            let newProject = await Project(project);
            newProject = await newProject.save();

            // Removing the __v property from the object to be returned.
            newProject = _.omit(newProject, ["__v"]);

            return Promise.resolve(newProject);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Project created not in mongodb!");
};

//endregion | ###### Post ###### |

//region | ###### Put ###### |

exports.update = async (projectId, normalizedProject) => {
    if (DB === "MONGODB") {
        try {
            // If there is an empty object sent to update - no fields to update,
            // so we just return the current project object from the database.
            if (
                !normalizedProject ||
                _.isEqual(normalizedProject, normalizeProject({}, normalizedProject.createdBy))
            ) {
                return Project.findById(projectId).select("-__v");
            }

            // .select("-__v") to remove the __v property - another way like the _.omit method.
            const project = await Project.findByIdAndUpdate(projectId, normalizedProject, {
                new: true,
                omitUndefined: true, // prevents unsetting fields
                runValidators: true, // re-run schema validation
            }).select("-__v");

            if (!project) {
                throw new NotFoundError("Could not update this project in the database");
            }

            return Promise.resolve(project);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Project updated not in mongodb!");
};

//endregion | ###### Put ###### |

//region | ###### Patch ###### |

exports.addTask = async (projectId, taskId) => {
    if (DB === "MONGODB") {
        try {
            // Getting the current project object form the database.
            let project = await Project.findById(projectId);

            if (!project) {
                throw new NotFoundError("Could not find this project in the database");
            }

            // Adding the task to the project's tasks array
            // thus adding/attaching the task to the project.
            project.tasks.push(taskId);
            project = await project.save();

            // Removing the __v property from the object to be returned.
            project = _.omit(project, ["__v"]);

            return Promise.resolve(project);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Task added to the project not in mongodb!");
};

exports.removeTask = async (projectId, taskId) => {
    if (DB === "MONGODB") {
        try {
            // Getting the current project object form the database.
            let project = await Project.findById(projectId);

            if (!project) {
                throw new NotFoundError("Could not find this project in the database");
            }

            // Removing the task from the project's tasks array
            // thus removing/detaching the task from the project.
            project.tasks = project.tasks.filter(
                (indexTaskId) => !areObjectIdsEqual(indexTaskId, taskId)
            );
            project = await project.save();

            // Removing the __v property from the object to be returned.
            project = _.omit(project, ["__v"]);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Task removed from the project not in mongodb!");
};

//endregion | ###### Patch ###### |

//region | ###### Delete ###### |

exports.remove = async (projectId) => {
    if (DB === "MONGODB") {
        try {
            let project = await Project.findByIdAndDelete(projectId);
            project = _.omit(project, ["__v"]);
            return Promise.resolve(project);
        } catch (error) {
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Project deleted not in mongodb!");
};

//endregion | ###### Delete ###### |
