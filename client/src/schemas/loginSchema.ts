/* eslint-disable no-useless-escape */
import Joi from "joi";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const passwordRegex = /^(?=.{9,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\-&\^%$#@!]).+$/;

const loginSchema = Joi.object({
    email: Joi.string()
        .ruleset.regex(emailRegex)
        .rule({ message: "Email must be a valid email address." })
        .required(),
    password: Joi.string()
        .ruleset.regex(passwordRegex)
        .message(
            "The password must be at least 9 characters long and must contain each of the following: uppercase letter, lowercase letter, a digit, one unique characters: -&^%$#@!"
        )
        .required(),
});

export default loginSchema;
