/* eslint-disable no-useless-escape */
const Joi = require("joi");

const loginValidation = (user) => {
    const schema = Joi.object({
        email: Joi.string()
            .ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            .rule({ message: "Email must be a valid email address." })
            .required(),
        password: Joi.string()
            .ruleset.regex(/^(?=.{9,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\-&\^%$#@!]).+$/)
            .message(
                "The password must be at least 9 characters long and must contain each of the following: uppercase letter, lowercase letter, a digit, one unique characters: -&^%$#@!"
            )
            .required(),
    });

    return schema.validate(user);
};

module.exports = loginValidation;
