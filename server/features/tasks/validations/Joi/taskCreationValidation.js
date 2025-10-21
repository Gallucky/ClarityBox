const Joi = require("joi");

const taskCreationValidation = (task) => {
    const schema = Joi.object({
        description: Joi.string().required().allow("").messages({
            "string.base": "Task's description must be a string",
            "any.required": "Task's description is required",
        }),
        status: Joi.string()
            .valid("pending", "in-progress", "completed")
            .default("pending")
            .messages({
                "string.base": "Task's status must be a string",
                "any.only": "Task's status must be one of 'pending', 'in-progress', or 'completed'",
            }),
    });

    return schema.validate(task);
};

module.exports = taskCreationValidation;
