const projectCreationValidation = require("./Joi/projectCreationValidation");
const projectUpdateValidation = require("./Joi/projectUpdateValidation");
const validator = process.env.VALIDATOR;

const validateProject = (project) => {
    if (validator === "Joi") {
        return projectCreationValidation(project);
    }
};

const validateProjectUpdate = (project) => {
    if (validator === "Joi") {
        return projectUpdateValidation(project);
    }
};

module.exports = { validateProject, validateProjectUpdate };
