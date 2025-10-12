const Joi = require("joi");
const { EMAIL, PASSWORD } = require("@utils/globalValidations");

const loginValidation = (user) => {
    const schema = Joi.object({
        email: EMAIL,
        password: PASSWORD,
    });

    return schema.validate(user);
};

module.exports = loginValidation;
