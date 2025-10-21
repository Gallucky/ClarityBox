const Joi = require("joi");

const projectCreationValidation = (post) => {
    const schema = Joi.object({
        description: Joi.string().required().allow("").messages({
            "string.base": "Description must be a string",
            "any.required": "Description is required",
        }),
        isPublic: Joi.boolean().default(false),
    });

    return schema.validate(post);
};

module.exports = projectCreationValidation;
