/* eslint-disable no-useless-escape */
const Joi = require("joi");

const registerValidation = (user) => {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const emailMessage = "Email must be a valid email address.";
    const passwordRegex = /^(?=.{9,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\-&\^%$#@!]).+$/;
    const passwordMessage =
        "The password must be at least 9 characters long and must contain each of the following: uppercase letter, lowercase letter, a digit, one unique characters: -&^%$#@!";
    const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const urlMessage = "The image url address must be a valid url address.";
    const nicknameMessage = "A nickname is required and must be between 2 and 256 characters";

    const schema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        }),
        isAdmin: Joi.boolean().default(false),
        email: Joi.string().pattern(emailRegex).message(emailMessage).required(),
        password: Joi.string().pattern(passwordRegex).message(passwordMessage).required(),
        profileImage: Joi.object()
            .keys({
                url: Joi.string().ruleset.regex(urlRegex).rule({ message: urlMessage }).allow(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        nickname: Joi.string().min(2).max(256).message(nicknameMessage).required(),
    }).options({ stripUnknown: true });

    return schema.validate(user);
};

module.exports = registerValidation;
