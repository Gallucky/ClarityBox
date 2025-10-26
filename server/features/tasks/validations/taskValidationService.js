const taskCreationValidation = require("./Joi/taskCreationValidation");
const taskUpdateValidation = require("./Joi/taskUpdateValidation");
const validator = process.env.VALIDATOR;

const validateTask = (post) => {
    if (validator === "Joi") {
        return taskCreationValidation(post);
    }
};

const validateTaskUpdate = (post) => {
    if (validator === "Joi") {
        return taskUpdateValidation(post);
    }
};

module.exports = { validateTask, validateTaskUpdate };
