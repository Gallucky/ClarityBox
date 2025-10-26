const Joi = require("joi");

const postCreationValidation = (post) => {
    const schema = Joi.object({
        content: Joi.string().required().messages({
            "string.base": "Content must be a string",
            "string.empty": "Content cannot be empty",
            "any.required": "Content is required",
        }),
        isPublic: Joi.boolean().default(false),
    });

    return schema.validate(post);
};

module.exports = postCreationValidation;
