const Joi = require("joi");

const projectCreationValidation = (post) => {
    const schema = Joi.object({
        name: Joi.string().max(100).allow("").messages({
            "string.base": "Name must be a string",
            "string.max": "Name must be at most 100 characters long",
            "any.required": "Name is required",
        }),
        description: Joi.string().allow("").messages({
            "string.base": "Description must be a string",
            "any.required": "Description is required",
        }),
        isPublic: Joi.boolean().default(false),
    });

    return schema.validate(post);
};

module.exports = projectCreationValidation;
