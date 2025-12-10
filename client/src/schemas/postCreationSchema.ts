import Joi from "joi";

const postCreationSchema = Joi.object({
    content: Joi.string()
        .min(2)
        .max(10000)
        .trim()
        .pattern(/^(?!\s*$).+/, { name: "non-empty" }) // Prevent whitespace-only content
        .messages({
            "string.empty": "Content is required",
            "string.min": "Content must be at least 2 characters long",
            "string.max": "Content must not exceed 10,000 characters",
            "string.pattern.name":
                "Content cannot be empty or contain only whitespace",
        })
        .required(),
    isPublic: Joi.boolean().default(false).messages({
        "boolean.base": "isPublic must be a boolean value",
    }),
});

export default postCreationSchema;
