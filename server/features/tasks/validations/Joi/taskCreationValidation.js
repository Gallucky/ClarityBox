const Joi = require("joi");

const taskCreationValidation = (task) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required().messages({
            "string.base": "Task title must be a string",
            "string.empty": "Task title cannot be empty",
            "any.required": "Task title is required",
        }),
        description: Joi.string().max(500).allow("").messages({
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
        projectId: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                "string.pattern.base": "projectId must be a valid MongoDB ObjectId",
                "any.required": "projectId is required",
            }),
    });

    return schema.validate(task);
};

module.exports = taskCreationValidation;
