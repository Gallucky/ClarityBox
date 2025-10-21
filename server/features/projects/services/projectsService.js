const {
    findPublicProjects,
    findOne,
    findByUserId,
    find,
    create,
    update,
    addTask,
    removeTask,
    remove,
} = require("@features/projects/models/projectsDataAccessService");
const {
    validateProject,
    validateProjectUpdate,
} = require("@features/projects/validations/projectValidations");
const normalizeProject = require("@features/projects/helpers/normalizeProject");
const { handleJoiError } = require("@utils/handleErrors");

//region | ====== Get ====== |

exports.getPublicProjects = async () => {
    try {
        const projects = await findPublicProjects();
        return Promise.resolve(projects);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getProjectById = async (projectId) => {
    try {
        const project = await findOne(projectId);
        return Promise.resolve(project);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getUserProjects = async (userId) => {
    try {
        const projects = await findByUserId(userId);
        return Promise.resolve(projects);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getAllProjects = async () => {
    try {
        const projects = await find();
        return Promise.resolve(projects);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Get ====== |

//region | ====== Post ====== |

exports.createProject = async (rawProject, userId) => {
    try {
        const { error } = validateProject(rawProject);

        if (error) {
            return handleJoiError(error);
        }

        let project = normalizeProject(rawProject, userId);
        project = await create(project);
        return Promise.resolve(project);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Post ====== |

//region | ====== Put ====== |

exports.updateProject = async (projectId, rawProject) => {
    try {
        const { error } = validateProjectUpdate(rawProject, true);

        if (error) {
            return handleJoiError(error);
        }

        let project = normalizeProject(rawProject);
        project = await update(projectId, project);
        return Promise.resolve(project);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Put ====== |

//region | ====== Patch ====== |

exports.addTaskToProject = async (projectId, taskId) => {
    try {
        const project = await addTask(projectId, taskId);
        return Promise.resolve(project);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.removeTaskFromProject = async (projectId, taskId) => {
    try {
        const project = await removeTask(projectId, taskId);
        return Promise.resolve(project);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Patch ====== |

//region | ====== Delete ====== |

exports.deleteProject = async (projectId) => {
    try {
        const project = await remove(projectId);
        return Promise.resolve(project);
    } catch (error) {
        return Promise.reject(error);
    }
};

//endregion | ====== Delete ====== |
