/* eslint-disable no-useless-escape */
const Joi = require("joi");

const registerValidation = (user) => {
    const emailRegex = /^([a-zA-Z0-9_.\-]+)@([a-zA-Z0-9_.\-]+)\.([a-zA-Z]{2,5})$/;
    const passwordRegex = /^(?=.{9,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\-&\^%$#@!]).+$/;
    const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/;

    const schema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(2).max(256).required().messages({
                "string.base": "First name must be a string",
                "string.empty": "First name cannot be empty",
                "string.min": "First name must be at least 2 characters",
                "string.max": "First name cannot exceed 256 characters",
                "any.required": "First name is required",
            }),
            middle: Joi.string().min(2).max(256).allow("").messages({
                "string.min": "Middle name must be at least 2 characters",
                "string.max": "Middle name cannot exceed 256 characters",
            }),
            last: Joi.string().min(2).max(256).required().messages({
                "string.base": "Last name must be a string",
                "string.empty": "Last name cannot be empty",
                "string.min": "Last name must be at least 2 characters",
                "string.max": "Last name cannot exceed 256 characters",
                "any.required": "Last name is required",
            }),
        })
            .required()
            .messages({ "any.required": "Name is required" }),

        isAdmin: Joi.boolean().default(false),

        email: Joi.string().pattern(emailRegex).required().messages({
            "string.empty": "Email cannot be empty",
            "string.pattern.base": "Email must be a valid address",
            "any.required": "Email is required",
        }),

        password: Joi.string().pattern(passwordRegex).required().messages({
            "string.empty": "Password cannot be empty",
            "string.pattern.base":
                "Password must be at least 9 characters, include upper and lower case letters, a number, and one of -&^%$#@!",
            "any.required": "Password is required",
        }),

        profileImage: Joi.object({
            url: Joi.string().regex(urlRegex).allow("").messages({
                "string.pattern.base": "Profile image URL must be valid",
            }),
            alt: Joi.string().min(2).max(256).allow("").messages({
                "string.min": "Image alt must be at least 2 characters",
                "string.max": "Image alt cannot exceed 256 characters",
            }),
        })
            .required()
            .messages({ "any.required": "Profile image is required" }),

        nickname: Joi.string().min(2).max(256).required().messages({
            "string.empty": "Nickname cannot be empty",
            "string.min": "Nickname must be at least 2 characters",
            "string.max": "Nickname cannot exceed 256 characters",
            "any.required": "Nickname is required",
        }),
    }).options({ stripUnknown: true });

    return schema.validate(user);
};

module.exports = registerValidation;
